import React from "react";
import { render } from "@testing-library/react";
import Footer from "../../components/Footer";

describe("Footer", () => {
  it("renders the footer text correctly", () => {
    const { getByText } = render(<Footer />);
    const footerText = getByText("© 2023 -- Elvis Peter Kitone -- MIT license.");
    expect(footerText).toBeInTheDocument();
  });

  it("has the correct class names", () => {
    const { container } = render(<Footer />);
    const footerDiv = container.firstChild;
    expect(footerDiv).toHaveClass("flex max-w-full h-[50px] bg-gray-700 text-white shadow-xl py-2 justify-center");
  });
});
