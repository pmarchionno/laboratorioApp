import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddHorarioComponent } from 'src/app/components/add-horario/add-horario.component';
import { Horario } from 'src/app/model/Horario';
import { AlertService } from 'src/app/service/AlertService';
import { HorarioService } from 'src/app/service/horario.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent  implements OnInit{
  public lstHorarios: Horario[] = [];
  public search!: string;

  public lstDataSource = MatTableDataSource<any>
  public totalElements?: number;
  public lstColumsTable: string[] = ['ID', 'NOMBRE', 'SELECCIONAR'];

  // private snackBar = inject(MatSnackBar);
  private alertService = inject(AlertService);

  constructor(private dialog: MatDialog, private horarioService: HorarioService) {

  }

  ngOnInit(): void {
    this.getHorarios();
  }

  public getHorarios(): void {
    this.horarioService.getHorarios().subscribe((dato) => {
      this.lstHorarios = dato;
    })
  }

  public question(response: any): void {
    // this._alertService
    //   .question(
    //     response.action === BibliotecaConstant.ACTION_ADD
    //       ? BibliotecaConstant.TITLE_MODAL_QUESTION_SAVE
    //       : BibliotecaConstant.TITLE_MODAL_QUESTION_UPDATE,
    //     '¡No podrás revertir esto!',
    //     true,
    //     true,
    //     'Aceptar',
    //     'Cancelar'
    //   )
    //   .then((data: boolean) => {
    //     if (data) {
    //       if (response.action === BibliotecaConstant.ACTION_ADD) {
    //         this.save(response.area);
    //       } else if (response.action === BibliotecaConstant.ACTION_UPDATE) {
    //         this.update(response.id, response.area);
    //       }
    //     }
    //   });
  }

  public onCreate(row?: Horario): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this.dialog.open(AddHorarioComponent, _dialogConfig);

    _dialogRef.afterClosed().subscribe((rpta) => {
      if (rpta) {
        this.question(rpta);
      }
    });
  }

  confirmationDelete(_t34: any) {
    throw new Error('Method not implemented.');
  }

  onSearch($event: Event) {
    throw new Error('Method not implemented.');
  }

  onEraser() {
    throw new Error('Method not implemented.');
  }

  public success(msg: string) {
    // successNotification(msg, this.snackBar);
  }

  public loading(text: string): void {
     this.alertService.loading(text);
  }
}
