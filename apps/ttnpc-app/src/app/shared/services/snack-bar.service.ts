import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    constructor(
        private _snackBar: MatSnackBar
    ) { }

    success(message) {
        this.openSnackBar('success', message, 'check-circle');
    }

    error(message) {
        this.openSnackBar('error', message, 'exclamation-circle');
    }

    info(message) {
        this.openSnackBar('info', message, 'exclamation-triangle');
    }

    private openSnackBar(type, message, icon = null) {
        let className: string;
        if (type === 'success') {
            className = 'toast-success';
        } else if (type === 'error') {
            className = 'toast-error';
        } else {
            className = 'toast-info';
        }

        this._snackBar.openFromComponent(SnackBarComponent, {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            duration: 3000,
            panelClass: className,
            data: {
                icon,
                message
            }
        });
    }

}