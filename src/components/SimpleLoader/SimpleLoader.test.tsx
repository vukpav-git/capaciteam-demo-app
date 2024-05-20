import { render, screen } from "@testing-library/react";

import SimpleLoader from "./SimpleLoader";

describe("SimpleLoader tests", () => {
  const testProps = {
    color: "black",
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "20px",
    marginRight: "20px",
  };

  it("should match snapshot", () => {
    const { asFragment } = render(<SimpleLoader {...testProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the CircularProgress with correct styles", () => {
    render(<SimpleLoader {...testProps} />);
    const loader = screen.getByTestId("circular-progress");

    expect(loader).toBeInTheDocument();
    expect(loader).toHaveStyle(`color: ${testProps.color}`);
    expect(loader).toHaveStyle(`marginTop: ${testProps.marginTop}`);
    expect(loader).toHaveStyle(`marginBottom: ${testProps.marginBottom}`);
    expect(loader).toHaveStyle(`marginLeft: ${testProps.marginLeft}`);
    expect(loader).toHaveStyle(`marginRight: ${testProps.marginRight}`);
  });
});
