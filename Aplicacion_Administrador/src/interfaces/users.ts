export interface Users{
    id: string;
    rut:number;
    username:string;
    email:string;
    pnombre:string;
    apellido:string;
    carrera:string;
    password:string;
    isactive: boolean;
}

export interface NewUser{
    username:string;
    rut:number;
    email:string;
    pnombre:string;
    apellido:string;
    carrera:string;
    password:string;
    isactive: boolean;
}