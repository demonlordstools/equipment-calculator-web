import { Injectable } from '@angular/core';
import {
    asyncScheduler,
    BehaviorSubject,
    catchError,
    map,
    mergeMap,
    Observable,
    observeOn,
    of,
    startWith,
    Subject,
    take,
} from 'rxjs';
import { EquipmentState, errorState, IDLE_STATE, LOADING_STATE } from '../_types/equipment-state';
import { EquipmentService } from '../../../_services/equipment.service';
import { Action } from '../../../_types/action';
import { Error } from '../../../../shared/_types/error';
import { ALL_UNITS, CUSTOM_UNIT_NAME, Unit, unitByName } from '../../../_types/unit';
import { EquipmentSet } from '../../../../shared/_types/equipment-set';
import {
    CalculateEquipment,
    UpdateBaseData,
    UpdateCustomUnitData,
    UpdateStatWeightingData,
} from '../_types/equipment-calculator-action';
import { BaseDataFormData } from '../_types/base-data-form-data';
import { CustomUnitFormData } from '../_types/custom-unit-form-data';
import { StatWeightingFormData } from '../_types/stat-weighting-form-data';
import { InvalidUnitError } from '../../../../shared/_types/invalid-unit-error';

@Injectable()
export class EquipmentStore {
    state$: Observable<EquipmentState>;
    private _state$: BehaviorSubject<EquipmentState>;
    private _actions$: Subject<Action> = new Subject<Action>();

    constructor(public equipmentService: EquipmentService) {
        this._state$ = new BehaviorSubject<EquipmentState>(new EquipmentState());
        this.state$ = this._state$.asObservable().pipe(observeOn(asyncScheduler));
        this._actions$
            .pipe(
                observeOn(asyncScheduler),
                mergeMap((action) => this.handleAction(action))
            )
            .subscribe((stateUpdate) => this.updateState(stateUpdate));
    }

    get state(): EquipmentState {
        return this._state$.getValue();
    }

    getEquipment(): void {
        this.dispatch(new CalculateEquipment());
    }

    updateBaseData(data: BaseDataFormData): void {
        this.dispatch(new UpdateBaseData(data));
    }

    updateCustomUnitData(data: CustomUnitFormData): void {
        this.dispatch(new UpdateCustomUnitData(data));
    }

    updateStatWeighting(data: StatWeightingFormData): void {
        this.dispatch(new UpdateStatWeightingData(data));
    }

    private dispatch(...actions: Array<Action>): void {
        actions.forEach((action) => this._actions$.next(action));
    }

    private updateState(update: Partial<EquipmentState>): void {
        this.setState({ ...this.state, ...update });
    }

    private setState(state: EquipmentState): void {
        this._state$.next(state);
    }

    private onCalculateEquipment(): Observable<Partial<EquipmentState>> {
        return this.state$.pipe(
            take(1),
            mergeMap(
                ({
                    selectedUnit,
                    waffenschmiede,
                    elementAttack,
                    elementDefense,
                    rangedRequired,
                    rangedForbidden,
                    apWeight,
                    vpWeight,
                    hpWeight,
                    mpWeight,
                }) => {
                    return !!selectedUnit
                        ? this.equipmentService
                              .getEquipment(
                                  selectedUnit,
                                  waffenschmiede,
                                  rangedRequired,
                                  rangedForbidden,
                                  apWeight,
                                  vpWeight,
                                  hpWeight,
                                  mpWeight,
                                  elementAttack,
                                  elementDefense
                              )
                              .pipe(
                                  take(1),
                                  map((set: EquipmentSet) => ({
                                      set,
                                      ...IDLE_STATE,
                                  })),
                                  startWith(LOADING_STATE),
                                  catchError(({ error }: { error: Error }) => {
                                      return of(errorState(error));
                                  })
                              )
                        : this.errorState(new InvalidUnitError('No unit selected.'));
                }
            )
        );
    }

    private onUpdateBaseData(action: UpdateBaseData): Observable<Partial<EquipmentState>> {
        const {
            waffenschmiede,
            schmiedekunst,
            selectedUnit: unitName,
            elementAttack,
            elementDefense,
            carryWeight,
            rangedRequired,
            rangedForbidden,
        } = action.data;
        return this.state$.pipe(
            take(1),
            map((state) => {
                const unitChanged = state.selectedUnit?.name !== unitName;
                const selectedUnit = unitByName(unitName);
                const stateUpdate: Partial<EquipmentState> = {
                    ...state,
                    waffenschmiede,
                    schmiedekunst,
                    elementAttack,
                    elementDefense,
                    customUnitSelected: unitName === CUSTOM_UNIT_NAME,
                    rangedRequired: rangedRequired && selectedUnit?.ranged,
                    rangedForbidden: rangedForbidden && selectedUnit?.ranged,
                    ...IDLE_STATE,
                };
                if (unitChanged) {
                    stateUpdate.selectedUnit = selectedUnit;
                } else {
                    // Don't update the selected unit if it has not changed.
                    // Otherwise, custom stats set previously would be lost.
                    if (stateUpdate.selectedUnit) {
                        stateUpdate.selectedUnit.carryWeight = carryWeight || selectedUnit?.carryWeight || 0;
                    }
                }

                return stateUpdate;
            })
        );
    }

    private onUpdateCustomUnitData(action: UpdateCustomUnitData): Observable<Partial<EquipmentState>> {
        const { ap, vp, hp, mp, carryWeight, ranged, element } = action.data;
        const unitUpdate: Partial<Unit> = { ap, vp, hp, mp, carryWeight, ranged, element };
        const customUnit = ALL_UNITS.get(CUSTOM_UNIT_NAME);
        return !!customUnit
            ? this.state$.pipe(
                  take(1),
                  map((state) => ({
                      ...state,
                      selectedUnit: {
                          ...customUnit,
                          ...unitUpdate,
                      },
                      ...IDLE_STATE,
                  }))
              )
            : this.errorState(new InvalidUnitError('Error updating the custom unit.'));
    }

    private onStatWeightingData(action: UpdateStatWeightingData): Observable<Partial<EquipmentState>> {
        const { apWeight, vpWeight, hpWeight, mpWeight } = action.data;
        return this.state$.pipe(
            take(1),
            map((state) => ({
                ...state,
                apWeight,
                vpWeight,
                hpWeight,
                mpWeight,
                ...IDLE_STATE,
            }))
        );
    }

    private handleAction(action: Action): Observable<Partial<EquipmentState>> {
        if (action instanceof CalculateEquipment) return this.onCalculateEquipment();
        if (action instanceof UpdateBaseData) return this.onUpdateBaseData(action);
        if (action instanceof UpdateCustomUnitData) return this.onUpdateCustomUnitData(action);
        if (action instanceof UpdateStatWeightingData) return this.onStatWeightingData(action);

        return of(IDLE_STATE);
    }

    private errorState(error: Error): Observable<Partial<EquipmentState>> {
        return this.state$.pipe(map((state) => ({ ...state, ...errorState(error) })));
    }
}
