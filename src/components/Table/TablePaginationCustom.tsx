import { TablePagination } from "@mui/material";

interface TablePaginationCustomProps {
  resultCount: number;
  rowsPerPage: number;
  page: number;
  handleChangePage(event: unknown, newPage: number): void;
  handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>): void;
}

const TablePaginationCustom = ({
  resultCount,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}: TablePaginationCustomProps) => (
  <TablePagination
    sx={{
      marginBottom: "50px",
    }}
    rowsPerPageOptions={[10, 20, 50]}
    component="div"
    count={resultCount || 0}
    rowsPerPage={rowsPerPage}
    page={!resultCount || resultCount <= 0 ? 0 : page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />
);

export default TablePaginationCustom;
