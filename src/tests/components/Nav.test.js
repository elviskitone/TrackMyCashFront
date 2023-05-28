import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Nav from "../../components/Nav";
import AccountDropdown from "../../components/AccountDropdown";

jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: jest.fn(),
}));
jest.mock("../../components/AccountDropdown", () => jest.fn());

describe("Nav", () => {
  beforeEach(() => {
    FontAwesomeIcon.mockImplementation(() => <span>MockFontAwesomeIcon</span>);
    AccountDropdown.mockImplementation(() => <div>MockAccountDropdown</div>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("toggles navbarOpen state when the button is clicked", () => {
    const { getByRole } = render(<Nav />);
    const button = getByRole("button");

    fireEvent.click(button);

    expect(button.textContent).toBe("MockFontAwesomeIcon");
  });

  it("renders the alias in the user section", () => {
    const email = "test@example.com";
    const alias = "JohnDoe";
    localStorage.setItem("email", email);
    localStorage.setItem("alias", alias);

    const { getByText } = render(<Nav />);
    const userSection = getByText(alias);

    expect(userSection).toBeInTheDocument();

    localStorage.removeItem("email");
    localStorage.removeItem("alias");
  });

  it("renders the email if alias in null or unavailable in the user section", () => {
    const email = "test@example.com";
    const alias = "";
    localStorage.setItem("email", email);
    localStorage.setItem("alias", alias);

    const { getByText } = render(<Nav />);
    const userSection = getByText(email);

    expect(userSection).toBeInTheDocument();

    localStorage.removeItem("email");
    localStorage.removeItem("alias");
  });

  it("renders the AccountDropdown component in the user section", () => {
    const { getByText } = render(<Nav />);
    const accountDropdown = getByText("MockAccountDropdown");

    expect(accountDropdown).toBeInTheDocument();
  });
});
