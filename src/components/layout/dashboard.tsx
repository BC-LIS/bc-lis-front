import LeftNavbarDashboard from "./LeftNavbarDashboard";
import TableDashboard from "./TableDashboard";

export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-row gap-16 justify-center items-center">
      <div>
        <LeftNavbarDashboard />
      </div>
      <div className="w-11/12">
        <TableDashboard />
      </div>
    </div>
  );
}
