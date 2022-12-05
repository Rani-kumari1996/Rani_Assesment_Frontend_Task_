import {
  render,
  screen,
  fireEvent,
  waitFor,
  children,
} from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import FilterData from "../Component/Logdata/FilterData";
//render Dom
it("render without crashing SearchData", () => {
  render(
    <BrowserRouter>
      <FilterData />
    </BrowserRouter>
  );
});

it("checking the input field", async () => {
  render(
    <BrowserRouter>
      <FilterData />
    </BrowserRouter>
  );
  //input field applicationId
  const applicationId = screen.getByTestId("application-Id");
  expect(applicationId).toBeInTheDocument();
  expect(applicationId).toHaveAttribute("type", "text");
  fireEvent.change(applicationId, { target: { value: "375709440378514" } });
  expect(screen.getByTestId("application-Id")).toHaveValue("375709440378514");

  //start date
  const startDateInput = screen.getByTestId("start-date");
  expect(startDateInput).toBeInTheDocument();
  expect(startDateInput).toHaveAttribute("type", "date");
  fireEvent.change(startDateInput, { target: { value: "" } });
  expect(screen.getByTestId("start-date")).toHaveValue("");

  await userEvent.type(startDateInput, "1970-01-01");
  expect(startDateInput).toHaveValue("1970-01-01");
  //end date
  const endDateInput = screen.getByTestId("end-date");
  expect(endDateInput).toBeInTheDocument();
  expect(endDateInput).toHaveAttribute("type", "date");
  fireEvent.change(endDateInput, { target: { value: "" } });
  expect(screen.getByTestId("end-date")).toHaveValue("");

  await userEvent.type(endDateInput, "1970-01-01");
  expect(endDateInput).toHaveValue("1970-01-01");
});

//Button
// it("checking the button field", () => {
//   render(
//     <BrowserRouter>
//       <FilterData />
//     </BrowserRouter>
//   );

//   const submitBtn = screen.getByTestId("search-button");
//   fireEvent.click(submitBtn);
// });

//Select feild for action type
it("checking the action type", async () => {
  render(
    <BrowserRouter>
      <FilterData />
    </BrowserRouter>
  );
  expect(screen.getAllByRole("combobox").length).toBe(2);
  const dropdownBtn = screen.getByTestId("select-toogle");
  await waitFor(() => {
    expect(dropdownBtn).toBeInTheDocument();
  });
  fireEvent.change(screen.getByTestId("select-toogle"), {
    target: { value: "INITIATE_APPLICATION" },
  });
});

//Select feild for application type
it("checking the Application type", async () => {
  render(
    <BrowserRouter>
      <FilterData />
    </BrowserRouter>
  );
  expect(screen.getAllByRole("combobox").length).toBe(2);
  const dropdownBtn = screen.getByTestId("select-toogleApp");
  await waitFor(() => {
    expect(dropdownBtn).toBeInTheDocument();
  });
  fireEvent.change(screen.getByTestId("select-toogleApp"), {
    target: { value: "CERT_TITLE_DEED_PLOT" },
  });
});
