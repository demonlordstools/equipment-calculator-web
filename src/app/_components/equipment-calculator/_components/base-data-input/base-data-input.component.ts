import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Element, elements } from 'src/shared/_types/element';

import { ALL_UNITS, unitByName } from '../../../../_types/unit';
import { NUMBERS_ONLY } from '../../../../_util/validators';
import { BaseDataFormData } from '../../_types/base-data-form-data';
import { CompositeSubscription } from '../../../../_types/composite-subscription';

@Component({
    selector: 'app-base-data-input',
    templateUrl: './base-data-input.component.html',
    styleUrls: ['./base-data-input.component.scss'],
})
export class BaseDataInputComponent implements OnInit, OnDestroy {
    @Output() changed = new EventEmitter<BaseDataFormData>();

    allUnits = [...ALL_UNITS.keys()];
    elements = elements;
    subscriptions = new CompositeSubscription();

    selectedUnitControl = new FormControl();
    rangedControl = new FormControl(false);
    rangedRequiredControl = new FormControl({ value: false, disabled: true });
    rangedForbiddenControl = new FormControl({ value: false, disabled: true });

    form = new FormGroup({
        // control names have to correspond with keys in BaseDataFormData
        waffenschmiede: new FormControl(0, [NUMBERS_ONLY]),
        schmiedekunst: new FormControl(0, [NUMBERS_ONLY]),
        selectedUnit: this.selectedUnitControl,
        elementAttack: new FormControl(),
        elementDefense: new FormControl(),
        unitElement: new FormControl(Element.NONE),
        carryWeight: new FormControl(0),
        ranged: this.rangedControl,
        rangedRequired: this.rangedRequiredControl,
        rangedForbidden: this.rangedForbiddenControl,
    });

    unitName(index: number, name: string): string {
        return name;
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.selectedUnitControl.valueChanges.subscribe((unitName) => this.onUnitChanged(unitName)),
            this.rangedControl.valueChanges.subscribe((ranged) => this.onRangedChanged(ranged)),
            this.rangedRequiredControl.valueChanges.subscribe((rangedRequired) =>
                this.onRangedRequiredChanged(rangedRequired)
            ),
            this.rangedForbiddenControl.valueChanges.subscribe((rangedForbidden) =>
                this.onRangedForbiddenChanged(rangedForbidden)
            ),
            this.form.valueChanges.subscribe((changes: BaseDataFormData) => {
                this.changed.emit(changes);
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private onUnitChanged(unitName: string): void {
        const updatedUnit = unitByName(unitName);
        this.form?.patchValue({
            carryWeight: updatedUnit?.carryWeight,
            unitElement: updatedUnit?.element,
            elementAttack: undefined,
            elementDefense: undefined,
            ranged: updatedUnit?.ranged,
            rangedRequired: false,
            rangedForbidden: false,
        });
    }

    private onRangedChanged(ranged: boolean): void {
        if (ranged) {
            this.rangedRequiredControl.enable();
            this.rangedForbiddenControl.enable();
        } else {
            this.rangedRequiredControl.setValue(false);
            this.rangedForbiddenControl.setValue(false);
            this.rangedRequiredControl.disable();
            this.rangedForbiddenControl.disable();
        }
    }

    private onRangedRequiredChanged(rangedRequired: boolean): void {
        const rangedForbidden = this.rangedForbiddenControl.value;
        if (rangedRequired && rangedForbidden) {
            this.rangedForbiddenControl.setValue(false);
        }
    }

    private onRangedForbiddenChanged(rangedForbidden: boolean): void {
        const rangedRequired = this.rangedRequiredControl.value;
        if (rangedForbidden && rangedRequired) {
            this.rangedRequiredControl.setValue(false);
        }
    }
}
