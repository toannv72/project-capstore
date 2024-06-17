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
export const TableServicePackageCategories = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const table = useTableState();
  const modal = useModalState();
  const { getColumnSearchProps } = useColumnSearch();

  
  const reloadData = () => {
    table.handleOpenLoading();
    getData("/service-package-categories?SortDir=Desc")
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
      width: 150,
      fixed: "left",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name", "Tên thể loại"),
    },
    {
      title: "Số lượng dịch vụ sử dụng",
      width: 150,
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Số lượng dịch vụ đã hết hạn",
      width: 150,
      dataIndex: "index",
      key: "index",
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
              Chỉnh sửa
            </Typography.Link>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <ComTable
        // expandable={{
        //   expandedRowRender,
        //   defaultExpandedRowKeys: ["0"],
        // }}
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
)