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
import ComConfirmDeleteModal from "../../../Components/ComConfirmDeleteModal/ComConfirmDeleteModal";
import { useNotification } from "../../../Notification/Notification";

export const TableDiseaseCategory = forwardRef((props, ref) => {
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

  const notificationSuccess = () => {
    notificationApi("success", "thành công", "Đã thành công");
  };
  const notificationError = () => {
    notificationApi("error", "Lỗi", "Đã có người có bệnh này");
  };
  const columns = [
    {
      title: "Tên loại bệnh",
      fixed: "left",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name", "Tên"),
    },
    {
      title: "Thao tác",
      key: "operation",
      fixed: "right",
      width: 100,
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
                `/disease-category`,
                record.id,
                `Bạn có chắc chắn muốn xóa?`,
                reloadData,
                notificationSuccess,
                notificationError,
                "put"
              );
            }}
            excludeDefaultItems={["details"]}
            // order={order}
          />
        </div>
      ),
    },
  ];

  const reloadData = () => {
    table.handleOpenLoading();
    getData("/disease-category?State=Active&SortDir=Desc")
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
      <ComTable x columns={columns} dataSource={data} loading={table.loading} />
      <ComModal
       
        isOpen={modal?.isModalOpen}
        onClose={modal?.handleClose}
      >
        <EditHealthCategory
          dataSelect={dataSelect}
          getDataApi={reloadData}
          onClose={modal?.handleClose}
        />
      </ComModal>
    </div>
  );
});
