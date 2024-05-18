import type { Dispatch } from "redux";

import { fetchBillsDataAPI } from "../../services/fetchBillsApi";
import {
  ADD_BILL_TO_FAVORITES,
  GET_BILLS,
  GET_BILLS_ENDED,
  GET_BILLS_ERROR,
  GET_BILLS_STARTED,
} from "./ActionTypes";

export const getBillsData = async (
  dispatch: Dispatch,
  limit?: number,
  skip?: number,
  lang?: string,
) => {
  try {
    dispatch({ type: GET_BILLS_STARTED });

    const response = await fetchBillsDataAPI(limit, skip, lang);
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: GET_BILLS, payload: data });
      dispatch({ type: GET_BILLS_ENDED });
    } else {
      dispatch({ type: GET_BILLS_ERROR, payload: data.message });
      dispatch({ type: GET_BILLS_ENDED });
      console.error(`Error: ${data.message}`);
    }
  } catch (error) {
    dispatch({ type: GET_BILLS_ERROR, payload: error });
    dispatch({ type: GET_BILLS_ENDED });
  }
};

export const toggleFavorites = async (
  dispatch: Dispatch,
  billNo: string,
  favorites?: boolean,
) => {
  // TODO remove
  console.log("@@@@@@!!@@@", favorites, billNo);
  try {
    dispatch({ type: ADD_BILL_TO_FAVORITES, payload: billNo });
  } catch (e) {
    console.error("Error:", e);
  }
};
