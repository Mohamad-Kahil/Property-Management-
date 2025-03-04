import React from "react";
import { ThemeProvider } from "./common/ThemeProvider";
import Sidebar from "./layout/Sidebar";
import DashboardHeader from "./dashboard/DashboardHeader";
import WidgetGrid from "./dashboard/WidgetGrid";

function Home() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider defaultTheme={isDarkMode ? "dark" : "light"}>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar
          collapsed={collapsed}
          onToggle={toggleSidebar}
          onThemeToggle={toggleTheme}
          isDarkMode={isDarkMode}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader
            title="Dashboard"
            onToggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
          />
          <main className="flex-1 overflow-y-auto">
            <WidgetGrid />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Home;
