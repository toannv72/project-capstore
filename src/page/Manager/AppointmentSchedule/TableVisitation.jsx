import React from "react";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { Badge, Table, Tooltip, Typography } from "antd";
import ComTable from "../../../Components/ComTable/ComTable";
import useColumnSearch from "../../../Components/ComTable/utils";
import ComModal from "./../../../Components/ComModal/ComModal";
import { getData } from "../../../api/api";
import { useTableState } from "../../../hooks/useTableState";
import { useModalState } from "./../../../hooks/useModalState";
import ComPhoneConverter from './../../../Components/ComPhoneConverter/ComPhoneConverter';
import ComDateConverter from './../../../Components/ComDateConverter/ComDateConverter';
export default function TableVisitation() {
  const [data, setData] = useState([]);
  const table = useTableState();
  const modal = useModalState();

  const { getColumnSearchProps, getColumnApprox, getColumnApprox1 } =
    useColumnSearch();
  const {
    text: {
      InstituteManagement,
      common: { button },
    },
  } = useContext(LanguageContext);
console.log(data);
  const columns = [
    {
      title: "Người đăng ký",
      width: 150,
      fixed: "left",
      dataIndex: "user",
      key: "user",
      ...getColumnSearchProps("user.fullName", "Người đăng ký"),
      render: (text, record) => text.fullName,
    },

    {
      title: "Thời gian đăng ký",
      width: 200,
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      ...getColumnApprox("createdAt", "Thời gian đăng ký"),
      render: (_, render) => (
        <div>
          <ComDateConverter>{render?.createdAt}</ComDateConverter>
        </div>
      ),
    },
    {
      title: "Thời gian đến ",
      width: 200,
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      ...getColumnApprox("date", "Thời gian đăng ký"),
      render: (_, render) => (
        <div>
          <ComDateConverter>{render?.date}</ComDateConverter>
        </div>
      ),
    },
    {
      title: "Số điện thoại",
      width: 200,
      dataIndex: "user",
      key: "user.phoneNumber",
      ...getColumnSearchProps("user.phoneNumber", "Số điện thoại"),
      render: (phone) => (
        <div>
          <ComPhoneConverter>{phone.phoneNumber}</ComPhoneConverter>
        </div>
      ),
    },
    {
      title: "Phòng",
      width: 200,
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status", "Phòng"),
    },
    {
      title: "Ngày thăm",
      width: 200,
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status", "Ngày thăm"),
    },
    {
      title: "Thời gian",
      width: 200,
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status", "Thời gian"),
    },
    // {
    //   title: "Action",
    //   key: "operation",
    //   fixed: "right",
    //   width: 100,
    //   render: (_, record) => (
    //     <div className="flex items-center flex-col">
    //       <div>
    //         <Typography.Link onClick={() => modal?.handleOpen(record)}>
    //           Chấp nhận
    //         </Typography.Link>
    //       </div>
    //     </div>
    //   ),
    // },
  ];
  useEffect(() => {
    table.handleOpenLoading();
    getData("/appointments")
      .then((e) => {
        setData(e?.data?.contends);
        table.handleCloseLoading();
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);
  return (
    <div>
      <ComTable columns={columns} dataSource={data} loading={table.loading} />
      <ComModal isOpen={modal?.isModalOpen} onClose={modal?.handleClose}>
        <div key={2}>heloo</div>
      </ComModal>
    </div>
  );
}
