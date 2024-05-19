import { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { Tooltip, Typography } from "antd";
import ComTable from "../../../Components/ComTable/ComTable";
import useColumnSearch from "../../../Components/ComTable/utils";
import ComModal from "./../../../Components/ComModal/ComModal";
import { getData } from "../../../api/api";
import { useTableState } from "../../../hooks/useTableState";
import { useModalState } from "./../../../hooks/useModalState";

function InstituteManagement() {
  const [order, setOrder] = useState([
    {
      id: 1,
      name: "toan",
      phone: "012321",
      email: "toan@gmail.ocm",
      description: "okeoke",
    },
  ]);
  const table = useTableState();
  const { isModalOpen, handleOpen, handleClose } = useModalState();
  const modal = useModalState();
  const { getColumnSearchProps } = useColumnSearch();
  const {
    text: {
      Login,
      common: { button },
    },
  } = useContext(LanguageContext);

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      width: 300,
      key: "id",
      fixed: "left",

      ...getColumnSearchProps("id", "Mã đơn hàng"),
      // render: (_, record) => <div></div>,
    },
    {
      title: "Tên Người đặt",
      width: 200,
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name", "tên"),
    },

    {
      title: "Số điện thoại",
      width: 200,
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps("phone", "phone"),
    },
    {
      title: "Email",
      width: 200,
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email", "email"),
    },
    {
      title: "Thông tin bổ sung",
      dataIndex: "description",
      key: "description",
      width: 300,
      ...getColumnSearchProps("description", "chi tiết"),

      ellipsis: {
        showTitle: false,
      },
      render: (record) => (
        <Tooltip placement="topLeft" title={record}>
          {record}
        </Tooltip>
      ),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <div className="flex items-center flex-col">
          <div>
            <Typography.Link onClick={() => modal?.handleOpen(record)}>
              Chấp nhận
            </Typography.Link>
          </div>
        </div>
      ),
    },
  ];
  useEffect(() => {
    table.handleOpenLoading();
    getData("/devices")
      .then((e) => {
        console.log("====================================");
        console.log(e);
        console.log("====================================");
        table.handleCloseLoading();
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  return (
    <>
      <ComTable columns={columns} dataSource={order} loading={table.loading} />
      <ComModal isOpen={modal?.isModalOpen} onClose={modal?.handleClose}>
        <div key={2}>heloo</div>
      </ComModal>
    </>
  );
}

export default InstituteManagement;
