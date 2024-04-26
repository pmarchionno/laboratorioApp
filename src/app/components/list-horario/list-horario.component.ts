import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Horario } from 'src/app/model/Horario';
import { AlertService } from 'src/app/service/AlertService';
import { HorarioService } from 'src/app/service/horario.service';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { AddHorarioComponent } from '../add-horario/add-horario.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-horario',
  templateUrl: './list-horario.component.html',
  styleUrls: ['./list-horario.component.scss']
})
export class ListHorarioComponent  implements OnInit, AfterViewInit {
  public lstHorarios: Horario[] = [];
  public search!: string;

  public title!: string;
  public subtitle!: string;
  public namePage!: string;

  public lstDataSource!: MatTableDataSource<any>
  public totalElements?: number;
  public lstColumsTable: string[] = ['hora_inicio', 'hora_fin', 'seleccionar'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) set content(content: MatSort) {
    this.sort = content;
    if (this.sort) {
      this.lstDataSource.sort = this.sort;

    }
  }
  // @ViewChild(MatPaginator) set pageContent(pageContent: MatPaginator) {
  //   this.paginator = pageContent;
  //   if (this.paginator) this.lstDataSource.paginator = this.paginator;
  // }
  public isLoadingResults: boolean = true;
  public pageSize?: number = BibliotecaConstant.PAGE_SIZE_INITIAL;

  protected subscriptions: Array<Subscription> = new Array();


  constructor(private dialog: MatDialog, private horarioService: HorarioService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.onSearch();
    this.title = BibliotecaConstant.TITLE_PAGE_HORARIOS; //BibliotecaConstant.TITLE_PAGE_BOOK_CATALOG;
    this.namePage = BibliotecaConstant.VC_ADMIN.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_HORARIOS
    );
    this.subtitle = BibliotecaConstant.VC_SEARCH.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_HORARIOS
    );
  }

  public getHorarios(): void {
    this.horarioService.getHorarios().subscribe((dato) => {
      this.lstHorarios = dato;
      this.totalElements = this.lstHorarios.length;
      this.lstDataSource = new MatTableDataSource(this.lstHorarios.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize));

      // console.log("Paginator: " + this.paginator);
      this.paginator._intl.itemsPerPageLabel = BibliotecaConstant.LABEL_ITEMS_POR_PAGINA;
      this.paginator._intl.firstPageLabel = BibliotecaConstant.LABEL_FIRST_PAGE;
      this.paginator._intl.lastPageLabel = BibliotecaConstant.LABEL_LAST_PAGE;
      this.paginator._intl.nextPageLabel = BibliotecaConstant.LABEL_NEXT_PAGE;
      this.paginator._intl.previousPageLabel = BibliotecaConstant.LABEL_PREVIOUS_PAGE;

      this.isLoadingResults = false;
    })
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public onCreater(row?: Horario): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this.dialog.open(AddHorarioComponent, _dialogConfig);

    _dialogRef.afterClosed().subscribe((rpta) => {
      if (rpta.action === BibliotecaConstant.ACTION_UPDATE) {
        this.update(rpta.id, rpta.horario);
      } else if (rpta.action === BibliotecaConstant.ACTION_ADD) {
        this.save(rpta.horario);
      }
    });
  }

  public save(horario: Horario): void {
    this.horarioService.addHorario(horario).subscribe(
      (response: Horario) => {
        this.onSearch();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public update(id: number, horario: Horario): void {
    this.horarioService.updateHorario(id, horario).subscribe(
      (response: Horario) => {
        this.onSearch();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public confirmationDelete(row: Horario): void {
    this.alertService
      .question(
        BibliotecaConstant.TITLE_MODAL_QUESTION_DELETE,
        '¡No podrás revertir esto!',
        true,
        true,
        'Aceptar',
        'Cancelar'
      )
      .then((data: boolean) => {
        if (data) {
          this.onDelete(row.id);
        }
      });
  }

  onSearch($event?: Event) {
    if (this.search) {
      this.horarioService.findByNombre(this.search).subscribe((dato) => {
        this.lstHorarios = dato;
        this.totalElements = this.lstHorarios.length;
        this.lstDataSource = new MatTableDataSource(this.lstHorarios.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize));
        this.isLoadingResults = false;
      })
    } else {
      this.getHorarios();
    }
  }

  onEraser() {
    this.onClearTotalElement();
    this.onClearSearh();
    this.onclearLstHorario();
    this.onSearch();
  }

  public onClearTotalElement(): void {
    this.totalElements = 0;
  }

  public onClearSearh(): void {
    this.search = '';
  }
  public onclearLstHorario(): void {
    this.lstHorarios = [];
  }

  public success(msg: string) {
    // successNotification(msg, this.snackBar);
  }

  public loading(text: string): void {
    //  this.alertService.loading(text);
  }

  public onDelete(id: any): void {
    this.horarioService.deleteHorario(id).subscribe((data: any) => {
      this.paginator.pageIndex = 0;
      this.onSearch();
      this.alertService.notification(
        BibliotecaConstant.TITLE_MODAL_DELETE,
        BibliotecaConstant.VC_SUCCESS
      );
    });
  }

  public onclearLstEditorial(): void {
    this.lstHorarios = [];
  }

  public handlePage(e?: any) {
    this.iterator();
  }

  private iterator() {
    this.onSearch();
  }
}
