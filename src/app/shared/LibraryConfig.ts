import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export function successNotification(msg: string, snackBar: MatSnackBar) {
    return snackBar.open(msg, '', configSnackBar);
}

const configSnackBar: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
};
