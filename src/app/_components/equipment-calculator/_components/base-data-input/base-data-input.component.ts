import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ALL_UNITS } from '../../../../_types/unit';
import { NUMBERS_ONLY } from '../../../../_util/validators';
import { BaseDataFormData } from '../../_types/base-data-form-data';
import { tap } from 'rxjs';
import { CompositeSubscription } from '../../../../_types/composite-subscription';
import { elements } from 'src/shared/_types/element';

@Component({
    selector: 'app-base-data-input',
    templateUrl: './base-data-input.component.html',
    styleUrls: ['./base-data-input.component.scss'],
})
export class BaseDataInputComponent implements OnInit, OnDestroy {
    @Output() changed = new EventEmitter<BaseDataFormData>();

    form = new FormGroup({
        waffenschmiede: new FormControl(0, [NUMBERS_ONLY]),
        schmiedekunst: new FormControl(0, [NUMBERS_ONLY]),
        selectedUnit: new FormControl(),
        elementAttack: new FormControl(),
        elementDefense: new FormControl(),
    });
    allUnits = [...ALL_UNITS.keys()];
    elements = elements;
    subscriptions = new CompositeSubscription();

    unitName(index: number, name: string): string {
        return name;
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.form.valueChanges
                .pipe(
                    tap((changes: BaseDataFormData) => {
                        this.changed.emit(changes);
                    })
                )
                .subscribe()
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
