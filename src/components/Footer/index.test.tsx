import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Footer } from ".";

describe("footer", () => {
  it("render correctly", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();

    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("ホットペッパー Webサービス");
  });
});
