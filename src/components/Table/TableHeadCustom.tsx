import { TableCell, TableHead, TableRow } from "@mui/material";

import type { IColumnHead } from "../../models/Types";
import { colors } from "../../styles/colors";

interface TableHeadCustomProps {
  columns: IColumnHead[];
}

const TableHeadCustom = ({ columns }: TableHeadCustomProps) => {
  const headingStyle = {
    fontWeight: 700,
    fontSize: 16,
    background: colors.lightGreen,
    color: colors.charcoal,
    fontFamily: "monospace",
  };

  return (
    <TableHead>
      <TableRow>
        {columns &&
          columns.map((column: IColumnHead, index: number) => (
            <TableCell
              key={index}
              sx={{ ...headingStyle }}
              align={column.align}
            >
              {column.name}
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadCustom;
