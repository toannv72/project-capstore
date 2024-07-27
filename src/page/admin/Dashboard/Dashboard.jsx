import ChartOne from "./ChartOne";
import ChartTwo from "./ChartTwo";
import ChartThree from "./ChartThree";
import ChartFour from "./ChartFour";
import ChartElder from "./ChartElder";

function Dashboard() {
  return (
    <div className="h-max">
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
