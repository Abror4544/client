import {
  render,
  cleanup,
  getByTestId,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ColorModeSwitcher from "./ColorModeSwitcher";

afterEach(cleanup);

describe("Switch Button", () => {
  it("Render correct", () => {
    const { container } = render(<ColorModeSwitcher />);

    const button = getByTestId(container, "switchBtn");

    expect(button.getAttribute("aria-label")).toBe(`Switch to dark mode`);

    fireEvent.click(button);

    expect(button).toBeInTheDocument();
  });
});
