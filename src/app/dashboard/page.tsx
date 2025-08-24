import * as React from "react";
import { InnerList } from "./InnerList";
import { SidebarProvider } from "@/components/ui/sidebar";
import artists from "@/lib/data/artistsData";

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
      <InnerList listItems={listItems} artists={artists} />
    </SidebarProvider>
  );
}
