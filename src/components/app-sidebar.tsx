import * as React from "react";
import { AudioLines } from "lucide-react";
import { NavUser } from "@/components/settings/nav-user";
import MusicFolderUploader from "@/components/MusicUploader";
// import type { Artist } from "@/lib/data/types/artists";
import mergeArtists from "@/lib/helpers/mergeArtists";
import artists from "@/lib/data/artistsData";
import navData from "@/lib/data/sidebarData";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Now state is used to set item active -- use the url/router
  const [activeItem, setActiveItem] = React.useState(navData.navMain[0]);

  const { setOpen } = useSidebar();
  // const [artists, setArtists] = React.useState<Artist[]>([]);

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="cursor-default bg-[var(--accent-light)] dark:bg-[var(--accent-dark)] text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                    <AudioLines className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Satori Music</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {navData.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item);
                        setOpen(true);
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2 cursor-pointer"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="mb-25">
          <NavUser user={navData.user} />
        </SidebarFooter>
      </Sidebar>

      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <SidebarInput placeholder="Search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {artists.length === 0 ? (
                <div className="p-4 text-muted-foreground text-sm">
                  Upload music to see your library here.
                </div>
              ) : (
                artists.flatMap((artist) =>
                  artist.albums.map((album) => (
                    <a
                      href="#"
                      key={`${artist.name}-${album.name}`}
                      className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                    >
                      <div className="flex w-full items-center gap-2">
                        <span>
                          {album.img?.src ? (
                            <img
                              src={album.img.src}
                              alt={album.img.alt || album.name}
                              className="w-8 border border-white rounded-sm"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-gray-300 border rounded-sm" />
                          )}
                        </span>
                        <span className="font-medium">
                          {album.name}
                          {album.releaseYear && (
                            <span className="ml-2 text-xs">
                              ({album.releaseYear})
                            </span>
                          )}
                        </span>
                        <span className="ml-auto">{artist.name}</span>
                      </div>
                    </a>
                  ))
                )
              )}
            </SidebarGroupContent>
          </SidebarGroup>
          <div className="mt-4 text-sm">
            <MusicFolderUploader onData={artists} />
            {/* onData={(newArtists) =>
              setArtists((prev) => mergeArtists(prev, newArtists))
            }
            /> */}
          </div>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
