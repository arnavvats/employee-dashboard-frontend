import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Employee} from '../../shared/models/employee.model';
import {HttpClient} from '@angular/common/http';
import {CONSTANTS} from '../../shared/constants/constants';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListService implements Resolve<Observable<Array<Employee>>> {

  constructor(private http: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.http.get(CONSTANTS.employeeList).pipe(map((res: Array<any>) => {
      console.log(res.map(el => new Employee(el)));
      return res.map(el => new Employee(el));
    }));
  }
}
