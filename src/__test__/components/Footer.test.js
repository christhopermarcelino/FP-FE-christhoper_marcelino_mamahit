import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";

test("test footer component", () => {
  render(<Footer />);

  const getText = screen.getByText("Copyright @2024. All Rights Reserved");
  expect(getText).toBeInTheDocument();
});
