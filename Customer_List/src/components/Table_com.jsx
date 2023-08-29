import React, { useEffect, useState } from "react";
import "../App.css";
import { Button, Input, InputNumber, Select, Table, Alert } from "antd";
import {
  EyeOutlined,
  UserAddOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Table_com = () => {
  const [columnsHide, setColumnsHide] = useState(true);
  const [filter, setFilter] = useState("");
  const [filter_company, setFilter_company] = useState("");
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [length, setLength] = useState(0);

  const handleFilterChange = (event) => {
    // console.log(filter)
    setFilter(event.target.value);
  };

  const handleFilter_company = (event) => {
    // console.log(filter_company)
    setFilter_company(event.target.value);
  };

  let navigate = useNavigate();
  const handleButtonNavigate = () => {
    navigate("/api/customer/personalDetails");
  };

  const firstRow = {
    sr: "",
    account: (
      <Input
        type="text"
        // style={{ fontSize: "15px" }}
        size="medium"
        placeholder="search..."
        value={filter}
        onChange={handleFilterChange}
      />
    ),
    name: (
      <Input
        type="text"
        // style={{ fontSize: "15px" }}
        size="medium"
        placeholder="search..."
        value={filter_company}
        onChange={handleFilter_company}
      />
    ),
    email: "",
    phone: "",
    state: "",
    address: "",
    post_code: "",
  };

  useEffect(() => {
    const payload = {
      pageRequest: {
        currentPage: 1,
        pageSize: 50,
      },
      sortRequest: {
        key: "",
        direction: true,
      },
      filterRequest: {
        address: "",
        state: "",
        company: filter_company,
        postCode: "",
        accountID: filter,
        debtorCategoryID: 0,
        accountStatusID: 0,
        accountStatus: "",
        city: "",
      },
    };

    axios
      .post("http://localhost:20165/api/customer/list", payload)
      .then((res) => {
        console.log(res.data);

        setCurrentPage(res.data.currentPage);

        setLength(res.data.totalRecords);

        setPageSize(res.data.pageSize);
        // console.log(res.data.records);
        const fetchData = res.data.records.map((row, index) => ({
          sr: index + 1,
          account: (
            <Button
              style={{ backgroundColor: "rgb(12,101,232)", color: "white" }}
              onClick={handleButtonNavigate}
            >
              {row.accountID}
            </Button>
          ),
          name: row.company || "NA",
          email: row.emailAddress || "NA",
          phone: row.phone || "NA",
          state: row.state || "NA",
          country: row.country || "NA",
          post_code: row.postCode || "NA",
        }));

        setData([firstRow, ...fetchData]);
      })
      .catch((err) => console.log(err));
  }, [filter, filter_company]);

  const columns = [
    {
      title: "Sr.No",
      dataIndex: "sr",
      key: "sr",
      width: 10,
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
      align: "center",
      width: 200,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      hidden: columnsHide,
    },
    {
      title: "Post Code",
      dataIndex: "post_code",
      key: "post_code",
      hidden: columnsHide,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      hidden: columnsHide,
    },
  ].filter((col) => !col.hidden);

  const [changeIcon, setChangeIcon] = useState(false);

  const handleChange = (e) => {
    alert(`The value are ${e}`);
  };

  const handleCreateNewAccount = () => {
    navigate("/api/customer/create_new_account");
  };

  const handleExtenedecolumn = () => {
    setChangeIcon(!changeIcon);
    setColumnsHide(!columnsHide);
    // console.log(columnsHide)
  };

  const defaultStyle = {
    fontSize: "16px",
    fontWeight: "normal",
    transition: "font-size 0.3s, font-weight 0.3s",
    color: "rgb(12,101,232)",
    border: "1px solid blue",
  };

  const hoverStyle = {
    backgroundColor: "rgb(12,101,232)",
    color: "white",
  };

  return (
    <div
      style={{
        border: "0.15px solid black",
        borderRadius: "0.5rem",
        margin: "0.5rem",
        padding: "0.8rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ padding: "0.5rem" }}>
          showing <span style={{ fontWeight: "bold" }}>{currentPage}</span> to{" "}
          <span style={{ fontWeight: "bold" }}>{length}</span> out of{" "}
          <span style={{ fontWeight: "bold" }}>{pageSize}</span> entries
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          <Button
            style={{ backgroundColor: "rgb(12,101,232)", color: "white" }}
            onClick={handleCreateNewAccount}
          >
            <UserAddOutlined width={"50px"} /> Create New Account
          </Button>
          <Button
            onClick={handleExtenedecolumn}
            style={
              changeIcon ? { ...defaultStyle, ...hoverStyle } : defaultStyle
            }
          >
            {changeIcon ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            Extended Columns
          </Button>
        </div>
      </div>
      <div>
        <Table
          size="small"
          bordered={"1px solid black"}
          dataSource={data}
          columns={columns}
        />
      </div>

      <div style={{ display: "flex" }}>
        <Button
               size="medium"
        >
          Show
        </Button>
        <div>
          <Select
            defaultValue="10 Rows"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                value: "10",
                label: "10 Rows",
              },
              {
                value: "25",
                label: "25 Rows",
              },
              {
                value: "50",
                label: "50 Rows",
              },
              {
                value: "500",
                label: "500 Rows",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Table_com;
