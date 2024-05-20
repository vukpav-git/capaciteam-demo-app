import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import TopNav from "./TopNav";

const mockStore = configureStore([]);
const store = mockStore({});

describe("Top Nav tests", () => {
  it("renders correctly and dispatches the correct actions when buttons are clicked", () => {
    render(
      <Provider store={store}>
        <TopNav />
      </Provider>,
    );

    const allBillsButton = screen.getByText("All bills");
    const favouritedBillsButton = screen.getByText("Favourited bills");

    // Simulate clicking on the "Favourited bills" button
    fireEvent.click(favouritedBillsButton);
    let actions = store.getActions();
    expect(actions[0]).toEqual({ type: "bill/filterBillsFavorites" });

    // Reset the actions
    store.clearActions();

    // Simulate clicking on the "All bills" button
    fireEvent.click(allBillsButton);
    actions = store.getActions();
    expect(actions).toEqual([{ type: "bill/unfilterBillsFavorites" }]);
  });
});
