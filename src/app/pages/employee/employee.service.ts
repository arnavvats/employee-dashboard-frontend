import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CONSTANTS} from '../../shared/constants/constants';
import {Employee} from '../../shared/models/employee.model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements Resolve<Observable<any> | any> {
  constructor(private http: HttpClient) {}
  resolve(route: ActivatedRouteSnapshot , state: RouterStateSnapshot) {
    if (route.queryParams.state === 'new') {
      return new Employee();
    }
    return this.read(route.queryParams.employee_id);
  }
  uploadPhoto(photo: File) {
    const formData = new FormData();
    formData.append('photo', photo);
    return this.http.post(CONSTANTS.photo, formData, {headers: {enctype: 'multipart/form-data'}});
  }
  create(employee: Employee) {
    return this.http.post(CONSTANTS.employee, employee);
  }
  read(employee_id) {
    return this.http.get(CONSTANTS.employee, {params: {employee_id}}).pipe(map(res => {
      return new Employee(res);
    }));
  }
  update(employee: Employee) {
    return this.http.put(CONSTANTS.employee, employee);
  }
  delete(employee_id) {
    return this.http.delete(CONSTANTS.employee, {params: {employee_id}});
  }
}
