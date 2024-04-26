import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { ECargo } from 'src/app/model/ECargo';
import { Personal } from 'src/app/model/Personal';
import { CargoService } from 'src/app/service/cargo.service';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';

@Component({
  selector: 'app-add-personal',
  templateUrl: './add-personal.component.html',
  styleUrls: ['./add-personal.component.scss']
})
export class AddPersonalComponent {
  private action!: string;
  public frmPersonal!: FormGroup;
  public editPersonal: Boolean = false;
  public frmCargos: FormControl = new FormControl('');

  public filteredOptions!: Observable<String[]>;
  public cargosList!: String[];

  constructor(private diagoloRef: MatDialogRef<AddPersonalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Personal,
    private formBuilder: FormBuilder,
    private cargoService: CargoService,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.frmCargos = new FormControl(this.data ? this.data.cargo : '');
      this.frmPersonal = this.formBuilder.group({
        id: [this.data?.id],
        nombre: [this.data?.nombre, Validators.required],
        apellido: [this.data?.apellido, Validators.required],
        cargo: [this.data?.cargo, Validators.required],
        nombreCargo: this.frmCargos,
      })
    } else {
      this.editPersonal = false;
      this.frmPersonal = this.formBuilder.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        cargo: ['', Validators.required],
        nombreCargo: this.frmCargos,
      })
    }

    this.getCargos();
  }

  public onClose(): void {
    this.diagoloRef.close(false);
  }

  ngAfterViewInit(): void {
    if (this.data) {
      this.onEdit(this.data);
      this.editPersonal = true;
    } else {
      this.editPersonal = false;
    }
  }

  public onSend(): void {
    this.diagoloRef.close();
  }

  public onSubmit(): void {
    this.action = this.frmPersonal.value.id
      ? BibliotecaConstant.ACTION_UPDATE
      : BibliotecaConstant.ACTION_ADD;
    this.diagoloRef.close({
      id: this.frmPersonal.value.id,
      personal: this.frmPersonal.value,
      action: this.action,
    });
  }

  public onEdit(row: Personal): void {
    this.frmPersonal.setValue({
      id: row.id,
      nombre: row.nombre
    })
  }

  public onDisabled(): boolean {
    return this.frmPersonal.invalid;
  }

  public getCargos(): void {
    this.cargoService.getCargos().subscribe((dato) => {
      this.cargosList = dato;
      this.filteredOptions = this.frmCargos.valueChanges
        .pipe(
          startWith(''),
          map(el => el ? this.filterCargos(el) : this.cargosList)
        );
    })
  }

  filterCargos(name: string) {
    const cargosFilter = this.cargosList.filter(el => {
      return el.toLowerCase().includes(name.toLowerCase())
    });
    return cargosFilter;
  }

  onCargoSelected($event: MatAutocompleteSelectedEvent) {
    this.frmPersonal.controls['cargo'].setValue($event.option.value);

    // // Mapeamos los departamentos a un objeto que se pueda usar para buscar rápidamente por id
    // const mapDepartamentosByNombre = new Map(this.cargosList.map(el => [el.nombre, el]));

    // // Obtenemos el departamento correspondiente
    // const dptoId = mapDepartamentosByNombre.get($event.option.value);
    // if (dptoId) {
    //   const dptoUpd = new Departamento();
    //   dptoUpd.id = dptoId.id;
    //   dptoUpd.nombre = dptoId.nombre;
    //   this.frmMateria.controls['departamento'].setValue(dptoUpd);
    // };
  };
}
