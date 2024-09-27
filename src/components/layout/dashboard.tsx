import LeftNavbarDashboard from "./LeftNavbarDashboard"
import TableDashboard from "./tableDashboard"

export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions."

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
  )
}
