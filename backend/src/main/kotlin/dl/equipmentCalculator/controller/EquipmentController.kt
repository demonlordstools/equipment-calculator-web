package dl.equipmentCalculator.controller

import dl.equipmentCalculator.model.Element
import dl.equipmentCalculator.model.Element.Companion.combineElements
import dl.equipmentCalculator.model.Element.Companion.getWantedDefenseElements
import dl.equipmentCalculator.model.Element.Companion.getWantedWeaponElements
import dl.equipmentCalculator.model.Element.Companion.isValidElementCombination
import dl.equipmentCalculator.model.Equipment
import dl.equipmentCalculator.model.Equipment.Companion.ALL_ACCESSORIES
import dl.equipmentCalculator.model.Equipment.Companion.ALL_ARMOUR
import dl.equipmentCalculator.model.Equipment.Companion.ALL_HELMETS
import dl.equipmentCalculator.model.Equipment.Companion.ALL_SHIELDS
import dl.equipmentCalculator.model.Equipment.Companion.ALL_WEAPONS
import dl.equipmentCalculator.model.Equipment.Companion.MAX_WEIGHT_BONUS
import dl.equipmentCalculator.model.Equipment.Companion.validWeightAndElements
import dl.equipmentCalculator.model.EquipmentSet
import dl.equipmentCalculator.model.EquipmentSet.Companion.getWeightedTotalStats
import dl.equipmentCalculator.model.exception.ElementMismatchException
import dl.equipmentCalculator.model.exception.InvalidItemCombinationException
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.cache.annotation.Cacheable
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException

@CrossOrigin
@RestController
@Cacheable("equipmentSet")
class EquipmentController {

    @GetMapping
    fun calculate(
        @RequestParam(value = "unitCarryWeight", defaultValue = "0") unitCarryWeight: Int,
        @RequestParam(value = "unitElement", defaultValue = "NONE") unitElement: Element = Element.NONE,
        @RequestParam(value = "unitRanged", required = false) unitRanged: Boolean = false,
        @RequestParam(value = "waffenschmiede", defaultValue = "0") schmiedeLevel: Int = 0,
        @RequestParam(value = "rangedRequired", required = false) rangedRequired: Boolean = false,
        @RequestParam(value = "rangedForbidden", required = false) rangedForbidden: Boolean = false,
        @RequestParam(value = "elementAttack", required = false) elementAttack: Element? = null,
        @RequestParam(value = "elementDefense", required = false) elementDefense: Element? = null,
        @RequestParam(value = "apWeight", defaultValue = "0") apWeight: Int = 0,
        @RequestParam(value = "vpWeight", defaultValue = "0") vpWeight: Int = 0,
        @RequestParam(value = "hpWeight", defaultValue = "0") hpWeight: Int = 0,
        @RequestParam(value = "mpWeight", defaultValue = "0") mpWeight: Int = 0
    ): EquipmentSet {
        try {
            if ((rangedRequired && rangedForbidden) || (rangedRequired && !unitRanged)) {
                LOG.error("Invalid ranged parameters. Unit can use ranged weapons: $unitRanged | rangedRequired: $rangedRequired | rangedForbidden: $rangedForbidden")
                throw InvalidItemCombinationException()
            }
            if (!isValidElementCombination(unitElement, elementAttack, elementDefense)) {
                LOG.error("Invalid element combination \"$unitElement\", \"$elementAttack\" and \"$elementDefense\"!")
                throw ElementMismatchException()
            }

            return getBestItemCombination(
                unitElement,
                unitCarryWeight,
                unitRanged,
                schmiedeLevel,
                rangedRequired,
                rangedForbidden,
                apWeight,
                vpWeight,
                hpWeight,
                mpWeight,
                elementAttack,
                elementDefense
            )
        } catch (exception: Exception) {
            throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, exception.message)
        }
    }

    fun getBestItemCombination(
        unitElement: Element,
        unitCarryWeight: Int,
        unitRanged: Boolean,
        schmiedeLevel: Int,
        rangedRequired: Boolean,
        rangedForbidden: Boolean,
        apWeight: Int,
        vpWeight: Int,
        hpWeight: Int,
        mpWeight: Int,
        targetAttackElement: Element?,
        targetDefenseElement: Element?
    ): EquipmentSet {
        val wantedWeaponElements = getWantedWeaponElements(unitElement, targetAttackElement)
        val wantedDefenseElements = getWantedDefenseElements(unitElement, targetDefenseElement)
        val maxWeight = unitCarryWeight + MAX_WEIGHT_BONUS
        var result: EquipmentSet? = null

        val validWeapons = filterInvalidItems(
            unitElement,
            maxWeight,
            unitRanged,
            schmiedeLevel,
            ALL_WEAPONS,
            wantedWeaponElements,
            rangedRequired,
            rangedForbidden
        )

        val validHelmets = filterInvalidItems(unitElement, maxWeight, unitRanged, schmiedeLevel, ALL_HELMETS)
        val validArmour = filterInvalidItems(
            unitElement,
            maxWeight,
            unitRanged,
            schmiedeLevel,
            ALL_ARMOUR,
            wantedDefenseElements
        )
        val validShields = filterInvalidItems(
            unitElement,
            maxWeight,
            unitRanged,
            schmiedeLevel,
            ALL_SHIELDS,
            wantedDefenseElements
        )
        val validAccessories = filterInvalidItems(
            unitElement,
            maxWeight,
            unitRanged,
            schmiedeLevel,
            ALL_ACCESSORIES
        )


        for (weapon in validWeapons) {
            if (targetAttackElement !== null && combineElements(
                    unitElement,
                    weapon.element
                ) !== targetAttackElement
            ) continue
            for (armour in validArmour) {
                if (!validWeightAndElements(unitElement, maxWeight, weapon, armour)) continue
                for (shield in validShields) {
                    if (!validWeightAndElements(unitElement, maxWeight, weapon, armour, shield)) continue
                    if (
                        targetDefenseElement !== null &&
                        combineElements(unitElement, armour.element, shield.element) !== targetDefenseElement
                    )
                        continue
                    for (helmet in validHelmets) {
                        if (!validWeightAndElements(unitElement, maxWeight, weapon, armour, shield, helmet)) continue
                        for (accessory in validAccessories) {
                            if (
                                validWeightAndElements(
                                    unitElement,
                                    unitCarryWeight,
                                    weapon,
                                    armour,
                                    shield,
                                    helmet,
                                    accessory
                                )
                            ) {
                                val newSet = EquipmentSet(
                                    weapon = weapon,
                                    armour = armour,
                                    shield = shield,
                                    helmet = helmet,
                                    accessory = accessory
                                )
                                result = if (
                                    newSet.getWeightedTotalStats(apWeight, vpWeight, hpWeight, mpWeight) >
                                    result.getWeightedTotalStats(apWeight, vpWeight, hpWeight, mpWeight)
                                )
                                    newSet else result
                            }
                        }
                    }
                }
            }
        }

        if (result === null) {
            LOG.error(
                "Unable to find item combination for parameters " +
                        "unitElement:$unitElement " +
                        "unitCarryWeight:$unitCarryWeight " +
                        "unitRanged:$unitRanged " +
                        "rangedRequired:$rangedRequired " +
                        "rangedForbidden:$rangedForbidden " +
                        "schmiedeLevel:$schmiedeLevel " +
                        "targetAttackElement:$targetAttackElement " +
                        "targetDefenseElement:$targetDefenseElement"
            )
            throw InvalidItemCombinationException()
        }
        return result
    }

    fun filterInvalidItems(
        unitElement: Element,
        maxWeight: Int,
        unitRanged: Boolean,
        waffenschmiede: Int,
        equipment: List<Equipment>,
        wantedElements: List<Element> = listOf(),
        rangedRequired: Boolean = false,
        rangedForbidden: Boolean = false
    ): List<Equipment> {
        return equipment.filter {
            isValidElementCombination(unitElement, it.element) &&
                    waffenschmiede >= it.requiredWaffenschmiede &&
                    maxWeight >= it.weight &&
                    !(rangedRequired && !it.ranged) &&
                    !(rangedForbidden && it.ranged) &&
                    (unitRanged || !it.ranged) &&
                    (wantedElements.isEmpty() || wantedElements.contains(it.element))
        }
    }

    companion object {
        val LOG: Logger = LoggerFactory.getLogger(EquipmentController::class.java)
    }
}
