import React from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  Wrench,
  DollarSign,
  FileText,
  Settings,
  LogOut,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onToggle?: () => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  activePath?: string;
}

const Sidebar = ({
  className,
  collapsed = false,
  onToggle = () => {},
  onThemeToggle = () => {},
  isDarkMode = false,
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  userAvatar = "",
  activePath = "/",
}: SidebarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { path: "/", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
    {
      path: "/properties",
      label: "Properties",
      icon: <Home className="h-5 w-5" />,
    },
    { path: "/tenants", label: "Tenants", icon: <Users className="h-5 w-5" /> },
    {
      path: "/maintenance",
      label: "Maintenance",
      icon: <Wrench className="h-5 w-5" />,
    },
    {
      path: "/finances",
      label: "Finances",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      path: "/documents",
      label: "Documents",
      icon: <FileText className="h-5 w-5" />,
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button - only visible on small screens */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar container */}
      <aside
        className={cn(
          "flex flex-col h-full bg-background border-r transition-all duration-300",
          collapsed ? "w-[80px]" : "w-[280px]",
          "fixed top-0 left-0 z-40 lg:relative",
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
          className,
        )}
      >
        {/* Logo and collapse button */}
        <div className="flex items-center justify-between p-4 h-16 border-b">
          <div className="flex items-center">
            <div className="bg-primary h-8 w-8 rounded-md flex items-center justify-center text-primary-foreground font-bold">
              PM
            </div>
            {!collapsed && (
              <span className="ml-3 font-semibold text-lg">PropManager</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex"
            onClick={onToggle}
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                collapsed ? "rotate-90" : "rotate-270",
              )}
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    activePath === item.path
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    collapsed ? "justify-center" : "justify-start",
                  )}
                >
                  {item.icon}
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section with user profile and settings */}
        <div className="mt-auto border-t p-4">
          {/* Theme toggle */}
          <div className="mb-4 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              className={collapsed ? "w-full" : ""}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              {!collapsed && <span className="ml-3">Toggle Theme</span>}
            </Button>
          </div>

          <Separator className="my-2" />

          {/* User profile */}
          <div className={cn("flex items-center", collapsed ? "flex-col" : "")}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-auto w-auto">
                  <div
                    className={cn(
                      "flex items-center",
                      collapsed ? "flex-col" : "",
                    )}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {!collapsed && (
                      <div className="ml-3 text-left">
                        <p className="text-sm font-medium">{userName}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[160px]">
                          {userEmail}
                        </p>
                      </div>
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default Sidebar;
