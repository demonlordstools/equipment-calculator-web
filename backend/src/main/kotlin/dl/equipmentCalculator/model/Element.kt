package dl.equipmentCalculator.model

import dl.equipmentCalculator.controller.EquipmentController.Companion.LOG
import dl.equipmentCalculator.model.exception.ElementMismatchException

enum class Element(
        val hasFire: Boolean = false,
        val hasEarth: Boolean = false,
        val hasAir: Boolean = false,
        val hasIce: Boolean = false) {
    NONE,
    FIRE(hasFire = true),
    EARTH(hasEarth = true),
    AIR(hasAir = true),
    ICE(hasIce = true),
    FIRE_AIR(hasFire = true, hasAir = true),
    EARTH_ICE(hasEarth = true, hasIce = true);

    companion object {
        fun isValidElementCombination(vararg elements: Element): Boolean {
            var resultingElement = NONE
            return try {
                for (element in elements) {
                    resultingElement = combineElements(resultingElement, element)
                }
                true
            } catch (_: ElementMismatchException) {
                false
            }
        }

        fun combineElements(vararg elements: Element): Element {
            when (elements.size) {
                0 -> return NONE
                1 -> return elements[0]
                2 -> {
                    val element1 = elements[0]
                    val element2 = elements[1]

                    if (element1 === element2) return element1
                    if (element1 === NONE) return element2
                    if (element2 === NONE) return element1

                    if ((element1.hasFire && element2.hasAir) || (element1.hasAir && element2.hasFire)) {
                        return FIRE_AIR
                    }
                    if ((element1.hasEarth && element2.hasIce) || (element1.hasIce && element2.hasEarth)) {
                        return EARTH_ICE
                    }

                    throw ElementMismatchException()
                }
                else -> {
                    val firstCombined = combineElements(elements[0], elements[1])
                    return combineElements(firstCombined, *elements.drop(2).toTypedArray())
                }
            }
        }

        fun getWantedWeaponElements(unitElement: Element, targetElement: Element?): List<Element> {
            if (!attackElementAchievable(unitElement, targetElement)) {
                LOG.error("The desired element combination is not achievable! Requested attack element \"$targetElement\" for unit with element \"$unitElement\"")
                throw ElementMismatchException()
            }
            if (targetElement === null) return getValidElementCombinations(unitElement)
            if (unitElement === NONE || targetElement === NONE) return listOf(targetElement)

            if (unitElement === FIRE && targetElement === FIRE) return listOf(NONE, FIRE)
            if (unitElement === FIRE && targetElement === FIRE_AIR) return listOf(AIR)
            if (unitElement === EARTH && targetElement === EARTH) return listOf(NONE, EARTH)
            if (unitElement === EARTH && targetElement === EARTH_ICE) return listOf(ICE)
            if (unitElement === AIR && targetElement === AIR) return listOf(NONE, AIR)
            if (unitElement === AIR && targetElement === FIRE_AIR) return listOf(FIRE)
            if (unitElement === ICE && targetElement === ICE) return listOf(NONE, ICE)
            if (unitElement === ICE && targetElement === EARTH_ICE) return listOf(EARTH)
            if (unitElement === FIRE_AIR && targetElement === FIRE_AIR)
                return listOf(NONE, FIRE, AIR)
            if (unitElement === EARTH_ICE && targetElement === EARTH_ICE)
                return listOf(NONE, EARTH, ICE)

            return listOf()
        }

        fun getWantedDefenseElements(unitElement: Element, targetElement: Element?): List<Element> {
            if (!defenseElementAchievable(unitElement, targetElement)) {
                LOG.error("The desired element combination is not achievable! Requested defense element \"$targetElement\" for unit with element \"$unitElement\"")
                throw ElementMismatchException()
            }
            if (targetElement === null) return getValidElementCombinations(unitElement)
            if (unitElement === NONE) {
                if (targetElement === FIRE_AIR) return listOf(FIRE, AIR)
                if (targetElement === EARTH_ICE) return listOf(EARTH, ICE)
                return if (targetElement === NONE) listOf(NONE) else listOf(NONE, targetElement)
            }
            if (targetElement === NONE) return listOf(NONE)

            if (unitElement === FIRE && targetElement === FIRE) return listOf(NONE, FIRE)
            if (unitElement === EARTH && targetElement === EARTH) return listOf(NONE, EARTH)
            if (unitElement === AIR && targetElement === AIR) return listOf(NONE, AIR)
            if (unitElement === ICE && targetElement === ICE) return listOf(NONE, ICE)
            if (targetElement === FIRE_AIR) return listOf(NONE, FIRE, AIR)
            if (targetElement === EARTH_ICE) return listOf(NONE, EARTH, ICE)
            return listOf()
        }

        private fun attackElementAchievable(unitElement: Element, targetElement: Element?): Boolean {
            if (targetElement === null) return true
            if (!isValidElementCombination(unitElement, targetElement)) return false
            if (unitElement === NONE) {
                return listOf(NONE, FIRE, EARTH, ICE, AIR).contains(targetElement)
            }
            if (listOf(FIRE, EARTH, ICE, AIR).contains(unitElement)) {
                return targetElement === unitElement || listOf(FIRE_AIR, EARTH_ICE).contains(targetElement)
            }
            if (listOf(FIRE_AIR, EARTH_ICE).contains(unitElement)) {
                return targetElement === unitElement
            }

            return false
        }

        private fun defenseElementAchievable(unitElement: Element, targetElement: Element?): Boolean {
            if (targetElement === null) return true
            if (!isValidElementCombination(unitElement, targetElement)) return false
            if (listOf(FIRE_AIR, EARTH_ICE).contains(targetElement)) return true
            if (unitElement === NONE) return true
            if (listOf(FIRE, EARTH, ICE, AIR).contains(unitElement)) {
                return targetElement === unitElement || listOf(FIRE_AIR, EARTH_ICE).contains(targetElement)
            }
            if (listOf(FIRE_AIR, EARTH_ICE).contains(unitElement)) {
                return targetElement === unitElement
            }

            return false
        }

        private fun getValidElementCombinations(unitElement: Element): List<Element> {
            if (unitElement === NONE) return listOf(NONE, FIRE, EARTH, ICE, AIR)
            if (listOf(FIRE_AIR, FIRE, AIR).contains(unitElement))
                return listOf(NONE, FIRE, AIR)
            if (listOf(EARTH_ICE, EARTH, ICE).contains(unitElement))
                return listOf(NONE, EARTH, ICE)
            return listOf()
        }
    }
}
