import React from "react";
import PropertyList from "./property/PropertyList";

const PropertyModule = () => {
  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Property Management</h1>
          <p className="text-muted-foreground">
            Manage your properties and units
          </p>
        </div>
      </div>
      <PropertyList />
    </div>
  );
};

export default PropertyModule;
