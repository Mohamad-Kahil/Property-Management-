import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
  Building2,
  Home,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Property {
  id: string;
  name: string;
  address: string;
  type: "Residential" | "Commercial" | "Industrial";
  units: number;
  occupancyRate: number;
  status: "Active" | "Inactive" | "Under Maintenance";
}

interface PropertyListProps {
  properties?: Property[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onManageUnits?: (id: string) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({
  properties = [
    {
      id: "1",
      name: "Sunset Apartments",
      address: "123 Main St, Anytown, USA",
      type: "Residential",
      units: 24,
      occupancyRate: 87,
      status: "Active",
    },
    {
      id: "2",
      name: "Downtown Office Plaza",
      address: "456 Business Ave, Metropolis, USA",
      type: "Commercial",
      units: 12,
      occupancyRate: 92,
      status: "Active",
    },
    {
      id: "3",
      name: "Riverside Condos",
      address: "789 River Rd, Riverside, USA",
      type: "Residential",
      units: 36,
      occupancyRate: 75,
      status: "Under Maintenance",
    },
    {
      id: "4",
      name: "Tech Park Warehouses",
      address: "101 Industrial Blvd, Techville, USA",
      type: "Industrial",
      units: 8,
      occupancyRate: 100,
      status: "Active",
    },
    {
      id: "5",
      name: "Lakeside Villas",
      address: "222 Lake View Dr, Laketown, USA",
      type: "Residential",
      units: 18,
      occupancyRate: 61,
      status: "Inactive",
    },
  ],
  onEdit = () => {},
  onDelete = () => {},
  onView = () => {},
  onManageUnits = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusBadgeVariant = (status: Property["status"]) => {
    switch (status) {
      case "Active":
        return "default";
      case "Inactive":
        return "secondary";
      case "Under Maintenance":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPropertyTypeIcon = (type: Property["type"]) => {
    switch (type) {
      case "Residential":
        return <Home className="h-4 w-4 mr-1" />;
      case "Commercial":
        return <Building2 className="h-4 w-4 mr-1" />;
      case "Industrial":
        return <Building2 className="h-4 w-4 mr-1" />;
      default:
        return <Building2 className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="w-full bg-background p-6 rounded-lg border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Properties</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search properties..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Add Property
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Units</TableHead>
              <TableHead>Occupancy</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.name}</TableCell>
                  <TableCell>{property.address}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getPropertyTypeIcon(property.type)}
                      {property.type}
                    </div>
                  </TableCell>
                  <TableCell>{property.units}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-full bg-muted rounded-full h-2.5 mr-2">
                        <div
                          className={`h-2.5 rounded-full ${property.occupancyRate >= 80 ? "bg-green-500" : property.occupancyRate >= 50 ? "bg-yellow-500" : "bg-red-500"}`}
                          style={{ width: `${property.occupancyRate}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{property.occupancyRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(property.status)}>
                      {property.status}
                    </Badge>
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
                        <DropdownMenuItem onClick={() => onView(property.id)}>
                          <Eye className="h-4 w-4 mr-2" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(property.id)}>
                          <Edit className="h-4 w-4 mr-2" /> Edit Property
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onManageUnits(property.id)}
                        >
                          <Building2 className="h-4 w-4 mr-2" /> Manage Units
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setSelectedProperty(property);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete Property
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-muted-foreground"
                >
                  No properties found. Try adjusting your search or add a new
                  property.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete the property "
              {selectedProperty?.name}"?
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              This action cannot be undone. All associated units and data will
              be permanently removed.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedProperty) {
                  onDelete(selectedProperty.id);
                  setIsDeleteDialogOpen(false);
                }
              }}
            >
              Delete Property
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyList;
