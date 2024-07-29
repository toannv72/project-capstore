import ChartOne from "./ChartOne";
import ChartTwo from "./ChartTwo";
import ChartThree from "./ChartThree";
import ChartFour from "./ChartFour";
import ChartElder from "./ChartElder";
import { useEffect } from "react";
import { getData } from "../../../api/api";

function Dashboard() {
  const totalUsers = 1000; // Thay bằng dữ liệu thực tế của bạn
  const totalStaff = 200; // Thay bằng dữ liệu thực tế của bạn
  const totalPatients = 800; // Thay bằng dữ liệu thực tế của bạn
  const totalAmount = 500000; // Thay bằng dữ liệu thực tế của bạn
  useEffect(() => {
    getData('/')
    return () => {
      
    };
  }, []);

  return (
    <div className="h-max">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 2xl:gap-7.5 mb-6">
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-bold">Tổng số người dùng</h2>
          <p className="text-2xl">{totalUsers}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-bold">Tổng số nhân viên</h2>
          <p className="text-2xl">{totalStaff}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-bold">Tổng số bệnh nhân</h2>
          <p className="text-2xl">{totalPatients}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-bold">Tổng số tiền</h2>
          <p className="text-2xl">{totalAmount}</p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartElder />
        <ChartFour />
        <ChartThree />
      </div>
    </div>
  );
}

export default Dashboard;
