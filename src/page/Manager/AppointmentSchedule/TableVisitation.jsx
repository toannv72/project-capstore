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
import ComStatusConverter from "../../../Components/ComStatusConverter/ComStatusConverter";
export default function TableVisitation() {
  const [data, setData] = useState([]);
  const table = useTableState();
  const modal = useModalState();
  const [selectedData, setSelectedData] = useState(null);

  const { getColumnSearchProps, getColumnApprox } = useColumnSearch();

  console.log(data);
  const columns = [
    {
      title: "Người đăng ký",
      width: 150,
      fixed: "left",
      dataIndex: "user",
      key: "user",
      sorter: (a, b) => a.user.fullName?.localeCompare(b.user.fullName),
      ...getColumnSearchProps("user.fullName", "Người đăng ký"),
      render: (text, record) => text.fullName,
    },
    {
      title: "Trạng thái",
      width: 150,
      fixed: "left",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status?.localeCompare(b.status),
      // ...getColumnSearchProps("status", "Người đăng ký"),
      filters: [
        { text: "Đang chờ", value: "Pending" },
        { text: "Đã hoàn thành", value: "Completed" },
        { text: "Đã hủy", value: "Cancelled" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (text, record) => <ComStatusConverter>{text}</ComStatusConverter>,
    },
    {
      title: "Tên loại hẹn",
      width: 200,
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name?.localeCompare(b.name),
      ...getColumnSearchProps("name", "Tên loại hẹn"),
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
      sorter: (a, b) => a.user.phoneNumber - b.user.phoneNumber,

      ...getColumnSearchProps("user.phoneNumber", "Số điện thoại"),
      render: (phone) => (
        <div>
          <ComPhoneConverter>{phone.phoneNumber}</ComPhoneConverter>
        </div>
      ),
    },

    // {
    //   title: "Nội dung",
    //   width: 200,
    //   dataIndex: "description",
    //   key: "description",
    //   sorter: (a, b) => a.description?.localeCompare(b.description),

    //   ...getColumnSearchProps("description", "Nội dung"),
    // },
    {
      title: "Ghi chú",
      width: 200,
      dataIndex: "notes",
      key: "notes",
      ...getColumnSearchProps("notes", "Ghi chú"),
    },
    {
      title: "Thao tác",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div className="flex items-center flex-col">
          <ComMenuButonTable
            record={record}
            showModalDetails={() => {
              modal?.handleOpen();
              setSelectedData(record);
            }}
            showModalEdit={() => {
              modal?.handleOpen();
              setSelectedData(record);
            }}
            // extraMenuItems={extraMenuItems}
            excludeDefaultItems={["delete", "edit"]}
            // order={order}
          />
        </div>
      ),
    },
  ];
  useEffect(() => {
    renderData();
  }, []);
  const renderData = () => {
    table.handleOpenLoading();
    getData("/appointments?Type=FollowUpVisit&SortDir=Desc")
      .then((e) => {
        setData(e?.data?.contends);
        table.handleCloseLoading();
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  };
  return (
    <div>
      <ComTable columns={columns} dataSource={data} loading={table.loading} />
      <ComModal isOpen={modal?.isModalOpen} onClose={modal?.handleClose} width={550}>
        <DetailAppointment
          selectedData={selectedData}
          renderData={renderData}
          onClose={modal?.handleClose}
        />
      </ComModal>
    </div>
  );
}
