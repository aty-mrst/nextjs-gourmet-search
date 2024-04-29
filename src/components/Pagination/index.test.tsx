import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Pagination } from ".";

describe("Pagination", () => {
  it("render correctly", () => {
    const { container } = render(<Pagination currentPage={1} path="/search" />);
    expect(container).toMatchSnapshot();
  });
});
