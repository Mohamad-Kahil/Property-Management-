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
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
  Home,
  User,
  Users,
  FileText,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  unit: string;
  property: string;
  leaseStart: string;
  leaseEnd: string;
  rentAmount: number;
  status: "active" | "pending" | "past" | "late";
}

interface TenantModuleProps {
  tenants?: Tenant[];
}

const TenantModule = ({
  tenants = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      unit: "101",
      property: "Sunset Apartments",
      leaseStart: "2023-01-01",
      leaseEnd: "2024-01-01",
      rentAmount: 1200,
      status: "active" as const,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "(555) 987-6543",
      unit: "205",
      property: "Riverfront Condos",
      leaseStart: "2023-03-15",
      leaseEnd: "2024-03-15",
      rentAmount: 1500,
      status: "active" as const,
    },
    {
      id: "3",
      name: "Michael Johnson",
      email: "michael.j@example.com",
      phone: "(555) 456-7890",
      unit: "304",
      property: "Highland Townhomes",
      leaseStart: "2023-05-01",
      leaseEnd: "2023-11-01",
      rentAmount: 1350,
      status: "late" as const,
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      phone: "(555) 789-0123",
      unit: "102",
      property: "Sunset Apartments",
      leaseStart: "2023-02-15",
      leaseEnd: "2024-02-15",
      rentAmount: 1250,
      status: "active" as const,
    },
    {
      id: "5",
      name: "Robert Brown",
      email: "robert.b@example.com",
      phone: "(555) 234-5678",
      unit: "401",
      property: "Downtown Lofts",
      leaseStart: "2023-06-01",
      leaseEnd: "2023-12-01",
      rentAmount: 1800,
      status: "pending" as const,
    },
    {
      id: "6",
      name: "Emily Davis",
      email: "emily.d@example.com",
      phone: "(555) 345-6789",
      unit: "210",
      property: "Riverfront Condos",
      leaseStart: "2022-07-01",
      leaseEnd: "2023-07-01",
      rentAmount: 1450,
      status: "past" as const,
    },
  ],
}: TenantModuleProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isAddTenantDialogOpen, setIsAddTenantDialogOpen] = useState(false);
  const [isViewTenantDialogOpen, setIsViewTenantDialogOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  // Filter tenants based on search term and active tab
  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.property.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active")
      return matchesSearch && tenant.status === "active";
    if (activeTab === "pending")
      return matchesSearch && tenant.status === "pending";
    if (activeTab === "past") return matchesSearch && tenant.status === "past";
    if (activeTab === "late") return matchesSearch && tenant.status === "late";

    return matchesSearch;
  });

  const handleViewTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setIsViewTenantDialogOpen(true);
  };

  const getStatusBadge = (status: Tenant["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "past":
        return <Badge variant="outline">Past</Badge>;
      case "late":
        return <Badge variant="destructive">Late</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Users className="mr-2 h-6 w-6" />
            Tenant Management
          </h1>
          <p className="text-muted-foreground">
            Manage tenant profiles, leases, and communications
          </p>
        </div>
        <Button onClick={() => setIsAddTenantDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Tenant
        </Button>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Tenants</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="late">Late Payment</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tenants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <TabsContent value="all" className="mt-6">
            <TenantTable tenants={filteredTenants} onView={handleViewTenant} />
          </TabsContent>
          <TabsContent value="active" className="mt-6">
            <TenantTable tenants={filteredTenants} onView={handleViewTenant} />
          </TabsContent>
          <TabsContent value="pending" className="mt-6">
            <TenantTable tenants={filteredTenants} onView={handleViewTenant} />
          </TabsContent>
          <TabsContent value="late" className="mt-6">
            <TenantTable tenants={filteredTenants} onView={handleViewTenant} />
          </TabsContent>
          <TabsContent value="past" className="mt-6">
            <TenantTable tenants={filteredTenants} onView={handleViewTenant} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Tenant Dialog */}
      <Dialog
        open={isAddTenantDialogOpen}
        onOpenChange={setIsAddTenantDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Tenant</DialogTitle>
            <DialogDescription>
              Create a new tenant profile. Fill in the details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="tenant-name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input id="tenant-name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label htmlFor="tenant-email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="tenant-email"
                  type="email"
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="tenant-phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input id="tenant-phone" placeholder="(555) 123-4567" />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="tenant-property"
                  className="text-sm font-medium"
                >
                  Property
                </label>
                <Input id="tenant-property" placeholder="Select property" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="tenant-unit" className="text-sm font-medium">
                  Unit
                </label>
                <Input id="tenant-unit" placeholder="Select unit" />
              </div>
              <div className="space-y-2">
                <label htmlFor="tenant-rent" className="text-sm font-medium">
                  Monthly Rent ($)
                </label>
                <Input id="tenant-rent" type="number" placeholder="1200" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="lease-start" className="text-sm font-medium">
                  Lease Start Date
                </label>
                <Input id="lease-start" type="date" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lease-end" className="text-sm font-medium">
                  Lease End Date
                </label>
                <Input id="lease-end" type="date" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddTenantDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button>Save Tenant</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Tenant Dialog */}
      <Dialog
        open={isViewTenantDialogOpen && selectedTenant !== null}
        onOpenChange={setIsViewTenantDialogOpen}
      >
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Tenant Details</DialogTitle>
          </DialogHeader>
          {selectedTenant && (
            <div className="grid gap-6 py-4">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-10 w-10 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedTenant.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(selectedTenant.status)}
                    <span className="text-sm text-muted-foreground">
                      Tenant ID: {selectedTenant.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`mailto:${selectedTenant.email}`}
                        className="text-primary hover:underline"
                      >
                        {selectedTenant.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`tel:${selectedTenant.phone}`}
                        className="text-primary hover:underline"
                      >
                        {selectedTenant.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Lease Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Property:
                        </dt>
                        <dd className="text-sm">{selectedTenant.property}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Unit:
                        </dt>
                        <dd className="text-sm">{selectedTenant.unit}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Lease Period:
                        </dt>
                        <dd className="text-sm">
                          {selectedTenant.leaseStart} to{" "}
                          {selectedTenant.leaseEnd}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Monthly Rent:
                        </dt>
                        <dd className="text-sm font-bold">
                          ${selectedTenant.rentAmount}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      <FileText className="h-4 w-4 mr-2" /> View Lease Document
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Payment History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">June 2023</p>
                          <p className="text-xs text-muted-foreground">
                            Paid on Jun 2, 2023
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Paid
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">May 2023</p>
                          <p className="text-xs text-muted-foreground">
                            Paid on May 3, 2023
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Paid
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">April 2023</p>
                          <p className="text-xs text-muted-foreground">
                            Paid on Apr 5, 2023
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Paid
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" /> View Full History
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" /> Send Message
                </Button>
                <div className="space-x-2">
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" /> Edit Tenant
                  </Button>
                  <Button variant="default">
                    <Home className="h-4 w-4 mr-2" /> Manage Lease
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface TenantTableProps {
  tenants: Tenant[];
  onView: (tenant: Tenant) => void;
}

const TenantTable = ({ tenants, onView }: TenantTableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tenant</TableHead>
              <TableHead>Property/Unit</TableHead>
              <TableHead>Lease Period</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-muted-foreground"
                >
                  No tenants found
                </TableCell>
              </TableRow>
            ) : (
              tenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">{tenant.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {tenant.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{tenant.property}</div>
                    <div className="text-sm text-muted-foreground">
                      Unit {tenant.unit}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {tenant.leaseStart} to {tenant.leaseEnd}
                    </div>
                  </TableCell>
                  <TableCell>${tenant.rentAmount}/mo</TableCell>
                  <TableCell>
                    {tenant.status === "active" && (
                      <Badge variant="default">Active</Badge>
                    )}
                    {tenant.status === "pending" && (
                      <Badge variant="secondary">Pending</Badge>
                    )}
                    {tenant.status === "past" && (
                      <Badge variant="outline">Past</Badge>
                    )}
                    {tenant.status === "late" && (
                      <Badge variant="destructive">Late</Badge>
                    )}
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
                        <DropdownMenuItem onClick={() => onView(tenant)}>
                          <Eye className="h-4 w-4 mr-2" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" /> Edit Tenant
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" /> View Lease
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" /> Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" /> Delete Tenant
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

export default TenantModule;
