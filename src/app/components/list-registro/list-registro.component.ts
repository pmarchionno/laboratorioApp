import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, forkJoin } from 'rxjs';
import { Departamento } from 'src/app/model/Departamento';
import { Registro } from 'src/app/model/Registro';
import { AlertService } from 'src/app/service/AlertService';
import { RegistroService } from 'src/app/service/registro.service';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { AddRegistroComponent } from '../add-registro/add-registro.component';
import { Curso } from 'src/app/model/Curso';
import { Materia } from 'src/app/model/Materia';
import { Personal } from 'src/app/model/Personal';
import { CursoService } from 'src/app/service/curso.service';
import { MateriaService } from 'src/app/service/materia.service';
import { PersonalService } from 'src/app/service/personal.service';

@Component({
  selector: 'app-list-registro',
  templateUrl: './list-registro.component.html',
  styleUrls: ['./list-registro.component.scss']
})
export class ListRegistroComponent implements OnInit, AfterViewInit {
  public lstRegistros: Registro[] = [];
  public cursosList: Curso[] = [];
  public materiasList: Materia[] = [];
  public personalslist: Personal[] = [];
  public search!: string;

  public title!: string;
  public subtitle!: string;
  public namePage!: string;

  public lstDataSource!: MatTableDataSource<any>
  public totalElements?: number;
  public lstColumsTable: string[] = ['fecha', 'hora_inicio', 'hora_fin', 'detalle', 'curso', 'materia', 'personal', 'seleccionar'];

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
    private registroService: RegistroService,
    private alertService: AlertService,
    private cursoService: CursoService,
    private materiaService: MateriaService,
    private personalService: PersonalService) {
  }

  ngOnInit(): void {
    this.onSearch();
    this.title = BibliotecaConstant.TITLE_PAGE_REGISTROS; //BibliotecaConstant.TITLE_PAGE_BOOK_CATALOG;
    this.namePage = BibliotecaConstant.VC_ADMIN.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_REGISTROS
    );
    this.subtitle = BibliotecaConstant.VC_SEARCH.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_REGISTROS
    );
  }

  modificarDatos() {
    // Aquí realizamos la lógica para modificar los datos según las necesidades
    // Mapeamos los departamentos a un objeto que se pueda usar para buscar rápidamente por id
    const mapCursos = new Map(this.cursosList.map(el => [el.id, el]));
    const mapMaterias = new Map(this.materiasList.map(el => [el.id, el]));
    const mapPersonals = new Map(this.personalslist.map(el => [el.id, el]));

    this.lstRegistros.forEach(registro => {
      if (typeof registro.curso === 'object') {
        // Si ya es un objeto, no hay nada que hacer
      }
      else {  // Obtenemos el departamento correspondiente usando el id del departamento
        const cursoId = mapCursos.get(registro.curso);
        // Si encuentramos el departamento correspondiente, actualizamos la propiedad departamento en registro
        if (cursoId) {
          const cursoUpd = new Curso();
          cursoUpd.id = cursoId.id;
          cursoUpd.nombre = cursoId.nombre;
          registro.curso = cursoUpd;
        };
      }

      if (typeof registro.materia === 'object') {
        // Si ya es un objeto, no hay nada que hacer
      }
      else {  // Obtenemos el departamento correspondiente usando el id del departamento
        const materiaId = mapMaterias.get(registro.materia);
        // Si encuentramos el departamento correspondiente, actualizamos la propiedad departamento en registro
        if (materiaId) {
          const materiaUpd = new Materia();
          materiaUpd.id = materiaId.id;
          materiaUpd.nombre = materiaId.nombre;
          materiaUpd.departamento = materiaId.departamento;
          registro.materia = materiaUpd;
        };
      }

      if (typeof registro.personal === 'object') {
        // Si ya es un objeto, no hay nada que hacer
      }
      else {  // Obtenemos el departamento correspondiente usando el id del departamento
        const personalId = mapPersonals.get(registro.personal);
        // Si encuentramos el departamento correspondiente, actualizamos la propiedad departamento en registro
        if (personalId) {
          const personalUpd = new Personal();
          personalUpd.id = personalId.id;
          personalUpd.nombre = personalId.nombre;
          registro.personal = personalUpd;
        };
      }
    });
  }

  public getRegistros(): void {
    this.registroService.getRegistros().subscribe((dato) => {
      this.lstRegistros = dato;
      this.totalElements = this.lstRegistros.length;
      this.lstDataSource = new MatTableDataSource(this.lstRegistros.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize));

      // console.log("Paginator: " + this.paginator);
      this.paginator._intl.itemsPerPageLabel = BibliotecaConstant.LABEL_ITEMS_POR_PAGINA;
      this.paginator._intl.firstPageLabel = BibliotecaConstant.LABEL_FIRST_PAGE;
      this.paginator._intl.lastPageLabel = BibliotecaConstant.LABEL_LAST_PAGE;
      this.paginator._intl.nextPageLabel = BibliotecaConstant.LABEL_NEXT_PAGE;
      this.paginator._intl.previousPageLabel = BibliotecaConstant.LABEL_PREVIOUS_PAGE;

      this.isLoadingResults = false;
    })
  }

  public getCursos(): void {
    this.cursoService.getCursos().subscribe((dato) => {
      this.cursosList = dato;
    })
  }

  public getMaterias(): void {
    this.materiaService.getMaterias().subscribe((dato) => {
      this.materiasList = dato;
    })
  }

  public getPersonals(): void {
    this.personalService.getPersonals().subscribe((dato) => {
      this.personalslist = dato;
    })
  }
  
  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public onCreater(row?: Registro): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this.dialog.open(AddRegistroComponent, _dialogConfig);

    _dialogRef.afterClosed().subscribe((rpta) => {
      if (rpta.action === BibliotecaConstant.ACTION_UPDATE) {
        this.update(rpta.id, rpta.registro);
      } else if (rpta.action === BibliotecaConstant.ACTION_ADD) {
        this.save(rpta.registro);
      }
    });
  }

  public save(registro: Registro): void {
    this.registroService.addRegistro(registro).subscribe(
      (response: Registro) => {
        this.onSearch();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public update(id: number, registro: Registro): void {
    this.registroService.updateRegistro(id, registro).subscribe(
      (response: Registro) => {
        this.onSearch();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public confirmationDelete(row: Registro): void {
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
      // this.search ? this.registroService.findRegistroById(this.search) : this.registroService.getRegistros(),
      this.registroService.getRegistros(),
      this.cursoService.getCursos(),
      this.materiaService.getMaterias(),
      this.personalService.getPersonals()
    ]).subscribe(
      ([registros, cursos, materias, personals]) => {
        // Manejar los datos obtenidos
        this.lstRegistros = registros;
        this.cursosList = cursos;
        this.materiasList = materias;
        this.personalslist = personals;

        this.modificarDatos();
        this.totalElements = this.lstRegistros.length;
        this.lstDataSource = new MatTableDataSource(this.lstRegistros.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize));

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
  }

  onEraser() {
    this.onClearTotalElement();
    this.onClearSearh();
    this.onclearLstRegistro();
    this.onSearch();
  }

  public onClearTotalElement(): void {
    this.totalElements = 0;
  }

  public onClearSearh(): void {
    this.search = '';
  }
  public onclearLstRegistro(): void {
    this.lstRegistros = [];
  }

  public onDelete(id: any): void {
    this.registroService.deleteRegistro(id).subscribe((data: any) => {
      this.paginator.pageIndex = 0;
      this.onSearch();
      this.alertService.notification(
        BibliotecaConstant.TITLE_MODAL_DELETE,
        BibliotecaConstant.VC_SUCCESS
      );
    });
  }

  public onclearLstEditorial(): void {
    this.lstRegistros = [];
  }

  public handlePage(e?: any) {
    this.iterator();
  }

  private iterator() {
    this.onSearch();
  }
}

