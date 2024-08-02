import React, { forwardRef, useImperativeHandle } from "react";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { Badge, Table, Tooltip, Typography } from "antd";
import ComTable from "../../../Components/ComTable/ComTable";
import useColumnSearch from "../../../Components/ComTable/utils";
import ComModal from "./../../../Components/ComModal/ComModal";
import { getData } from "../../../api/api";
import { useTableState } from "../../../hooks/useTableState";
import { useModalState } from "./../../../hooks/useModalState";
import ComMenuButonTable from "../../../Components/ComMenuButonTable/ComMenuButonTable";
import EditBlock from "./EditBlock";
import ComConfirmDeleteModal from "./../../../Components/ComConfirmDeleteModal/ComConfirmDeleteModal";
import { useNotification } from "../../../Notification/Notification";

export const TableBlock = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const table = useTableState();
  const modal = useModalState();
  const [dataSelect, setDataSelect] = useState(null);
  const { notificationApi } = useNotification();
  const { getColumnSearchProps } = useColumnSearch();
  const {
    text: {
      InstituteManagement,
      common: { button },
    },
  } = useContext(LanguageContext);

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Tên phòng",
        fixed: "left",
        width: 100,
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a?.name?.localeCompare(b?.name),
        ...getColumnSearchProps("name", "tên khu"),
      },
      // {
      //   title: "Status",
      //   width: 100,
      //   dataIndex: "status",
      //   key: "status",
      // },
      {
        title: "Số giường",
        width: 100,
        dataIndex: "userBed",
        key: "userBed",
        sorter: (a, b) => a?.userBed - b?.userBed,
      },
      {
        title: "Loại phòng",
        width: 100,
        dataIndex: "type",
        key: "type",
        sorter: (a, b) => a?.type?.localeCompare(b?.type),
        ...getColumnSearchProps("type", "tên khu"),
      },
      {
        width: 100,
        title: "Số giường trống",
        dataIndex: "unusedBed",
        key: "unusedBed",
        sorter: (a, b) => a?.unusedBed - b?.unusedBed,
      },
    ];
    return (
      <Table
        scroll={{
          x: 1520,
          y: "55vh",
        }}
        bdataed
        bordered
        columns={columns}
        dataSource={record?.rooms}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
      />
    );
  };

  const columns = [
    {
      title: InstituteManagement?.areaName,
      width: 100,
      // fixed: "left",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a?.name?.localeCompare(b?.name),
      ...getColumnSearchProps("name", InstituteManagement?.areaName),
    },

    {
      title: InstituteManagement?.numberOfRooms,
      width: 100,
      dataIndex: "rooms",
      key: "rooms",
      sorter: (a, b) => a.rooms - b.rooms,
      render: (record) => <div>{record?.length}</div>,
      // ...getColumnSearchProps("totalFloor", InstituteManagement?.numberOfRooms),
    },
    {
      title: "Thao tác",
      key: "operation",
      fixed: "right",
      width: 40,
      render: (_, record) => (
        <div className="flex items-center flex-col">
          <ComMenuButonTable
            record={record}
            // showModalDetails={() => showModaldElder(record)}
            showModalEdit={() => {
              modal?.handleOpen(record);
              setDataSelect(record);
            }}
            showModalDelete={() => {
              ComConfirmDeleteModal(
                `/your-delete-api-path/`,
                record.id,
                `Bạn có chắc chắn muốn xóa?`,
                reloadData,
                notificationSuccess,
                notificationError
              );
            }}
            // extraMenuItems={extraMenuItems}
            excludeDefaultItems={["details", "delete"]}
            // order={order}
          />
        </div>
      ),
    },
  ];
  const notificationSuccess = () => {
    notificationApi("success", "Đã xóa", "đã xóa tạo phòng!");
  };
  const notificationError = () => {
    notificationApi("error", "Không thành công", "đã xóa tạo phòng!");
  };
  const reloadData = () => {
    table.handleOpenLoading();
    getData("/block?SortDir=Desc")
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
      <ComTable
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
        }}
        columns={columns}
        dataSource={data}
        loading={table.loading}
        x
        scroll={{
          // x: 1020,
          y: "55vh",
        }}
      />
      <ComModal isOpen={modal?.isModalOpen} onClose={modal?.handleClose}>
        <EditBlock
          getDataApi={reloadData}
          onClose={modal?.handleClose}
          dataSelect={dataSelect}
        />
      </ComModal>
    </div>
  );
});
