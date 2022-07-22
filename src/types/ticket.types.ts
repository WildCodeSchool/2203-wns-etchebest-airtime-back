import { RowDataPacket, FieldPacket } from 'mysql2';

interface ITicketRowData extends RowDataPacket {
  id: number;
  title?: string;
  comment?: string;
  estimated_time?: number;
  spent_time_minutes?: number;
  status?: string;
  user_id?: string;
  project_id?: number;
}

export type ITicketDataResult = [ITicketRowData[], FieldPacket[]];
