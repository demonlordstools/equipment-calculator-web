import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { elements } from 'src/shared/_types/element';

import { ALL_UNITS, Unit } from '../../../../_types/unit';
import { NUMBERS_ONLY } from '../../../../_util/validators';
import { BaseDataFormData } from '../../_types/base-data-form-data';
import { CompositeSubscription } from '../../../../_types/composite-subscription';

@Component({
    selector: 'app-base-data-input',
    templateUrl: './base-data-input.component.html',
    styleUrls: ['./base-data-input.component.scss'],
})
export class BaseDataInputComponent implements OnInit, OnDestroy, OnChanges {
    @Input() selectedUnit?: Unit;
    @Output() changed = new EventEmitter<BaseDataFormData>();

    allUnits = [...ALL_UNITS.keys()];
    elements = elements;
    subscriptions = new CompositeSubscription();

    rangedRequiredControl = new FormControl(false);
    rangedForbiddenControl = new FormControl(false);

    form = new FormGroup({
        waffenschmiede: new FormControl(0, [NUMBERS_ONLY]),
        schmiedekunst: new FormControl(0, [NUMBERS_ONLY]),
        selectedUnit: new FormControl(),
        elementAttack: new FormControl(),
        elementDefense: new FormControl(),
        carryWeight: new FormControl(this.selectedUnit?.carryWeight),
        rangedRequired: this.rangedRequiredControl,
        rangedForbidden: this.rangedForbiddenControl,
    });

    unitName(index: number, name: string): string {
        return name;
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.rangedRequiredControl.valueChanges.subscribe((rangedRequired) => {
                const rangedForbidden = this.rangedForbiddenControl.value;
                if (rangedRequired && rangedForbidden) {
                    this.rangedForbiddenControl.setValue(false);
                }
            }),
            this.rangedForbiddenControl.valueChanges.subscribe((rangedForbidden) => {
                const rangedRequired = this.rangedRequiredControl.value;
                if (rangedForbidden && rangedRequired) {
                    this.rangedRequiredControl.setValue(false);
                }
            }),
            this.form.valueChanges.subscribe((changes: BaseDataFormData) => {
                this.changed.emit(changes);
            })
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        const updatedUnit = changes['selectedUnit'].currentValue;
        this.form?.patchValue({ carryWeight: updatedUnit?.carryWeight, rangedRequired: false, rangedForbidden: false });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
