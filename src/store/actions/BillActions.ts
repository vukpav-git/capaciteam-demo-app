import type { Dispatch } from "redux";

import { fetchBillsDataAPI } from "../../services/fetchBillsApi";
import {
  ADD_BILL_TO_FAVORITES,
  GET_BILLS,
  GET_BILLS_ENDED,
  GET_BILLS_ERROR,
  GET_BILLS_STARTED,
  REMOVE_BILL_FROM_FAVORITES,
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
  try {
    // since there is no API "POST" for this, here is a mock action as requested in test
    console.log(
      `API CALL MOCK: billNo ${billNo} ${!favorites ? "added to" : "removed from"} favorites`,
    );

    if (favorites) {
      dispatch({ type: REMOVE_BILL_FROM_FAVORITES, payload: billNo });
    } else {
      dispatch({ type: ADD_BILL_TO_FAVORITES, payload: billNo });
    }
  } catch (e) {
    console.error("Error:", e);
  }
};
