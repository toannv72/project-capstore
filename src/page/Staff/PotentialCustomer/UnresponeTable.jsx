import React, { useEffect, useImperativeHandle, useState } from "react";
import useColumnSearch from "../../../Components/ComTable/utils";
import ComTable from "../../../Components/ComTable/ComTable";
import ComModal from "../../../Components/ComModal/ComModal";
import { useTableState } from "../../../hooks/useTableState";
import { useModalState } from "../../../hooks/useModalState";
import { Typography } from "antd";
import DetailPotentialCustomer from "./DetailPotentialCustomer";
import { getData } from "../../../api/api";
import ComMenuButonTable from "../../../Components/ComMenuButonTable/ComMenuButonTable";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";

export default function UnresponeTable({ ref }) {
  const [data, setData] = useState([]);
  const table = useTableState();
  const modalDetail = useModalState();
  const [selected, setSelected] = useState(null);
  const { getColumnSearchProps, getColumnApprox } = useColumnSearch();
  const showModal = (record) => {
    modalDetail.handleOpen();
    setSelected(record);
  };
  console.log(data);
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
      title: "Thời gian tạo",
      width: 50,
      dataIndex: "createdAt",
      key: "createdAt",
      ...getColumnApprox("createdAt", "Thời gian tạo"),
      render: (record) => (
        <div>
          <ComDateConverter>{record}</ComDateConverter>
        </div>
      ),
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
      title: "nội dung",
      width: 100,
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description", "nội dung"),
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
          <ComMenuButonTable
            record={record}
            showModalDetails={() => showModal(record)}
            // showModalEdit={showModalEdit}
            // extraMenuItems={extraMenuItems}
            // showModalDelete={extraMenuItems}
            excludeDefaultItems={["delete", "edit"]}
            // order={order}
          />
        </div>
      ),
    },
  ];


  useEffect(() => {
    reloadData();
  }, []);
  const reloadData = () => {
    getData("/potential-customer?SortDir=Desc")
      .then((e) => {
        setData(e?.data?.contends);
        table.handleCloseLoading();
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
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
          selectedUser={selected}
          onClose={modalDetail?.handleClose}
        />
      </ComModal>
    </div>
  );
}
