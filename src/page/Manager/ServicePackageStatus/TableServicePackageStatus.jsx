import React, { forwardRef, useImperativeHandle } from "react";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { Badge, Table, Tooltip, Typography } from "antd";
import ComTable from "../../../Components/ComTable/ComTable";
import useColumnSearch from "../../../Components/ComTable/utils";
import ComModal from "../../../Components/ComModal/ComModal";
import { getData } from "../../../api/api";
import { useTableState } from "../../../hooks/useTableState";
import { useModalState } from "../../../hooks/useModalState";
import ComMenuButonTable from "../../../Components/ComMenuButonTable/ComMenuButonTable";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import DetailEmployee from "../../admin/TableEmployee/DetailEmployee";
import DetailElder from "../../admin/TableElder/DetailElder";
import DetailHealthElder from "./DetailHealthElder";
import ComStatusService from "../../../Components/ComStatusConverter/ComStatusService";
import ComConfirmDeleteModal from "../../../Components/ComConfirmDeleteModal/ComConfirmDeleteModal";

import ComConfirmPutModal from "../../../Components/ComConfirmDeleteModal/ComConfirmPutModal";
import { useNotification } from "../../../Notification/Notification";

export const TableServicePackageStatus = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const table = useTableState();
  const modal = useModalState();
  const modalDetailEmployee = useModalState();
  const [selectedElder, setSelectedElder] = useState(null);
  const [selectedHealth, setSelectedHealth] = useState(null);
  const { idElder } = props;
  const { getColumnSearchProps, getColumnApprox } = useColumnSearch();
  const { notificationApi } = useNotification();

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Tên chỉ số",
        fixed: "left",
        width: 200,
        dataIndex: "healthCategory.name",
        key: "healthCategory.name",
        ...getColumnSearchProps("healthCategory.name", "Tên chỉ số"),
      },
      {
        title: "Chỉ số đo được ",

        dataIndex: "healthReportDetailMeasures",
        key: "healthReportDetailMeasures",
        render: (record) => (
          <div>
            {record.map((data, index) => (
              <div className="">
                <div className="flex flex-col">
                  <p className="text-base"> {data?.measureUnit?.name}:</p>
                  <div
                    className={`${
                      data?.status !== "Normal" ? " text-red-600" : ""
                    }  `}
                  >
                    {data?.value} {data?.measureUnit?.unitType}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "Ghi chú",
        fixed: "left",
        dataIndex: "healthReportDetailMeasures",
        key: "healthReportDetailMeasures",
        render: (record) => (
          <div>
            {record.map((data, index) => (
              <div className="gap-2">
                <p className="flex flex-col">
                  <div
                    className={`${
                      data?.status !== "Normal" ? " text-red-600" : ""
                    } `}
                  >
                    {data?.measureUnit?.name}: {data?.note}
                  </div>
                </p>
              </div>
            ))}
          </div>
        ),
      },
      // {
      //   title: "Thao tác",
      //   key: "operation",
      //   fixed: "right",
      //   width: 50,
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
    return (
      <Table
        scroll={
          {
            // y: "55vh",
          }
        }
        bdataed
        bordered
        columns={columns}
        dataSource={record?.healthReportDetails}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
      />
    );
  };
  const modalDetailElder = useModalState();

  const showModaldElder = (record) => {
    modalDetailElder.handleOpen();
    setSelectedElder(record);
  };

  const showModaldHealth = (record) => {
    modal.handleOpen();
    setSelectedHealth(record);
  };
  const columns = [
    {
      title: "Tên người cao tuổi",
      width: 100,
      fixed: "left",
      dataIndex: "orderDetail.elder.name",
      key: "orderDetail.elder.name",
      sorter: (a, b) => a?.elder?.name?.localeCompare(b?.elder?.name),
      ...getColumnSearchProps("orderDetail.elder.name", "Tên người cao tuổi"),
      render: (user, data) => (
        <Typography.Link
          onClick={() => showModaldElder(data?.orderDetail?.elder)}
        >
          {data?.orderDetail?.elder?.name}
        </Typography.Link>
      ),
    },

    // {
    //   title: "Tên người đo",
    //   width: 100,
    //   dataIndex: "creatorInfo.fullName",
    //   key: "creatorInfo.fullName",
    //   sorter: (a, b) =>
    //     a?.creatorInfo?.fullName?.localeCompare(b?.creatorInfo?.fullName),

    //   ...getColumnSearchProps("creatorInfo.fullName", "Tên người đo"),
    //   render: (user, data) => (
    //     <Typography.Link
    //       onClick={() => {
    //         setSelectedElder(data.creatorInfo);
    //         modalDetailEmployee.handleOpen();
    //       }}
    //     >
    //       {data.creatorInfo.fullName}
    //     </Typography.Link>
    //   ),
    // },
    {
      title: "Trạng thái thực hiện",
      width: 100,
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status?.localeCompare(b.status),
      filters: [
        { text: "Đã thực hiện", value: "Complete" },
        { text: "Chưa thực hiện", value: "InComplete" },
        { text: "Đã quá hạn", value: "Missed" },
        { text: "Đã xử lý", value: "Processed" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (record) => (
        <div>
          <ComStatusService>{record}</ComStatusService>
        </div>
      ),
    },
    {
      title: "Thời gian đăng ký",
      width: 100,
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),

      ...getColumnApprox("date", "Thời gian đăng ký"),
      render: (record) => (
        <div>
          <ComDateConverter>{record}</ComDateConverter>
        </div>
      ),
    },
    {
      title: "Người thực hiện",
      width: 100,
      dataIndex: "user.fullName",
      key: "user.fullName",
      sorter: (a, b) => a?.user?.fullName?.localeCompare(b?.user?.fullName),

      ...getColumnSearchProps("user.fullName", "Người thực hiện"),
      render: (user, data) => (
        <>
          {data?.user?.fullName ? (
            <Typography.Link
              onClick={() => {
                setSelectedElder(data?.user);
                modalDetailEmployee.handleOpen();
              }}
            >
              {data?.user?.fullName}
            </Typography.Link>
          ) : (
            "Chưa có"
          )}
        </>
      ),
    },
    {
      title: "Ghi chú",
      width: 200,
      fixed: "left",
      dataIndex: "notes",
      key: "notes",
      sorter: (a, b) => a?.notes?.localeCompare(b?.notes),
      ...getColumnSearchProps("notes", "Ghi chú"),

      render: (data, record) => (
        <div>
          <div className="gap-2">
            <p className="flex flex-col">
              <div className={`${record?.isWarning ? " text-red-600" : ""} `}>
                {data}
              </div>
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Thao tác",
      key: "operation",
      fixed: "right",
      width: 80,
      render: (_, record) => (
        <div className="flex items-center flex-col">
          <ComMenuButonTable
            record={record}
            showModalDetails={() => showModaldHealth(record)}
            showModalEdit={() => modal?.handleOpen(record)}
            extraMenuItems={record.status === "Missed" ? extraMenuItems : []}
            excludeDefaultItems={["delete", "details", "edit"]}
          />
        </div>
      ),
    },
  ];
  // console.log(data);
  const extraMenuItems = [
    {
      label: "Xác nhận đã xử lý",

      onClick: (record) => {
        ComConfirmPutModal(
          `/order-date`,
          record.id,
          `Xác nhận đã xử lý?`,
          reloadData,
          notificationSuccess,
          notificationError,
          "put"
        );
      },
    },
  ];
  const notificationSuccess = () => {
    notificationApi("success", "thành công", "Đã thành công");
  };
  const notificationError = () => {
    notificationApi("error", "Lỗi", "Không thành công!");
  };
  const reloadData = () => {
    table.handleOpenLoading();
    const urlApi = `/order-date?SortDir=Desc`;

    getData(urlApi)
      .then((e) => {
        setData(
          e?.data?.contends.filter((task) => task.status !== "NotPerformed")
        );
        console.log(
          e?.data?.contends.filter((task) => task.status !== "NotPerformed")
        );
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
        // expandable={{
        //   expandedRowRender,
        //   defaultExpandedRowKeys: ["0"],
        // }}
        columns={columns}
        dataSource={data}
        loading={table.loading}
        x
        scroll={{
          x: 1020,
          y: "50vh",
        }}
      />
      <ComModal isOpen={modal?.isModalOpen} onClose={modal?.handleClose}>
        <DetailHealthElder
          selectedHealth={selectedHealth}
          onClose={modal?.handleClose}
        />
      </ComModal>

      <ComModal
        isOpen={modalDetailEmployee?.isModalOpen}
        onClose={modalDetailEmployee?.handleClose}
      >
        <DetailEmployee selectedData={selectedElder} />
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
