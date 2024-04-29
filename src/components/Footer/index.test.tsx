import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Footer } from ".";

describe("footer", () => {
  it("render correctly", () => {
    const { container, getByRole } = render(<Footer />);
    expect(container).toMatchSnapshot();

    const link = getByRole("link");

    expect(link).toHaveTextContent("ホットペッパー Webサービス");
    expect(link.getAttribute("href")).toBe("http://webservice.recruit.co.jp/");
  });
});
