import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Alert,
  Box,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Dispatch } from "redux";

import { BILL_TABLE_COLUMNS } from "../../constants/Constants";
import type { IBillDataRow } from "../../models/Types";
import { getBillsData, toggleFavorites } from "../../store/actions/BillActions";
import { colors } from "../../styles/colors";
import BillDetailsModal from "../BillDetails/BillDetailsModal";
import SimpleLoader from "../SimpleLoader/SimpleLoader";
import TableFilter from "./TableFilter";
import TableHeadCustom from "./TableHeadCustom";
import TablePaginationCustom from "./TablePaginationCustom";

const BasicTable = () => {
  const [selectedRow, setSelectedRow] = useState<IBillDataRow>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch: Dispatch = useDispatch();
  const resultCount = useSelector((state: any) => state.resultCount);
  const bills = useSelector((state: any) => state.billsFiltered);
  const isLoading = useSelector((state: any) => state.isLoading);
  const error = useSelector((state: any) => state.error);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleGetBillsData = () => {
    getBillsData(dispatch, rowsPerPage, rowsPerPage * page);
  };

  useEffect(() => {
    handleGetBillsData();
  }, [rowsPerPage, page]);

  useEffect(() => {
    if (selectedRow?.bill) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [selectedRow]);

  const handleFavoritesToggle = (billNo: string, favorites?: boolean) => {
    toggleFavorites(dispatch, billNo, favorites);
  };

  return (
    <>
      {error && <Alert severity="warning">Load of data failed!</Alert>}
      <Paper
        sx={{ minHeight: "500px", display: "flex", justifyContent: "center" }}
      >
        {isLoading ? (
          <Box marginTop="250px">
            <SimpleLoader />
          </Box>
        ) : (
          <Box marginTop="20px" width="1000px">
            <Typography
              marginBottom="20px"
              fontSize={32}
              color={colors.lightBlue}
              fontFamily="monospace"
              textAlign="center"
            >
              List of bills
            </Typography>
            <TableFilter />
            <TableContainer sx={{ borderRadius: "6px" }}>
              <Table stickyHeader aria-label="Bill info table">
                <TableHeadCustom columns={BILL_TABLE_COLUMNS} />
                <TableBody>
                  {bills &&
                    bills.map((row: IBillDataRow, index: number) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          ":hover": {
                            background: colors.green,
                            cursor: "pointer",
                          },
                        }}
                        onClick={() =>
                          setSelectedRow({
                            bill: {
                              billNo: row.bill.billNo,
                              billType: row.bill.billType,
                              status: row.bill.status,
                              favorites: row.bill.favorites,
                              sponsors: [
                                {
                                  sponsor: {
                                    as: {
                                      showAs:
                                        row.bill.sponsors[0]?.sponsor?.as
                                          ?.showAs,
                                    },
                                    by: {
                                      showAs:
                                        row.bill.sponsors[0]?.sponsor?.by
                                          ?.showAs,
                                    },
                                  },
                                },
                              ],
                            },
                          })
                        }
                      >
                        <TableCell component="th" scope="row">
                          {row.bill?.billNo}
                        </TableCell>
                        <TableCell align="right">{row.bill.billType}</TableCell>
                        <TableCell align="right">{row.bill.status}</TableCell>
                        <TableCell align="right">
                          {row.bill.sponsors[0]?.sponsor?.by?.showAs ||
                            row.bill.sponsors[0]?.sponsor?.as?.showAs}
                        </TableCell>
                        <TableCell align="right">
                          {row.bill.favorites ? (
                            <Box
                              component="span"
                              onClick={() =>
                                handleFavoritesToggle(
                                  row.bill.billNo,
                                  row.bill.favorites,
                                )
                              }
                            >
                              <StarIcon />
                            </Box>
                          ) : (
                            <Box
                              component="span"
                              onClick={() =>
                                handleFavoritesToggle(
                                  row.bill.billNo,
                                  row.bill.favorites,
                                )
                              }
                            >
                              <StarBorderIcon />
                            </Box>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {!bills || bills.length === 0 ? (
                <Typography
                  marginLeft="10px"
                  marginTop="4px"
                  fontSize={16}
                  fontFamily="monospace"
                >
                  No entries found.
                </Typography>
              ) : null}
            </TableContainer>
            <TablePaginationCustom
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              page={page}
              resultCount={resultCount}
              rowsPerPage={rowsPerPage}
            />
          </Box>
        )}
      </Paper>
      <BillDetailsModal
        isOpen={modalOpen}
        handleClose={() => setModalOpen(false)}
        billNo={selectedRow?.bill.billNo || ""}
        billSponsor={
          selectedRow?.bill.sponsors[0].sponsor.as.showAs ||
          selectedRow?.bill.sponsors[0].sponsor.by.showAs ||
          ""
        }
        billStatus={selectedRow?.bill.status || ""}
        billType={selectedRow?.bill.billType || ""}
        favorites={selectedRow?.bill.favorites || false}
      />
    </>
  );
};

export default BasicTable;
