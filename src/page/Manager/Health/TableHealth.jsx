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
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import DetailEmployee from "./../../admin/TableEmployee/DetailEmployee";

export const TableHealth = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const table = useTableState();
  const modal = useModalState();
  const modalDetailEmployee = useModalState();
  const [selectedElder, setSelectedElder] = useState(null);
console.log(selectedElder);
  const { getColumnSearchProps, getColumnApprox } = useColumnSearch();
  const {
    text: {
      InstituteManagement,
      common: { button },
    },
  } = useContext(LanguageContext);
  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Tên chỉ số",
        fixed: "left",
        width: 100,
        dataIndex: "healthCategory.name",
        key: "healthCategory.name",
        ...getColumnSearchProps("healthCategory.name", "Tên chỉ số"),
      },
      {
        title: "Chỉ số do được ",

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
      //   title: "Action",
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

  const columns = [
    {
      title: "Tên người bệnh",
      width: 100,
      fixed: "left",
      dataIndex: "elder.name",
      key: "elder.name",
      ...getColumnSearchProps("elder.name", "Tên người bệnh"),
    },

    {
      title: "Tên người do",
      width: 100,
      dataIndex: "creatorInfo.fullName",
      key: "creatorInfo.fullName",
      ...getColumnSearchProps("creatorInfo.fullName", "Tên người do"),
      render: (user, data) => (
        <Typography.Link
          onClick={() => {
            setSelectedElder(data.creatorInfo);
            modalDetailEmployee.handleOpen();
          }}
        >
          {data.creatorInfo.fullName}
        </Typography.Link>
      ),
    },
    {
      title: "Thời gian đo",
      width: 200,
      dataIndex: "createdAt",
      key: "createdAt",
      ...getColumnApprox("createdAt", "Thời gian đo"),
      render: (record) => (
        <div>
          <ComDateConverter>{record}</ComDateConverter>
        </div>
      ),
    },
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
            showModalEdit={() => modal?.handleOpen(record)}
            // extraMenuItems={extraMenuItems}
            excludeDefaultItems={["delete"]}
            // order={order}
          />
        </div>
      ),
    },
  ];
  console.log(data);
  const reloadData = () => {
    table.handleOpenLoading();
    getData("/health-report?SortDir=Desc")
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
      <ComModal
        isOpen={modalDetailEmployee?.isModalOpen}
        onClose={modalDetailEmployee?.handleClose}
      >
        <DetailEmployee selectedData={selectedElder} />
      </ComModal>
    </div>
  );
});
