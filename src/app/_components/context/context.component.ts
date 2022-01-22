import { Component } from '@angular/core';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-context',
    templateUrl: './context.component.html',
    styleUrls: ['./context.component.scss'],
})
export class ContextComponent {
    constructor(private dialog: MatDialog) {}

    openHelp() {
        this.dialog.open(HelpDialogComponent);
    }

    openAbout() {
        this.dialog.open(AboutDialogComponent);
    }
}
