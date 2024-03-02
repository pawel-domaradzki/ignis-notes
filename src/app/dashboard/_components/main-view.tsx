"use client";

import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { useConvexAuth, useQuery } from "convex/react";
import Link from "next/link";
import React, { useState } from "react";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { WorkspaceCreator } from "./workspace-creator";
import { api } from "../../../../convex/_generated/api";

interface MainViewProps {
  workspaces?: {
    label: string;
  }[];
  defaultLayout?: number[] | undefined;
  defaultCollapsed?: boolean;
}

export function MainView({
  defaultLayout = [15, 85],
 
}: MainViewProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);


  const workspaces = useQuery(api.workspaces.listWorkspaces) || [];
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] w-full rounded-lg border"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        minSize={12}
        maxSize={20}
        collapsedSize={5}
        collapsible={true}
        onCollapse={() => {
          setIsCollapsed(true);
        }}
        className={cn(
          isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out"
        )}
      >
        <div
          className={cn(
            "flex h-[52px] items-center justify-center",
            isCollapsed ? "h-[52px]" : "px-2"
          )}
        >
          {workspaces.length ? (
            <WorkspaceSwitcher
              isCollapsed={isCollapsed}
              workspaces={workspaces}
            />
          ) : (
            <WorkspaceCreator />
          )}
        </div>
        <Separator />
        <div className="flex h-full items-center justify-center p-6">
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          ></div>
        
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </>
        
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
