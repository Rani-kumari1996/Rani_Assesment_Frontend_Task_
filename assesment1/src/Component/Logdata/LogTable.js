import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
} from "reactstrap";
import axios from "axios";
import FilterData from "./FilterData";
import "../../Style/LogTable.css";
const LogTable = () => {
  const [datas, setDatas] = useState([]);
  const [totalPage, settotalPage] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [currentPage, setcurrentPage] = useState(0);
  const [dataHolder, setDataHolder] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [flag, setflag] = useState({
    user: false,
  });
  const location = useLocation();
  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    await axios
      .get("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f")
      .then((res) => {
        setApiData(res.data.result.auditLog);
        setDataHolder(res.data.result.auditLog);
        settotalPage(
          Array.from(
            { length: Math.ceil(res.data.result.auditLog.length / 10) },
            (v, i) => i + 1
          )
        );
        getCount(1, res.data.result.auditLog);
        if (location.search) {
          let temp = JSON.parse(
            '{"' +
              decodeURI(
                location.search
                  .substring(1)
                  .replace(/&/g, '","')
                  .replace(/=/g, '":"')
              ) +
              '"}'
          );
          console.log(temp, "urldata");
          handleFilter(temp, res.data.result.auditLog);
        } else {
          setDatas(res.data.result.auditLog);
          setTotalData(res.data.result.auditLog);
          settotalPage(
            Array.from(
              { length: Math.ceil(res.data.result.auditLog.length / 10) },
              (v, i) => i + 1
            )
          );
          getCount(1, res.data.result.auditLog);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getCount = (id, data) => {
    const temp = Array.from(
      { length: Math.ceil(data.length / 10) },
      (v, i) => i + 1
    );
    if (id > 0 && temp[temp.length - 1] >= id) {
      const temp = data.filter((ele, i) => i < id * 10 && i >= id * 10 - 10);
      setcurrentPage(id);
      setDatas(temp);
    }
    if (data.length === 0) {
      setDatas([]);
    }
  };

  const sort = (id) => {
    if (id === "logId" || id === "companyId" || id === "applicationId") {
      const result = totalData.sort((x, y) => x[id] - y[id]);
      if (flag.user) {
        result.reverse();
      }
      setDatas(result);
      settotalPage(
        Array.from({ length: Math.ceil(result.length / 10) }, (v, i) => i + 1)
      );
      getCount(1, result);
      setflag({ user: !flag.user });
    } else if (id === "creationTimestamp") {
      const result = totalData.sort(
        (x, y) =>
          new Date(x["creationTimestamp"]).getTime() -
          new Date(y["creationTimestamp"]).getTime()
      );
      if (flag.user) {
        result.reverse();
      }
      setDatas(result);
      settotalPage(
        Array.from({ length: Math.ceil(result.length / 10) }, (v, i) => i + 1)
      );
      getCount(1, result);
      setflag({ user: !flag.user });
    } else {
      const result = totalData.sort(
        (x, y) => x[id] && x[id].localeCompare(y[id])
      );
      if (flag.user) {
        result.reverse();
      }
      setDatas(result);
      settotalPage(
        Array.from({ length: Math.ceil(result.length / 10) }, (v, i) => i + 1)
      );
      getCount(1, result);
      setflag({ user: !flag.user });
    }
  };

  const handleFilter = (data, urlData = []) => {
    let temp = urlData.length === 0 ? dataHolder : urlData;
    //actionType
    if (data.actionType) {
      console.log("actiontype");
      let search = data.actionType.trim().toLowerCase();
      if (search !== "") {
        temp = temp.filter((ele) => {
          if (
            ele["actionType"] &&
            ele["actionType"].toLowerCase().includes(search)
          ) {
            return ele;
          }
        });
      }
    }
    //applicationType
    if (data.applicationType) {
      console.log("applicationtype");
      let search = data.applicationType.trim().toLowerCase();
      if (search !== "") {
        temp = temp.filter((ele) => {
          if (
            ele["applicationType"] &&
            ele["applicationType"].toLowerCase().includes(search)
          ) {
            return ele;
          }
        });
        console.log(temp, "193");
      }
    }
    //appId
    if (data.applicationId) {
      console.log("applicationtyid");
      let search = data.applicationId;
      if (search !== "") {
        temp = temp.filter((ele) => {
          if (
            ele["applicationId"] &&
            ele["applicationId"].toString().includes(search)
          ) {
            return ele;
          }
        });
      }
    }
    //Startdate
    if (data.search && data.search?.start !== "") {
      console.log("startdate");
      const start = new Date(data.search.start).getTime();
      temp = temp.filter((ele) => {
        if (ele["creationTimestamp"]) {
          const date = new Date(ele["creationTimestamp"]).getTime();
          if (date >= start) {
            return ele;
          }
        }
      });
    }
    //Enddate
    if (data.search && data.search?.end !== "") {
      console.log("end");
      const end = new Date(data.search.end).getTime();
      temp = temp.filter((ele) => {
        if (ele["creationTimestamp"]) {
          const date = new Date(ele["creationTimestamp"]).getTime();
          if (date <= end) {
            return ele;
          }
        }
      });
    }
    setTotalData(temp);
    settotalPage(
      Array.from({ length: Math.ceil(temp.length / 10) }, (v, i) => i + 1)
    );
    getCount(1, temp);
  };
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col>
            <div className="p-4 m-10 !important">
              <FilterData
                datas={datas}
                apiData={apiData}
                handleFilter={handleFilter}
              />
            </div>
            <div className="p-4 m-10 !important">
              <Table striped class="m-10">
                <thead>
                  <tr>
                    <th>
                      Log Id
                      <i
                        data-testid="log-id"
                        className="fa fa-sort"
                        onClick={() => sort("logId")}
                      ></i>
                    </th>
                    <th>
                      Application Type
                      <i
                        data-testid="App-Type"
                        className="fa fa-sort"
                        onClick={() => sort("applicationType")}
                      ></i>
                    </th>
                    <th>
                      Application Id
                      <i
                        data-testid="App-Id"
                        className="fa  fa-sort"
                        onClick={() => sort("applicationId")}
                      ></i>
                    </th>
                    <th>
                      Company Id
                      <i
                        data-testid="Comp-id"
                        className="fa fa-sort"
                        onClick={() => sort("companyId")}
                      ></i>
                    </th>
                    <th>
                      Action Type
                      <i
                        data-testid="Action-Type"
                        className="fa  fa-sort"
                        onClick={() => sort("actionType")}
                      ></i>
                    </th>
                    <th>
                      Date : Time
                      <i
                        data-testid="Sort-Date"
                        className="fa fa-sort"
                        onClick={() => sort("creationTimestamp")}
                      ></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((data, i) => {
                    return (
                      <tr key={data.logId}>
                        <td>{data.logId}</td>
                        <td>{data.applicationType}</td>
                        <td>
                          <div className="d-inline-block align-middle">
                            <div className="d-inline-block">
                              {data.applicationId}
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="d-inline-block align-middle">
                            <div className="d-inline-block">
                              {data.companyId}
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="d-inline-block align-middle">
                            <div className="d-inline-block">
                              <span>{data.actionType}</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div>{data.creationTimestamp}</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <div className="d-flex justify-content-center">
              <Pagination aria-label="Page navigation">
                <PaginationItem>
                  <PaginationLink
                    data-testid="pagination-prev"
                    onClick={() => getCount(currentPage - 1, totalData)}
                  >
                    <span aria-hidden="true">«</span>
                  </PaginationLink>
                </PaginationItem>
                {totalPage.map((ele) => (
                  <PaginationItem>
                    <PaginationLink onClick={() => getCount(ele, totalData)}>
                      {ele}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationLink
                    data-testid="pagination-fwd"
                    onClick={() => getCount(currentPage + 1, totalData)}
                  >
                    <span aria-hidden="true">»</span>
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default LogTable;
