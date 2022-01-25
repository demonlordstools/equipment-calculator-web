import { Component, Self } from '@angular/core';

import { EquipmentStore } from './_services/equipment.store';
import { BaseDataFormData } from './_types/base-data-form-data';
import { StatWeightingFormData } from './_types/stat-weighting-form-data';

@Component({
    selector: 'app-equipment-calculator',
    templateUrl: './equipment-calculator.component.html',
    styleUrls: ['./equipment-calculator.component.scss'],
    providers: [EquipmentStore],
})
export class EquipmentCalculatorComponent {
    constructor(@Self() public store: EquipmentStore) {}

    calculateEquipment(): void {
        this.store.getEquipment();
    }

    onBaseDataChanged(data: BaseDataFormData): void {
        this.store.updateBaseData(data);
    }

    onStatWeightingDataChanged(data: StatWeightingFormData): void {
        this.store.updateStatWeighting(data);
    }
}
