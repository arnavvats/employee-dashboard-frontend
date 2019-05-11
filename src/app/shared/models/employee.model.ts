import {Skill} from './skills.model';

export class Employee {
  _id: number;
  employee_id: number;
  name: string;
  dob: string;
  salary: number;
  skills: Array<string>;
  photo_url: string;
  constructor(data?) {
    this._id = data && data._id;
    this.employee_id = data && data.employee_id;
    this.name = data && data.name;
    this.dob = data && data.dob;
    this.salary = data && data.salary;
    this.skills = data && data.skills || [];
    this.photo_url = data && data.photo_url;
  }
  getSkillsList(allSkills: Array<Skill>) {
    return allSkills.filter(skill => this.skills.indexOf(skill._id)  !== -1).map(el => el.name).join(', ') || 'None';
  }
  getSkillIndex(skill: Skill) {
    return this.skills.indexOf(skill._id);
  }
  hasSkill(skill: Skill) {
   return this.getSkillIndex(skill) !== -1;
  }
  addSkill(skill: Skill) {
    if (!this.hasSkill(skill)) {
      this.skills.push(skill._id);
    }
  }
  removeSkill(skill: Skill) {
    if (this.hasSkill(skill)) {
      this.skills.splice(this.getSkillIndex(skill), 1);
    }
  }
}
