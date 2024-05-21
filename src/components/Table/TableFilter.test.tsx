import { fireEvent, render, screen, within } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { BillTypes } from "../../models/Types";
import TableFilter from "./TableFilter";

const mockStore = configureStore([]);
// Mock the initial state...
const store = mockStore({
  favoritesFiltered: false,
});

describe("Table Filter tests", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <TableFilter />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly and dispatches the correct actions on selection change", () => {
    render(
      <Provider store={store}>
        <TableFilter />
      </Provider>,
    );

    const selectCompoEl = screen.getByTestId("TableFilter-select");

    const button = within(selectCompoEl).getByRole("combobox");
    fireEvent.mouseDown(button);

    const listbox = within(screen.getByRole("presentation")).getByRole(
      "listbox",
    );

    const options = within(listbox).getAllByRole("option");

    fireEvent.click(options[2]);

    const actions = store.getActions();
    expect(actions).toEqual([
      { type: "bill/filterBillsByTypeStarted" },
      { type: "bill/filterBillsByType", payload: BillTypes.Private },
      { type: "bill/filterBillsByTypeEnded" },
    ]);
  });
});
