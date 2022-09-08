package dl.equipmentCalculator.model.exception

import dl.equipmentCalculator.model.ExceptionType.Companion.ELEMENT_MISMATCH


class ElementMismatchException() : RuntimeException(ELEMENT_MISMATCH)
