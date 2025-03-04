import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, BarChart, Activity } from "lucide-react";

interface PropertyData {
  id: string;
  name: string;
  totalUnits: number;
  occupiedUnits: number;
  vacantUnits: number;
}

interface OccupancyChartWidgetProps {
  properties?: PropertyData[];
  title?: string;
  description?: string;
}

const OccupancyChartWidget = ({
  properties = [
    {
      id: "1",
      name: "Sunset Apartments",
      totalUnits: 24,
      occupiedUnits: 20,
      vacantUnits: 4,
    },
    {
      id: "2",
      name: "Riverfront Condos",
      totalUnits: 16,
      occupiedUnits: 12,
      vacantUnits: 4,
    },
    {
      id: "3",
      name: "Highland Townhomes",
      totalUnits: 12,
      occupiedUnits: 10,
      vacantUnits: 2,
    },
  ],
  title = "Occupancy Status",
  description = "Visual representation of occupied vs. vacant units across properties",
}: OccupancyChartWidgetProps) => {
  // Calculate overall occupancy rate
  const totalUnits = properties.reduce(
    (sum, property) => sum + property.totalUnits,
    0,
  );
  const totalOccupied = properties.reduce(
    (sum, property) => sum + property.occupiedUnits,
    0,
  );
  const overallOccupancyRate =
    totalUnits > 0 ? Math.round((totalOccupied / totalUnits) * 100) : 0;

  return (
    <Card className="w-full h-full bg-white dark:bg-gray-800 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <div className="flex space-x-2">
            <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <PieChart className="h-4 w-4 text-gray-500" />
            </button>
            <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <BarChart className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          {/* Overall occupancy rate */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Overall Occupancy Rate</h4>
              <p className="text-2xl font-bold">{overallOccupancyRate}%</p>
            </div>
            <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Activity className="h-8 w-8 text-blue-600 dark:text-blue-300" />
            </div>
          </div>

          {/* Property occupancy bars */}
          <div className="space-y-4">
            {properties.map((property) => {
              const occupancyRate = Math.round(
                (property.occupiedUnits / property.totalUnits) * 100,
              );
              return (
                <div key={property.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{property.name}</span>
                    <span className="text-sm font-medium">
                      {occupancyRate}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${occupancyRate}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{property.occupiedUnits} Occupied</span>
                    <span>{property.vacantUnits} Vacant</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OccupancyChartWidget;
