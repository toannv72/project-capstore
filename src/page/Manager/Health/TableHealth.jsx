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
import DetailElder from "../../admin/TableElder/DetailElder";
import DetailHealthElder from "./DetailHealthElder";

export const TableHealth = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const table = useTableState();
  const modal = useModalState();
  const modalDetailEmployee = useModalState();
  const [selectedElder, setSelectedElder] = useState(null);
  const [selectedHealth, setSelectedHealth] = useState(null);
   const { idElder } = props;
  const { getColumnSearchProps, getColumnApprox } = useColumnSearch();

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Tên chỉ số",
        fixed: "left",
        width:200,
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
      dataIndex: "elder.name",
      key: "elder.name",
      sorter: (a, b) => a?.elder?.name?.localeCompare(b?.elder?.name),
      ...getColumnSearchProps("elder.name", "Tên người cao tuổi"),
      render: (user, data) => (
        <Typography.Link onClick={() => showModaldElder(data.elder)}>
          {data?.elder?.name}
        </Typography.Link>
      ),
    },

    {
      title: "Tên người do",
      width: 100,
      dataIndex: "creatorInfo.fullName",
      key: "creatorInfo.fullName",
      sorter: (a, b) =>
        a?.creatorInfo?.fullName?.localeCompare(b?.creatorInfo?.fullName),

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
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),

      ...getColumnApprox("createdAt", "Thời gian đo"),
      render: (record) => (
        <div>
          <ComDateConverter>{record}</ComDateConverter>
        </div>
      ),
    },
    {
      title: "Ghi chú",
      width: 200,
      fixed: "left",
      dataIndex: "notes",
      key: "notes",
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
            // showModalEdit={() => modal?.handleOpen(record)}
            excludeDefaultItems={["delete", "edit"]}
          />
        </div>
      ),
    },
  ];
  // console.log(data);
  const reloadData = () => {
    table.handleOpenLoading();
    const urlApi = idElder
      ? `/health-report?ElderId=${idElder}&SortDir=Desc`
      : `/health-report?SortDir=Desc`;
    console.log(idElder);

    getData(urlApi)
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
