export class Scooter{
  _id: number;
  posizione: Object;
  stato: String;
  tipo:String;


  constructor(_id: number, posizione: Object, stato: String, tipo:String){
    this._id=_id;
    this.posizione=posizione;
    this.stato=stato;
    this.tipo=tipo;
  }
}
