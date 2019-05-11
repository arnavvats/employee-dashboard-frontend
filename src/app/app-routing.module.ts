import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeListComponent} from './pages/employee-list/employee-list.component';
import {EmployeeComponent} from './pages/employee/employee.component';
import {EmployeeListService} from './pages/employee-list/employee-list.service';
import {EmployeeService} from './pages/employee/employee.service';
import {SkillsService} from './shared/services/skills.service';

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
    resolve: {employee: EmployeeService, skills: SkillsService}
  }, {
  path: 'employee-list',
  component: EmployeeListComponent,
    resolve: {employeeList: EmployeeListService, skills: SkillsService}
  }, {
    path: '**',
    redirectTo: 'employee-list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
