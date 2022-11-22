import React, { useState } from "react";
import { Container, Row, Col, Input, Label, FormGroup } from "reactstrap";
const SearchData = (props) => {
  const [search, setSearch] = useState({ start: "", end: "" });
  // const [filter, setfilter] = useState("");

  return (
    <Container>
      <Row>
        <Col className="mb-3">
          <Label>{"ActionType"}</Label>
          <Input
            className="form-control"
            type="text"
            onChange={(e) => props.filterUsers("actionType", e.target.value)}
          />
        </Col>
        <Col className="mb-3">
          <FormGroup>
            <Label>{"ApplicationTypes"}</Label>
            <Input
              className="form-control"
              type="text"
              onChange={(e) =>
                props.filterUsers("applicationType", e.target.value)
              }
            />
          </FormGroup>
        </Col>
        <Col className="mb-3">
          <FormGroup>
            <Label>{"ApplicationId"}</Label>
            <Input
              className="form-control"
              type="text"
              onChange={(e) =>
                props.filterApplication("applicationId", e.target.value)
              }
            />
          </FormGroup>
        </Col>
        <Col className="mb-3">
          <FormGroup>
            <Label>{"Start Dtae"}</Label>
            <Input
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
              className="form-control"
              value={search.end}
              onChange={(e) => setSearch({ ...search, end: e.target.value })}
              type="date"
            />
          </FormGroup>
        </Col>
        <Col class="py-2">
          <button
            type="button"
            class="btn btn-primary my-4"
            onClick={() => props.filterdate(search)}
          >
            Search logger
          </button>
        </Col>

        {/* <FormGroup>
            <Input
              className="form-control"
              name="alias"
              type="Submit"
              onClick={() => props.filterdate(search)}
            />
          </FormGroup> */}
      </Row>
    </Container>
  );
};

export default SearchData;
