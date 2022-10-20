export class User{
constructor(public email:string,public id:string,private _token:string ,private _tokenExpirationDate:Date){

}

get token(){
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
        return '';  //mfrod b null lsa tzbt
    }
    return this._token
}
}