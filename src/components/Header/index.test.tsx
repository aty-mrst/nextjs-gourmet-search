import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from ".";

describe("header", () => {
  it("render correctly", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
