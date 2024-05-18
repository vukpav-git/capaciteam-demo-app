import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { BillTypes, type TBillType } from "../../models/Types";
import {
  FILTER_BILLS_TYPE,
  FILTER_BILLS_TYPE_ENDED,
  FILTER_BILLS_TYPE_STARTED,
} from "../../store/actions/ActionTypes";

const TableFilter = () => {
  const [billType, setBillType] = useState<TBillType>(BillTypes.All);
  const dispatch = useDispatch();

  const handleChange = (typeVal: TBillType) => {
    dispatch({ type: FILTER_BILLS_TYPE_STARTED });
    setBillType(typeVal);

    dispatch({ type: FILTER_BILLS_TYPE, payload: typeVal });
    dispatch({ type: FILTER_BILLS_TYPE_ENDED });
  };

  return (
    <Box marginBottom="12px" display="flex" justifyContent="flex-end">
      <FormControl variant="standard" sx={{ m: 1, minWidth: "270px" }}>
        <InputLabel>Filter by Bill type</InputLabel>
        <Select
          labelId="TableFilter-label"
          value={billType}
          onChange={(e: any) => handleChange(e.target.value)}
          label="Type"
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
