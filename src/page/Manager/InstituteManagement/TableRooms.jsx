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
import ComMenuButonTable from "../../../Components/ComMenuButonTable/ComMenuButonTable";
import ComGenderConverter from "../../../Components/ComGenderConverter/ComGenderConverter";
import EditRoom from "./EditRoom";
import DetailElder from "../../admin/TableElder/DetailElder";

export const TableRooms = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [dataSelect, setDataSelect] = useState(null);
  const table = useTableState();
  const modalDetailElder = useModalState();
  const [selectedElder, setSelectedElder] = useState(null);
  const modal = useModalState();
  const {
    getColumnSearchProps,
    getColumnApprox,
    getColumnFilterProps,
    getUniqueValues,
  } = useColumnSearch();
  const {
    text: {
      InstituteManagement,
      common: { button },
    },
  } = useContext(LanguageContext);
  const uniqueBlockValues = getUniqueValues(data, "block.name");
  const uniquePackageValues = getUniqueValues(data, "nursingPackage.name");

  useImperativeHandle(ref, () => ({
    reloadData,
  }));
  const showModaldElder = (record) => {
    modalDetailElder.handleOpen();
    setSelectedElder(record);
  };
  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Tên người cao tuổi",
        fixed: "left",
        width: 100,
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name?.localeCompare(b.name),
        ...getColumnSearchProps("name", "Tên người cao tuổi"),
      },
      {
        title: "Giới tính",
        width: 100,
        dataIndex: "gender",
        key: "gender",
        sorter: (a, b) => a.gender?.localeCompare(b.gender),

        filters: [
          { text: "Nam", value: "Male" },
          { text: "Nữ", value: "Female" },
        ],
        onFilter: (value, record) => record.gender === value,
        render: (_, record) => (
          <div>
            <ComGenderConverter>{record?.gender}</ComGenderConverter>
          </div>
        ),
      },

      {
        title: "Địa chỉ",
        width: 100,
        dataIndex: "address",
        key: "address",
        sorter: (a, b) => a.address?.localeCompare(b.address),
        ...getColumnSearchProps("address", "Địa chỉ"),
      },
      {
        title: "Ghi chú",
        width: 100,
        dataIndex: "notes",
        key: "notes",
        sorter: (a, b) => a.notes?.localeCompare(b.notes),

        ...getColumnSearchProps("notes", "Ghi chú"),
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
              showModalDetails={() => showModaldElder(record)}
              // extraMenuItems={extraMenuItems}
              excludeDefaultItems={["delete", "edit"]}
              // order={order}
            />
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
  console.log(data);
  const columns = [
    {
      title: "Tên phòng",
      width: 100,
      fixed: "left",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name?.localeCompare(b.name),
      ...getColumnSearchProps("name", InstituteManagement?.areaName),
    },
    {
      title: "Khu",
      width: 100,
      dataIndex: "block",
      key: "block",
      sorter: (a, b) => a.block?.localeCompare(b.block),
      // ...getColumnSearchProps("block.name", "Khu"),
      ...getColumnFilterProps("block.name", "Khu", uniqueBlockValues),
      render: (render) => <div>{render?.name}</div>,
    },
    {
      title: "Loại phòng",
      dataIndex: "nursingPackage",
      key: "nursingPackage",
      width: 100,
      sorter: (a, b) =>
        a.nursingPackage?.name?.localeCompare(b.nursingPackage?.name),
      ...getColumnFilterProps(
        "nursingPackage.name",
        "Loại phòng",
        uniquePackageValues
      ),
      render: (render) => <div>{render?.name}</div>,
    },
    // {
    //   title: InstituteManagement?.status,
    //   width: 100,
    //   dataIndex: "status",
    //   key: "status",
    //   ...getColumnSearchProps("status", InstituteManagement?.status),
    // },
    {
      title: "Số giường trống",
      dataIndex: "totalBed-userBed",
      key: "totalBed-userBed",
      width: 100,
      sorter: (a, b) => a.totalBed - a.userBed - (b.totalBed - b.userBed),
      render: (render, data) => <div>{data?.totalBed - data?.userBed}</div>,
      // ...getColumnSearchProps("totalBed-userBed", "Số người trong phòng"),
    },
    {
      title: "Số người trong phòng",
      dataIndex: "userBed",
      key: "userBed",
      width: 100,
      sorter: (a, b) => a.userBed - b.userBed,
      ...getColumnSearchProps("userBed", "Số người trong phòng"),
    },
    {
      title: "Tổng số giường",
      dataIndex: "totalBed",
      key: "totalBed",
      width: 100,
      sorter: (a, b) => a.totalBed - b.totalBed,
      ...getColumnSearchProps("totalBed", "Tổng số giường"),
    },
    {
      title: "Thao tác",
      key: "operation",
      fixed: "right",
      width: 50,
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
            showModalEdit={() => {
              modal?.handleOpen(record);
              setDataSelect(record);
            }}
            // extraMenuItems={extraMenuItems}
            excludeDefaultItems={["delete", "details"]}
            // order={order}
          />
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
        <EditRoom
          onClose={modal?.handleClose}
          dataSelect={dataSelect}
          getDataApi={reloadData}
        />
      </ComModal>
      <ComModal
        isOpen={modalDetailElder?.isModalOpen}
        onClose={modalDetailElder?.handleClose}
      >
        <DetailElder selectedData={selectedElder} />
      </ComModal>
    </div>
  );
});
