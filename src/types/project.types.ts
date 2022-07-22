import { RowDataPacket, FieldPacket } from "mysql2";

interface IProjectRowData extends RowDataPacket {
    id?: number;
    name?: string;
    description?: string;
    photography?: string;
    start_time?: string;
    end_time?: string;
}

export type IProjectDataResult = [IProjectRowData[], FieldPacket[]]