import * as React from "react";
import { InnerListWithProvider } from "./InnerList";
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
