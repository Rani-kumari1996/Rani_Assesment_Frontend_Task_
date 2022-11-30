import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Input, Label, FormGroup } from "reactstrap";

const FilterData = (props) => {
  const navigate = useNavigate();
  const [actionType, setActionType] = useState();
  const [applicationType, setApplicationType] = useState();
  const [applicationId, setApplicationId] = useState();
  const [search, setSearch] = useState({ start: "", end: "" });
  let filtered;
  let filteredNames;

  const buttonSubmit = () => {
    if (actionType) {
      props.filterUsers("actionType", actionType);
      setActionType();
      if (actionType && applicationType) {
        props.filterUsers("applicationType", applicationType);
        setApplicationType();
      }
    } else if (applicationType) {
      props.filterUsers("applicationType", applicationType);
      setApplicationType();
    } else if (applicationId) {
      props.filterApplication("applicationId", applicationId);
      setApplicationId();
    } else if (search.start !== "" && search.end !== "") {
      props.filterdate(search);
    }

    let search1 = actionType
      ? `actionType=${actionType}`
      : applicationType
      ? `applicationType=${applicationType}`
      : applicationId
      ? `applicationId=${applicationId}`
      : search.start
      ? `startDate =${search.start},${search.end}`
      : "No data found";
    navigate({ pathname: "/", search: `${search1} ` });
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
  return (
    <Container>
      <Row>
        <Col className="mb-3">
          <Label>{"ActionType"}</Label>
          <select
            data-testid="select-toogle"
            value={actionType}
            onChange={(e) => setActionType(e.target.value)}
            className="option1"
          >
            <option value="" />
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
              value={applicationType}
              onChange={(e) => setApplicationType(e.target.value)}
              className="option1"
            >
              <option value="" />
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
        <Col class="py-2">
          <button
            data-testid="search-button"
            type="button"
            class="btn btn-primary my-4"
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
