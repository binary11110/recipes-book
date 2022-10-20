import { Ingrediant } from "../shared/ingrediants.model";

export class Recipe{
    public name!:string;
    public imgurl!:string;
    public description!:string;
    public ingrediants!:Ingrediant[];
    constructor(name:string , desc:string,imgpath:string,ingrediants:Ingrediant[]){
        this.name=name;
        this.description=desc;
        this.imgurl=imgpath;
        this.ingrediants= ingrediants;

    }
}