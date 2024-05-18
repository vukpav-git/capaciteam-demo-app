import type { IColumnHead } from "../models/Types";

export const COMPANY_NAME = "Capaciteam";

export const BILL_TABLE_COLUMNS: IColumnHead[] = [
  { name: "Bill number", align: "left" },
  { name: "Bill type", align: "right" },
  { name: "Bill status", align: "right" },
  { name: "Sponsor", align: "right" },
  { name: "Favorites", align: "right" },
];
