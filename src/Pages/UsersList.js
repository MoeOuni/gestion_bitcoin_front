import { Table, Tag } from "antd";
import { useState, useEffect } from "react";
import { getUsers } from "../API/actions";
import Title from "../Components/Title";

const columns = [
  {
    title: "ID",
    dataIndex: "user_id",
  },
  {
    title: "Username",
    dataIndex: "username",
  },
  {
    title: "Enabled",
    render: (_, record) => (
      <>
        {record.enabled ? (
          <Tag color="green">Enabled</Tag>
        ) : (
          <Tag color="red">Disabled</Tag>
        )}
      </>
    ),
  },
  {
    title: "Role(s)",
    render: (_, record) => (
      <>
        {record.roles.map((elem) => {
          return elem.role === "ADMIN" ? (
            <Tag color="cyan">ADMIN</Tag>
          ) : (
            <Tag color="blue">USER</Tag>
          );
        })}
      </>
    ),
  },
];

const UsersList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      const { data } = await getUsers();
      setData(data);
      return data;
    }
    fetchAll();
  }, []);
  return (
    <div>
      <Title text="Users's List" />
      <Table
        className="mt-4"
        columns={columns}
        bordered
        dataSource={data}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default UsersList;
