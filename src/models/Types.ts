export interface IBillDataRow {
  bill: {
    billNo: string;
    billType: string;
    status: string;
    sponsors: [
      {
        sponsor: {
          as: {
            showAs: string;
          };
          by: {
            showAs: string;
          };
        };
      },
    ];
    favorites?: boolean;
  };
}

export interface IColumnHead {
  name: string;
  align: "left" | "right";
}

export type TLanguage = "en" | "ga";

export type TBillType = "All" | "Public" | "Private";

export enum BillTypes {
  All = "All",
  Public = "Public",
  Private = "Private",
}
