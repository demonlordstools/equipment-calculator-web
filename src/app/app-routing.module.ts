import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentCalculatorComponent } from './_components/equipment-calculator/equipment-calculator.component';

const routes: Routes = [
    { path: '', component: EquipmentCalculatorComponent },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
