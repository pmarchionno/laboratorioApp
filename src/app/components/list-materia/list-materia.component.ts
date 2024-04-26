import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, forkJoin } from 'rxjs';
import { Materia } from 'src/app/model/Materia';
import { AlertService } from 'src/app/service/AlertService';
import { MateriaService } from 'src/app/service/materia.service';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { AddMateriaComponent } from '../add-materia/add-materia.component';
import { DepartamentoService } from 'src/app/service/departamento.service';
import { Departamento } from 'src/app/model/Departamento';

@Component({
  selector: 'app-list-materia',
  templateUrl: './list-materia.component.html',
  styleUrls: ['./list-materia.component.scss']
})
export class ListMateriaComponent implements OnInit, AfterViewInit {
  public lstMaterias: Materia[] = [];
  public departamentosList: Departamento[] = [];
  public search!: string;

  public title!: string;
  public subtitle!: string;
  public namePage!: string;

  public lstDataSource!: MatTableDataSource<any>
  public totalElements?: number;
  public lstColumsTable: string[] = ['nombre', 'departamento', 'seleccionar'];

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


  constructor(
    private dialog: MatDialog,
    private materiaService: MateriaService,
    private alertService: AlertService,
    private departamentoService: DepartamentoService) {
  }

  ngOnInit(): void {
    this.onSearch();
    this.title = BibliotecaConstant.TITLE_PAGE_MATERIAS; //BibliotecaConstant.TITLE_PAGE_BOOK_CATALOG;
    this.namePage = BibliotecaConstant.VC_ADMIN.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_MATERIAS
    );
    this.subtitle = BibliotecaConstant.VC_SEARCH.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_MATERIAS
    );
  }

  modificarDatos() {
    // Aquí realizamos la lógica para modificar los datos según las necesidades
    // Mapeamos los departamentos a un objeto que se pueda usar para buscar rápidamente por id
    const mapDepartamentos = new Map(this.departamentosList.map(depto => [depto.id, depto]));

    this.lstMaterias.forEach(materia => {
      if (typeof materia.departamento === 'object') {
        // Si ya es un objeto, no hay nada que hacer
        return;
      }

      // Obtenemos el departamento correspondiente usando el id del departamento
      const dptoId = mapDepartamentos.get(materia.departamento);
      // Si encuentramos el departamento correspondiente, actualizamos la propiedad departamento en materia
      if (dptoId) {
        const dptoUpd = new Departamento();
        dptoUpd.id = dptoId.id;
        dptoUpd.nombre = dptoId.nombre;
        materia.departamento = dptoUpd;
      };
    });
  }

  public getMaterias(): void {
    this.materiaService.getMaterias().subscribe((dato) => {
      this.lstMaterias = dato;
      this.totalElements = this.lstMaterias.length;
      this.lstDataSource = new MatTableDataSource(this.lstMaterias.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize));

      // console.log("Paginator: " + this.paginator);
      this.paginator._intl.itemsPerPageLabel = BibliotecaConstant.LABEL_ITEMS_POR_PAGINA;
      this.paginator._intl.firstPageLabel = BibliotecaConstant.LABEL_FIRST_PAGE;
      this.paginator._intl.lastPageLabel = BibliotecaConstant.LABEL_LAST_PAGE;
      this.paginator._intl.nextPageLabel = BibliotecaConstant.LABEL_NEXT_PAGE;
      this.paginator._intl.previousPageLabel = BibliotecaConstant.LABEL_PREVIOUS_PAGE;

      this.isLoadingResults = false;
    })
  }

  public getDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe((dato) => {
      this.departamentosList = dato;
    })
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public onCreater(row?: Materia): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this.dialog.open(AddMateriaComponent, _dialogConfig);

    _dialogRef.afterClosed().subscribe((rpta) => {
      if (rpta.action === BibliotecaConstant.ACTION_UPDATE) {
        this.update(rpta.id, rpta.materia);
      } else if (rpta.action === BibliotecaConstant.ACTION_ADD) {
        this.save(rpta.materia);
      }
    });
  }

  public save(materia: Materia): void {
    this.materiaService.addMateria(materia).subscribe(
      (response: Materia) => {
        this.onSearch();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public update(id: number, materia: Materia): void {
    this.materiaService.updateMateria(id, materia).subscribe(
      (response: Materia) => {
        this.onSearch();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public confirmationDelete(row: Materia): void {
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
    forkJoin([
      this.search ? this.materiaService.findByNombre(this.search) : this.materiaService.getMaterias(),
      this.departamentoService.getDepartamentos()
    ]).subscribe(
      ([materias, dptos]) => {
        // Manejar los datos obtenidos
        this.lstMaterias = materias;
        this.departamentosList = dptos;

        this.modificarDatos();
        this.totalElements = this.lstMaterias.length;
        this.lstDataSource = new MatTableDataSource(this.lstMaterias.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize));

        // console.log("Paginator: " + this.paginator);
        this.paginator._intl.itemsPerPageLabel = BibliotecaConstant.LABEL_ITEMS_POR_PAGINA;
        this.paginator._intl.firstPageLabel = BibliotecaConstant.LABEL_FIRST_PAGE;
        this.paginator._intl.lastPageLabel = BibliotecaConstant.LABEL_LAST_PAGE;
        this.paginator._intl.nextPageLabel = BibliotecaConstant.LABEL_NEXT_PAGE;
        this.paginator._intl.previousPageLabel = BibliotecaConstant.LABEL_PREVIOUS_PAGE;
        this.isLoadingResults = false;
      },
      error => {
        // Manejar errores si alguno de los observables falla
        console.error('Error al obtener datos:', error);
      }
    );

    // if (this.search) {
    //   this.materiaService.findByNombre(this.search).subscribe((dato) => {
    //     this.lstMaterias = dato;
    //     this.totalElements = this.lstMaterias.length;
    //     this.lstDataSource = new MatTableDataSource(this.lstMaterias.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize));
    //     this.getDepartamentos();
    //     this.lstMaterias.forEach(element => {
    //       const dpto = this.departamentoService.findDepartamentoById(element.departamento.id);
    //       // element.departamento.setDepartamento(dpto);
    //     });
    //     this.isLoadingResults = false;
    //   })
    // } else {
    //   this.getMaterias();
    // }
  }

  onEraser() {
    this.onClearTotalElement();
    this.onClearSearh();
    this.onclearLstMateria();
    this.onSearch();
  }

  public onClearTotalElement(): void {
    this.totalElements = 0;
  }

  public onClearSearh(): void {
    this.search = '';
  }
  public onclearLstMateria(): void {
    this.lstMaterias = [];
  }

  public onDelete(id: any): void {
    this.materiaService.deleteMateria(id).subscribe((data: any) => {
      this.paginator.pageIndex = 0;
      this.onSearch();
      this.alertService.notification(
        BibliotecaConstant.TITLE_MODAL_DELETE,
        BibliotecaConstant.VC_SUCCESS
      );
    });
  }

  public onclearLstEditorial(): void {
    this.lstMaterias = [];
  }

  public handlePage(e?: any) {
    this.iterator();
  }

  private iterator() {
    this.onSearch();
  }
}
