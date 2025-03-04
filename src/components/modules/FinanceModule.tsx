import React from "react";
import { FinancialSummaryWidget } from "../dashboard/widgets";

const FinanceModule = () => {
  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Financial Management</h1>
          <p className="text-muted-foreground">
            Track and manage your property finances
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <FinancialSummaryWidget />
      </div>
    </div>
  );
};

export default FinanceModule;
