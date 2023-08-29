import { CloseOutlined, FileDoneOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Card,
  Row,
  Col,
  Button,
  Form,
  Input,
  Select,
  Space,
  Tooltip,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Create_New_Account = () => {
  const { Option } = Select;
  const onFinish = (values) => {
    alert("Form Submitted");
    console.log("Received values of form: ", values);
  };

  const MyFormItemContext = React.createContext([]);
  function toArr(str) {
    return Array.isArray(str) ? str : [str];
  }
  const MyFormItemGroup = ({ prefix, children }) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatPath = React.useMemo(
      () => [...prefixPath, ...toArr(prefix)],
      [prefixPath, prefix]
    );
    return (
      <MyFormItemContext.Provider value={concatPath}>
        {children}
      </MyFormItemContext.Provider>
    );
  };
  const MyFormItem = ({ name, ...props }) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName =
      name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
    return <Form.Item name={concatName} {...props} />;
  };

  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const handleStateChange = (e) => {
    console.log(e);
  };

  const handleCancelButton = () => {
    alert("Submission Cancelled");
  };

  useEffect(() => {
    axios
      .get("http://localhost:20165/api/address/state/list")
      .then((res) => {
        setState(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:20165/api/address/city/list/?${state}`)
      .then((res) => {
        setCity(res.data);
        // console.log("city response", res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      style={{
        border: "0.5px solid black",
        borderRadius: "5px",
        margin: "1rem",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Breadcrumb
        style={{ paddingLeft: "1rem" }}
        items={[
          {
            title: <a href="/">Home</a>,
          },
          {
            title: <a href="customer/list">Customer List</a>,
          },
          {
            title: <a href="customer/list/create_new_account">New</a>,
          },
        ]}
      />
      <div
        style={{
          borderRadius: "5px",
          margin: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            textAlign: "left",
            backgroundColor: "rgb(247,247,247)",
            padding: "1rem",
            borderBottom: "1px solid black",
          }}
        >
          New
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <div style={{ width: "30%", textAlign: "left" }}>AccountID</div>
          <div
            style={{
              backgroundColor: "rgb(247,247,247)",
              width: "20%",
              textAlign: "left",
              padding: "8px",
              borderRadius: "5px",
            }}
          >
            00109
          </div>
        </div>

        <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
          {/* <MyFormItemGroup prefix={["user"]}> */}
          {/* <MyFormItemGroup prefix={["name"]}> */}
          <MyFormItem name="company" label="Company">
            <Input size="large" placeholder="write company here...." />
          </MyFormItem>
          <Row gutter={16}>
            {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
            <Col span={6} style={{ textAlign: "left" }}>
              <MyFormItem name="Address" label="Address">
                <Input
                  style={{ width: "200px" }}
                  size="large"
                  placeholder="write address here..."
                />
              </MyFormItem>
            </Col>
            <Col span={6} style={{ textAlign: "left" }}>
              <MyFormItem name="State" label="State">
                <Select
                  defaultValue=""
                  style={{ width: 200, dropdownPlacement: "bottomLeft" }}
                  size="large"
                  onChange={handleStateChange}
                >
                  {state &&
                    state.map((item, index) => {
                      return (
                        <Option key={index} value={item.name}>
                          {item.name}
                        </Option>
                      );
                    })}
                </Select>
              </MyFormItem>
            </Col>
            <Col span={6} style={{ textAlign: "left" }}>
              <MyFormItem name="City" label="City">
                <Select defaultValue="" style={{ width: 200 }} size="large">
                  {city &&
                    city.map((item, index) => {
                      return (
                        <Option key={index} value={item.name}>
                          {item.name}
                        </Option>
                      );
                    })}
                </Select>
              </MyFormItem>
            </Col>
            <Col span={6} style={{ textAlign: "left" }}>
              <MyFormItem name="Post Code" label="Post Code">
                {/* <Select defaultValue="" style={{ width: 200 }} size="large">
                      {state &&
                        state.map((item,index) => {
                          return (
                            <Option key={index} value={item.name}>
                              {item.name}
                            </Option>
                          );
                        })}
                    </Select> */}
                <Input
                  style={{ width: "200px" }}
                  size="large"
                  placeholder="type post code here..."
                />
              </MyFormItem>
            </Col>
            {/* </div> */}
          </Row>
          {/* </MyFormItemGroup> */}

          <div style={{ display: "flex", gap: "16px" }}>
            <MyFormItem name="Email" label="Email">
              <Input size="large" placeholder="enter email here" />
            </MyFormItem>
            <MyFormItem name="Phone" label="Phone">
              <Input size="large" placeholder="enter phone no. here" />
            </MyFormItem>
          </div>
          {/* </MyFormItemGroup> */}

          <div style={{ display: "flex", gap: "5px" }}>
            <Button type="primary" htmlType="submit">
              <FileDoneOutlined />
              Submit
            </Button>
            <Button
              style={{ backgroundColor: "red" }}
              onClick={handleCancelButton}
            >
              <CloseOutlined />
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Create_New_Account;
