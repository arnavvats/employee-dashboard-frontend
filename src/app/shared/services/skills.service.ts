import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Resolve} from '@angular/router';
import {CONSTANTS} from '../constants/constants';
import {map} from 'rxjs/operators';
import {Skill} from '../models/skills.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class SkillsService implements Resolve<Array<Skill> | Observable<Array<Skill>>> {
  skills: Array<Skill>;
  constructor(private http: HttpClient) {}
  resolve() {
    if (this.skills) { return this.skills; } else {
      return this.http.get(CONSTANTS.skills).pipe(map((res: Array<any>) => {
        this.skills = res.map(el => new Skill(el));
        return this.skills;
      }));
    }
  }
}
