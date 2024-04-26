import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AddDepartamentoComponent } from 'src/app/components/add-departamento/add-departamento.component';
import { Departamento } from 'src/app/model/Departamento';
import { AlertService } from 'src/app/service/AlertService';
import { DepartamentoService } from 'src/app/service/departamento.service';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';

@Component({
  selector: 'app-list-departamento',
  templateUrl: './list-departamento.component.html',
  styleUrls: ['./list-departamento.component.scss']
})
export class ListDepartamentoComponent implements OnInit, AfterViewInit {
  public lstDepartamentos: Departamento[] = [];
  public search!: string;

  public title!: string;
  public subtitle!: string;
  public namePage!: string;

  public lstDataSource!: MatTableDataSource<any>
  public totalElements?: number;
  public lstColumsTable: string[] = ['nombre', 'seleccionar'];
  // public lstColumsTable: string[] = ['id', 'nombre', 'seleccionar'];

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


  constructor(private dialog: MatDialog, private departamentoService: DepartamentoService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.onSearch();
    this.title = BibliotecaConstant.TITLE_PAGE_DEPARTAMENTOS; //BibliotecaConstant.TITLE_PAGE_BOOK_CATALOG;
    this.namePage = BibliotecaConstant.VC_ADMIN.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_DEPARTAMENTOS
    );
    this.subtitle = BibliotecaConstant.VC_SEARCH.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_DEPARTAMENTOS
    );
  }

  public getDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe((dato) => {
      this.lstDepartamentos = dato;
      this.totalElements = this.lstDepartamentos.length;
      this.lstDataSource = new MatTableDataSource(this.lstDepartamentos.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize));

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

  public onCreater(row?: Departamento): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this.dialog.open(AddDepartamentoComponent, _dialogConfig);

    _dialogRef.afterClosed().subscribe((rpta) => {
      if (rpta.action === BibliotecaConstant.ACTION_UPDATE) {
        this.update(rpta.id, rpta.departamento);
      } else if (rpta.action === BibliotecaConstant.ACTION_ADD) {
        this.save(rpta.departamento);
      }
    });
  }

  public save(departamento: Departamento): void {
    this.departamentoService.addDepartamento(departamento).subscribe(
      (response: Departamento) => {
        this.onSearch();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public update(id: number, departamento: Departamento): void {
    this.departamentoService.updateDepartamento(id, departamento).subscribe(
      (response: Departamento) => {
        this.onSearch();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public confirmationDelete(row: Departamento): void {
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
      this.departamentoService.findByNombre(this.search).subscribe((dato) => {
        this.lstDepartamentos = dato;
        this.totalElements = this.lstDepartamentos.length;
        this.lstDataSource = new MatTableDataSource(this.lstDepartamentos.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize));
        this.isLoadingResults = false;
      })
    } else {
      this.getDepartamentos();
    }
  }

  onEraser() {
    this.onClearTotalElement();
    this.onClearSearh();
    this.onclearLstDepartamento();
    this.onSearch();
  }

  public onClearTotalElement(): void {
    this.totalElements = 0;
  }

  public onClearSearh(): void {
    this.search = '';
  }
  public onclearLstDepartamento(): void {
    this.lstDepartamentos = [];
  }

  public success(msg: string) {
    // successNotification(msg, this.snackBar);
  }

  public loading(text: string): void {
    //  this.alertService.loading(text);
  }

  public onDelete(id: any): void {
    this.departamentoService.deleteDepartamento(id).subscribe((data: any) => {
      this.paginator.pageIndex = 0;
      this.onSearch();
      this.alertService.notification(
        BibliotecaConstant.TITLE_MODAL_DELETE,
        BibliotecaConstant.VC_SUCCESS
      );
    });
  }

  public onclearLstEditorial(): void {
    this.lstDepartamentos = [];
  }

  public handlePage(e?: any) {
    this.iterator();
  }

  private iterator() {
    this.onSearch();
  }
}
