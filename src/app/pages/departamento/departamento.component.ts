import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddDepartamentoComponent } from 'src/app/components/add-departamento/add-departamento.component';
import { Departamento } from 'src/app/model/Departamento';
import { AlertService } from 'src/app/service/AlertService';
import { DepartamentoService } from 'src/app/service/departamento.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit{
  public lstDepartamentos: Departamento[] = [];
  public search!: string;

  public lstDataSource = MatTableDataSource<any>
  public totalElements?: number;
  public lstColumsTable: string[] = ['ID', 'NOMBRE', 'SELECCIONAR'];

  // private snackBar = inject(MatSnackBar);
  private alertService = inject(AlertService);

  constructor(private dialog: MatDialog, private departamentoService: DepartamentoService) {

  }

  ngOnInit(): void {
    this.getDepartamentos();
    // this.lstDataSource = new MatTableDataSource(this.lstDepartamentos);
    // this.totalElements = ELEMENT_DATA.lenght();
  }

  public getDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe((dato) => {
      this.lstDepartamentos = dato;
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

  public onCreate(row?: Departamento): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this.dialog.open(AddDepartamentoComponent, _dialogConfig);

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
