import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { Curso } from 'src/app/model/Curso';
import { Materia } from 'src/app/model/Materia';
import { Personal } from 'src/app/model/Personal';
import { Registro } from 'src/app/model/Registro';
import { CursoService } from 'src/app/service/curso.service';
import { MateriaService } from 'src/app/service/materia.service';
import { PersonalService } from 'src/app/service/personal.service';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { SearchCursoComponent } from '../search-curso/search-curso.component';
import { SearchMateriaComponent } from '../search-materia/search-materia.component';
import { SearchPersonalComponent } from '../search-personal/search-personal.component';

@Component({
  selector: 'app-add-registro',
  templateUrl: './add-registro.component.html',
  styleUrls: ['./add-registro.component.scss']
})
export class AddRegistroComponent {
  private dialog = inject(MatDialog);
  private action!: string;
  public frmRegistro!: FormGroup;
  public frmCursos: FormControl = new FormControl('');
  public frmMaterias: FormControl = new FormControl('');
  public frmPersonals: FormControl = new FormControl('');

  public editRegistro: Boolean = false;

  public filteredCursosOptions!: Observable<Curso[]>;
  public filteredMateriasOptions!: Observable<Materia[]>;
  public filteredPersonalsOptions!: Observable<Personal[]>;
  public cursosList!: Curso[];
  public materiasList!: Materia[];
  public personalsList!: Personal[];

  constructor(private diagoloRef: MatDialogRef<AddRegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Registro,
    private formBuilder: FormBuilder,
    private cursoService: CursoService,
    private materiaService: MateriaService,
    private personalService: PersonalService
  ) {

  }

  ngOnInit(): void {
    if (this.data) {
      this.frmCursos = new FormControl(this.data ? this.data.curso.nombre : '');
      this.frmRegistro = this.formBuilder.group({
        id: [this.data?.id],
        fecha: [this.data?.fecha, Validators.required],
        hora_inicio: [this.data?.hora_inicio, Validators.required],
        hora_fin: [this.data?.hora_fin, Validators.required],
        detalle: [this.data?.detalle, Validators.required],
        curso: [this.data?.curso, Validators.required],
        materia: [this.data?.materia, Validators.required],
        personal: [this.data?.personal, Validators.required],
        nombreCurso: this.frmCursos,
        nombreMateria: this.frmMaterias,
        nombrePersonal: this.frmPersonals,
      });
      console.log("Espera... ");
    } else {
      this.editRegistro = false;
      this.frmRegistro = this.formBuilder.group({
        fecha: ['', Validators.required],
        hora_inicio: ['', Validators.required],
        hora_fin: ['', Validators.required],
        detalle: ['', Validators.required],
        curso: ['', Validators.required],
        materia: ['', Validators.required],
        personal: ['', Validators.required],
        nombreCurso: this.frmCursos,
        nombreMateria: this.frmMaterias,
        nombrePersonal: this.frmPersonals,
      })
    }

    this.getCursos();
    this.getMaterias();
    this.getPersonal();
  }

  filterCursos(name: string) {
    const dptosFilter = this.cursosList.filter(state => {
      return state.nombre.toLowerCase().indexOf(name.toLowerCase()) >= 0
    });
    return dptosFilter;
  }

  filterMaterias(name: string) {
    const matFilter = this.materiasList.filter(state => {
      return state.nombre.toLowerCase().indexOf(name.toLowerCase()) >= 0
    });
    return matFilter;
  }

  filterPersonals(name: string) {
    const personalsFilter = this.personalsList.filter(state => {
      return state.nombre.toLowerCase().indexOf(name.toLowerCase()) >= 0
    });
    return personalsFilter;
  }

  public getCursos(): void {
    this.cursoService.getCursos().subscribe((dato) => {
      this.cursosList = dato;
      this.filteredCursosOptions = this.frmCursos.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this.filterCursos(state) : this.cursosList)
        );
    })
  }

  public getMaterias(): void {
    this.materiaService.getMaterias().subscribe((dato) => {
      this.materiasList = dato;
      this.filteredMateriasOptions = this.frmMaterias.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this.filterMaterias(state) : this.materiasList)
        );
    })
  }

  public getPersonal(): void {
    this.personalService.getPersonals().subscribe((dato) => {
      this.personalsList = dato;
      this.filteredPersonalsOptions = this.frmPersonals.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this.filterPersonals(state) : this.personalsList)
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
    this.action = this.frmRegistro.value.id
      ? BibliotecaConstant.ACTION_UPDATE
      : BibliotecaConstant.ACTION_ADD;
    this.diagoloRef.close({
      id: this.frmRegistro.value.id,
      registro: this.frmRegistro.value,
      action: this.action,
    });
  }

  public onDisabled(): boolean {
    return this.frmRegistro.invalid;
  }

  onCursoSelected($event: MatAutocompleteSelectedEvent) {
    // Mapeamos los cursos a un objeto que se pueda usar para buscar rápidamente por id
    const mapCursosByNombre = new Map(this.cursosList.map(depto => [depto.nombre, depto]));

    // Obtenemos el curso correspondiente
    const dptoId = mapCursosByNombre.get($event.option.value);
    if (dptoId) {
      const dptoUpd = new Curso();
      dptoUpd.id = dptoId.id;
      dptoUpd.nombre = dptoId.nombre;
      this.frmRegistro.controls['curso'].setValue(dptoUpd);
    };
  };

  onMateriaSelected($event: MatAutocompleteSelectedEvent) {
    // Mapeamos ls materias a un objeto que se pueda usar para buscar rápidamente por id
    const mapMateriasByNombre = new Map(this.materiasList.map(el => [el.nombre, el]));

    // Obtenemos la materia correspondiente
    const matId = mapMateriasByNombre.get($event.option.value);
    if (matId) {
      const matUpd = new Materia();
      matUpd.id = matId.id;
      matUpd.nombre = matId.nombre;
      matUpd.departamento = matId.departamento
      this.frmRegistro.controls['materia'].setValue(matUpd);
    };
  };
  
  onPersonalSelected($event: MatAutocompleteSelectedEvent) {
    // Mapeamos los personals a un objeto que se pueda usar para buscar rápidamente por id
    const mapPersonalsByNombre = new Map(this.personalsList.map(el => [el.nombre, el]));

    // Obtenemos la materia correspondiente
    const persId = mapPersonalsByNombre.get($event.option.value);
    if (persId) {
      const persUpd = new Materia();
      persUpd.id = persId.id;
      persUpd.nombre = persId.nombre;
      this.frmRegistro.controls['personal'].setValue(persUpd);
    };
  };

  public onSearchCursoComponent(row?: any[]): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this.dialog.open(
      SearchCursoComponent,
      _dialogConfig
    );
  }

  public onSearchMateriaComponent(row?: any[]): void {
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
        this.onSetMateria(rpta.curso);
      }
    });
  }

  public onSearchPersonalComponent(row?: any[]): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this.dialog.open(
      SearchPersonalComponent,
      _dialogConfig
    );
  }

  public onSetCurso(curso: Curso): void {
    this.frmRegistro.controls['curso'].setValue(curso);
    this.frmRegistro.controls['nombreCurso'].setValue(curso.nombre);
  }

  public onSetMateria(materia: Materia): void {
    this.frmRegistro.controls['materia'].setValue(materia);
    this.frmRegistro.controls['nombreMateria'].setValue(materia.nombre);
  }

  public onSetPersonal(personal: Personal): void {
    this.frmRegistro.controls['personal'].setValue(personal);
    this.frmRegistro.controls['nombrePersonal'].setValue(personal.nombre);
  }
}
