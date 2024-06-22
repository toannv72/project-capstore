import React, { forwardRef, useImperativeHandle } from "react";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { Badge, Image, Table, Tooltip, Typography } from "antd";
import ComTable from "../../../Components/ComTable/ComTable";
import useColumnSearch from "../../../Components/ComTable/utils";
import ComModal from "../../../Components/ComModal/ComModal";
import { getData } from "../../../api/api";
import { useTableState } from "../../../hooks/useTableState";
import { useModalState } from "../../../hooks/useModalState";
import EditNursingPackage from "./EditNursingPackage";
import ComMenuButonTable from "../../../Components/ComMenuButonTable/ComMenuButonTable";
export const TableNursingPackage = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const table = useTableState();
  const [selectedData, setSelectedData] = useState(null);
  const modal = useModalState();
  const { getColumnSearchProps } = useColumnSearch();
  const modalEdit = useModalState();

  function formatCurrency(number) {
    // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
    if (typeof number === "number") {
      return number.toLocaleString("en-US", {
        style: "currency",
        currency: "VND",
      });
    }
  }

  const columns = [
    {
      title: "Tên gói",
      width: 150,
      fixed: "left",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name", "Tên gói"),
    },
    {
      title: "Ảnh gói",
      dataIndex: "imageUrl",
      key: "imageUrl",
      width: 100,
      fixed: "left",
      render: (_, record) => (
        <div className="flex items-center justify-center">
          {/* <img src={record.image} className='h-24 object-cover object-center   ' alt={record.image} /> */}

          <Image
            maskClassName="w-full h-full object-cover object-center lg:h-full lg:w-full "
            src={record.imageUrl}
            alt={record.imageAlt}
          />
        </div>
      ),
    },
    {
      title: "Giá Tiền",
      width: 150,
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (_, record) => (
        <div>
          <h1>{formatCurrency(record.price)}</h1>
        </div>
      ),
    },
    {
      title: "Số lượng người tối đa trong 1 phòng",
      width: 120,
      dataIndex: "registrationLimit",
      key: "registrationLimit",
      // // sorter: (a, b) => a.phone - b.phone,
      // ...getColumnSearchProps("numberBed", "Số người 1 phòng"),
    },
    {
      title: "Số người 1 phòng",
      width: 120,
      dataIndex: "capacity",
      key: "capacity",
      // // sorter: (a, b) => a.phone - b.phone,
      // ...getColumnSearchProps("numberBed", "Số người 1 phòng"),
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
      width: 50,
      render: (_, record) => (
        <div className="flex items-center flex-col">
          <ComMenuButonTable
            record={record}
            // showModalDetails={() => showModaldElder(record)}
            showModalEdit={showModalEdit}
            // extraMenuItems={extraMenuItems}
            excludeDefaultItems={["delete"]}
            // order={order}
          />
        </div>
      ),
    },
  ];
  const showModalEdit = (record) => {
    modalEdit.handleOpen();
    setSelectedData(record);
  };
  const reloadData = () => {
    table.handleOpenLoading();
    getData("/nursing-package?SortDir=Desc")
      .then((e) => {
        setData(e?.data?.contends);
        table.handleCloseLoading();
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  };
  useEffect(() => {
    reloadData();
  }, []);
  useImperativeHandle(ref, () => ({
    reloadData,
  }));
  return (
    <div>
      <ComTable columns={columns} dataSource={data} loading={table.loading} />
      <ComModal isOpen={modal?.isModalOpen} onClose={modal?.handleClose}>
        <div key={2}>heloo</div>
      </ComModal>
      <ComModal
        isOpen={modalEdit?.isModalOpen}
        onClose={modalEdit?.handleClose}
      >
        <EditNursingPackage
          selectedData={selectedData}
          onClose={modalEdit?.handleClose}
          tableRef={reloadData}
        />
      </ComModal>
    </div>
  );
});
