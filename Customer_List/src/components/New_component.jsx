import { useEffect, useState } from "react";
import axios from "axios";
import { Input, Table, Button } from "antd";
import { useNavigate } from "react-router-dom";

 const firstRow={
  
    sr: "",
    account: (
      <Input
        type="text"
        style={{ fontSize: "15px" }}
        placeholder="search..."
        // value={row.accountID}
        // onChange={(e) => handleInputChange(index, e.target.value)}
      />
    ),
    name: (
      <Input
        type="text"
        style={{ fontSize: "15px" }}
        placeholder="search..."
        // value={row.accountID}
        // onChange={(e) => handleInputChange(index, e.target.value)}
      />
    ),
    email: "",
    phone: "",
    state: "",
    address: "",
    post_code: "",
  }
 

const New_component = () => {

 

  const [data, setData] = useState([
    firstRow
  ]);
  let navigate = useNavigate();
  const handleButtonNavigate = () => {
    navigate("/api/customer/personalDetails");
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
        company: "",
        postCode: "",
        accountID: "",
        debtorCategoryID: 0,
        accountStatusID: 0,
        accountStatus: "",
        city: "",
      },
    };

    axios
      .post("http://localhost:20165/api/customer/list", payload)
      .then((res) => {
        console.log(res.data.records);
       
        console.log(res.data.records);
        const fetchData = res.data.records.map((row, index) => ({
          sr: index ===  "" ,
          account:
              (
              <Button
                style={{ backgroundColor: "rgb(12,101,232)", color: "white" }}
                onClick={handleButtonNavigate}
              >
                {row.accountID}
              </Button>
            ),
          name:
            (
              row.company
            ),
          email:  row.email || "NA",
          phone:  row.phone || "NA",
          state: row.state || "NA",
          address:   row.address || "NA",
          post_code:   row.post_code || "NA",
        }));

        setData([firstRow,...fetchData ]);
      })
      .catch((err) => console.log(err));
  }, []);

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
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
    },
    {
      title: "Post Code",
      dataIndex: "post_code",
      key: "post_code",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 240 }}
      />
    </div>
  );
};

export default New_component;
