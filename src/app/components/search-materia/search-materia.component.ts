import { Component, ViewChild, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription, merge, startWith, switchMap, map } from 'rxjs';
import { Materia } from 'src/app/model/Materia';
import { PageDTO } from 'src/app/model/PageDTO';
import { MateriaService } from 'src/app/service/materia.service';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';

@Component({
  selector: 'app-search-materia',
  templateUrl: './search-materia.component.html',
  styleUrls: ['./search-materia.component.scss']
})
export class SearchMateriaComponent {
  private dialogRef = inject(MatDialogRef<SearchMateriaComponent>);

  public materia!: Materia;
  protected subscriptios: Array<Subscription> = new Array();
  public blDisabled: boolean = true;
  public totalElements?: number = 0;
  public search!: string;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public lstMaterias: Materia[] = [];

  constructor(private materiaService: MateriaService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.onSearch();
  }

  public getMaterias(): void {
    this.materiaService.getMaterias().subscribe((dato) => {
      this.lstMaterias = dato;
      this.totalElements = this.lstMaterias.length;

      this.paginator._intl.itemsPerPageLabel = BibliotecaConstant.LABEL_ITEMS_POR_PAGINA;
      this.paginator._intl.firstPageLabel = BibliotecaConstant.LABEL_FIRST_PAGE;
      this.paginator._intl.lastPageLabel = BibliotecaConstant.LABEL_LAST_PAGE;
      this.paginator._intl.nextPageLabel = BibliotecaConstant.LABEL_NEXT_PAGE;
      this.paginator._intl.previousPageLabel = BibliotecaConstant.LABEL_PREVIOUS_PAGE;

    })
  }

  onSearch() {
    if (this.search) {
      this.materiaService.findByNombre(this.search).subscribe((dato) => {
        this.lstMaterias = dato;
        this.totalElements = this.lstMaterias.length;
      })
    } else {
      this.getMaterias();
    }
  }

  public onclearLstMateria(): void {
    this.lstMaterias = [];
  }

  public findByName(name: string, page: number, size: number): void {
    this.onclearLstMateria();
    this.onSearch();
  }

  public onClose(): void {
    this.dialogRef.close(false);
  }

  public onSend(): void {
    this.dialogRef.close({ materia: this.materia });
  }

  public selectRow(row: Materia): void {
    this.blDisabled = false;
    this.materia = row;
  }
}
