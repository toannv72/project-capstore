import React, { useEffect, useImperativeHandle, useState } from "react";
import ComTable from "../../../Components/ComTable/ComTable";
import ComModal from "../../../Components/ComModal/ComModal";
import DetailPotentialCustomer from "./DetailPotentialCustomer";
import { Typography } from "antd";
import { useTableState } from "../../../hooks/useTableState";
import { useModalState } from "../../../hooks/useModalState";
import useColumnSearch from "../../../Components/ComTable/utils";

export default function ResponedTable({ ref }) {
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
      title: "Họ và tên",
      dataIndex: "fullName",
      width: 90,
      key: "fullName",
      fixed: "left",
      ...getColumnSearchProps("fullName", "Họ và tên"),
    },
    {
      title: "Số điện thoại",
      width: 50,
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ...getColumnSearchProps("phoneNumber", "Số điện thoại"),
    },
    {
      title: "Email",
      width: 100,
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email", "Email"),
    },
    {
      title: "Chủ đề",
      width: 100,
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title", "Chủ đề"),
    },
    {
      title: "Địa chỉ",
      width: 100,
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address", "Địa chỉ"),
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
    reloadData();
  }, []);
  const reloadData = () => {
    //Call API
  };
  useImperativeHandle(ref, () => ({
    reloadData,
  }));
  return (
    <div>
      <ComTable columns={columns} dataSource={data} loading={table.loading} />
      <ComModal
        isOpen={modalDetail?.isModalOpen}
        onClose={modalDetail?.handleClose}
        width={"50%"}
      >
        <DetailPotentialCustomer
          selectedUser={selectedUser}
          onClose={modalDetail?.handleClose}
        />
      </ComModal>
    </div>
  );
}
