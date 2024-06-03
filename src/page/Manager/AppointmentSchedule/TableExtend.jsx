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
export default function TableExtend() {
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

  const columns = [
    {
      title: "Người đăng ký",
      width: 150,
      fixed: "left",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name", "Người đăng ký"),
    },

    {
      title: "Người lớn tuổi",
      width: 200,
      dataIndex: "totalFloor",
      key: "totalFloor",
      // sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps("totalFloor", "Người lớn tuổi"),
    },
    {
      title: "Số điện thoại",
      width: 200,
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status", "Số điện thoại"),
    },
    {
      title: "Phòng",
      width: 200,
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status", "Phòng"),
    },
    {
      title: "Ngày thăm",
      width: 200,
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status", "Ngày thăm"),
    },
    {
      title: "Thời gian",
      width: 200,
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status", "Thời gian"),
    },
    // {
    //   title: "Action",
    //   key: "operation",
    //   fixed: "right",
    //   width: 100,
    //   render: (_, record) => (
    //     <div className="flex items-center flex-col">
    //       <div>
    //         <Typography.Link onClick={() => modal?.handleOpen(record)}>
    //           Chấp nhận
    //         </Typography.Link>
    //       </div>
    //     </div>
    //   ),
    // },
  ];
  useEffect(() => {
    table.handleOpenLoading();
    getData("/block")
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
        <div key={2}>heloo</div>
      </ComModal>
    </div>
  );
}
