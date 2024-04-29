import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LayoutMain } from ".";

describe("LayoutMain", () => {
  it("render correctly", () => {
    const { container } = render(<LayoutMain>ああ</LayoutMain>);
    expect(container).toMatchSnapshot();
  });
});
