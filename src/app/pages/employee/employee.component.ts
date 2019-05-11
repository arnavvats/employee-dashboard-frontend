import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Employee} from '../../shared/models/employee.model';
import {Skill} from '../../shared/models/skills.model';
import {MatCheckboxChange} from '@angular/material';
import {EmployeeService} from './employee.service';
import {of} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  skills;
  photoURL  = 'assets/images/user.png';
  processing = false;
  employee: Employee;
  imageFile;
  createState;
  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.createState = this.route.snapshot.queryParams.state === 'new';
    this.employee = this.route.snapshot.data.employee;
    this.skills = this.route.snapshot.data.skills;
    if (this.employee.photo_url) {
    this.photoURL = this.employee.photo_url;
    }
    console.log(this.employee);
  }

  changeSkill( event: MatCheckboxChange, skill: Skill) {
    if (event.checked) {
      this.employee.addSkill(skill);
    } else {
      this.employee.removeSkill(skill);
    }
  }
  previewPhoto(event) {
    this.imageFile = event.target.files && event.target.files[0];
    if (this.imageFile) {
       this.photoURL = URL.createObjectURL(this.imageFile);
    } else {
      this.photoURL = this.employee.photo_url;
    }
  }

  update() {
    this.processing = true;
    this.updatePhoto().pipe(flatMap((res: any) => {
      this.employee.photo_url = res.photo_url;
      return this.createState ? this.employeeService.create(this.employee) : this.employeeService.update(this.employee) ;
    })).subscribe(res => {
      this.processing = false;
    }, err => {
      console.log(err);
      this.processing = false;
    });
  }
  delete() {
    this.processing = true;
    this.employeeService.delete(this.employee.employee_id).subscribe(() => {
      this.processing = false;
      this.router.navigateByUrl('/');
    }, err => {
      this.processing = false;
      console.log(err);
    });
  }

  updatePhoto() {
    if (this.imageFile) {
      return this.employeeService.uploadPhoto(this.imageFile);
    }
    return of({photo_url: this.employee.photo_url});
  }

}
