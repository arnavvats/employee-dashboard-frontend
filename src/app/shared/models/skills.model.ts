export class Skill {
  _id: string;
  name: string;
  constructor(data) {
    this._id = data && data._id;
    this.name = data && data.name;
  }
}
