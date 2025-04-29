import React, { useEffect, useState } from "react";
import { Table, Card, Statistic, Button, Popconfirm, message } from "antd";
import axios from "axios";
import { SERVER_URL } from "../../config";

const RecordEntries = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
    const token=localStorage.getItem("price-my-ride-x-token")
  const fetchData = async () => {
    setLoading(true);
    console.log(token,"token")
    try {
      const res = await axios.get(`${SERVER_URL}/api/record/getAll?page=${page}`,
        {headers:{
        Authorization: `Bearer ${token}` 
      }});
      setData(res.data.records);
      setTotal(res.data.total);
    } catch (error) {
      message.error("Failed to fetch data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${SERVER_URL}/api/record/delete?id=${id}`,
        {headers:{
        Authorization: `Bearer ${token}` 
      }});
      alert("Record deleted successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to delete record");
    }
  };

  const columns = [
    { title: "Year", dataIndex: "year", key: "year" },
    { title: "Make", dataIndex: "make", key: "make" },
    { title: "Model", dataIndex: "model", key: "model" },
    { title: "Odometer", dataIndex: "odometer", key: "odometer" },
    { title: "Specifications", dataIndex: "specifications", key: "specifications" },
    { title: "Wholesale Low", dataIndex: "wholesale_low", key: "wholesaleLow" },
    { title: "Wholesale High", dataIndex: "wholesale_high", key: "wholesaleHigh" },
    { title: "Retail Low", dataIndex: "retail_low", key: "retailLow" },
    { title: "Retail High", dataIndex: "retail_high", key: "retailHigh" },
    { 
      title: "Date", 
      dataIndex: "createdAt", 
      key: "date",
      render: (date) => date ? new Date(date).toLocaleString() : "N/A" 
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-3">
        <Card className="shadow-md rounded-lg">
          <Statistic title="Total Entries" value={total} />
        </Card>
        {/* <Card className="shadow-md rounded-lg">
          <Statistic title="Avg Odometer" value={2} suffix="km" />
        </Card>
        <Card className="shadow-md rounded-lg">
          <Statistic title="Price Range" value={23} />
        </Card> */}
      </div>
      <div className="flex w-full justify-end mb-3">
        <Button type="primary" onClick={fetchData} loading={loading}>
          Refetch Data
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: page,
          pageSize: 10,
          total: total,
          onChange: (page) => setPage(page),
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total} entries`,
        }}
      />
    </div>
  );
};

export default RecordEntries;
