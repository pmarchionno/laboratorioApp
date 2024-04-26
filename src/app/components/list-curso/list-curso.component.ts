import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/model/Curso';
import { AddCursoComponent } from '../add-curso/add-curso.component';
import { CursoService } from 'src/app/service/curso.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { Subscription, map, merge, startWith, switchMap, tap } from 'rxjs';
import { AlertService } from 'src/app/service/AlertService';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

// https://codingpotions.com/angular-material/

@Component({
  selector: 'app-list-curso',
  templateUrl: './list-curso.component.html',
  styleUrls: ['./list-curso.component.scss']
})
export class ListCursoComponent implements OnInit, AfterViewInit {
  public lstCursos: Curso[] = [];
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


  constructor(private dialog: MatDialog, private cursoService: CursoService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.onSearch();
    this.title = BibliotecaConstant.TITLE_PAGE_CURSOS; //BibliotecaConstant.TITLE_PAGE_BOOK_CATALOG;
    this.namePage = BibliotecaConstant.VC_ADMIN.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_CURSOS
    );
    this.subtitle = BibliotecaConstant.VC_SEARCH.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_CURSOS
    );
  }

  public getCursos(): void {
    this.cursoService.getCursos().subscribe((dato) => {
      this.lstCursos = dato;
      this.totalElements = this.lstCursos.length;
      this.lstDataSource = new MatTableDataSource(this.lstCursos.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize));

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
    // const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    // this.subscriptions.push(sortSubscription);
    // const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(
    //   tap(() => this.onSearch())
    // )
    //   .subscribe();
    // this.subscriptions.push(paginatorSubscriptions);

    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(
    //     startWith({}),
    //     switchMap(() => {
    //       this.isLoadingResults = true;
    //       return this.lstCursos;
    //     }),
    //     map((data) => {
    //       if (data === null) {
    //         return [];
    //       }
    //       this.isLoadingResults = false;
    //       //this.totalElements = data.totalElements;
    //       // this.pageSize = data.size;
    //       return data;
    //     })
    //   )
    //   .subscribe((data: any) => (this.lstDataSource = data));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public onCreater(row?: Curso): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this.dialog.open(AddCursoComponent, _dialogConfig);

    _dialogRef.afterClosed().subscribe((rpta) => {
      if (rpta.action === BibliotecaConstant.ACTION_UPDATE) {
        this.update(rpta.id, rpta.curso);
      } else if (rpta.action === BibliotecaConstant.ACTION_ADD) {
        this.save(rpta.curso);
      }
    });
  }

  public save(curso: Curso): void {
    this.cursoService.addCurso(curso).subscribe(
      (response: Curso) => {
        // console.log(response);
        this.onSearch();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public update(id: number, curso: Curso): void {
    this.cursoService.updateCurso(id, curso).subscribe(
      (response: Curso) => {
        // console.log(response);
        this.onSearch();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public confirmationDelete(row: Curso): void {
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
      this.cursoService.findByNombre(this.search).subscribe((dato) => {
        this.lstCursos = dato;
        // this.paginator.pageIndex = 0;
        // this.paginator.pageSize = this.lstCursos.length;
        this.totalElements = this.lstCursos.length;
        this.lstDataSource = new MatTableDataSource(this.lstCursos.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize));
        // this.lstDataSource = new MatTableDataSource(this.lstCursos);
        this.isLoadingResults = false;
      })
    } else {
      this.getCursos();
    }
  }

  onEraser() {
    this.onClearTotalElement();
    this.onClearSearh();
    this.onclearLstCurso();
    this.onSearch();
  }

  public onClearTotalElement(): void {
    this.totalElements = 0;
  }

  public onClearSearh(): void {
    this.search = '';
  }
  public onclearLstCurso(): void {
    this.lstCursos = [];
  }

  public success(msg: string) {
    // successNotification(msg, this.snackBar);
  }

  public loading(text: string): void {
    //  this.alertService.loading(text);
  }

  public onDelete(id: any): void {
    this.cursoService.deleteCurso(id).subscribe((data: any) => {
      this.paginator.pageIndex = 0;
      this.onSearch();
      this.alertService.notification(
        BibliotecaConstant.TITLE_MODAL_DELETE,
        BibliotecaConstant.VC_SUCCESS
      );
    });
  }

  public onclearLstEditorial(): void {
    this.lstCursos = [];
  }

  public handlePage(e?: any) {
    this.iterator();
  }

  private iterator() {
    this.onSearch();
    // const end = (this.paginator.pageIndex + 1) * this.paginator.pageSize;
    // const start = this.paginator.pageIndex * this.paginator.pageSize;
    // const part = this.slicePaginator(start, end); //this.lstCursos.slice(start, end);
    // this.lstDataSource = new MatTableDataSource(this.lstCursos.slice(start, end));
    // this.lstDataSource = new MatTableDataSource(this.lstCursos.slice(this.paginator.pageIndex * this.paginator.pageSize,this.paginator.pageSize));
  }
}
