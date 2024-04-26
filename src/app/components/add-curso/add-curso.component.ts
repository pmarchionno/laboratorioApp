import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Curso } from 'src/app/model/Curso';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';

@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.scss']
})
export class AddCursoComponent {
  private action!: string;
  public frmCurso!: FormGroup;
  public editCurso: Boolean = false;

  constructor(private diagoloRef: MatDialogRef<AddCursoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Curso,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // if (this.data){
    //   console.log(this.data)
    // }
    // this.frmCurso = this.formBuilder.group({
    //   id: [''],
    //   nombre: ['', Validators.required]
    // })
    if (this.data) {
      this.frmCurso = this.formBuilder.group({
        id: [''],
        nombre: ['', Validators.required]
      })
    } else {
      this.editCurso = false;
      this.frmCurso = this.formBuilder.group({
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
      this.editCurso = true;
    } else {
      this.editCurso = false;
    }
    this.cdRef.detectChanges();
  }

  public onSend(): void {
    this.diagoloRef.close();
  }

  public onSubmit(): void {
    this.action = this.frmCurso.value.id
      ? BibliotecaConstant.ACTION_UPDATE
      : BibliotecaConstant.ACTION_ADD;
    this.diagoloRef.close({
      id: this.frmCurso.value.id,
      curso: this.frmCurso.value,
      action: this.action,
    });
  }

  public onEdit(row: Curso): void {
    this.frmCurso.setValue({
      id: row.id,
      nombre: row.nombre
    })
  }

  public onDisabled(): boolean {
    return this.frmCurso.invalid;
  }
}
