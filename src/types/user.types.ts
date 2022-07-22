import { RowDataPacket, FieldPacket } from "mysql2";

interface IUserRowData extends RowDataPacket {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
}

export type IUserDataResult = [IUserRowData[], FieldPacket[]]