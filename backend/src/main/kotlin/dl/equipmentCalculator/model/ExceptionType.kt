package dl.equipmentCalculator.model

sealed class ExceptionType {
    companion object {
        const val INVALID_ITEM_COMBINATION = "INVALID_ITEM_COMBINATION"
        const val ELEMENT_MISMATCH = "ELEMENT_MISMATCH"
    }
}
