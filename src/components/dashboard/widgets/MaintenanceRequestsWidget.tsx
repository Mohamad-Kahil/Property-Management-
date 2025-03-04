import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Wrench,
  AlertCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

interface MaintenanceRequest {
  id: string;
  title: string;
  property: string;
  unit: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in-progress" | "completed" | "cancelled";
  dateSubmitted: string;
  description: string;
}

interface MaintenanceRequestsWidgetProps {
  requests?: MaintenanceRequest[];
  title?: string;
  description?: string;
}

const getPriorityBadgeVariant = (priority: MaintenanceRequest["priority"]) => {
  switch (priority) {
    case "urgent":
      return "destructive";
    case "high":
      return "destructive";
    case "medium":
      return "secondary";
    case "low":
      return "outline";
    default:
      return "outline";
  }
};

const getStatusBadgeVariant = (status: MaintenanceRequest["status"]) => {
  switch (status) {
    case "pending":
      return "secondary";
    case "in-progress":
      return "default";
    case "completed":
      return "outline";
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
};

const getStatusIcon = (status: MaintenanceRequest["status"]) => {
  switch (status) {
    case "pending":
      return <Clock className="h-3 w-3 mr-1" />;
    case "in-progress":
      return <Wrench className="h-3 w-3 mr-1" />;
    case "completed":
      return <CheckCircle className="h-3 w-3 mr-1" />;
    case "cancelled":
      return <AlertCircle className="h-3 w-3 mr-1" />;
    default:
      return null;
  }
};

const MaintenanceRequestsWidget = ({
  requests = [
    {
      id: "1",
      title: "Leaking Faucet",
      property: "Sunset Apartments",
      unit: "101",
      priority: "medium",
      status: "pending",
      dateSubmitted: "2023-06-15",
      description:
        "The kitchen faucet is leaking and causing water damage to the cabinet below.",
    },
    {
      id: "2",
      title: "Broken AC Unit",
      property: "Oakwood Heights",
      unit: "305",
      priority: "high",
      status: "in-progress",
      dateSubmitted: "2023-06-14",
      description:
        "Air conditioning unit is not cooling properly. Temperature inside is 85°F.",
    },
    {
      id: "3",
      title: "Smoke Detector Replacement",
      property: "Riverside Condos",
      unit: "210",
      priority: "urgent",
      status: "pending",
      dateSubmitted: "2023-06-16",
      description:
        "Smoke detector is beeping and needs battery replacement or full replacement.",
    },
    {
      id: "4",
      title: "Garbage Disposal Repair",
      property: "Sunset Apartments",
      unit: "204",
      priority: "low",
      status: "completed",
      dateSubmitted: "2023-06-10",
      description:
        "Garbage disposal is making loud noise when operating and sometimes gets stuck.",
    },
  ],
  title = "Maintenance Requests",
  description = "Recent maintenance requests across all properties",
}: MaintenanceRequestsWidgetProps) => {
  return (
    <Card className="w-full h-full bg-white dark:bg-gray-800 overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto max-h-[220px]">
          <table className="w-full">
            <thead className="bg-muted/50 sticky top-0">
              <tr className="text-left text-xs font-medium text-muted-foreground">
                <th className="px-6 py-3">Request</th>
                <th className="px-6 py-3">Property/Unit</th>
                <th className="px-6 py-3">Priority</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-muted/50 text-sm">
                  <td className="px-6 py-3 font-medium">{request.title}</td>
                  <td className="px-6 py-3">
                    {request.property}{" "}
                    <span className="text-muted-foreground">
                      #{request.unit}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <Badge variant={getPriorityBadgeVariant(request.priority)}>
                      {request.priority.charAt(0).toUpperCase() +
                        request.priority.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-3">
                    <Badge
                      variant={getStatusBadgeVariant(request.status)}
                      className="flex items-center"
                    >
                      {getStatusIcon(request.status)}
                      {request.status
                        .split("-")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
                    </Badge>
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">
                    {request.dateSubmitted}
                  </td>
                  <td className="px-6 py-3">
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/20 flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          Showing {requests.length} of {requests.length} requests
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Create Request
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MaintenanceRequestsWidget;
