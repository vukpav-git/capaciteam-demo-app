import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Dispatch } from "redux";

import { BillTypes, type TBillType } from "../../models/Types";
import {
  filterBillsByType,
  filterBillsByTypeEnded,
  filterBillsByTypeStarted,
} from "../../redux/features/billSlice";

const TableFilter = () => {
  const [billType, setBillType] = useState<TBillType>(BillTypes.All);
  const dispatch: Dispatch = useDispatch();

  const favoritesFiltered = useSelector(
    (state: any) => state.favoritesFiltered,
  );

  useEffect(() => {
    // reset filter on tab change
    setBillType(BillTypes.All);
  }, [favoritesFiltered]);

  const handleChange = (typeVal: TBillType) => {
    dispatch(filterBillsByTypeStarted());
    setBillType(typeVal);

    dispatch(filterBillsByType(typeVal));
    dispatch(filterBillsByTypeEnded());
  };

  return (
    <Box marginBottom="12px" display="flex" justifyContent="flex-end">
      <FormControl
        data-testid="form-control-id"
        variant="standard"
        sx={{ m: 1, minWidth: "242px" }}
      >
        <InputLabel sx={{ fontSize: 18 }}>Filter by "Bill type"</InputLabel>
        <Select
          data-testid="TableFilter-select"
          labelId="TableFilter-label"
          value={billType}
          onChange={(e: any) => handleChange(e.target.value)}
          label="Bill Type"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Public">Public</MenuItem>
          <MenuItem value="Private">Private</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TableFilter;
