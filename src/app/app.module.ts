import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';

import { AboutComponent } from './pages/about/about.component';
import { HelpComponent } from './pages/help/help.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormComponent } from './pages/form/form.component';
import { PlanillaHorariaComponent } from './pages/planilla-horaria/planilla-horaria.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { MateriaComponent } from './pages/materia/materia.component';
import { HorarioComponent } from './pages/horario/horario.component';
import { CursoComponent } from './pages/curso/curso.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddCursoComponent } from './components/add-curso/add-curso.component';
import { ListCursoComponent } from './components/list-curso/list-curso.component';
import { SharedModule } from './shared/shared.module';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { AddDepartamentoComponent } from './components/add-departamento/add-departamento.component';
import { ListDepartamentoComponent } from './components/list-departamento/list-departamento.component';
import { AddMateriaComponent } from './components/add-materia/add-materia.component';
import { ListMateriaComponent } from './components/list-materia/list-materia.component';
import { SearchMateriaComponent } from './components/search-materia/search-materia.component';
import { SearchDepartamentoComponent } from './components/search-departamento/search-departamento.component';
import { SearchPersonalComponent } from './components/search-personal/search-personal.component';
import { ListPersonalComponent } from './components/list-personal/list-personal.component';
import { AddPersonalComponent } from './components/add-personal/add-personal.component';
import { AddPlanillaHorariaComponent } from './components/add-planilla-horaria/add-planilla-horaria.component';
import { ListPlanillaHorariaComponent } from './components/list-planilla-horaria/list-planilla-horaria.component';
import { AddHorarioComponent } from './components/add-horario/add-horario.component';
import { ListHorarioComponent } from './components/list-horario/list-horario.component';
import { SearchHorarioComponent } from './components/search-horario/search-horario.component';
import { ListRegistroComponent } from './components/list-registro/list-registro.component';
import { AddRegistroComponent } from './components/add-registro/add-registro.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { SearchCursoComponent } from './components/search-curso/search-curso.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HelpComponent,
    HomeComponent,
    NotFoundComponent,
    ProfileComponent,
    FormComponent,
    PlanillaHorariaComponent,
    PersonalComponent,
    MateriaComponent,
    HorarioComponent,
    CursoComponent,
    DashboardComponent,
    AddCursoComponent,
    ListCursoComponent,
    DepartamentoComponent,
    AddDepartamentoComponent,
    ListDepartamentoComponent,
    AddMateriaComponent,
    ListMateriaComponent,
    SearchMateriaComponent,
    SearchDepartamentoComponent,
    SearchPersonalComponent,
    ListPersonalComponent,
    AddPersonalComponent,
    AddPlanillaHorariaComponent,
    ListPlanillaHorariaComponent,
    AddHorarioComponent,
    ListHorarioComponent,
    SearchHorarioComponent,
    ListRegistroComponent,
    AddRegistroComponent,
    RegistroComponent,
    SearchCursoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,

    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
