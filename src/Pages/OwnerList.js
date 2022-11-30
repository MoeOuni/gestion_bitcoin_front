import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { deleteClient, fetchClients } from "../API/actions";
import get from "lodash.get";
import isequal from "lodash.isequal";
import Title from "../Components/Title";
import EditModal from "../Components/EditModal";
import moment from "moment";

const { Text } = Typography;

const OwnerList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      const { data } = await fetchClients();
      setData(data);
      console.log(data);
      return data;
    }
    fetchAll();
  }, []);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${title}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      get(record, dataIndex)
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      isequal(searchedColumn, dataIndex) ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleDelete = async (key) => {
    try {
      await deleteClient(key);
      setData((data) => data.filter((item) => item.idOwner !== key));
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: "Id #",
      dataIndex: "idOwner",
    },
    {
      title: "Client's Name",
      dataIndex: "nomOwner",
      ...getColumnSearchProps("nomOwner", "By Name"),
    },
    {
      title: "Currency",
      dataIndex: ["bitcoin", "bitcoinName"],
      ...getColumnSearchProps(["bitcoin", "bitcoinName"], "By Currency"),
    },
    {
      title: "Amount",
      dataIndex: "coinsOwned",
      ...getColumnSearchProps("coinsOwned", "Amount"),
      sorter: (a, b) => a.coinsOwned - b.coinsOwned,
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      render: (_, text) => (
        <Typography.Text>{moment(text).format("YYYY-MM-DD")}</Typography.Text>
      ),
      ...getColumnSearchProps("purchaseDate", "Date"),
      sorter: (a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate),
    },
    {
      title: "Price",
      dataIndex: ["bitcoin", "bitcoinPrice"],
      sorter: (a, b) => a.bitcoin.bitcoinPrice - b.bitcoin.bitcoinPrice,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <EditModal data={record} dataList={data} setDataList={setData} />
          <Popconfirm
            className="mx-2"
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.idOwner)}
          >
            <a className="text-danger">Delete</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Title text={"Clients List"} />
      <div className="mt-5">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </>
  );
};

export default OwnerList;
