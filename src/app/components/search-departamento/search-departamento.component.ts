import { Component, ViewChild, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { Departamento } from 'src/app/model/Departamento';
import { DepartamentoService } from 'src/app/service/departamento.service';
import { BibliotecaConstant } from 'src/app/shared/constants/BibliotecaConstant';

@Component({
  selector: 'app-search-departamento',
  templateUrl: './search-departamento.component.html',
  styleUrls: ['./search-departamento.component.scss']
})
export class SearchDepartamentoComponent {
  private dialogRef = inject(MatDialogRef<SearchDepartamentoComponent>);

  public departamento!: Departamento;
  protected subscriptios: Array<Subscription> = new Array();
  public blDisabled: boolean = true;
  public totalElements?: number = 0;
  public search!: string;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public lstDepartamentos: Departamento[] = [];

  constructor(private departamentoService: DepartamentoService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.onSearch();
  }

  public getDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe((dato) => {
      this.lstDepartamentos = dato;
      this.totalElements = this.lstDepartamentos.length;

      this.paginator._intl.itemsPerPageLabel = BibliotecaConstant.LABEL_ITEMS_POR_PAGINA;
      this.paginator._intl.firstPageLabel = BibliotecaConstant.LABEL_FIRST_PAGE;
      this.paginator._intl.lastPageLabel = BibliotecaConstant.LABEL_LAST_PAGE;
      this.paginator._intl.nextPageLabel = BibliotecaConstant.LABEL_NEXT_PAGE;
      this.paginator._intl.previousPageLabel = BibliotecaConstant.LABEL_PREVIOUS_PAGE;

    })
  }

  onSearch($event?: Event) {
    if (this.search) {
      this.departamentoService.findByNombre(this.search).subscribe((dato) => {
        this.lstDepartamentos = dato;
        this.totalElements = this.lstDepartamentos.length;
      })
    } else {
      this.getDepartamentos();
    }
  }

  public onclearLstDepartamento(): void {
    this.lstDepartamentos = [];
  }

  public findByName(name: string, page: number, size: number): void {
    this.onclearLstDepartamento();
    this.onSearch();
  }

  public onClose(): void {
    this.dialogRef.close(false);
  }

  public onSend(): void {
    this.dialogRef.close({ departamento: this.departamento });
  }

  public selectRow(row: Departamento): void {
    this.blDisabled = false;
    this.departamento = row;
  }
}
