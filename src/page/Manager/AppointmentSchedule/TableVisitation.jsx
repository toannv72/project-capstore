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
import ComPhoneConverter from "./../../../Components/ComPhoneConverter/ComPhoneConverter";
import ComDateConverter from "./../../../Components/ComDateConverter/ComDateConverter";
import ComMenuButonTable from "../../../Components/ComMenuButonTable/ComMenuButonTable";
import DetailAppointment from "./DetailAppointment";
export default function TableVisitation() {
  const [data, setData] = useState([]);
  const table = useTableState();
  const modal = useModalState();
  const [selectedData, setSelectedData] = useState(null);

  const { getColumnSearchProps, getColumnApprox } =
    useColumnSearch();

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
      title: "Tên loại hẹn",
      width: 200,
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name", "Tên loại hẹn"),
    },
    {
      title: "Nội dung",
      width: 200,
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description", "Nội dung"),
    },
    {
      title: "Ghi chú",
      width: 200,
      dataIndex: "notes",
      key: "notes",
      ...getColumnSearchProps("notes", "Ghi chú"),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div className="flex items-center flex-col">
    
          <ComMenuButonTable
            record={record}
            showModalDetails={() => {
              modal?.handleOpen()
              setSelectedData(record)
            }}
            showModalEdit={() => {
              modal?.handleOpen()
              setSelectedData(record)
            }}
            // extraMenuItems={extraMenuItems}
            excludeDefaultItems={["delete","details"]}
            // order={order}
          />
        </div>
      ),
    },
  ];
  useEffect(() => {
    table.handleOpenLoading();
    getData("/appointments?Type=Consultation&SortDir=Desc")
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
        <DetailAppointment selectedData={selectedData}/>
      </ComModal>
    </div>
  );
}
