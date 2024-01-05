package dl.equipmentCalculator

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cache.annotation.EnableCaching

@SpringBootApplication @EnableCaching class EquipmentCalculatorApplication

fun main(args: Array<String>) {
    runApplication<EquipmentCalculatorApplication>(*args)
}
