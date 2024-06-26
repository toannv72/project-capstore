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

export const TableBlock = forwardRef((props, ref) => {
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
        title: "Tên phòng",
        fixed: "left",
        width: 100,
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Status",
        width: 100,
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Số giường",
        width: 100,
        dataIndex: "userBed",
        key: "userBed",
      },
      {
        title: "Loại phòng",
        width: 100,
        dataIndex: "type",
        key: "type",
      },
      {
        width: 100,
        title: "Số giường trống",
        dataIndex: "unusedBed",
        key: "unusedBed",
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
      ...getColumnSearchProps("name", InstituteManagement?.areaName),
    },

    {
      title: InstituteManagement?.numberOfRooms,
      width: 100,
      dataIndex: "rooms",
      key: "rooms",
      // sorter: (a, b) => a.phone - b.phone,
      render: (record) => <div>{record?.length}</div>,
      // ...getColumnSearchProps("totalFloor", InstituteManagement?.numberOfRooms),
    },
    // {
    //   title: InstituteManagement?.status,
    //   width: 200,
    //   dataIndex: "status",
    //   key: "status",
    //   ...getColumnSearchProps("status", InstituteManagement?.status),
    // },
    // {
    //   title: "Thông tin bổ sung",
    //   dataIndex: "description",
    //   key: "description",
    //   width: 300,
    //   ...getColumnSearchProps("description", "chi tiết"),

    //   ellipsis: {
    //     showTitle: false,
    //   },
    //   render: (record) => (
    //     <Tooltip placement="topLeft" title={record}>
    //       {record}
    //     </Tooltip>
    //   ),
    // },
    {
      title: "Action",
      key: "operation",
      // fixed: "right",
      width: 40,
      render: (_, record) => (
        // <div className="flex items-center flex-col">
        //   <div>
        //     <Typography.Link onClick={() => modal?.handleOpen(record)}>
        //       Chấp nhận
        //     </Typography.Link>
        //   </div>

        // </div>
        <div className="flex items-center flex-col">
          <ComMenuButonTable
            record={record}
            // showModalDetails={() => showModaldElder(record)}
            showModalEdit={()=>modal?.handleOpen(record)}
            // extraMenuItems={extraMenuItems}
            excludeDefaultItems={["delete"]}
            // order={order}
          />
        </div>
      ),
    },
  ];
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
        scroll={{
          x: 1020,
          y: "55vh",
        }}
      />
      <ComModal isOpen={modal?.isModalOpen} onClose={modal?.handleClose}>
        <div key={2}>heloo</div>
      </ComModal>
    </div>
  );
});
