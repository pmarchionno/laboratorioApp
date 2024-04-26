import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Horario } from 'src/app/model/Horario';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';

@Component({
  selector: 'app-add-horario',
  templateUrl: './add-horario.component.html',
  styleUrls: ['./add-horario.component.scss']
})
export class AddHorarioComponent {
  private action!: string;
  public frmHorario!: FormGroup;
  public editHorario: Boolean = false;

  constructor(private diagoloRef: MatDialogRef<AddHorarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Horario,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.frmHorario = this.formBuilder.group({
        id: [''],
        hora_inicio: ['', Validators.required],
        hora_fin: ['', Validators.required],
      })
    } else {
      this.editHorario = false;
      this.frmHorario = this.formBuilder.group({
        hora_inicio: ['', Validators.required],
        hora_fin: ['', Validators.required],
      })
    }
  }

  public onClose(): void {
    this.diagoloRef.close(false);
  }

  ngAfterViewInit(): void {
    if (this.data) {
      this.onEdit(this.data);
      this.editHorario = true;
    } else {
      this.editHorario = false;
    }
    this.cdRef.detectChanges();
  }

  public onSend(): void {
    this.diagoloRef.close();
  }

  public onSubmit(): void {
    this.action = this.frmHorario.value.id
      ? BibliotecaConstant.ACTION_UPDATE
      : BibliotecaConstant.ACTION_ADD;
    this.diagoloRef.close({
      id: this.frmHorario.value.id,
      horario: this.frmHorario.value,
      action: this.action,
    });
  }

  public onEdit(row: Horario): void {
    this.frmHorario.setValue({
      id: row.id,
      hora_inicio: row.hora_inicio,
      hora_fin: row.hora_fin,
    })
  }

  public onDisabled(): boolean {
    return this.frmHorario.invalid;
  }
}
