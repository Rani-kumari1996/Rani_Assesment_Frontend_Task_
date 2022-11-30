import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import LogTable from "../Component/Logdata/LogTable";

it("render without crashing Alldata", () => {
  render(
    <BrowserRouter>
      <LogTable />
    </BrowserRouter>
  );
  const LogId = screen.getByTestId("log-id");
  fireEvent.click(LogId);

  const AppType = screen.getByTestId("App-Type");
  fireEvent.click(AppType);

  const AppId = screen.getByTestId("App-Id");
  fireEvent.click(AppId);

  const CompId = screen.getByTestId("Comp-id");
  fireEvent.click(CompId);

  const ActionType = screen.getByTestId("Action-Type");
  fireEvent.click(ActionType);

  const SortDate = screen.getByTestId("Sort-Date");
  fireEvent.click(SortDate);

  const paginationprev = screen.getByTestId("pagination-prev");
  fireEvent.click(paginationprev);

  const paginationfwd = screen.getByTestId("pagination-fwd");
  fireEvent.click(paginationfwd);

  // const home = screen.getByTestId("home");
  // fireEvent.click(home);
});
