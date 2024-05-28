import { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { Badge, Dropdown, Space, Table, Tooltip, Typography } from "antd";
import ComTable from "../../../Components/ComTable/ComTable";
import useColumnSearch from "../../../Components/ComTable/utils";
import ComModal from "./../../../Components/ComModal/ComModal";
import { getData } from "../../../api/api";
import { useTableState } from "../../../hooks/useTableState";
import { useModalState } from "./../../../hooks/useModalState";

function InstituteManagement() {
  const [data, setData] = useState([
    {
      id: 1,
      name: "toan",
      phone: "012321",
      email: "toan@gmail.ocm",
      description: "okeoke",
    },
  ]);
  const table = useTableState();
  const modal = useModalState();
  const { getColumnSearchProps } = useColumnSearch();
  const {
    text: {
      InstituteManagement,
      common: { button },
    },
  } = useContext(LanguageContext);
  const expandedRowRender = () => {
    const columns = [
      {
        title: "Name",
        fixed: "left",
        width: 200,
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Status",
        width: 200,
        key: "state",
        render: () => <Badge status="success" text="Finished" />,
      },
      {
        title: "Số giường",
        width: 200,
        dataIndex: "upgradeNum",
        key: "upgradeNum",
      },
      {
        title: "Loại phòng",
        width: 200,
        dataIndex: "upgradeNum",
        key: "upgradeNum",
        render: () => <div>
          VIP 1
        </div>,
      },
      {
        width: 200,
        title: "Số giường trống",
        dataIndex: "upgradeNum",
        key: "upgradeNum",
      },

      {
        title: "Upgrade Status",
        dataIndex: "upgradeNum",
        width: 200,
        key: "upgradeNum",
      },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 150,
        render: (_, record) => (
          <div className="flex items-center flex-col">
            <div>
              <Typography.Link onClick={() => modal?.handleOpen(record)}>
                Chấp nhận
              </Typography.Link>
            </div>
          </div>
        ),
      },
    ];
    const data = [];
    for (let i = 0; i < 10; ++i) {
      data.push({
        key: i.toString(),
        date: "2014-12-24 23:12:00",
        name: "This is production name",
        upgradeNum: "Upgraded: 56",
      });
    }
    return <Table scroll={{
          x: 1520,
          y: "55vh",
        }}
        bdataed columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    {
      title: InstituteManagement?.areaName,
      width: 150,
      fixed: "left",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name", InstituteManagement?.areaName),
    },

    {
      title: InstituteManagement?.numberOfRooms,
      width: 200,
      dataIndex: "totalFloor",
      key: "totalFloor",
      // sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps("totalFloor", InstituteManagement?.numberOfRooms),
    },
    {
      title: InstituteManagement?.status,
      width: 200,
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status", InstituteManagement?.status),
    },
    {
      title: "Thông tin bổ sung",
      dataIndex: "description",
      key: "description",
      width: 300,
      ...getColumnSearchProps("description", "chi tiết"),

      ellipsis: {
        showTitle: false,
      },
      render: (record) => (
        <Tooltip placement="topLeft" title={record}>
          {record}
        </Tooltip>
      ),
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
              Chấp nhận
            </Typography.Link>
          </div>
        </div>
      ),
    },
  ];
  useEffect(() => {
    table.handleOpenLoading();
    getData("/block")
      .then((e) => {
        console.log("====================================");
        console.log(e);
        console.log("====================================");
        setData(e?.data?.contends);
        table.handleCloseLoading();
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  return (
    <>
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
        <div key={2}>heloo</div>
      </ComModal>
    </>
  );
}

export default InstituteManagement;
