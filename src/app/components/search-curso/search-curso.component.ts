import { Component, ViewChild, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { Curso } from 'src/app/model/Curso';
import { CursoService } from 'src/app/service/curso.service';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';

@Component({
  selector: 'app-search-curso',
  templateUrl: './search-curso.component.html',
  styleUrls: ['./search-curso.component.scss']
})
export class SearchCursoComponent {
  private dialogRef = inject(MatDialogRef<SearchCursoComponent>);

  public curso!: Curso;
  protected subscriptios: Array<Subscription> = new Array();
  public blDisabled: boolean = true;
  public totalElements?: number = 0;
  public search!: string;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public lstCursos: Curso[] = [];

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.onSearch();
  }

  public getCursos(): void {
    this.cursoService.getCursos().subscribe((dato) => {
      this.lstCursos = dato;
      this.totalElements = this.lstCursos.length;

      this.paginator._intl.itemsPerPageLabel = BibliotecaConstant.LABEL_ITEMS_POR_PAGINA;
      this.paginator._intl.firstPageLabel = BibliotecaConstant.LABEL_FIRST_PAGE;
      this.paginator._intl.lastPageLabel = BibliotecaConstant.LABEL_LAST_PAGE;
      this.paginator._intl.nextPageLabel = BibliotecaConstant.LABEL_NEXT_PAGE;
      this.paginator._intl.previousPageLabel = BibliotecaConstant.LABEL_PREVIOUS_PAGE;

    })
  }

  onSearch($event?: Event) {
    if (this.search) {
      this.cursoService.findByNombre(this.search).subscribe((dato) => {
        this.lstCursos = dato;
        this.totalElements = this.lstCursos.length;
      })
    } else {
      this.getCursos();
    }
  }

  public onclearLstCurso(): void {
    this.lstCursos = [];
  }

  public findByName(name: string, page: number, size: number): void {
    this.onclearLstCurso();
    this.onSearch();
  }

  public onClose(): void {
    this.dialogRef.close(false);
  }

  public onSend(): void {
    this.dialogRef.close({ curso: this.curso });
  }

  public selectRow(row: Curso): void {
    this.blDisabled = false;
    this.curso = row;
  }
}
