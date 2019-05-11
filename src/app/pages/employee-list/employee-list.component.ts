import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageEvent} from '@angular/material';
import {EmployeeService} from '../employee/employee.service';
import {Employee} from '../../shared/models/employee.model';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns = ['photo_url','employee_id','name','dob','skills','salary', 'action'];
  employeeList: Array<Employee>;
  filteredEmployeeList: Array<Employee>;
  pageinatedEmployeeList: Array<Employee>;
  pageIndex = 0;
  pageSize = 10;
  skills;
  processing = false;
  searchTerm = new FormControl('');
  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeList = this.route.snapshot.data.employeeList;
    this.skills = this.route.snapshot.data.skills;
    this.filteredEmployeeList = this.employeeList.slice();
    this.pageinatedEmployeeList = this.filteredEmployeeList.slice(0, this.pageSize);
    this.searchTerm.valueChanges.pipe(debounceTime(100), distinctUntilChanged()).subscribe(term => {
      this.search(term);
    });
  }
  search(searchValue) {
    if (searchValue) {
      this.filteredEmployeeList = this.employeeList.filter(employee => employee.name.indexOf(searchValue) !== -1);
    } else {
      this.filteredEmployeeList = this.employeeList.slice();
    }
    this.pageinatedEmployeeList = this.filteredEmployeeList.slice(0, this.pageSize);
    this.pageIndex = 0;
  }
  pageinate(pageEvent: PageEvent) {
    const startIndex = pageEvent.pageIndex * this.pageSize;
    this.pageinatedEmployeeList = this.filteredEmployeeList.slice(startIndex, startIndex + this.pageSize);
    this.pageIndex = pageEvent.pageIndex;
  }
  deleteEmployee(el: Employee) {
    if (this.processing) { return; }
    this.employeeService.delete(el.employee_id).subscribe((res) => {
      const filteredIndex = this.filteredEmployeeList.indexOf(el);
      const employeeListIndex = this.employeeList.indexOf(el);
      this.filteredEmployeeList.splice(filteredIndex, 1);
      this.employeeList.splice(employeeListIndex, 1);
      const startIndex = this.pageIndex * this.pageSize;
      this.pageinatedEmployeeList = this.filteredEmployeeList.slice(startIndex, startIndex + this.pageSize);
      this.processing = false;
    });
  }

}
