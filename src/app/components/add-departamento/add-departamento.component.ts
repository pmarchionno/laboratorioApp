import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Departamento } from 'src/app/model/Departamento';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';

@Component({
  selector: 'app-add-departamento',
  templateUrl: './add-departamento.component.html',
  styleUrls: ['./add-departamento.component.scss']
})
export class AddDepartamentoComponent {
  private action!: string;
  public frmDepartamento!: FormGroup;
  public editDepartamento: Boolean = false;

  constructor(private diagoloRef: MatDialogRef<AddDepartamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Departamento,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // if (this.data){
    //   console.log(this.data)
    // }
    // this.frmDepartamento = this.formBuilder.group({
    //   id: [''],
    //   nombre: ['', Validators.required]
    // })
    if (this.data) {
      this.frmDepartamento = this.formBuilder.group({
        id: [''],
        nombre: ['', Validators.required],
      })
    } else {
      this.editDepartamento = false;
      this.frmDepartamento = this.formBuilder.group({
        nombre: ['', Validators.required]
      })
    }
  }

  public onClose(): void {
    this.diagoloRef.close(false);
  }

  ngAfterViewInit(): void {
    if (this.data) {
      this.onEdit(this.data);
      this.editDepartamento = true;
    } else {
      this.editDepartamento = false;
    }
    this.cdRef.detectChanges();
  }

  public onSend(): void {
    this.diagoloRef.close();
  }

  public onSubmit(): void {
    this.action = this.frmDepartamento.value.id
      ? BibliotecaConstant.ACTION_UPDATE
      : BibliotecaConstant.ACTION_ADD;
    this.diagoloRef.close({
      id: this.frmDepartamento.value.id,
      departamento: this.frmDepartamento.value,
      action: this.action,
    });
  }

  public onEdit(row: Departamento): void {
    this.frmDepartamento.setValue({
      id: row.id,
      nombre: row.nombre,
    })
  }

  public onDisabled(): boolean {
    return this.frmDepartamento.invalid;
  }
}
