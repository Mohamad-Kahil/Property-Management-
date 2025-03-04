import React from "react";
import { ThemeProvider } from "./common/ThemeProvider";
import Sidebar from "./layout/Sidebar";
import DashboardHeader from "./dashboard/DashboardHeader";
import WidgetGrid from "./dashboard/WidgetGrid";
import PropertyModule from "./modules/PropertyModule";
import TenantModule from "./modules/TenantModule";
import MaintenanceModule from "./modules/MaintenanceModule";
import FinanceModule from "./modules/FinanceModule";
import DocumentModule from "./modules/DocumentModule";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

function Home() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    if (path === "/properties") return "Properties";
    if (path === "/tenants") return "Tenants";
    if (path === "/maintenance") return "Maintenance";
    if (path === "/finances") return "Finances";
    if (path === "/documents") return "Documents";
    return "Dashboard";
  };

  return (
    <ThemeProvider defaultTheme={isDarkMode ? "dark" : "light"}>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar
          collapsed={collapsed}
          onToggle={toggleSidebar}
          onThemeToggle={toggleTheme}
          isDarkMode={isDarkMode}
          activePath={location.pathname}
          onNavigate={(path) => navigate(path)}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader
            title={getPageTitle()}
            onToggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
          />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<WidgetGrid />} />
              <Route path="/properties" element={<PropertyModule />} />
              <Route path="/tenants" element={<TenantModule />} />
              <Route path="/maintenance" element={<MaintenanceModule />} />
              <Route path="/finances" element={<FinanceModule />} />
              <Route path="/documents" element={<DocumentModule />} />
            </Routes>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Home;
