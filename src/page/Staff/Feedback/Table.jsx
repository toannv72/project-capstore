import React, { useEffect, useState } from "react";
import ComTable from "../../../Components/ComTable/ComTable";
import { Typography } from "antd";
import useColumnSearch from "../../../Components/ComTable/utils";
import { useModalState } from "../../../hooks/useModalState";
import { useTableState } from "../../../hooks/useTableState";
import ComModal from "../../../Components/ComModal/ComModal";
import DetailFeedback from "./DetailFeedback";

const Table = () => {
  const [data, setData] = useState([]);
  const table = useTableState();
  const modalDetail = useModalState();
  const [selectedUser, setSelectedUser] = useState(null);
  const { getColumnSearchProps } = useColumnSearch();
  const showModal = (record) => {
    modalDetail.handleOpen();
    setSelectedUser(record);
  };
  const columns = [
    {
      title: "Người đánh giá",
      dataIndex: "fullName",
      width: 40,
      key: "fullName",
      fixed: "left",
      ...getColumnSearchProps("fullName", "Họ và tên"),
    },
    {
      title: "Dịch vụ",
      width: 50,
      dataIndex: "service",
      key: "service",
      ...getColumnSearchProps("service", "Dịch vụ"),
    },
    {
      title: "Đánh giá",
      width: 70,
      dataIndex: "feedback",
      key: "feedback",
      ...getColumnSearchProps("feedback", "Đánh giá"),
    },
    {
      title: "Ngày thực hiện",
      width: 50,
      dataIndex: "serviceDate",
      key: "serviceDate",
      ...getColumnSearchProps("serviceDate", "Ngày thực hiện"),
    },
    {
      key: "operation",
      fixed: "right",
      width: 30,
      render: (_, record) => (
        <div className="flex items-center flex-col">
          <div>
            <div>
              <Typography.Link onClick={() => showModal(record)}>
                Chi tiết
              </Typography.Link>
            </div>
          </div>
        </div>
      ),
    },
  ];
  useEffect(() => {
    //call api
  }, []);
  return (
    <div>
      <ComTable columns={columns} dataSource={data} loading={table.loading} />
      <ComModal
        isOpen={modalDetail?.isModalOpen}
        onClose={modalDetail?.handleClose}
        width={"50%"}
      >
        <DetailFeedback
          selectedUser={selectedUser}
          onClose={modalDetail?.handleClose}
        />
      </ComModal>
    </div>
  );
};

export default Table;
