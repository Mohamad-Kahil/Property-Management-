import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building,
  Building2,
  Home,
  Percent,
  Users,
} from "lucide-react";

interface PropertyMetric {
  icon: React.ReactNode;
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

interface PropertyOverviewWidgetProps {
  title?: string;
  description?: string;
  metrics?: PropertyMetric[];
  onViewAllProperties?: () => void;
}

const PropertyOverviewWidget = ({
  title = "Property Overview",
  description = "Key metrics about your property portfolio",
  metrics = [
    {
      icon: <Building className="h-5 w-5 text-blue-500" />,
      title: "Total Properties",
      value: "24",
      change: "+2",
      trend: "up",
    },
    {
      icon: <Home className="h-5 w-5 text-green-500" />,
      title: "Total Units",
      value: "142",
      change: "+8",
      trend: "up",
    },
    {
      icon: <Percent className="h-5 w-5 text-purple-500" />,
      title: "Occupancy Rate",
      value: "87%",
      change: "+3%",
      trend: "up",
    },
    {
      icon: <Users className="h-5 w-5 text-amber-500" />,
      title: "Total Tenants",
      value: "118",
      change: "+5",
      trend: "up",
    },
    {
      icon: <Building2 className="h-5 w-5 text-red-500" />,
      title: "Vacant Units",
      value: "18",
      change: "-3",
      trend: "down",
    },
  ],
  onViewAllProperties = () => console.log("View all properties clicked"),
}: PropertyOverviewWidgetProps) => {
  return (
    <Card className="w-full h-full bg-white shadow-sm overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={onViewAllProperties}
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex items-center p-4 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="mr-4 p-2 rounded-full bg-white">
                {metric.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {metric.title}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{metric.value}</p>
                  {metric.change && (
                    <span
                      className={`text-xs font-medium ${
                        metric.trend === "up"
                          ? "text-green-600"
                          : metric.trend === "down"
                            ? "text-red-600"
                            : "text-gray-600"
                      }`}
                    >
                      {metric.change}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <p className="text-xs text-gray-500">Last updated: Today at 9:41 AM</p>
      </CardFooter>
    </Card>
  );
};

export default PropertyOverviewWidget;
