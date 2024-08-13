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
import ComConfirmDeleteModal from "../../../Components/ComConfirmDeleteModal/ComConfirmDeleteModal";
import { useNotification } from "../../../Notification/Notification";

export const TableNursingPackage = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const table = useTableState();
  const [selectedData, setSelectedData] = useState(null);
  const modal = useModalState();
  const { getColumnSearchProps, getColumnPriceRangeProps } = useColumnSearch();
  const modalEdit = useModalState();
  const { notificationApi } = useNotification();

  function formatCurrency(number) {
    // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
    if (typeof number === "number") {
      return number.toLocaleString("vi-VN",{
        style: "currency",
        currency: "VND",
      });
    }
  }
console.log(data);
  const columns = [
    {
      title: "Tên gói",
      width: 150,
      fixed: "left",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a?.name?.localeCompare(b?.name),
      ...getColumnSearchProps("name", "Tên gói"),
    },
    {
      title: "Ảnh gói",
      dataIndex: "imageUrl",
      key: "imageUrl",
      width: 100,
      fixed: "left",
      render: (_, record) => (
        <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
          {/* <img src={record.image} className='h-24 object-cover object-center   ' alt={record.image} /> */}

          <Image
            maskClassName="object-cover w-full h-full object-cover object-center flex items-center justify-center "
            src={record.imageUrl}
            preview={{ mask: "Xem ảnh" }}
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
      ...getColumnPriceRangeProps("price", "Giá Tiền"),
      render: (_, record) => (
        <div>
          <h1>{formatCurrency(record.price)}</h1>
        </div>
      ),
    },
    {
      title: "Số người 1 phòng",
      width: 120,
      dataIndex: "capacity",
      key: "capacity",
      sorter: (a, b) => a.capacity - b.capacity,
      // ...getColumnSearchProps("numberBed", "Số người 1 phòng"),
    },
    {
      title: "Số lượng điều dưỡng",
      width: 120,
      dataIndex: "numberOfNurses",
      key: "numberOfNurses",
      sorter: (a, b) => a.numberOfNurses - b.numberOfNurses,
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
      title: "Thao tác",
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
            showModalDelete={() => {
              ComConfirmDeleteModal(
                `/nursing-package`,
                record.id,
                `Bạn có chắc chắn muốn xóa?`,
                reloadData,
                notificationSuccess,
                notificationError,
                "put"
              );
            }}
            excludeDefaultItems={["details"]}
            // order={order}
          />
        </div>
      ),
    },
  ];
   const notificationSuccess = () => {
     notificationApi("success", "Đã xóa", "Đã xóa dịch vụ không thành công!");
   };
   const notificationError = () => {
     notificationApi("error", "Không thành công ", "Không thành công");
   };
  const showModalEdit = (record) => {
    modalEdit.handleOpen();
    setSelectedData(record);
  };
  const reloadData = () => {
    table.handleOpenLoading();
    getData("/nursing-package?State=Active&SortDir=Desc")
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
        width={800}
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
