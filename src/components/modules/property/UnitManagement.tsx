import React, { useState } from "react";
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  Search,
  Upload,
  Globe,
  CheckCircle2,
  XCircle,
  Info,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface Unit {
  id: string;
  name: string;
  type: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  rent: number;
  status: "occupied" | "vacant" | "maintenance";
  isListed: boolean;
}

interface UnitManagementProps {
  propertyId?: string;
  propertyName?: string;
  units?: Unit[];
}

const UnitManagement = ({
  propertyId = "prop-123",
  propertyName = "Sunset Apartments",
  units = [
    {
      id: "unit-1",
      name: "Unit 101",
      type: "Apartment",
      size: 750,
      bedrooms: 1,
      bathrooms: 1,
      rent: 1200,
      status: "occupied" as const,
      isListed: false,
    },
    {
      id: "unit-2",
      name: "Unit 102",
      type: "Apartment",
      size: 950,
      bedrooms: 2,
      bathrooms: 1,
      rent: 1500,
      status: "vacant" as const,
      isListed: true,
    },
    {
      id: "unit-3",
      name: "Unit 103",
      type: "Studio",
      size: 550,
      bedrooms: 0,
      bathrooms: 1,
      rent: 950,
      status: "maintenance" as const,
      isListed: false,
    },
    {
      id: "unit-4",
      name: "Unit 201",
      type: "Apartment",
      size: 1100,
      bedrooms: 2,
      bathrooms: 2,
      rent: 1800,
      status: "vacant" as const,
      isListed: true,
    },
  ],
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isAddUnitDialogOpen, setIsAddUnitDialogOpen] = useState(false);
  const [isEditUnitDialogOpen, setIsEditUnitDialogOpen] = useState(false);
  const [isListingDialogOpen, setIsListingDialogOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  // Filter units based on search term and active tab
  const filteredUnits = units.filter((unit) => {
    const matchesSearch =
      unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.type.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "vacant")
      return matchesSearch && unit.status === "vacant";
    if (activeTab === "occupied")
      return matchesSearch && unit.status === "occupied";
    if (activeTab === "maintenance")
      return matchesSearch && unit.status === "maintenance";
    if (activeTab === "listed") return matchesSearch && unit.isListed;

    return matchesSearch;
  });

  const handleEditUnit = (unit: Unit) => {
    setSelectedUnit(unit);
    setIsEditUnitDialogOpen(true);
  };

  const handleListUnit = (unit: Unit) => {
    setSelectedUnit(unit);
    setIsListingDialogOpen(true);
  };

  const getStatusBadge = (status: Unit["status"]) => {
    switch (status) {
      case "occupied":
        return <Badge variant="secondary">Occupied</Badge>;
      case "vacant":
        return <Badge variant="default">Vacant</Badge>;
      case "maintenance":
        return <Badge variant="destructive">Maintenance</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Building2 className="mr-2" />
            {propertyName} - Unit Management
          </h1>
          <p className="text-muted-foreground">
            Manage units for this property
          </p>
        </div>
        <Button onClick={() => setIsAddUnitDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Unit
        </Button>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Units</TabsTrigger>
              <TabsTrigger value="vacant">Vacant</TabsTrigger>
              <TabsTrigger value="occupied">Occupied</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="listed">Listed</TabsTrigger>
            </TabsList>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search units..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <TabsContent value="all" className="mt-6">
            <UnitTable
              units={filteredUnits}
              onEdit={handleEditUnit}
              onList={handleListUnit}
            />
          </TabsContent>
          <TabsContent value="vacant" className="mt-6">
            <UnitTable
              units={filteredUnits}
              onEdit={handleEditUnit}
              onList={handleListUnit}
            />
          </TabsContent>
          <TabsContent value="occupied" className="mt-6">
            <UnitTable
              units={filteredUnits}
              onEdit={handleEditUnit}
              onList={handleListUnit}
            />
          </TabsContent>
          <TabsContent value="maintenance" className="mt-6">
            <UnitTable
              units={filteredUnits}
              onEdit={handleEditUnit}
              onList={handleListUnit}
            />
          </TabsContent>
          <TabsContent value="listed" className="mt-6">
            <UnitTable
              units={filteredUnits}
              onEdit={handleEditUnit}
              onList={handleListUnit}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Unit Dialog */}
      <Dialog open={isAddUnitDialogOpen} onOpenChange={setIsAddUnitDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Unit</DialogTitle>
            <DialogDescription>
              Create a new unit for {propertyName}. Fill in the details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="unit-name" className="text-sm font-medium">
                  Unit Name
                </label>
                <Input id="unit-name" placeholder="e.g. Unit 101" />
              </div>
              <div className="space-y-2">
                <label htmlFor="unit-type" className="text-sm font-medium">
                  Unit Type
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="unit-size" className="text-sm font-medium">
                  Size (sq ft)
                </label>
                <Input id="unit-size" type="number" placeholder="750" />
              </div>
              <div className="space-y-2">
                <label htmlFor="unit-bedrooms" className="text-sm font-medium">
                  Bedrooms
                </label>
                <Input id="unit-bedrooms" type="number" placeholder="1" />
              </div>
              <div className="space-y-2">
                <label htmlFor="unit-bathrooms" className="text-sm font-medium">
                  Bathrooms
                </label>
                <Input id="unit-bathrooms" type="number" placeholder="1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="unit-rent" className="text-sm font-medium">
                  Monthly Rent ($)
                </label>
                <Input id="unit-rent" type="number" placeholder="1200" />
              </div>
              <div className="space-y-2">
                <label htmlFor="unit-status" className="text-sm font-medium">
                  Status
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vacant">Vacant</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddUnitDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button>Save Unit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Unit Dialog */}
      <Dialog
        open={isEditUnitDialogOpen && selectedUnit !== null}
        onOpenChange={setIsEditUnitDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Unit</DialogTitle>
            <DialogDescription>
              Update details for {selectedUnit?.name}.
            </DialogDescription>
          </DialogHeader>
          {selectedUnit && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="edit-unit-name"
                    className="text-sm font-medium"
                  >
                    Unit Name
                  </label>
                  <Input id="edit-unit-name" defaultValue={selectedUnit.name} />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="edit-unit-type"
                    className="text-sm font-medium"
                  >
                    Unit Type
                  </label>
                  <Select defaultValue={selectedUnit.type.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="edit-unit-size"
                    className="text-sm font-medium"
                  >
                    Size (sq ft)
                  </label>
                  <Input
                    id="edit-unit-size"
                    type="number"
                    defaultValue={selectedUnit.size}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="edit-unit-bedrooms"
                    className="text-sm font-medium"
                  >
                    Bedrooms
                  </label>
                  <Input
                    id="edit-unit-bedrooms"
                    type="number"
                    defaultValue={selectedUnit.bedrooms}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="edit-unit-bathrooms"
                    className="text-sm font-medium"
                  >
                    Bathrooms
                  </label>
                  <Input
                    id="edit-unit-bathrooms"
                    type="number"
                    defaultValue={selectedUnit.bathrooms}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="edit-unit-rent"
                    className="text-sm font-medium"
                  >
                    Monthly Rent ($)
                  </label>
                  <Input
                    id="edit-unit-rent"
                    type="number"
                    defaultValue={selectedUnit.rent}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="edit-unit-status"
                    className="text-sm font-medium"
                  >
                    Status
                  </label>
                  <Select defaultValue={selectedUnit.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vacant">Vacant</SelectItem>
                      <SelectItem value="occupied">Occupied</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditUnitDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* List Unit on Web Portal Dialog */}
      <Dialog
        open={isListingDialogOpen && selectedUnit !== null}
        onOpenChange={setIsListingDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>List Unit on Web Portal</DialogTitle>
            <DialogDescription>
              Configure listing details for {selectedUnit?.name} on the web
              portal.
            </DialogDescription>
          </DialogHeader>
          {selectedUnit && (
            <div className="grid gap-6 py-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Listing Status</h4>
                  <p className="text-sm text-muted-foreground">
                    Make this unit visible on the web portal
                  </p>
                </div>
                <Switch checked={selectedUnit.isListed} />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Listing Preview</CardTitle>
                  <CardDescription>
                    How the unit will appear on the web portal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="aspect-video rounded-md bg-muted flex items-center justify-center">
                      <Upload className="h-10 w-10 text-muted-foreground" />
                      <span className="ml-2 text-muted-foreground">
                        Add photos
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {selectedUnit.name} - {propertyName}
                      </h3>
                      <p className="text-muted-foreground">
                        {selectedUnit.bedrooms} bed · {selectedUnit.bathrooms}{" "}
                        bath · {selectedUnit.size} sq ft
                      </p>
                      <p className="text-lg font-bold mt-2">
                        ${selectedUnit.rent}/month
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <textarea
                        className="w-full min-h-[100px] rounded-md border border-input bg-transparent p-3 text-sm shadow-sm"
                        placeholder="Enter a description for this unit listing..."
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Info className="h-4 w-4 mr-1" />
                    Last updated: Never
                  </div>
                  <div className="flex items-center">
                    {selectedUnit.isListed ? (
                      <Badge variant="secondary" className="flex items-center">
                        <Globe className="h-3 w-3 mr-1" /> Listed
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="flex items-center">
                        <XCircle className="h-3 w-3 mr-1" /> Not Listed
                      </Badge>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsListingDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              {selectedUnit?.isListed ? "Update Listing" : "Publish Listing"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface UnitTableProps {
  units: Unit[];
  onEdit: (unit: Unit) => void;
  onList: (unit: Unit) => void;
}

const UnitTable = ({ units, onEdit, onList }: UnitTableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Unit</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Bed/Bath</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Listed</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {units.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-6 text-muted-foreground"
                >
                  No units found
                </TableCell>
              </TableRow>
            ) : (
              units.map((unit) => (
                <TableRow key={unit.id}>
                  <TableCell className="font-medium">{unit.name}</TableCell>
                  <TableCell>{unit.type}</TableCell>
                  <TableCell>{unit.size} sq ft</TableCell>
                  <TableCell>
                    {unit.bedrooms} bed / {unit.bathrooms} bath
                  </TableCell>
                  <TableCell>${unit.rent}/mo</TableCell>
                  <TableCell>
                    {unit.status === "occupied" && (
                      <Badge variant="secondary">Occupied</Badge>
                    )}
                    {unit.status === "vacant" && (
                      <Badge variant="default">Vacant</Badge>
                    )}
                    {unit.status === "maintenance" && (
                      <Badge variant="destructive">Maintenance</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {unit.isListed ? (
                      <Badge variant="secondary" className="flex items-center">
                        <Globe className="h-3 w-3 mr-1" /> Listed
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="flex items-center">
                        <XCircle className="h-3 w-3 mr-1" /> Not Listed
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(unit)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onList(unit)}
                    >
                      <Globe className="h-4 w-4" />
                    </Button>
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

export default UnitManagement;
