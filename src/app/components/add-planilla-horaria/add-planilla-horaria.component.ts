import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { Materia } from 'src/app/model/Materia';
import { PlanillaHoraria } from 'src/app/model/PlanillaHoraria';
import { MateriaService } from 'src/app/service/materia.service';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { SearchMateriaComponent } from '../search-materia/search-materia.component';
import { Curso } from 'src/app/model/Curso';
import { Personal } from 'src/app/model/Personal';
import { CursoService } from 'src/app/service/curso.service';
import { PersonalService } from 'src/app/service/personal.service';

@Component({
  selector: 'app-add-planilla-horaria',
  templateUrl: './add-planilla-horaria.component.html',
  styleUrls: ['./add-planilla-horaria.component.scss']
})
export class AddPlanillaHorariaComponent {
  private dialog = inject(MatDialog);
  private action!: string;
  public frmPlanillaHoraria!: FormGroup;
  // public frmHorarios: FormControl = new FormControl('');
  public frmCursos: FormControl = new FormControl('');
  public frmMaterias: FormControl = new FormControl('');
  public frmPersonals: FormControl = new FormControl('');

  public editPlanillaHoraria: Boolean = false;

  public filteredOptionsCursos!: Observable<Curso[]>;
  public filteredOptionsMaterias!: Observable<Materia[]>;
  public filteredOptionsPersonals!: Observable<Personal[]>;
  // public horariosList!: Horario[];
  public cursosList!: Curso[];
  public materiasList!: Materia[];
  public personalsList!: Personal[];

  constructor(private diagoloRef: MatDialogRef<AddPlanillaHorariaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlanillaHoraria,
    private formBuilder: FormBuilder,
    private cursoService: CursoService,
    private materiaService: MateriaService,
    private personalService: PersonalService,
  ) {

  }

  ngOnInit(): void {
    if (this.data) {
      // this.frmHorarios = new FormControl(this.data ? this.data.horario : '');
      this.frmCursos = new FormControl(this.data ? this.data.curso.nombre : '');
      this.frmMaterias = new FormControl(this.data ? this.data.materia.nombre : '');
      this.frmPersonals = new FormControl(this.data ? this.data.personal.nombre : '');
      this.frmPlanillaHoraria = this.formBuilder.group({
        id: [this.data?.id],
        // horarios: [this.data?.horario, Validators.required],
        dia: [this.data?.dia, Validators.required],
        hora_inicio: [this.data?.hora_inicio, Validators.required],
        hora_fin: [this.data?.hora_fin, Validators.required],
        curso: [this.data?.curso, Validators.required],
        materia: [this.data?.materia, Validators.required],
        personal: [this.data?.personal, Validators.required],
        // nombreHorario: this.frmHorarios,
        nombreCurso: this.frmCursos,
        nombreMateria: this.frmMaterias,
        nombrePersonal: this.frmPersonals,
      });
      console.log("Espera... ");
    } else {
      this.editPlanillaHoraria = false;
      this.frmPlanillaHoraria = this.formBuilder.group({
        // horarios: ['', Validators.required],
        dia: ['', Validators.required],
        hora_inicio: ['', Validators.required],
        hora_fin: ['', Validators.required],
        curso: ['', Validators.required],
        materia: ['', Validators.required],
        personal: ['', Validators.required],
        // nombreHorario: this.frmHorarios,
        nombreCurso: this.frmCursos,
        nombreMateria: this.frmMaterias,
        nombrePersonal: this.frmPersonals,
      })
    }

    this.getCursos();
    this.getMaterias();
    this.getPersonal();
  }

  // filterHorarios(name: string) {
  //   const filter = this.horariosList.filter(state => {
  //     return state.hora_inicio.toLowerCase().indexOf(name.toLowerCase()) >= 0
  //   });
  //   return filter;
  // }
  
  filterCursos(name: string) {
    const filter = this.cursosList.filter(state => {
      return state.nombre.toLowerCase().indexOf(name.toLowerCase()) >= 0
    });
    return filter;
  }

  filterMaterias(name: string) {
    const filter = this.materiasList.filter(state => {
      return state.nombre.toLowerCase().indexOf(name.toLowerCase()) >= 0
    });
    return filter;
  }

  filterPersonal(name: string) {
    const filter = this.personalsList.filter(state => {
      return state.nombre.toLowerCase().indexOf(name.toLowerCase()) >= 0
    });
    return filter;
  }

  public getCursos(): void {
    this.cursoService.getCursos().subscribe((dato) => {
      this.cursosList = dato;
      this.filteredOptionsCursos = this.frmCursos.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this.filterCursos(state) : this.cursosList)
        );
    })
  }

  public getMaterias(): void {
    this.materiaService.getMaterias().subscribe((dato) => {
      this.materiasList = dato;
      this.filteredOptionsMaterias = this.frmMaterias.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this.filterMaterias(state) : this.materiasList)
        );
    })
  }

  public getPersonal(): void {
    this.personalService.getPersonals().subscribe((dato) => {
      this.personalsList = dato;
      this.filteredOptionsPersonals = this.frmPersonals.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this.filterPersonal(state) : this.personalsList)
        );
    })
  }

  public onClose(): void {
    this.diagoloRef.close(false);
  }

  ngAfterViewInit(): void {
  }

  public onSend(): void {
    this.diagoloRef.close();
  }

  public onSubmit(): void {
    this.action = this.frmPlanillaHoraria.value.id
      ? BibliotecaConstant.ACTION_UPDATE
      : BibliotecaConstant.ACTION_ADD;
    this.diagoloRef.close({
      id: this.frmPlanillaHoraria.value.id,
      planillaHoraria: this.frmPlanillaHoraria.value,
      action: this.action,
    });
  }

  public onDisabled(): boolean {
    return this.frmPlanillaHoraria.invalid;
  }

  // onHorarioSelected($event: MatAutocompleteSelectedEvent) {
  //   // Mapeamos los materias a un objeto que se pueda usar para buscar rápidamente por id
  //   const mapMateriasByNombre = new Map(this.materiasList.map(el => [el.nombre, el]));

  //   // Obtenemos el materia correspondiente
  //   const dptoId = mapMateriasByNombre.get($event.option.value);
  //   if (dptoId) {
  //     const materiaUpd = new Materia();
  //     materiaUpd.id = dptoId.id;
  //     materiaUpd.nombre = dptoId.nombre;
  //     this.frmPlanillaHoraria.controls['materias'].setValue(materiaUpd);
  //   };
  // };

  onCursoSelected($event: MatAutocompleteSelectedEvent) {
    // Mapeamos los cursos a un objeto que se pueda usar para buscar rápidamente por id
    const mapCursosByNombre = new Map(this.cursosList.map(el => [el.nombre, el]));

    // Obtenemos el curso correspondiente
    const dptoId = mapCursosByNombre.get($event.option.value);
    if (dptoId) {
      const cursoUpd = new Curso();
      cursoUpd.id = dptoId.id;
      cursoUpd.nombre = dptoId.nombre;
      this.frmPlanillaHoraria.controls['curso'].setValue(cursoUpd);
    };
  };

  onMateriaSelected($event: MatAutocompleteSelectedEvent) {
    // Mapeamos las materias a un objeto que se pueda usar para buscar rápidamente por id
    const mapMateriasByNombre = new Map(this.materiasList.map(el => [el.nombre, el]));

    // Obtenemos la materia correspondiente
    const dptoId = mapMateriasByNombre.get($event.option.value);
    if (dptoId) {
      const materiaUpd = new Materia();
      materiaUpd.id = dptoId.id;
      materiaUpd.nombre = dptoId.nombre;
      this.frmPlanillaHoraria.controls['materia'].setValue(materiaUpd);
    };
  };

  onPersonalSelected($event: MatAutocompleteSelectedEvent) {
    // Mapeamos el personal a un objeto que se pueda usar para buscar rápidamente por id
    const mapPersonalsByNombre = new Map(this.personalsList.map(el => [el.nombre, el]));

    // Obtenemos el personal correspondiente
    const personalId = mapPersonalsByNombre.get($event.option.value);
    if (personalId) {
      const personalUpd = new Personal();
      personalUpd.id = personalId.id;
      personalUpd.nombre = personalId.nombre;
      personalUpd.apellido = personalId.apellido;
      personalUpd.cargo = personalId.cargo;
      this.frmPlanillaHoraria.controls['personal'].setValue(personalUpd);
    };
  };

  public onSearchComponent(row?: any[]): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this.dialog.open(
      SearchMateriaComponent,
      _dialogConfig
    );

    _dialogRef.afterClosed().subscribe((rpta) => {
      if (rpta) {
        this.onSetMateria(rpta.materia);
      }
    });
  }

  public onSetMateria(materia: Materia): void {
    this.frmPlanillaHoraria.controls['materias'].setValue(materia);
    this.frmPlanillaHoraria.controls['nombreMateria'].setValue(materia.nombre);
  }
}
