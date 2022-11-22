import React, { Fragment, useState, useEffect } from "react";
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
import SearchData from "./SearchData";
import "./data.css";
const Alldata = () => {
  const [datas, setDatas] = useState([]);
  const [totalPage, settotalPage] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [currentPage, setcurrentPage] = useState(0);
  const [dataHolder, setDataHolder] = useState([]);
  const [flag, setflag] = useState({
    user: false,
  });
  const fetchLogs = async () => {
    await axios
      .get("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f")
      .then((res) => {
        console.log(res, "sdasds");
        setDatas(res.data.result.auditLog);
        setTotalData(res.data.result.auditLog);
        setDataHolder(res.data.result.auditLog);
        settotalPage(
          Array.from(
            { length: Math.ceil(res.data.result.auditLog.length / 10) },
            (v, i) => i + 1
          )
        );
        getCount(1, res.data.result.auditLog);
      })
      .catch((err) => {
        console.log(err.response);
        // toast.error(err.response.error);
      });
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getCount = (id, data) => {
    console.log(data, id, "data");
    const temp = Array.from(
      { length: Math.ceil(data.length / 10) },
      (v, i) => i + 1
    );
    if (id > 0 && temp[temp.length - 1] >= id) {
      const temp = data.filter((ele, i) => i < id * 10 && i >= id * 10 - 10);
      setcurrentPage(id);
      setDatas(temp);
    } else {
      setDatas(data);
    }
  };

  const sortByLogId = (id) => {
    const result = totalData.sort((x, y) => x.logId - y.logId);
    if (flag.user) {
      result.reverse();
    }
    setDatas(result);
    settotalPage(
      Array.from({ length: Math.ceil(result.length / 10) }, (v, i) => i + 1)
    );
    getCount(1, result);
    setflag({ user: !flag.user });
  };

  const sortApplicationType = (id) => {
    const result = totalData.sort(
      (x, y) =>
        x.applicationType && x.applicationType.localeCompare(y.applicationType)
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
  };
  const sortApplicationId = (id) => {
    const result = totalData.sort((x, y) => x.applicationId - y.applicationId);
    if (flag.user) {
      result.reverse();
    }
    setDatas(result);
    settotalPage(
      Array.from({ length: Math.ceil(result.length / 10) }, (v, i) => i + 1)
    );
    getCount(1, result);
    setflag({ user: !flag.user });
  };

  const sortByActionType = (id) => {
    const result = totalData.sort(
      (x, y) => x.actionType && x.actionType.localeCompare(y.actionType)
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
  };

  const sortByCompanyId = (id) => {
    const result = totalData.sort((x, y) => x.companyId - y.companyId);
    if (flag.user) {
      result.reverse();
    }
    setDatas(result);
    settotalPage(
      Array.from({ length: Math.ceil(result.length / 10) }, (v, i) => i + 1)
    );
    getCount(1, result);
    setflag({ user: !flag.user });
  };

  const sortByDate = (id) => {
    const result = totalData.sort((x, y) =>
      x.creationTimestamp.localeCompare(y.creationTimestamp)
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
  };

  const filterUsers = async (filterby, search) => {
    search = search.trim().toLowerCase();
    console.log(filterby, search, totalData, "filter by search");
    if (search !== "") {
      const data = dataHolder.filter((ele) => {
        if (ele[filterby] && ele[filterby].toLowerCase().includes(search)) {
          return ele;
        }
      });
      console.log(data, "162");
      setTotalData(data);
      settotalPage(
        Array.from({ length: Math.ceil(data.length / 10) }, (v, i) => i + 1)
      );
      getCount(1, data);
    } else {
      setTotalData(dataHolder);
      settotalPage(
        Array.from(
          { length: Math.ceil(dataHolder.length / 10) },
          (v, i) => i + 1
        )
      );
      getCount(1, dataHolder);
    }
  };
  const filterApplication = async (filterby, search) => {
    search = search.trim();
    console.log(filterby, search, totalData, "filter by search");
    if (search !== "") {
      const data = dataHolder.filter((ele) => {
        if (ele[filterby] && ele[filterby].toString().includes(search)) {
          return ele;
        }
      });
      console.log(data, "162");
      setTotalData(data);
      settotalPage(
        Array.from({ length: Math.ceil(data.length / 10) }, (v, i) => i + 1)
      );
      getCount(1, data);
    } else {
      setTotalData(dataHolder);
      settotalPage(
        Array.from(
          { length: Math.ceil(dataHolder.length / 10) },
          (v, i) => i + 1
        )
      );
      getCount(1, dataHolder);
    }
  };
  const filterdate = async (date) => {
    console.log(date, "182");
    console.log(new Date(date.start).getTime());
    console.log(new Date(date.end).getTime());
    if (date.start !== "" && date.end !== "") {
      const start = new Date(date.start).getTime();
      const end = new Date(date.end).getTime();

      const data = dataHolder.filter((ele) => {
        if (ele["creationTimestamp"]) {
          const temp = new Date(ele["creationTimestamp"]).getTime();
          if (temp >= start && temp <= end) {
            return ele;
          }
        }
      });
      console.log(data, "162");
      setTotalData(data);
      settotalPage(
        Array.from({ length: Math.ceil(data.length / 10) }, (v, i) => i + 1)
      );
      getCount(1, data);
    } else {
      setTotalData(dataHolder);
      settotalPage(
        Array.from(
          { length: Math.ceil(dataHolder.length / 10) },
          (v, i) => i + 1
        )
      );
      getCount(1, dataHolder);
    }
  };
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col>
            <div className="p-4 m-10 !important">
              <SearchData
                datas={datas}
                filterUsers={filterUsers}
                filterdate={filterdate}
                filterApplication={filterApplication}
              />
            </div>
            <div className="p-4 m-10 !important">
              <Table striped class="m-10">
                <thead>
                  <tr>
                    <th>
                      Log Id
                      <i
                        className="fa fa-sort"
                        onClick={() => sortByLogId()}
                      ></i>
                    </th>
                    <th>
                      Application Type
                      <i
                        className="fa fa-sort"
                        onClick={() => sortApplicationType()}
                      ></i>
                    </th>
                    <th>
                      Application Id
                      <i
                        className="fa  fa-sort"
                        onClick={() => sortApplicationId()}
                      ></i>
                    </th>
                    <th>
                      Company Id
                      <i
                        className="fa fa-sort"
                        onClick={() => sortByCompanyId()}
                      ></i>
                    </th>
                    <th>
                      Action Type
                      <i
                        className="fa  fa-sort"
                        onClick={() => sortByActionType()}
                      ></i>
                    </th>
                    <th>
                      Date : Time
                      <i
                        className="fa fa-sort"
                        onClick={() => sortByDate()}
                      ></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((data, i) => {
                    return (
                      <tr key={i}>
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
                    onClick={() => getCount(currentPage - 1, totalData)}
                  >
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">{"Previous"}</span>
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
                    onClick={() => getCount(currentPage + 1, totalData)}
                  >
                    <span aria-hidden="true">»</span>
                    <span className="sr-only">{"Next"}</span>
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

export default Alldata;