import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
} from "lucide-react";

interface FinancialMetric {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

interface MonthlyRevenue {
  month: string;
  income: number;
  expenses: number;
}

interface FinancialSummaryWidgetProps {
  metrics?: FinancialMetric[];
  revenueData?: MonthlyRevenue[];
  title?: string;
  description?: string;
}

const FinancialSummaryWidget = ({
  metrics = [
    {
      title: "Total Revenue",
      value: "$24,780",
      change: 12.5,
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      title: "Expenses",
      value: "$8,230",
      change: -4.2,
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      title: "Net Income",
      value: "$16,550",
      change: 18.3,
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      title: "Outstanding",
      value: "$3,450",
      change: 2.1,
      icon: <DollarSign className="h-4 w-4" />,
    },
  ],
  revenueData = [
    { month: "Jan", income: 18500, expenses: 7200 },
    { month: "Feb", income: 19200, expenses: 7400 },
    { month: "Mar", income: 21000, expenses: 7800 },
    { month: "Apr", income: 22400, expenses: 8100 },
    { month: "May", income: 23800, expenses: 8300 },
    { month: "Jun", income: 24780, expenses: 8230 },
  ],
  title = "Financial Summary",
  description = "Overview of your property portfolio financial performance",
}: FinancialSummaryWidgetProps) => {
  // Simple bar chart representation using divs
  const maxValue = Math.max(
    ...revenueData.map((item) => Math.max(item.income, item.expenses)),
  );

  return (
    <Card className="w-full h-full bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                {metric.icon}
                <span>{metric.title}</span>
              </div>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div
                className={`flex items-center text-sm ${metric.change >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {metric.change >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                <span>{Math.abs(metric.change)}%</span>
                <span className="ml-1 text-muted-foreground">
                  vs last month
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Simple chart visualization */}
        <div className="mt-6">
          <div className="text-sm font-medium mb-2">Monthly Revenue Trend</div>
          <div className="flex items-end space-x-2 h-40">
            {revenueData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative w-full flex justify-center space-x-1">
                  <div
                    className="w-3 bg-blue-500 rounded-t"
                    style={{ height: `${(item.income / maxValue) * 100}%` }}
                  />
                  <div
                    className="w-3 bg-red-400 rounded-t"
                    style={{ height: `${(item.expenses / maxValue) * 100}%` }}
                  />
                </div>
                <div className="text-xs mt-1 text-muted-foreground">
                  {item.month}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
              <span className="text-xs">Income</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-400 rounded mr-1"></div>
              <span className="text-xs">Expenses</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex justify-between w-full text-sm">
          <div className="flex items-center text-muted-foreground">
            <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
            <span>Revenue growing steadily</span>
          </div>
          <button className="text-primary hover:underline">
            View detailed report
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FinancialSummaryWidget;
