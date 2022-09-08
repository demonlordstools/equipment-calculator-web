import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';

@Component({
    selector: 'app-context',
    templateUrl: './context.component.html',
    styleUrls: ['./context.component.scss'],
})
export class ContextComponent {
    constructor(private dialog: MatDialog) {}

    openHelp(): void {
        this.dialog.open(HelpDialogComponent);
    }

    openAbout(): void {
        this.dialog.open(AboutDialogComponent);
    }
}
