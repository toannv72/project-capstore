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
  const { getColumnSearchProps, getUniqueValues, getColumnFilterProps } =
    useColumnSearch();
  const {
    text: {
      InstituteManagement,
      common: { button },
    },
  } = useContext(LanguageContext);

  useImperativeHandle(ref, () => ({
    reloadData,
  }));
  const showModaldElder = (record) => {
    modalDetailElder.handleOpen();
    setSelectedElder(record);
  };

  const uniquePackageValues = getUniqueValues(data, "nursingPackage.name");
  const uniqueBlockValues = getUniqueValues(data, "block.name");

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
      sorter: (a, b) => a.block?.name?.localeCompare(b.block?.name),

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
        <div className="flex items-center flex-col">
          <ComMenuButonTable
            record={record}
            // showModalDetails={() => showModaldElder(record)}
            extraMenuItems={
              record?.elders?.length !== 0 ? extraMenuItems : extraMenuItems1
            }
            showModalEdit={() => {
              modal?.handleOpen(record);
              setDataSelect(record);
            }}
            excludeDefaultItems={
              record?.elders?.length !== 0
                ? ["delete", "details", "edit"]
                : ["delete", "details", "edit", "Xếp lịch"]
            }
            // order={order}
          />
        </div>
      ),
    },
  ];
  // sắp xếp thứ tự hiển thị
  const order = ["Xếp lịch"];
  const extraMenuItems1 = [
    {
      label: "Xem chi tiết",

      onClick: (record) => {
        modalCalendar?.handleOpen(record);
        setDataSelect(record);
      },
    },
    // {
    //   label: "Xếp lịch",

    //   onClick: (record) => {
    //     modal?.handleOpen(record);
    //     setDataSelect(record);
    //   },
    // },
    // {
    //   label: "Cập nhật lịch",
    //   onClick: (e) => {
    //     modalScheduled?.handleOpen(e);
    //     setDataSelect(e);
    //   },
    // },
  ];
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
    // {
    //   label: "Cập nhật lịch",
    //   onClick: (e) => {
    //     modalScheduled?.handleOpen(e);
    //     setDataSelect(e);
    //   },
    // },
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
        y={"70vh"}
      />

      {/* xếp lịch  */}
      <ComModal
        width={800}
        isOpen={modal?.isModalOpen}
        onClose={modal?.handleClose}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Xếp lịch</h2>
        <Scheduled
          onClose={modal?.handleClose}
          dataSelect={dataSelect}
          getDataApi={reloadData}
        />
      </ComModal>
      {/*cập nhật xếp lịch  */}
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
      {/* chi tiết người già */}

      <ComModal
        isOpen={modalDetailElder?.isModalOpen}
        onClose={modalDetailElder?.handleClose}
      >
        <DetailElder selectedData={selectedElder} />
      </ComModal>

      {/* chi tiết lịch */}
      <ComModal
        isOpen={modalCalendar?.isModalOpen}
        onClose={modalCalendar?.handleClose}
        width={900}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Ca làm việc
        </h2>
        <ComCalendar
          selectedData={dataSelect}
          // dateCellRender={dateCellRender}
        />
      </ComModal>
    </div>
  );
});
