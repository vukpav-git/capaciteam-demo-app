import { render, screen } from "@testing-library/react";

import TableNoEntries from "./TableNoEntries";

describe("Table No Entries tests", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(<TableNoEntries />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the component with the text "No entries found!"', () => {
    render(<TableNoEntries />);
    const messageElement = screen.getByText(/No entries found./i);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveStyle({
      marginLeft: "10px",
      marginTop: "4px",
      fontSize: "16px",
      fontFamily: "monospace",
    });
  });
});
