import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ContextComponent } from './_components/context/context.component';
import { EquipmentCalculatorComponent } from './_components/equipment-calculator/equipment-calculator.component';
import { AppRoutingModule } from './app-routing.module';
import { BaseDataInputComponent } from './_components/equipment-calculator/_components/base-data-input/base-data-input.component';
import { StatWeightingComponent } from './_components/equipment-calculator/_components/stat-weighting/stat-weighting.component';
import { EquipmentSetComponent } from './_components/equipment-calculator/_components/equipment-set/equipment-set.component';
import { HelpDialogComponent } from './_components/help-dialog/help-dialog.component';
import { AboutDialogComponent } from './_components/about-dialog/about-dialog.component';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        AboutDialogComponent,
        HelpDialogComponent,
        ContextComponent,
        EquipmentCalculatorComponent,
        BaseDataInputComponent,
        StatWeightingComponent,
        EquipmentSetComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatCardModule,
        MatSliderModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        MatProgressSpinnerModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
