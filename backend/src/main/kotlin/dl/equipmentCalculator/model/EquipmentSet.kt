package dl.equipmentCalculator.model

data class EquipmentSet(
        val weapon: Equipment,
        val shield: Equipment,
        val helmet: Equipment,
        val armour: Equipment,
        val accessory: Equipment) {

    companion object {
        fun EquipmentSet?.getWeightedTotalStats(
                apWeight: Int = 0,
                vpWeight: Int = 0,
                hpWeight: Int = 0,
                mpWeight: Int = 0
        ): Int {
            if (this === null) return 0
            return if (apWeight + vpWeight + hpWeight + mpWeight == 0)
                ap + vp + hp + mp else
                ap * apWeight + vp * vpWeight + hp * hpWeight + mp * mpWeight
        }

        private val EquipmentSet.ap: Int
            get() = weapon.ap + shield.ap + helmet.ap + armour.ap + accessory.ap
        private val EquipmentSet.vp: Int
            get() = weapon.vp + shield.vp + helmet.vp + armour.vp + accessory.vp
        private val EquipmentSet.hp: Int
            get() = weapon.hp + shield.hp + helmet.hp + armour.hp + accessory.hp
        private val EquipmentSet.mp: Int
            get() = weapon.mp + shield.mp + helmet.mp + armour.mp + accessory.mp
    }
}
