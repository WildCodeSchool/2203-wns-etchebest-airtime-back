import { RowDataPacket } from "mysql2";

export interface IUserRowData extends RowDataPacket {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
}