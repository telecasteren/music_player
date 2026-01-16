import * as React from "react";
import { InnerListWithProvider } from "./inner-list";
import { SidebarProvider } from "@/components/ui/sidebar";

// Sample breadcrumb data
const listItems = ["artists", "albums", "songs", "playlists", "events"];

export default function Dashboard() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <InnerListWithProvider listItems={listItems} />
    </SidebarProvider>
  );
}
