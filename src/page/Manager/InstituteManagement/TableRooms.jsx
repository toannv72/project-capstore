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
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";

export const TableRooms = forwardRef((props, ref) => {
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
  console.log(data);
  useImperativeHandle(ref, () => ({
    reloadData,
  }));
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
        title: "Giới tính",
        width: 100,
        dataIndex: "gender",
        key: "gender",
      },
      {
        title: "Ngày có hiệu lực",
        width: 100,
        dataIndex: "effectiveDate",
        key: "effectiveDate",
        render: (_, render) => (
          <div>
            <ComDateConverter>{render?.effectiveDate}</ComDateConverter>
          </div>
        ),
      },
      {
        title: "Ngày hết hạn",
        width: 100,
        dataIndex: "expiryDate",
        key: "expiryDate",
        render: (_, render) => (
          <div>
            <ComDateConverter>{render?.expiryDate}</ComDateConverter>
          </div>
        ),
      },
      {
        title: "Địa chỉ",
        width: 100,
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Ghi chú",
        width: 100,
        dataIndex: "notes",
        key: "notes",
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
      width: 100,
      fixed: "left",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name", InstituteManagement?.areaName),
    },
    {
      title: "Khu",
      width: 100,
      dataIndex: "block",
      key: "block",
      render: (render) => <div>{render?.name}</div>,
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

  const reloadData = () => {
    table.handleOpenLoading();
    getData("/room?SortDir=Desc")
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
});
