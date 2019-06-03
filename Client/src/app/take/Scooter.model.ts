export class Scooter{
  _id: number;
  posizione: Object;
  stato: String;


  constructor(_id: number, posizione: Object, stato: String){
    this._id=_id;
    this.posizione=posizione;
    this.stato=stato;

  }
}
