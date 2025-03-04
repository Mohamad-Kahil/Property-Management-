import React, { useState } from "react";
import {
  File,
  FolderOpen,
  Upload,
  Download,
  Share2,
  Trash2,
  Search,
  Plus,
  Filter,
  FileText,
  FileImage,
  FileArchive,
  MoreHorizontal,
  Calendar,
  User,
  Home,
} from "lucide-react";

// Create custom icon components since FilePdf is not available in lucide-react
const FilePdf = (props) => <File {...props} />;
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "image" | "text" | "archive" | "other";
  size: string;
  category: string;
  associatedWith: string;
  uploadedBy: string;
  uploadDate: string;
  tags: string[];
}

interface DocumentModuleProps {
  documents?: Document[];
}

const DocumentModule = ({
  documents = [
    {
      id: "doc-1",
      name: "Lease Agreement - Sunset Apartments.pdf",
      type: "pdf",
      size: "2.4 MB",
      category: "Lease",
      associatedWith: "Sunset Apartments",
      uploadedBy: "Admin User",
      uploadDate: "2023-05-15",
      tags: ["lease", "legal", "tenant"],
    },
    {
      id: "doc-2",
      name: "Property Inspection Report.pdf",
      type: "pdf",
      size: "3.1 MB",
      category: "Inspection",
      associatedWith: "Riverfront Condos",
      uploadedBy: "Property Manager",
      uploadDate: "2023-06-02",
      tags: ["inspection", "maintenance"],
    },
    {
      id: "doc-3",
      name: "Building Exterior Photos.zip",
      type: "archive",
      size: "15.7 MB",
      category: "Photos",
      associatedWith: "Highland Townhomes",
      uploadedBy: "Maintenance Staff",
      uploadDate: "2023-06-10",
      tags: ["photos", "exterior"],
    },
    {
      id: "doc-4",
      name: "Tenant Application Form.pdf",
      type: "pdf",
      size: "1.2 MB",
      category: "Application",
      associatedWith: "Tenant",
      uploadedBy: "Admin User",
      uploadDate: "2023-04-28",
      tags: ["application", "tenant"],
    },
    {
      id: "doc-5",
      name: "Maintenance Request Form.docx",
      type: "text",
      size: "0.8 MB",
      category: "Maintenance",
      associatedWith: "System",
      uploadedBy: "Admin User",
      uploadDate: "2023-03-15",
      tags: ["maintenance", "form", "template"],
    },
    {
      id: "doc-6",
      name: "Property Floor Plan.jpg",
      type: "image",
      size: "4.5 MB",
      category: "Floor Plan",
      associatedWith: "Sunset Apartments",
      uploadedBy: "Property Manager",
      uploadDate: "2023-02-20",
      tags: ["floor plan", "layout"],
    },
  ],
}: DocumentModuleProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null,
  );

  // Filter documents based on search term and active tab
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.associatedWith.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "leases")
      return matchesSearch && doc.category === "Lease";
    if (activeTab === "inspections")
      return matchesSearch && doc.category === "Inspection";
    if (activeTab === "maintenance")
      return matchesSearch && doc.category === "Maintenance";
    if (activeTab === "photos")
      return matchesSearch && doc.category === "Photos";

    return matchesSearch;
  });

  const getDocumentIcon = (type: Document["type"]) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "image":
        return <FileImage className="h-4 w-4 text-blue-500" />;
      case "text":
        return <FileText className="h-4 w-4 text-green-500" />;
      case "archive":
        return <FileArchive className="h-4 w-4 text-yellow-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleShareDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsShareDialogOpen(true);
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <FolderOpen className="mr-2" />
            Document Storage
          </h1>
          <p className="text-muted-foreground">
            Manage and organize all your property-related documents
          </p>
        </div>
        <Button onClick={() => setIsUploadDialogOpen(true)}>
          <Upload className="mr-2 h-4 w-4" /> Upload Document
        </Button>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Documents</TabsTrigger>
              <TabsTrigger value="leases">Leases</TabsTrigger>
              <TabsTrigger value="inspections">Inspections</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
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
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Filter by Date</DropdownMenuItem>
                  <DropdownMenuItem>Filter by Size</DropdownMenuItem>
                  <DropdownMenuItem>Filter by Type</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <TabsContent value="all" className="mt-6">
            <DocumentTable
              documents={filteredDocuments}
              getDocumentIcon={getDocumentIcon}
              onShare={handleShareDocument}
            />
          </TabsContent>
          <TabsContent value="leases" className="mt-6">
            <DocumentTable
              documents={filteredDocuments}
              getDocumentIcon={getDocumentIcon}
              onShare={handleShareDocument}
            />
          </TabsContent>
          <TabsContent value="inspections" className="mt-6">
            <DocumentTable
              documents={filteredDocuments}
              getDocumentIcon={getDocumentIcon}
              onShare={handleShareDocument}
            />
          </TabsContent>
          <TabsContent value="maintenance" className="mt-6">
            <DocumentTable
              documents={filteredDocuments}
              getDocumentIcon={getDocumentIcon}
              onShare={handleShareDocument}
            />
          </TabsContent>
          <TabsContent value="photos" className="mt-6">
            <DocumentTable
              documents={filteredDocuments}
              getDocumentIcon={getDocumentIcon}
              onShare={handleShareDocument}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload Document Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>
              Upload a new document to the document storage system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm font-medium mb-1">
                Drag and drop your file here
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                or click to browse files
              </p>
              <Button variant="outline" size="sm">
                Browse Files
              </Button>
            </div>

            <div className="space-y-2">
              <label htmlFor="doc-category" className="text-sm font-medium">
                Document Category
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lease">Lease</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="photos">Photos</SelectItem>
                  <SelectItem value="application">Application</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="doc-associated" className="text-sm font-medium">
                Associated With
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select association" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="property">Property</SelectItem>
                  <SelectItem value="tenant">Tenant</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="doc-tags" className="text-sm font-medium">
                Tags (comma separated)
              </label>
              <Input id="doc-tags" placeholder="e.g. lease, legal, tenant" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUploadDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Document Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Share Document</DialogTitle>
            <DialogDescription>
              Share "{selectedDocument?.name}" with others.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
              {selectedDocument && getDocumentIcon(selectedDocument.type)}
              <span className="text-sm font-medium truncate">
                {selectedDocument?.name}
              </span>
            </div>

            <div className="space-y-2">
              <label htmlFor="share-email" className="text-sm font-medium">
                Email Recipients
              </label>
              <Input id="share-email" placeholder="Enter email addresses" />
              <p className="text-xs text-muted-foreground">
                Separate multiple emails with commas
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="share-permission" className="text-sm font-medium">
                Permission Level
              </label>
              <Select defaultValue="view">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">View Only</SelectItem>
                  <SelectItem value="download">View & Download</SelectItem>
                  <SelectItem value="edit">Edit & Download</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="share-message" className="text-sm font-medium">
                Message (Optional)
              </label>
              <Input id="share-message" placeholder="Add a message" />
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Access expires in</span>
              <Select defaultValue="never">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">7 days</SelectItem>
                  <SelectItem value="30days">30 days</SelectItem>
                  <SelectItem value="90days">90 days</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsShareDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button>
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Document Categories Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 h-5 w-5 text-blue-500" />
              Leases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {documents.filter((doc) => doc.category === "Lease").length}
            </p>
            <p className="text-sm text-muted-foreground">Documents</p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              View All Leases
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 h-5 w-5 text-green-500" />
              Inspections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {documents.filter((doc) => doc.category === "Inspection").length}
            </p>
            <p className="text-sm text-muted-foreground">Documents</p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              View All Inspections
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 h-5 w-5 text-yellow-500" />
              Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {documents.filter((doc) => doc.category === "Maintenance").length}
            </p>
            <p className="text-sm text-muted-foreground">Documents</p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              View All Maintenance
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileImage className="mr-2 h-5 w-5 text-purple-500" />
              Photos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {documents.filter((doc) => doc.category === "Photos").length}
            </p>
            <p className="text-sm text-muted-foreground">Documents</p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              View All Photos
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Recent document activity across all properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Upload className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Document Uploaded</p>
                <p className="text-xs text-muted-foreground">
                  Property Inspection Report.pdf was uploaded by Property
                  Manager
                </p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Share2 className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Document Shared</p>
                <p className="text-xs text-muted-foreground">
                  Lease Agreement - Sunset Apartments.pdf was shared by Admin
                  User
                </p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-100 p-2 rounded-full">
                <Download className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Document Downloaded</p>
                <p className="text-xs text-muted-foreground">
                  Tenant Application Form.pdf was downloaded by Admin User
                </p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Storage Usage Section */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
          <CardDescription>Current document storage usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Used Storage</span>
                <span className="text-sm font-medium">27.7 MB / 1 GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "2.77%" }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                  <span className="text-sm">PDF Files</span>
                </div>
                <p className="text-sm font-medium">6.7 MB</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span className="text-sm">Images</span>
                </div>
                <p className="text-sm font-medium">4.5 MB</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                  <span className="text-sm">Archives</span>
                </div>
                <p className="text-sm font-medium">15.7 MB</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span className="text-sm">Text Files</span>
                </div>
                <p className="text-sm font-medium">0.8 MB</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface DocumentTableProps {
  documents: Document[];
  getDocumentIcon: (type: Document["type"]) => React.ReactNode;
  onShare: (document: Document) => void;
}

const DocumentTable = ({
  documents,
  getDocumentIcon,
  onShare,
}: DocumentTableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Associated With</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-6 text-muted-foreground"
                >
                  No documents found
                </TableCell>
              </TableRow>
            ) : (
              documents.map((document) => (
                <TableRow key={document.id}>
                  <TableCell>
                    <div className="flex items-center">
                      {getDocumentIcon(document.type)}
                      <span className="ml-2 font-medium">{document.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{document.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {document.associatedWith.includes("Apartments") ||
                      document.associatedWith.includes("Condos") ||
                      document.associatedWith.includes("Townhomes") ? (
                        <Home className="h-3 w-3 mr-1" />
                      ) : document.associatedWith === "Tenant" ? (
                        <User className="h-3 w-3 mr-1" />
                      ) : (
                        <File className="h-3 w-3 mr-1" />
                      )}
                      {document.associatedWith}
                    </div>
                  </TableCell>
                  <TableCell>{document.size}</TableCell>
                  <TableCell>{document.uploadedBy}</TableCell>
                  <TableCell>{document.uploadDate}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {document.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onShare(document)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" /> Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onShare(document)}>
                            <Share2 className="h-4 w-4 mr-2" /> Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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

export default DocumentModule;
