import { render, screen } from "@testing-library/react";
import Loading from "../../components/Loading";

test("test loading component", () => {
  render(<Loading />);

  const getText = screen.getByText("Loading...");
  expect(getText).toBeInTheDocument();
});
