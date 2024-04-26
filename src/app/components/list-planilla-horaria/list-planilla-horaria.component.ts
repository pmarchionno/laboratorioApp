import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, forkJoin } from 'rxjs';
import { PlanillaHoraria } from 'src/app/model/PlanillaHoraria';
import { AlertService } from 'src/app/service/AlertService';
import { PlanillaHorariaService } from 'src/app/service/planilla-horaria.service';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { AddPlanillaHorariaComponent } from '../add-planilla-horaria/add-planilla-horaria.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Curso } from 'src/app/model/Curso';
import { Materia } from 'src/app/model/Materia';
import { Personal } from 'src/app/model/Personal';
import { MateriaService } from 'src/app/service/materia.service';
import { PersonalService } from 'src/app/service/personal.service';
import { CursoService } from 'src/app/service/curso.service';

@Component({
  selector: 'app-list-planilla-horaria',
  templateUrl: './list-planilla-horaria.component.html',
  styleUrls: ['./list-planilla-horaria.component.scss']
})
export class ListPlanillaHorariaComponent implements OnInit {
  public lstPlanillaHorarias: PlanillaHoraria[] = [];
  public cursosList: Curso[] = [];
  public materiasList: Materia[] = [];
  public personalsList: Personal[] = [];
  public search!: string;

  public title!: string;
  public subtitle!: string;
  public namePage!: string;

  public lstDataSource!: MatTableDataSource<any>
  public totalElements?: number;
  public lstColumsTable: string[] = ['hora_inicio', 'hora_fin', 'curso', 'materia', 'personal', 'seleccionar'];

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
    private planillaHorariaService: PlanillaHorariaService,
    private alertService: AlertService,
    private cursoService: CursoService,
    private materiaService: MateriaService,
    private personalService: PersonalService) {
  }

  ngOnInit(): void {
    this.onSearch();
    this.title = BibliotecaConstant.TITLE_PAGE_PLANILLA_HORARIA;
    this.namePage = BibliotecaConstant.VC_ADMIN.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_PLANILLA_HORARIA
    );
    this.subtitle = BibliotecaConstant.VC_SEARCH.concat(
      ' ',
      BibliotecaConstant.TITLE_PAGE_PLANILLA_HORARIA
    );
  }

  public getPlanillaHorarias(): void {
    this.planillaHorariaService.getPlanillaHorarias().subscribe((dato) => {
      this.lstPlanillaHorarias = dato;
      this.totalElements = this.lstPlanillaHorarias.length;
      this.lstDataSource = new MatTableDataSource(this.lstPlanillaHorarias.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize));

      this.paginator._intl.itemsPerPageLabel = BibliotecaConstant.LABEL_ITEMS_POR_PAGINA;
      this.paginator._intl.firstPageLabel = BibliotecaConstant.LABEL_FIRST_PAGE;
      this.paginator._intl.lastPageLabel = BibliotecaConstant.LABEL_LAST_PAGE;
      this.paginator._intl.nextPageLabel = BibliotecaConstant.LABEL_NEXT_PAGE;
      this.paginator._intl.previousPageLabel = BibliotecaConstant.LABEL_PREVIOUS_PAGE;

      this.isLoadingResults = false;
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public onCreater(row?: PlanillaHoraria): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this.dialog.open(AddPlanillaHorariaComponent, _dialogConfig);

    _dialogRef.afterClosed().subscribe((rpta) => {
      if (rpta.action === BibliotecaConstant.ACTION_UPDATE) {
        this.update(rpta.id, rpta.planillaHoraria);
      } else if (rpta.action === BibliotecaConstant.ACTION_ADD) {
        this.save(rpta.planillaHoraria);
      }
    });
  }

  public save(planillaHoraria: PlanillaHoraria): void {
    this.planillaHorariaService.addPlanillaHoraria(planillaHoraria).subscribe(
      (response: PlanillaHoraria) => {
        this.onSearch();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public update(id: number, planillaHoraria: PlanillaHoraria): void {
    this.planillaHorariaService.updatePlanillaHoraria(id, planillaHoraria).subscribe(
      (response: PlanillaHoraria) => {
        this.onSearch();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public confirmationDelete(row: PlanillaHoraria): void {
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
      this.search ? this.planillaHorariaService.findByNombre(this.search) : this.planillaHorariaService.getPlanillaHorarias(),
      this.cursoService.getCursos(),
      this.materiaService.getMaterias(),
      this.personalService.getPersonals()
    ]).subscribe(
      ([planillas, cursos, materias, personals]) => {
        // Manejar los datos obtenidos
        this.lstPlanillaHorarias = planillas;
        this.cursosList = cursos;
        this.materiasList = materias;
        this.personalsList = personals;

        this.modificarDatos();
        this.totalElements = this.lstPlanillaHorarias.length;
        this.lstDataSource = new MatTableDataSource(this.lstPlanillaHorarias.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize));

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
    //   this.planillaHorariaService.findByNombre(this.search).subscribe((dato) => {
    //     this.lstPlanillaHorarias = dato;
    //     this.totalElements = this.lstPlanillaHorarias.length;
    //     this.lstDataSource = new MatTableDataSource(this.lstPlanillaHorarias.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize));
    //     this.isLoadingResults = false;
    //   })
    // } else {
    //   this.getPlanillaHorarias();
    // }
  }

  modificarDatos() {
    // Aquí realizamos la lógica para modificar los datos según las necesidades
    // Mapeamos los cursos, materias y personals a un objeto que se pueda usar para buscar rápidamente por id
    const mapCursos = new Map(this.cursosList.map(el => [el.id, el]));
    const mapMaterias = new Map(this.materiasList.map(el => [el.id, el]));
    const mapPersonals = new Map(this.personalsList.map(el => [el.id, el]));

    this.lstPlanillaHorarias.forEach(el => {
      if (typeof el.curso === 'object') {
        // Si ya es un objeto, no hay nada que hacer
        //return;
      } else {
        // Obtenemos el departamento correspondiente usando el id del departamento
        const cursoId = mapCursos.get(el.curso);
        // Si encuentramos el curso correspondiente, actualizamos la propiedad en la planilla
        if (cursoId) {
          const cursoUpd = new Curso();
          cursoUpd.id = cursoId.id;
          cursoUpd.nombre = cursoId.nombre;
          el.curso = cursoUpd;
        };
      }

      //Hacemos lo mismo con la materia
      if (typeof el.materia === 'object') {
        //return;
      } else {
        const materiaId = mapMaterias.get(el.materia);
        if (materiaId) {
          const materiaUpd = new Materia();
          materiaUpd.id = materiaId.id;
          materiaUpd.nombre = materiaId.nombre;
          el.materia = materiaUpd;
        };
      }

      //idem para el campo personal
      if (typeof el.personal === 'object') {
        //return;
      } else {
        const personalId = mapPersonals.get(el.personal);
        if (personalId) {
          const materiaUpd = new Personal();
          materiaUpd.id = personalId.id;
          materiaUpd.nombre = personalId.nombre;
          materiaUpd.apellido = personalId.apellido;
          materiaUpd.cargo = personalId.cargo;
          el.personal = materiaUpd;
        };
      }
    });
  }

  onEraser() {
    this.onClearTotalElement();
    this.onClearSearh();
    this.onclearLstPlanillaHoraria();
    this.onSearch();
  }

  public onClearTotalElement(): void {
    this.totalElements = 0;
  }

  public onClearSearh(): void {
    this.search = '';
  }
  public onclearLstPlanillaHoraria(): void {
    this.lstPlanillaHorarias = [];
  }

  public onDelete(id: any): void {
    this.planillaHorariaService.deletePlanillaHoraria(id).subscribe((data: any) => {
      this.paginator.pageIndex = 0;
      this.onSearch();
      this.alertService.notification(
        BibliotecaConstant.TITLE_MODAL_DELETE,
        BibliotecaConstant.VC_SUCCESS
      );
    });
  }

  public onclearLstEditorial(): void {
    this.lstPlanillaHorarias = [];
  }

  public handlePage(e?: any) {
    this.iterator();
  }

  private iterator() {
    this.onSearch();
  }
}
