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
import ComMenuButonTable from "./../../../Components/ComMenuButonTable/ComMenuButonTable";
import EditServicePackage from "./../ServicePackage/EditServicePackage";
import { EditServicePackageCategories } from "./EditServicePackageCategories";
import { useNotification } from "../../../Notification/Notification";
import ComConfirmDeleteModal from "../../../Components/ComConfirmDeleteModal/ComConfirmDeleteModal";
export const TableServicePackageCategories = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const table = useTableState();
  const modal = useModalState();
  const { getColumnSearchProps } = useColumnSearch();
  const modalDetail = useModalState();
  const { notificationApi } = useNotification();

  const [selectedData, setSelectedData] = useState(null);
  console.log(data);
  const reloadData = () => {
    table.handleOpenLoading();
    getData("/service-package-categories?State=Active&SortDir=Desc")
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
  useEffect(() => {
    reloadData();
  }, []);

  const columns = [
    {
      title: "Tên thể loại",
      width: 350,
      fixed: "left",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a?.name?.localeCompare(b?.name),
      ...getColumnSearchProps("name", "Tên thể loại"),
    },
    // {
    //   title: "Số lượng dịch vụ sử dụng",
    //   width: 150,
    //   dataIndex: "index",
    //   key: "index",
    // },
    // {
    //   title: "Số lượng dịch vụ đã hết hạn",
    //   width: 150,
    //   dataIndex: "index",
    //   key: "index",
    // },
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
            showModalEdit={() => {
              modalDetail.handleOpen();
              setSelectedData(record);
            }}
            showModalDelete={() => {
              ComConfirmDeleteModal(
                `/service-package-categories`,
                record.id,
                `Bạn có chắc chắn muốn xóa?`,
                reloadData,
                notificationSuccess,
                notificationError,
                "put"
              );
            }}
            // extraMenuItems={extraMenuItems}
            excludeDefaultItems={["details"]}
          />
        </div>
      ),
    },
  ];
  const notificationSuccess = () => {
    notificationApi("success", "Đã xóa", "Đã xóa thể loại dịch vụ thành công!");
  };
  const notificationError = () => {
    notificationApi(
      "error",
      "Không thành công ",
      "Xóa thể loại dịch vụ không thành công!"
    );
  };
  return (
    <div>
      <ComTable
        // expandable={{
        //   expandedRowRender,
        //   defaultExpandedRowKeys: ["0"],
        // }}
        x
        columns={columns}
        dataSource={data}
        loading={table.loading}
      />
      <ComModal
        isOpen={modalDetail?.isModalOpen}
        onClose={modalDetail?.handleClose}
      >
        <EditServicePackageCategories
          selectData={selectedData}
          onClose={modalDetail?.handleClose}
          tableRef={reloadData}
        />
      </ComModal>
    </div>
  );
});
