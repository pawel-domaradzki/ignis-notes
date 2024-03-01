"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AccountSwitcherProps {
  isCollapsed: boolean;
  workspaces: {
    label: string;
  }[];
}

export function WorkspaceSwitcher({
  isCollapsed,
  workspaces,
}: AccountSwitcherProps) {
  const [selectedAccount, setSelectedAccount] = React.useState<string>(
    workspaces[0].label
  );

  return (
    <Select defaultValue={selectedAccount} onValueChange={setSelectedAccount}>
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
          isCollapsed &&
            "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
        )}
        aria-label="Select account"
      >
        <SelectValue placeholder="Select an account">
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Vercel</title>
            <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
          </svg>
          <span className={cn("ml-2", isCollapsed && "hidden")}>
            {
              workspaces.find(
                (workspace) => workspace.label === selectedAccount
              )?.label
            }
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {workspaces.map((workspace) => (
          <SelectItem key={workspace.label} value={workspace.label}>
            <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Vercel</title>
                <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
              </svg>
              {workspace.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
