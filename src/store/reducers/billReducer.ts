import { BillTypes } from "../../models/Types";
import {
  ADD_BILL_TO_FAVORITES,
  FILTER_BILLS_TYPE,
  FILTER_BILLS_TYPE_ENDED,
  FILTER_BILLS_TYPE_STARTED,
  GET_BILLS,
  GET_BILLS_ENDED,
  GET_BILLS_ERROR,
  GET_BILLS_STARTED,
  REMOVE_BILL_FROM_FAVORITES,
} from "../actions/ActionTypes";

const initialState: any = {};

function billReducer(state = initialState, action: any) {
  switch (action?.type) {
    case GET_BILLS_STARTED:
      return { ...state, isLoading: true, error: null };
    case GET_BILLS:
      return {
        ...state,
        bills: action.payload?.results,
        billsFiltered: action.payload?.results,
        resultCount: action.payload?.head?.counts?.resultCount,
        language: action.payload?.head?.lang,
      };
    case GET_BILLS_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case GET_BILLS_ENDED:
      return { ...state, isLoading: false };
    case ADD_BILL_TO_FAVORITES:
      return {
        ...state,
        billsFiltered: [
          ...state.bills.filter((item: any) => item !== action.payload),
        ],
      };
    case REMOVE_BILL_FROM_FAVORITES:
      return {
        ...state,
        billsFiltered: state.bills,
      };
    case FILTER_BILLS_TYPE_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case FILTER_BILLS_TYPE_ENDED:
      return {
        ...state,
        isLoading: false,
      };
    case FILTER_BILLS_TYPE:
      return {
        ...state,
        billsFiltered: [
          // eslint-disable-next-line no-unsafe-optional-chaining
          ...state?.bills?.filter((item: any) =>
            action.payload === BillTypes.All
              ? item.bill.billType !== action.payload
              : item.bill.billType === action.payload,
          ),
        ],
      };
    default:
      return state;
  }
}

export default billReducer;
