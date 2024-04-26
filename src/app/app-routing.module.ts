import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HelpComponent } from './pages/help/help.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { MateriaComponent } from './pages/materia/materia.component';
import { PlanillaHorariaComponent } from './pages/planilla-horaria/planilla-horaria.component';
import { HorarioComponent } from './pages/horario/horario.component';
import { CursoComponent } from './pages/curso/curso.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // redirectTo: 'home',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'cursos',
    component: CursoComponent,
    title: 'Laboratorio - Cursos',
  },
  {
    path: 'departamentos',
    component: DepartamentoComponent,
    title: 'Laboratorio - Departamentos',
  },
  {
    path: 'horarios',
    component: HorarioComponent,
  },
  {
    path: 'materias',
    component: MateriaComponent,
    title: 'Laboratorio - Materias',
  },
  {
    path: 'personal',
    component: PersonalComponent,
    title: 'Laboratorio - Personal',
  },
  {
    path: 'planilla-horaria',
    component: PlanillaHorariaComponent,
    title: 'Laboratorio - Planilla Horaria Docente',
  },
  {
    path: 'registro',
    component: RegistroComponent,
    title: 'Rgistros'
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'help',
    component: HelpComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
