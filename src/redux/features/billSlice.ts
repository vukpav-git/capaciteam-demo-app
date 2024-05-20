import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Dispatch } from "redux";

import { BillTypes } from "../../models/Types";
import { fetchBillsDataAPI } from "../../services/fetchBillsApi";

const initialState = {};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    getBillsStarted: (state: any) => {
      return { ...state, isLoading: true, error: null };
    },
    getBills: (state: any, action: PayloadAction<any>) => {
      return {
        ...state,
        bills: action.payload?.results,
        billsFiltered: action.payload?.results?.sort(
          (a: any, b: any) =>
            parseFloat(a.bill?.billNo) - parseFloat(b.bill?.billNo),
        ),
        resultCount: action.payload?.head?.counts?.resultCount,
        language: action.payload?.head?.lang,
      };
    },
    getBillsError: (state: any, action: PayloadAction<any>) => {
      return { ...state, isLoading: false, error: action.payload };
    },
    getBillsEnded: (state: any) => {
      return { ...state, isLoading: false };
    },
    addBillToFavorites: (state: any, action: PayloadAction<any>) => {
      return {
        ...state,
        billsFiltered: [
          ...state.billsFiltered.filter(
            (item: any) => item.bill.billNo !== action.payload,
          ),
          {
            ...state.billsFiltered.filter(
              (item: any) => item.bill.billNo === action.payload,
            )[0],
            favorites: true,
          },
        ].sort(
          (a: any, b: any) =>
            parseFloat(a.bill?.billNo) - parseFloat(b.bill?.billNo),
        ),
        bills: [
          ...state.bills.filter(
            (item: any) => item.bill.billNo !== action.payload,
          ),
          {
            ...state.bills.filter(
              (item: any) => item.bill.billNo === action.payload,
            )[0],
            favorites: true,
          },
        ].sort(
          (a: any, b: any) =>
            parseFloat(a.bill?.billNo) - parseFloat(b.bill?.billNo),
        ),
      };
    },
    removeBillFromFavorites: (state: any, action: PayloadAction<any>) => {
      return {
        ...state,
        billsFiltered: [
          ...state.billsFiltered.filter(
            (item: any) => item.bill.billNo !== action.payload,
          ),
          {
            ...state.billsFiltered.filter(
              (item: any) => item.bill.billNo === action.payload,
            )[0],
            favorites: false,
          },
        ].sort(
          (a: any, b: any) =>
            parseFloat(a.bill?.billNo) - parseFloat(b.bill?.billNo),
        ),
        bills: [
          ...state.bills.filter(
            (item: any) => item.bill.billNo !== action.payload,
          ),
          {
            ...state.bills.filter(
              (item: any) => item.bill.billNo === action.payload,
            )[0],
            favorites: false,
          },
        ].sort(
          (a: any, b: any) =>
            parseFloat(a.bill?.billNo) - parseFloat(b.bill?.billNo),
        ),
      };
    },
    filterBillsByTypeStarted: (state: any) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    filterBillsByTypeEnded: (state: any) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    filterBillsByType: (state: any, action: PayloadAction<any>) => {
      return {
        ...state,
        billsFiltered: [
          // eslint-disable-next-line no-unsafe-optional-chaining
          ...state?.bills?.filter((item: any) =>
            action.payload === BillTypes.All
              ? item.bill.billType !== action.payload
              : item.bill.billType === action.payload,
          ),
        ].sort(
          (a: any, b: any) =>
            parseFloat(a.bill?.billNo) - parseFloat(b.bill?.billNo),
        ),
      };
    },
    filterBillsFavorites: (state: any) => {
      return {
        ...state,
        favoritesFiltered: true,
        billsFiltered: [
          // eslint-disable-next-line no-unsafe-optional-chaining
          ...state?.bills?.filter((item: any) => item.favorites),
        ].sort(
          (a: any, b: any) =>
            parseFloat(a.bill?.billNo) - parseFloat(b.bill?.billNo),
        ),
      };
    },
    unfilterBillsFavorites: (state: any) => {
      return {
        ...state,
        favoritesFiltered: false,
        billsFiltered: state?.bills,
      };
    },
    changeLocale: (state: any, action: PayloadAction<any>) => {
      return {
        ...state,
        locale: action.payload,
      };
    },
  },
});

export const {
  getBillsStarted,
  getBills,
  getBillsError,
  getBillsEnded,
  addBillToFavorites,
  removeBillFromFavorites,
  filterBillsByType,
  filterBillsByTypeStarted,
  filterBillsByTypeEnded,
  filterBillsFavorites,
  unfilterBillsFavorites,
  changeLocale,
} = billSlice.actions;

export const getBillsData = createAsyncThunk(
  "bills/getBills",
  async (param: any) => {
    try {
      param.dispatch(billSlice.actions.getBillsStarted());

      const response = await fetchBillsDataAPI(
        param.limit,
        param.skip,
        param.lang,
      );
      const data = await response.json();
      if (response.ok) {
        param.dispatch(billSlice.actions.getBills(data));
        param.dispatch(billSlice.actions.getBillsEnded());
      } else {
        param.dispatch(billSlice.actions.getBillsError(data.message));
        param.dispatch(billSlice.actions.getBillsEnded());
        console.error(`Error: ${data.message}`);
      }
    } catch (error) {
      param.dispatch(billSlice.actions.getBillsError(error));
      param.dispatch(billSlice.actions.getBillsEnded());
    }
  },
);

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
      dispatch(billSlice.actions.removeBillFromFavorites(billNo));
    } else {
      dispatch(billSlice.actions.addBillToFavorites(billNo));
    }
  } catch (e) {
    console.error("Error:", e);
  }
};

export default billSlice.reducer;
