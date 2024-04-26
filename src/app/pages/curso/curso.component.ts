import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCursoComponent } from '../../components/add-curso/add-curso.component';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/model/Curso';
import { AlertService } from 'src/app/service/AlertService';
import { successNotification } from 'src/app/shared/LibraryConfig';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoService } from 'src/app/service/curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss'],
})
export class CursoComponent implements OnInit {
  public lstCursos: Curso[] = [];
  public search!: string;

  public lstDataSource = MatTableDataSource<any>
  public totalElements?: number;
  public lstColumsTable: string[] = ['ID', 'NOMBRE', 'SELECCIONAR'];

  // private snackBar = inject(MatSnackBar);
  // private alertService = inject(AlertService);

  constructor(private dialog: MatDialog, private cursoService: CursoService) {

  }

  ngOnInit(): void {
    this.getCursos();
    // this.lstDataSource = new MatTableDataSource(this.lstCursos);
    // this.totalElements = ELEMENT_DATA.lenght();
  }

  public getCursos(): void {
    this.cursoService.getCursos().subscribe((dato) => {
      this.lstCursos = dato;
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

  public onCreate(row?: Curso): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this.dialog.open(AddCursoComponent, _dialogConfig);

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
    //  this.alertService.loading(text);
  }
}
