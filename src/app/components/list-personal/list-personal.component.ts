import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Personal } from 'src/app/model/Personal';
import { AlertService } from 'src/app/service/AlertService';
import { PersonalService } from 'src/app/service/personal.service';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { AddPersonalComponent } from '../add-personal/add-personal.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-personal',
  templateUrl: './list-personal.component.html',
  styleUrls: ['./list-personal.component.scss']
})
export class ListPersonalComponent implements OnInit, AfterViewInit {
  public lstPersonals: Personal[] = [];
  public search!: string;

  public title!: string;
  public subtitle!: string;
  public namePage!: string;

  public lstDataSource!: MatTableDataSource<any>
  public totalElements?: number;
  public lstColumsTable: string[] = ['nombre', 'apellido', 'cargo', 'seleccionar'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) set content(content: MatSort) {
    this.sort = content;
    if (this.sort) {
      this.lstDataSource.sort = this.sort;

    }
  }

  public isLoadingResults: boolean = true;
  public pageSize?: number = BibliotecaConstant.PAGE_SIZE_INITIAL;

  protected subscriptions: Array<Subscription> = new Array();


  constructor(private dialog: MatDialog, private personalService: PersonalService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.onSearch();
    this.title = BibliotecaConstant.TITLE_PAGE_PERSONAL;
    this.namePage = BibliotecaConstant.VC_ADMIN.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_PERSONAL
    );
    this.subtitle = BibliotecaConstant.VC_SEARCH.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_PERSONAL
    );
  }

  public getPersonals(): void {
    this.personalService.getPersonals().subscribe((dato) => {
      this.lstPersonals = dato;
      this.totalElements = this.lstPersonals.length;
      this.lstDataSource = new MatTableDataSource(this.lstPersonals.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize));

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

  public onCreater(row?: Personal): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this.dialog.open(AddPersonalComponent, _dialogConfig);

    _dialogRef.afterClosed().subscribe((rpta) => {
      if (rpta.action === BibliotecaConstant.ACTION_UPDATE) {
        this.update(rpta.id, rpta.personal);
      } else if (rpta.action === BibliotecaConstant.ACTION_ADD) {
        this.save(rpta.personal);
      }
    });
  }

  public save(personal: Personal): void {
    this.personalService.addPersonal(personal).subscribe(
      (response: Personal) => {
        // console.log(response);
        this.onSearch();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public update(id: number, personal: Personal): void {
    this.personalService.updatePersonal(id, personal).subscribe(
      (response: Personal) => {
        // console.log(response);
        this.onSearch();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public confirmationDelete(row: Personal): void {
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
      this.personalService.findByNombre(this.search).subscribe((dato) => {
        this.lstPersonals = dato;
        // this.paginator.pageIndex = 0;
        // this.paginator.pageSize = this.lstPersonals.length;
        this.totalElements = this.lstPersonals.length;
        this.lstDataSource = new MatTableDataSource(this.lstPersonals.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize));
        // this.lstDataSource = new MatTableDataSource(this.lstPersonals);
        this.isLoadingResults = false;
      })
    } else {
      this.getPersonals();
    }
  }

  onEraser() {
    this.onClearTotalElement();
    this.onClearSearh();
    this.onclearLstPersonal();
    this.onSearch();
  }

  public onClearTotalElement(): void {
    this.totalElements = 0;
  }

  public onClearSearh(): void {
    this.search = '';
  }
  public onclearLstPersonal(): void {
    this.lstPersonals = [];
  }

  public success(msg: string) {
    // successNotification(msg, this.snackBar);
  }

  public loading(text: string): void {
    //  this.alertService.loading(text);
  }

  public onDelete(id: any): void {
    this.personalService.deletePersonal(id).subscribe((data: any) => {
      this.paginator.pageIndex = 0;
      this.onSearch();
      this.alertService.notification(
        BibliotecaConstant.TITLE_MODAL_DELETE,
        BibliotecaConstant.VC_SUCCESS
      );
    });
  }

  public onclearLstEditorial(): void {
    this.lstPersonals = [];
  }

  public handlePage(e?: any) {
    this.iterator();
  }

  private iterator() {
    this.onSearch();
  }
}
