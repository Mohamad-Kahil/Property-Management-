import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock, User, Home, DollarSign, Wrench } from "lucide-react";

type ActivityItem = {
  id: string;
  type: "tenant" | "property" | "financial" | "maintenance";
  title: string;
  description: string;
  timestamp: string;
  user: string;
};

type RecentActivityWidgetProps = {
  activities?: ActivityItem[];
  maxItems?: number;
};

const RecentActivityWidget = ({
  activities = [
    {
      id: "1",
      type: "tenant",
      title: "New Tenant Added",
      description: "John Doe was added as a tenant for Apartment 3B",
      timestamp: "2 hours ago",
      user: "Admin User",
    },
    {
      id: "2",
      type: "property",
      title: "Property Updated",
      description: "Sunset Apartments details were updated",
      timestamp: "3 hours ago",
      user: "Property Manager",
    },
    {
      id: "3",
      type: "financial",
      title: "Rent Payment Received",
      description: "$1,200 rent payment received from Jane Smith",
      timestamp: "5 hours ago",
      user: "Finance Manager",
    },
    {
      id: "4",
      type: "maintenance",
      title: "Maintenance Request Completed",
      description: "Plumbing issue in Unit 12C was resolved",
      timestamp: "1 day ago",
      user: "Maintenance Staff",
    },
    {
      id: "5",
      type: "tenant",
      title: "Lease Renewed",
      description: "Michael Johnson renewed lease for another year",
      timestamp: "1 day ago",
      user: "Admin User",
    },
  ],
  maxItems = 5,
}: RecentActivityWidgetProps) => {
  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "tenant":
        return <User className="h-4 w-4 text-blue-500" />;
      case "property":
        return <Home className="h-4 w-4 text-green-500" />;
      case "financial":
        return <DollarSign className="h-4 w-4 text-yellow-500" />;
      case "maintenance":
        return <Wrench className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className="w-full h-full bg-white dark:bg-gray-800 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2">
          {activities.slice(0, maxItems).map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0 last:pb-0"
            >
              <div className="mt-0.5 bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-sm truncate">
                    {activity.title}
                  </p>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {activity.timestamp}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">by {activity.user}</p>
              </div>
            </div>
          ))}
        </div>
        {activities.length > maxItems && (
          <div className="mt-4 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              View all activity
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivityWidget;
