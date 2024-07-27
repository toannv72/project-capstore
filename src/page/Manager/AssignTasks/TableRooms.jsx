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
import Scheduled from "./Scheduled";
import ComCalendar from "./../../../Components/ComCalendar/ComCalendar";

export const TableRooms = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [dataSelect, setDataSelect] = useState(null);
  const table = useTableState();
  const [selectedElder, setSelectedElder] = useState(null);
  const modalDetailElder = useModalState();
  const modalCalendar = useModalState();
  const modal = useModalState();
  const modalScheduled = useModalState();
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
      // {
      //   title: "Ngày có hiệu lực",
      //   width: 100,
      //   dataIndex: "effectiveDate",
      //   key: "effectiveDate",
      //   sorter: (a, b) => a.effectiveDate - b.effectiveDate,

      //   render: (_, render) => (
      //     <div>
      //       <ComDateConverter>{render?.effectiveDate}</ComDateConverter>
      //     </div>
      //   ),
      // },
      // {
      //   title: "Ngày hết hạn",
      //   width: 100,
      //   dataIndex: "expiryDate",
      //   key: "expiryDate",
      //   sorter: (a, b) => a.expiryDate - b.expiryDate,
      //   render: (_, render) => (
      //     <div>
      //       <ComDateConverter>{render?.expiryDate}</ComDateConverter>
      //     </div>
      //   ),
      // },
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

  const getListData = (value) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: "warning", content: "This is warning event." },
          { type: "success", content: "This is usual event." },
        ];
        break;
      case 10:
        listData = [
          { type: "warning", content: "This is warning event." },
          { type: "success", content: "This is usual event." },
          { type: "error", content: "This is error event." },
        ];
        break;
      case 15:
        listData = [
          { type: "warning", content: "This is warning event" },
          { type: "success", content: "This is very long usual event...." },
          { type: "error", content: "This is error event 1." },
          { type: "error", content: "This is error event 2." },
          { type: "error", content: "This is error event 3." },
          { type: "error", content: "This is error event 4." },
        ];
        break;
      default:
    }
    return listData || [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
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
      // render: (render) => <div>{render?.name}</div>,
      sorter: (a, b) => a.block?.localeCompare(b.block),

      ...getColumnSearchProps("block.name", "Khu"),
    },
    {
      title: "Loại phòng",
      dataIndex: "nursingPackage",
      key: "nursingPackage",
      width: 100,
      sorter: (a, b) =>
        a.nursingPackage?.name?.localeCompare(b.nursingPackage?.name),
      ...getColumnSearchProps("nursingPackage.name", "Loại phòng"),
    },
    {
      title: "Số giường",
      dataIndex: "userBed",
      key: "userBed",
      width: 100,
      sorter: (a, b) => a.userBed - b.userBed,

      ...getColumnSearchProps("userBed", "Số giường"),
    },
    {
      title: "Số giường trống",
      dataIndex: "unusedBed",
      key: "unusedBed",
      width: 100,
      sorter: (a, b) => a.unusedBed - b.unusedBed,
      ...getColumnSearchProps("unusedBed", "Số giường trống"),
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
            extraMenuItems={extraMenuItems}
            showModalEdit={() => {
              modal?.handleOpen(record);
              setDataSelect(record);
            }}
            excludeDefaultItems={["delete", "details", "edit"]}
            // order={order}
          />
        </div>
      ),
    },
  ];
  const order = ["Xếp lịch"];
  const extraMenuItems = [
    {
      label: "Xem chi tiết",

      onClick: (record) => {
        modalCalendar?.handleOpen(record);
        setDataSelect(record);
      },
    },
    {
      label: "Xếp lịch",

      onClick: (record) => {
        modal?.handleOpen(record);
        setDataSelect(record);
      },
    },
    {
      label: "Cập nhật lịch",
      onClick: (e) => {
        modalScheduled?.handleOpen(e);
        setDataSelect(e);
      },
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
      <ComModal
        width={800}
        isOpen={modal?.isModalOpen}
        onClose={modal?.handleClose}
      >
        <EditRoom
          onClose={modal?.handleClose}
          dataSelect={dataSelect}
          getDataApi={reloadData}
        />
      </ComModal>
      <ComModal
        isOpen={modalScheduled?.isModalOpen}
        onClose={modalScheduled?.handleClose}
        width={800}
      >
        <Scheduled
          onClose={modalScheduled?.handleClose}
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

      <ComModal
        isOpen={modalCalendar?.isModalOpen}
        onClose={modalCalendar?.handleClose}
        width={900}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Ca làm việc
        </h2>
        <ComCalendar
          selectedData={selectedElder}
          dateCellRender={dateCellRender}
        />
      </ComModal>
    </div>
  );
});
