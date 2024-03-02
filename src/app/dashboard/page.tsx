"use client";

import { useConvexAuth } from "convex/react";
import { MainView } from "./_components/main-view";

const DashboardPage = () => {

  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <>
     {isAuthenticated && <MainView />}
    </>
  );
};

export default DashboardPage;
