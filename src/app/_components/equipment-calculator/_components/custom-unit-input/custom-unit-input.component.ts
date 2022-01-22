import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Element, elements } from 'src/shared/_types/element';
import { NUMBERS_ONLY } from '../../../../_util/validators';
import { tap } from 'rxjs';
import { CompositeSubscription } from '../../../../_types/composite-subscription';
import { CustomUnitFormData } from '../../_types/custom-unit-form-data';

@Component({
    selector: 'app-custom-unit-input',
    templateUrl: './custom-unit-input.component.html',
    styleUrls: ['./custom-unit-input.component.scss'],
})
export class CustomUnitInputComponent implements OnInit, OnDestroy {
    @Output() changed = new EventEmitter<CustomUnitFormData>();

    form = new FormGroup({
        ap: new FormControl(0, [NUMBERS_ONLY]),
        vp: new FormControl(0, [NUMBERS_ONLY]),
        hp: new FormControl(0, [NUMBERS_ONLY]),
        mp: new FormControl(0, [NUMBERS_ONLY]),
        carryWeight: new FormControl(0, [NUMBERS_ONLY]),
        element: new FormControl(Element.NONE),
        ranged: new FormControl(true),
    });

    elements = elements;
    subscriptions = new CompositeSubscription();

    ngOnInit(): void {
        this.subscriptions.add(
            this.form.valueChanges
                .pipe(
                    tap((changes) => {
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
