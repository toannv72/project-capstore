import React from 'react'
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { Badge, Table, Tooltip, Typography } from "antd";
import ComTable from "../../../Components/ComTable/ComTable";
import useColumnSearch from "../../../Components/ComTable/utils";
import ComModal from "./../../../Components/ComModal/ComModal";
import { getData } from "../../../api/api";
import { useTableState } from "../../../hooks/useTableState";
import { useModalState } from "./../../../hooks/useModalState";
export default function TableRooms() {
  const [data, setData] = useState([]);
  const table = useTableState();
  const modal = useModalState();
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
        title: "Tên người bệnh",
        fixed: "left",
        width: 100,
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Status",
        width: 200,
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 50,
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
    return (
      <Table
        scroll={{
          x: 1520,
          y: "55vh",
        }}
        bdataed
        bordered
        columns={columns}
        dataSource={record?.elders}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
      />
    );
  };

  const columns = [
    {
      title: "Tên phòng",
      width: 150,
      fixed: "left",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name", InstituteManagement?.areaName),
    },
    {
      title: "Loại phòng",
      dataIndex: "type",
      key: "type",
      width: 100,
      ...getColumnSearchProps("type", "Loại phòng"),
    },
    {
      title: InstituteManagement?.status,
      width: 100,
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status", InstituteManagement?.status),
    },
    {
      title: "Số giường",
      dataIndex: "userBed",
      key: "userBed",
      width: 100,
      ...getColumnSearchProps("userBed", "Số giường"),
    },
    {
      title: "Số giường trống",
      dataIndex: "unusedBed",
      key: "unusedBed",
      width: 100,
      ...getColumnSearchProps("unusedBed", "Số giường trống"),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
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
    getData("/room")
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
      <ComTable
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
        }}
        columns={columns}
        dataSource={data}
        loading={table.loading}
      />
      <ComModal isOpen={modal?.isModalOpen} onClose={modal?.handleClose}>
        <div key={2}>heloo</div>
      </ComModal>
    </div>
  );
}
