import { Skeleton, Spin, Table } from "antd";

export default function ComTable({ x,columns, dataSource, loading, ...props }) {
  return (
    <>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: x||1520,
          y: "55vh",
        }}
        bordered
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        loading={loading}
        {...props}
      />
    </>
  );
}
