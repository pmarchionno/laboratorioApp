import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Materia } from 'src/app/model/Materia';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';
import { Departamento } from 'src/app/model/Departamento';
import { SearchDepartamentoComponent } from '../search-departamento/search-departamento.component';
import { Observable, map, of, startWith } from 'rxjs';
import { DepartamentoService } from 'src/app/service/departamento.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-materia',
  templateUrl: './add-materia.component.html',
  styleUrls: ['./add-materia.component.scss']
})
export class AddMateriaComponent {
  private dialog = inject(MatDialog);
  private action!: string;
  public frmMateria!: FormGroup;
  public frmDepartamentos: FormControl = new FormControl('');

  public editMateria: Boolean = false;

  public filteredOptions!: Observable<Departamento[]>;
  public departamentosList!: Departamento[];

  constructor(private diagoloRef: MatDialogRef<AddMateriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Materia,
    private formBuilder: FormBuilder,
    private departamentoService: DepartamentoService
  ) {

  }

  ngOnInit(): void {
    if (this.data) {
      this.frmDepartamentos = new FormControl(this.data ? this.data.departamento.nombre : '');
      this.frmMateria = this.formBuilder.group({
        id: [this.data?.id],
        nombre: [this.data?.nombre, Validators.required],
        departamento: [this.data?.departamento, Validators.required],
        nombreDepartamento: this.frmDepartamentos,
        // planillaHoraria: [''],
      });
      console.log("Espera... ");
    } else {
      this.editMateria = false;
      this.frmMateria = this.formBuilder.group({
        nombre: ['', Validators.required],
        departamento: ['', Validators.required],
        nombreDepartamento: this.frmDepartamentos,
      })
    }

    this.getDepartamentos();
  }

  filterDepartamentos(name: string) {
    const dptosFilter = this.departamentosList.filter(state => {
      return state.nombre.toLowerCase().indexOf(name.toLowerCase()) >= 0
    });
    return dptosFilter;
  }

  public getDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe((dato) => {
      this.departamentosList = dato;
      this.filteredOptions = this.frmDepartamentos.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this.filterDepartamentos(state) : this.departamentosList)
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
    this.action = this.frmMateria.value.id
      ? BibliotecaConstant.ACTION_UPDATE
      : BibliotecaConstant.ACTION_ADD;
    this.diagoloRef.close({
      id: this.frmMateria.value.id,
      materia: this.frmMateria.value,
      action: this.action,
    });
  }

  public onDisabled(): boolean {
    return this.frmMateria.invalid;
  }

  onDepartamentoSelected($event: MatAutocompleteSelectedEvent) {
    // Mapeamos los departamentos a un objeto que se pueda usar para buscar rápidamente por id
    const mapDepartamentosByNombre = new Map(this.departamentosList.map(depto => [depto.nombre, depto]));

    // Obtenemos el departamento correspondiente
    const dptoId = mapDepartamentosByNombre.get($event.option.value);
    if (dptoId) {
      const dptoUpd = new Departamento();
      dptoUpd.id = dptoId.id;
      dptoUpd.nombre = dptoId.nombre;
      this.frmMateria.controls['departamento'].setValue(dptoUpd);
    };
  };

  public onSearchComponent(row?: any[]): void {
    const _dialogConfig = new MatDialogConfig();
    _dialogConfig.disableClose = true;
    _dialogConfig.autoFocus = true;
    _dialogConfig.width = '50%';
    _dialogConfig.data = row;
    const _dialogRef = this.dialog.open(
      SearchDepartamentoComponent,
      _dialogConfig
    );

    _dialogRef.afterClosed().subscribe((rpta) => {
      if (rpta) {
        this.onSetDepartamento(rpta.departamento);
      }
    });
  }

  public onSetDepartamento(departamento: Departamento): void {
    this.frmMateria.controls['departamento'].setValue(departamento);
    this.frmMateria.controls['nombreDepartamento'].setValue(departamento.nombre);
  }
}
