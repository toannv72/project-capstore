import React, { forwardRef, useImperativeHandle } from "react";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { Badge, Image, Table, Tooltip, Typography } from "antd";
import ComTable from "../../../Components/ComTable/ComTable";
import useColumnSearch from "../../../Components/ComTable/utils";
import ComModal from "./../../../Components/ComModal/ComModal";
import { getData } from "../../../api/api";
import { useTableState } from "../../../hooks/useTableState";
import { useModalState } from "./../../../hooks/useModalState";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import ComMenuButonTable from "../../../Components/ComMenuButonTable/ComMenuButonTable";
import ComGenderConverter from "../../../Components/ComGenderConverter/ComGenderConverter";
import EditHealthCategory from "./EditHealthCategory";
import EditMeasureUnit from "./EditMeasureUnit";
import CreateMeasureUnit from "./CreateMeasureUnit";
import ComConfirmDeleteModal from "../../../Components/ComConfirmDeleteModal/ComConfirmDeleteModal";
import { useNotification } from "../../../Notification/Notification";

export const TableHealthCategory = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [dataSelect, setDataSelect] = useState([]);
  const table = useTableState();
  const modal = useModalState();
  const modalMeasureUnit = useModalState();
  const modalCreateMeasureUnit = useModalState();
  const { getColumnSearchProps } = useColumnSearch();
  const { notificationApi } = useNotification();

  console.log(data);
  useImperativeHandle(ref, () => ({
    reloadData,
  }));
  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Tên chỉ số",
        fixed: "left",
        width: 100,
        dataIndex: "name",
        key: "name",
        ...getColumnSearchProps("name", "Tên"),
      },
      {
        title: "Đơn vị",
        dataIndex: "unitType",
        key: "unitType",
        width: 100,
        ...getColumnSearchProps("unitType", "đơn vị"),
      },
      {
        title: "Chỉ số mức nhỏ nhất bình thường của đơn vị",
        dataIndex: "minValue",
        key: "minValue",
        width: 100,
        render: (_, record) => (
          <div className="flex items-center flex-col">
            {record.minValue}
            {record.unitType}
          </div>
        ),
      },
      {
        title: "Chỉ số mức nhỏ nhất bình thường của đơn vị",
        dataIndex: "maxValue",
        key: "maxValue",
        width: 100,
        render: (_, record) => (
          <div className="flex items-center flex-col">
            {record.maxValue}
            {record.unitType}
          </div>
        ),
      },
      {
        title: "Chi tiết",
        dataIndex: "description",
        key: "description",
        width: 100,
        ...getColumnSearchProps("description", "Chi tiết"),
      },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 50,
        render: (_, record) => (
          <div className="flex items-center flex-col">
            <ComMenuButonTable
              record={record}
              // showModalDetails={() => showModaldElder(record)}
              showModalEdit={() => {
                modalMeasureUnit?.handleOpen();
                setDataSelect(record);
              }}
              showModalDelete={() => {
                ComConfirmDeleteModal(
                  `/measure-unit`,
                  record.id,
                  `Bạn có chắc chắn muốn xóa?`,
                  reloadData,
                  notificationSuccess,
                  notificationError
                );
              }}
              // extraMenuItems={extraMenuItems}
              excludeDefaultItems={["details"]}
              // order={order}
            />
          </div>
        ),
      },
    ];

    return (
      <Table
        scroll={{
          y: "55vh",
        }}
        bdataed
        bordered
        columns={columns}
        dataSource={record?.measureUnitsActive}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
      />
    );
  };
  const notificationSuccess = () => {
    notificationApi("success", "Đã xóa", "đã xóa tạo phòng!");
  };
  const notificationError = () => {
    notificationApi("error", "Đã xóa", "đã xóa tạo phòng!");
  };
  const columns = [
    {
      title: "Tên chỉ số",
      width: 100,
      fixed: "left",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name", "Tên"),
    },
    {
      title: "Ảnh ",
      dataIndex: "avatarUrl",
      key: "avatarUrl",
      width: 100,
      // fixed: "left",
      render: (_, record) => (
        <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
          {record?.imageUrl ? (
            <Image
              wrapperClassName="object-cover w-full h-full object-cover object-center flex items-center justify-center "
              src={record?.imageUrl}
              alt={record?.imageUrl}
              preview={{ mask: "Xem ảnh" }}
            />
          ) : (
            <></>
          )}
        </div>
      ),
    },
    {
      title: "Chi tiết",
      dataIndex: "description",
      key: "description",
      width: 100,
      ...getColumnSearchProps("description", "Chi tiết"),
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 50,
      render: (_, record) => (
        <div className="flex items-center flex-col">
          <ComMenuButonTable
            record={record}
            // showModalDetails={() => showModaldElder(record)}
            showModalEdit={() => {
              modal?.handleOpen();
              setDataSelect(record);
            }}
            showModalDelete={() => {
              ComConfirmDeleteModal(
                `/health-category`,
                record.id,
                `Bạn có chắc chắn muốn xóa?`,
                reloadData,
                notificationSuccess,
                notificationError
              );
            }}
            extraMenuItems={extraMenuItems}
            excludeDefaultItems={["details",]}
            // order={order}
          />
        </div>
      ),
    },
  ];
  const extraMenuItems = [
    {
      label: "Thêm mới",
      onClick: (e) => {
        modalCreateMeasureUnit?.handleOpen();
        setDataSelect(e);
      },
    },
  ];
  const reloadData = () => {
    table.handleOpenLoading();
    getData("/health-category?SortDir=Desc")
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
        x
        columns={columns}
        dataSource={data}
        loading={table.loading}
      />
      <ComModal
        width={800}
        isOpen={modal?.isModalOpen}
        onClose={modal?.handleClose}
      >
        <EditHealthCategory
          dataSelect={dataSelect}
          getDataApi={reloadData}
          onClose={modal?.handleClose}
        />
      </ComModal>
      <ComModal
        width={800}
        isOpen={modalMeasureUnit?.isModalOpen}
        onClose={modalMeasureUnit?.handleClose}
      >
        <EditMeasureUnit
          dataSelect={dataSelect}
          getDataApi={reloadData}
          onClose={modalMeasureUnit?.handleClose}
        />
      </ComModal>
      <ComModal
        width={800}
        isOpen={modalCreateMeasureUnit?.isModalOpen}
        onClose={modalCreateMeasureUnit?.handleClose}
      >
        <CreateMeasureUnit
          getDataApi={reloadData}
          dataSelect={dataSelect}
          onClose={modalCreateMeasureUnit?.handleClose}
        />
      </ComModal>
    </div>
  );
});
