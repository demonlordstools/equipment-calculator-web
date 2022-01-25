import { Component, Self } from '@angular/core';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CompositeSubscription } from '../../_types/composite-subscription';

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
    subscriptions = new CompositeSubscription();

    constructor(@Self() public store: EquipmentStore, private snackbar: MatSnackBar) {
        this.subscriptions.add(
            store.state$
                .pipe(
                    map(({ status }) => status),
                    distinctUntilChanged(),
                    filter((status) => !!status.error)
                )
                .subscribe((status) => {
                    this.snackbar.open(`Da ist was schief gegangen: ${status.error?.message}`, '', { duration: 5000 });
                })
        );
    }

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
