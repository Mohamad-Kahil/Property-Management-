import React from "react";
import {
  PropertyOverviewWidget,
  OccupancyChartWidget,
  FinancialSummaryWidget,
  MaintenanceRequestsWidget,
  RecentActivityWidget,
} from "../dashboard/widgets";

const WidgetGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <PropertyOverviewWidget />
      <OccupancyChartWidget />
      <FinancialSummaryWidget />
      <MaintenanceRequestsWidget />
      <RecentActivityWidget />
    </div>
  );
};

export default WidgetGrid;
