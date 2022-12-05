import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Input, Label, FormGroup } from "reactstrap";

const FilterData = (props) => {
  const navigate = useNavigate();
  const [actionType, setActionType] = useState();
  const [applicationType, setApplicationType] = useState();
  const [applicationId, setApplicationId] = useState();
  const [search, setSearch] = useState({ start: "", end: "" });
  let filtered, filteredNames, actionSearch, applicationSearch;
  const location = useLocation();

  const buttonSubmit = () => {
    const temp = { actionType, applicationType, applicationId, search };
    if (search) {
      const getsearch = { ...temp, search };
      props.handleFilter(getsearch);
    }
    props.handleFilter(temp);

    let urlStr = "?";
    for (let [key, value] of Object.entries(temp)) {
      console.log("key", key, value);
      if (value) {
        if (urlStr.length === 1 && urlStr === "?")
          urlStr = urlStr + key + "=" + value;
        else urlStr = urlStr + "&" + key + "=" + value;
      }
    }

    if (search.start && search.end) {
      if (urlStr.length === 1 && urlStr === "?")
        urlStr =
          urlStr + "startDate=" + search.start + "&endDate=" + search.end;
      else
        urlStr =
          urlStr + "&startdate=" + search.start + "&toDenddatete=" + search.end;
    }
    if (
      actionType === "Select ActionType" ||
      applicationType === "Select ApplicationType"
    ) {
      navigate("/");
      window.location.reload(false);
    }
    navigate({ pathname: "/", search: `${urlStr} ` });
  };

  if (props.apiData) {
    const ids = props.apiData.map((val) => val.actionType);
    filtered = props.apiData.filter(
      ({ actionType }, index) => !ids.includes(actionType, index + 1)
    );

    const names = props.apiData.map((val) => val.applicationType);
    filteredNames = props.apiData.filter(
      ({ applicationType }, index) =>
        !names.includes(applicationType, index + 1)
    );
  }

  if (location.search) {
    const searchData = location.search;
    const searchData1 = searchData.split("=")[0];
    const searchData2 = searchData.split("=")[1];

    if (searchData1 === "?applicationType") {
      applicationSearch = searchData2;
    } else if (searchData1 === "?actionType") {
      actionSearch = searchData2;
    }
  }

  return (
    <Container>
      <Row>
        <Col className="mb-3">
          <Label>{"ActionType"}</Label>
          <select
            data-testid="select-toogle"
            defaultValue={actionType}
            onChange={(e) => setActionType(e.target.value)}
            className="option1"
          >
            <option value="Select ActionType">Select ActionType</option>
            <option value="none" disabled hidden>
              {actionSearch}
            </option>{" "}
            {props.apiData &&
              filtered.map((val, i) => (
                <option key={i} value={val.actionType}>
                  {val.actionType}
                </option>
              ))}
          </select>
        </Col>
        <Col className="mb-3 option">
          <FormGroup>
            <Label>{"ApplicationTypes"}</Label>
            <select
              data-testid="select-toogleApp"
              defaultValue={applicationType}
              onChange={(e) => setApplicationType(e.target.value)}
              className="option1"
            >
              <option value="Select ApplicationType">
                Select ApplicationType
              </option>
              <option value="none" disabled hidden>
                {applicationSearch}
              </option>{" "}
              {props.apiData &&
                filteredNames.map((val, i) => {
                  if (val.applicationType !== null) {
                    return (
                      <option key={i} value={val.applicationType}>
                        {val.applicationType}
                      </option>
                    );
                  }
                })}
            </select>
          </FormGroup>
        </Col>
        <Col className="mb-3">
          <FormGroup>
            <Label>{"ApplicationId"}</Label>
            <Input
              data-testid="application-Id"
              className="form-control"
              type="text"
              onChange={(e) => setApplicationId(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col className="mb-3">
          <FormGroup>
            <Label>{"Start Dtae"}</Label>
            <Input
              data-testid="start-date"
              className="form-control"
              value={search.start}
              onChange={(e) => setSearch({ ...search, start: e.target.value })}
              type="date"
            />
          </FormGroup>
        </Col>
        <Col className="mb-3">
          <FormGroup>
            <Label>{"End Dtae"}</Label>
            <Input
              data-testid="end-date"
              className="form-control"
              value={search.end}
              onChange={(e) => setSearch({ ...search, end: e.target.value })}
              type="date"
            />
          </FormGroup>
        </Col>
        <Col className="py-2">
          <button
            data-testid="search-button"
            type="button"
            className="btn btn-primary my-4"
            onClick={() => buttonSubmit()}
          >
            Search logger
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default FilterData;
