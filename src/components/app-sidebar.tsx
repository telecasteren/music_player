import * as React from "react";
import { AudioLines } from "lucide-react";
import { NavUser } from "@/components/settings/nav-user";
import MusicFolderUploader from "@/components/music-uploader";
import type { Artist } from "@/lib/types/artists-entry";
import navData from "@/lib/data/sidebar-data";
import { useSelectedArtist } from "@/hooks/use-selected-artist";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  const [artists, setArtists] = React.useState<Artist[]>([]);
  const { setSelectedArtist, setSelectedAlbum } = useSelectedArtist();

  React.useEffect(() => {
    fetch("http://localhost:4000/api/artists")
      .then((res) => res.json())
      .then((data) => {
        if (data?.artists?.length > 0) {
          setArtists(data.artists);
        } else {
          console.log("No artists found from API.");
        }
      })
      .catch(() => {
        throw new Error("Failed to fetch artists");
      });
  }, []);

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

      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <SidebarInput placeholder="Search.." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {artists.length === 0 ? (
                <div className="p-4 text-muted-foreground text-sm">
                  Upload music to see your library here.
                </div>
              ) : activeItem?.title === "Albums" ? (
                // Show albums list with artist name
                artists.flatMap((artist) =>
                  artist.albums.map((album) => {
                    const maxLength = 25;
                    const displayName =
                      album.name.length > maxLength
                        ? album.name.substring(0, maxLength) + ".."
                        : album.name;

                    return (
                      <a
                        href="#"
                        key={`${artist.name}-${album.name}`}
                        className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                        onClick={() => {
                          setSelectedArtist(artist);
                          setSelectedAlbum(album);
                        }}
                      >
                        <div className="flex w-full items-center gap-2">
                          <span>
                            {album.img?.src ? (
                              <img
                                src={
                                  album.img.src || "src/assets/proxy-image.png"
                                }
                                alt={album.img.alt || album.name}
                                className="w-8 border border-white rounded-sm"
                              />
                            ) : (
                              <div className="w-8 h-8 bg-gray-300 border rounded-sm" />
                            )}
                          </span>
                          <SidebarMenuButton asChild>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="font-medium">
                                  {displayName}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <b>{artist.name}</b> - {album.name}
                              </TooltipContent>
                            </Tooltip>
                          </SidebarMenuButton>
                        </div>
                      </a>
                    );
                  })
                )
              ) : activeItem?.title === "Artists" ? (
                // Show artists list
                artists.map((artist) => (
                  <a
                    href="#"
                    key={artist.name}
                    className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                    onClick={() => {
                      setSelectedArtist(artist);
                      setSelectedAlbum(null);
                    }}
                  >
                    <div className="flex w-full items-center gap-2">
                      <SidebarMenuButton asChild>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="font-medium">{artist.name}</span>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            {artist.name}
                          </TooltipContent>
                        </Tooltip>
                      </SidebarMenuButton>
                    </div>
                  </a>
                ))
              ) : null}
            </SidebarGroupContent>
          </SidebarGroup>
          <div className="mt-4 text-sm">
            <MusicFolderUploader
              onData={() => {
                fetch("http://localhost:4000/api/artists")
                  .then((res) => res.json())
                  .then((data) => setArtists(data.artists));
              }}
            />
          </div>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
