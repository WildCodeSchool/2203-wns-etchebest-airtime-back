import { RowDataPacket, FieldPacket } from "mysql2";

interface IUserProjectRowData extends RowDataPacket {
    user_id: string;
    project_id: number;
}

export type IUserProjectDataResult = [IUserProjectRowData[], FieldPacket[]]