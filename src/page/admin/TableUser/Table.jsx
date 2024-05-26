import React, { useEffect, useState } from "react";
import ComTable from "../../../Components/ComTable/ComTable";
import useColumnSearch from "../../../Components/ComTable/utils";
import { useModalState } from "../../../hooks/useModalState";
import { useTableState } from "../../../hooks/useTableState";
import { Tooltip, Typography } from "antd";
import ComModal from "../../../Components/ComModal/ComModal";
import DetailUser from "./DetailUser";
import EditUser from "./EditUser";

export default function Table() {
  const [data, setData] = useState([]);
  const { getColumnSearchProps } = useColumnSearch();
  const table = useTableState();
  const modalDetail = useModalState();
  const modalEdit = useModalState();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const datas = [];
    for (let i = 0; i < 46; i++) {
      datas.push({
        id: i,
        name: `Edward King ${i}`,
        phone: 32 + i,
        room: `${i}`,
        day: `${i}`,
      });
    }
    setData(datas);
    table.handleOpenLoading();
    table.handleCloseLoading();

    return () => {};
  }, []);

  const showModal = (record) => {
    modalDetail.handleOpen();
    setSelectedUser(record);
  };
  const showModalEdit = (record) => {
    modalEdit.handleOpen();
    setSelectedUser(record);
  };
  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      width: 100,
      key: "name",
      fixed: "left",
      ...getColumnSearchProps("name", "Họ và tên"),
      render: (record) => (
        <Tooltip placement="topLeft" title={"Chi tiết"}>
          {record}
        </Tooltip>
      ),
    },
    {
      title: "Số điện thoại",
      width: 100,
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone", "Số điện thoại"),
    },
    {
      title: "Phòng",
      width: 100,
      dataIndex: "room",
      key: "room",
      ...getColumnSearchProps("room", "room"),
    },
    {
      title: "Thời hạn",
      width: 100,
      dataIndex: "day",
      key: "day",
      ...getColumnSearchProps("day", "Thời hạn"),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 50,
      render: (_, record) => (
        <div className="flex items-center flex-col">
          <div>
            <div>
              <Typography.Link onClick={() => showModal(record)}>
                Chi tiết
              </Typography.Link>
            </div>
            <div>
              <Typography.Link onClick={() => showModalEdit(record)}>
                Chỉnh sửa
              </Typography.Link>
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <ComTable columns={columns} dataSource={data} loading={table.loading} />
      <ComModal
        isOpen={modalDetail?.isModalOpen}
        onClose={modalDetail?.handleClose}
      >
        <DetailUser selectedUser={selectedUser} />
      </ComModal>
      <ComModal
        isOpen={modalEdit?.isModalOpen}
        onClose={modalEdit?.handleClose}
      >
        <EditUser
          selectedUser={selectedUser}
          onClose={modalEdit?.handleClose}
        />
      </ComModal>
    </div>
  );
}
