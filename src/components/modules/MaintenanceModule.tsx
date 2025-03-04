import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  Filter,
  Plus,
  Search,
  Wrench,
  AlertCircle,
  CheckCircle,
  MoreHorizontal,
  Building,
  User,
  Calendar as CalendarIcon,
  Edit,
  Eye,
  Trash2,
} from "lucide-react";

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  property: string;
  unit: string;
  requestedBy: string;
  assignedTo: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in-progress" | "completed" | "cancelled";
  dateSubmitted: string;
  dateUpdated: string;
  estimatedCompletion: string;
  notes: string[];
}

interface MaintenanceModuleProps {
  requests?: MaintenanceRequest[];
}

const MaintenanceModule = ({
  requests = [
    {
      id: "MR-001",
      title: "Leaking Faucet",
      description:
        "The kitchen faucet is leaking and causing water damage to the cabinet below.",
      property: "Sunset Apartments",
      unit: "101",
      requestedBy: "John Doe",
      assignedTo: "Mike Smith",
      priority: "medium",
      status: "pending",
      dateSubmitted: "2023-06-15",
      dateUpdated: "2023-06-15",
      estimatedCompletion: "2023-06-20",
      notes: ["Initial request received", "Scheduled for inspection"],
    },
    {
      id: "MR-002",
      title: "Broken AC Unit",
      description:
        "Air conditioning unit is not cooling properly. Temperature inside is 85°F.",
      property: "Oakwood Heights",
      unit: "305",
      requestedBy: "Sarah Johnson",
      assignedTo: "Mike Smith",
      priority: "high",
      status: "in-progress",
      dateSubmitted: "2023-06-14",
      dateUpdated: "2023-06-16",
      estimatedCompletion: "2023-06-18",
      notes: [
        "Initial inspection completed",
        "Ordered replacement part",
        "Scheduled for repair",
      ],
    },
    {
      id: "MR-003",
      title: "Smoke Detector Replacement",
      description:
        "Smoke detector is beeping and needs battery replacement or full replacement.",
      property: "Riverside Condos",
      unit: "210",
      requestedBy: "Emily Chen",
      assignedTo: "",
      priority: "urgent",
      status: "pending",
      dateSubmitted: "2023-06-16",
      dateUpdated: "2023-06-16",
      estimatedCompletion: "",
      notes: ["Initial request received", "Needs immediate attention"],
    },
    {
      id: "MR-004",
      title: "Garbage Disposal Repair",
      description:
        "Garbage disposal is making loud noise when operating and sometimes gets stuck.",
      property: "Sunset Apartments",
      unit: "204",
      requestedBy: "Michael Wilson",
      assignedTo: "Tom Jackson",
      priority: "low",
      status: "completed",
      dateSubmitted: "2023-06-10",
      dateUpdated: "2023-06-12",
      estimatedCompletion: "2023-06-12",
      notes: ["Repaired and tested", "Working properly now"],
    },
    {
      id: "MR-005",
      title: "Bathroom Tile Repair",
      description:
        "Several tiles in the bathroom floor are loose and need to be reattached.",
      property: "Highland Townhomes",
      unit: "B12",
      requestedBy: "Robert Brown",
      assignedTo: "Mike Smith",
      priority: "medium",
      status: "in-progress",
      dateSubmitted: "2023-06-13",
      dateUpdated: "2023-06-15",
      estimatedCompletion: "2023-06-19",
      notes: [
        "Initial inspection completed",
        "Materials purchased",
        "Work scheduled",
      ],
    },
  ],
}: MaintenanceModuleProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isAddRequestDialogOpen, setIsAddRequestDialogOpen] = useState(false);
  const [isViewRequestDialogOpen, setIsViewRequestDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<MaintenanceRequest | null>(null);

  // Filter requests based on search term and active tab
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pending")
      return matchesSearch && request.status === "pending";
    if (activeTab === "in-progress")
      return matchesSearch && request.status === "in-progress";
    if (activeTab === "completed")
      return matchesSearch && request.status === "completed";
    if (activeTab === "urgent")
      return matchesSearch && request.priority === "urgent";

    return matchesSearch;
  });

  const handleViewRequest = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setIsViewRequestDialogOpen(true);
  };

  const getPriorityBadgeVariant = (
    priority: MaintenanceRequest["priority"],
  ) => {
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
        return <Clock className="h-4 w-4 mr-1" />;
      case "in-progress":
        return <Wrench className="h-4 w-4 mr-1" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "cancelled":
        return <AlertCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Wrench className="mr-2 h-6 w-6" />
            Maintenance Management
          </h1>
          <p className="text-muted-foreground">
            Track and manage maintenance requests across all properties
          </p>
        </div>
        <Button onClick={() => setIsAddRequestDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Request
        </Button>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="urgent">Urgent</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[250px]"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem>Filter by Property</DropdownMenuItem>
                  <DropdownMenuItem>Filter by Assignee</DropdownMenuItem>
                  <DropdownMenuItem>Filter by Date</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <TabsContent value="all" className="mt-6">
            <MaintenanceRequestTable
              requests={filteredRequests}
              onViewRequest={handleViewRequest}
            />
          </TabsContent>
          <TabsContent value="pending" className="mt-6">
            <MaintenanceRequestTable
              requests={filteredRequests}
              onViewRequest={handleViewRequest}
            />
          </TabsContent>
          <TabsContent value="in-progress" className="mt-6">
            <MaintenanceRequestTable
              requests={filteredRequests}
              onViewRequest={handleViewRequest}
            />
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            <MaintenanceRequestTable
              requests={filteredRequests}
              onViewRequest={handleViewRequest}
            />
          </TabsContent>
          <TabsContent value="urgent" className="mt-6">
            <MaintenanceRequestTable
              requests={filteredRequests}
              onViewRequest={handleViewRequest}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Maintenance Request Dialog */}
      <Dialog
        open={isAddRequestDialogOpen}
        onOpenChange={setIsAddRequestDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Maintenance Request</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new maintenance request.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label htmlFor="request-title" className="text-sm font-medium">
                  Request Title
                </label>
                <Input id="request-title" placeholder="e.g. Leaking Faucet" />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="request-description"
                  className="text-sm font-medium"
                >
                  Description
                </label>
                <Textarea
                  id="request-description"
                  placeholder="Describe the maintenance issue in detail"
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="request-property"
                  className="text-sm font-medium"
                >
                  Property
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunset">Sunset Apartments</SelectItem>
                    <SelectItem value="oakwood">Oakwood Heights</SelectItem>
                    <SelectItem value="riverside">Riverside Condos</SelectItem>
                    <SelectItem value="highland">Highland Townhomes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="request-unit" className="text-sm font-medium">
                  Unit
                </label>
                <Input id="request-unit" placeholder="e.g. 101" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="request-priority"
                  className="text-sm font-medium"
                >
                  Priority
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="request-assignee"
                  className="text-sm font-medium"
                >
                  Assign To (Optional)
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mike">Mike Smith</SelectItem>
                    <SelectItem value="tom">Tom Jackson</SelectItem>
                    <SelectItem value="sarah">Sarah Williams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddRequestDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button>Create Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Maintenance Request Dialog */}
      <Dialog
        open={isViewRequestDialogOpen && selectedRequest !== null}
        onOpenChange={setIsViewRequestDialogOpen}
      >
        <DialogContent className="sm:max-w-[700px]">
          {selectedRequest && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle className="text-xl">
                      {selectedRequest.title}
                    </DialogTitle>
                    <DialogDescription className="flex items-center mt-1">
                      Request ID: {selectedRequest.id} · Submitted:{" "}
                      {selectedRequest.dateSubmitted}
                    </DialogDescription>
                  </div>
                  <Badge
                    variant={getStatusBadgeVariant(selectedRequest.status)}
                    className="flex items-center"
                  >
                    {getStatusIcon(selectedRequest.status)}
                    {selectedRequest.status
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")}
                  </Badge>
                </div>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Property
                  </p>
                  <p className="flex items-center">
                    <Building className="h-4 w-4 mr-1 text-muted-foreground" />
                    {selectedRequest.property} · Unit {selectedRequest.unit}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Requested By
                  </p>
                  <p className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-muted-foreground" />
                    {selectedRequest.requestedBy}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Priority
                  </p>
                  <Badge
                    variant={getPriorityBadgeVariant(selectedRequest.priority)}
                  >
                    {selectedRequest.priority.charAt(0).toUpperCase() +
                      selectedRequest.priority.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Description</h3>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                  {selectedRequest.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Assigned To</h3>
                  <div className="flex items-center">
                    {selectedRequest.assignedTo ? (
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span>{selectedRequest.assignedTo}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">
                        Not assigned
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Estimated Completion</h3>
                  <div className="flex items-center">
                    {selectedRequest.estimatedCompletion ? (
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{selectedRequest.estimatedCompletion}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">
                        Not scheduled
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Activity Log</h3>
                <div className="border rounded-md divide-y max-h-[200px] overflow-y-auto">
                  {selectedRequest.notes.map((note, index) => (
                    <div key={index} className="p-3 flex items-start">
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center mr-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm">{note}</p>
                        <p className="text-xs text-muted-foreground">
                          {index === 0
                            ? selectedRequest.dateSubmitted
                            : selectedRequest.dateUpdated}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue={selectedRequest.status}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => setIsViewRequestDialogOpen(false)}>
                    Close
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface MaintenanceRequestTableProps {
  requests: MaintenanceRequest[];
  onViewRequest: (request: MaintenanceRequest) => void;
}

const MaintenanceRequestTable = ({
  requests,
  onViewRequest,
}: MaintenanceRequestTableProps) => {
  const getPriorityBadgeVariant = (
    priority: MaintenanceRequest["priority"],
  ) => {
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

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request</TableHead>
              <TableHead>Property/Unit</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-6 text-muted-foreground"
                >
                  No maintenance requests found
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.title}</TableCell>
                  <TableCell>
                    {request.property}{" "}
                    <span className="text-muted-foreground">
                      #{request.unit}
                    </span>
                  </TableCell>
                  <TableCell>{request.requestedBy}</TableCell>
                  <TableCell>
                    {request.assignedTo || (
                      <span className="text-muted-foreground">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadgeVariant(request.priority)}>
                      {request.priority.charAt(0).toUpperCase() +
                        request.priority.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {request.dateSubmitted}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onViewRequest(request)}
                        >
                          <Eye className="h-4 w-4 mr-2" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" /> Edit Request
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Wrench className="h-4 w-4 mr-2" /> Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" /> Delete Request
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MaintenanceModule;
