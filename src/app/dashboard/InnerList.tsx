import { AppSidebar } from "@/components/app-sidebar";
import { Play } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import {
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import type { Artist } from "@/lib/data/artists/typesArtists";
import { albumInfo } from "@/lib/helpers/data_mapping";

type Props = {
  listItems: string[];
  artists: Artist[];
};

export function InnerList({ listItems, artists }: Props) {
  const { state, isMobile } = useSidebar();

  return (
    <>
      <AppSidebar />

      <SidebarInset
        className={clsx(
          "overflow-y-auto",
          isMobile
            ? "relative w-full h-auto"
            : [
                "fixed top-0 right-5 h-full",
                state === "collapsed"
                  ? "w-[calc(100%-1.25rem)] pl-10"
                  : "w-[calc(97%-350px)]",
              ]
        )}
      >
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">All {listItems[0]}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{artists[1].name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {albumInfo.map((artist) => (
            <div className="bg-muted/50 aspect-video h-12 w-full rounded-lg flex items-center">
              {artist.albums.map((album) => (
                <div className="flex items-center justify-between gap-4 ml-8 mr-8 w-full">
                  <img
                    src={album.imgSrc}
                    alt={album.imgAlt}
                    className="w-10 border border-white rounded-sm"
                  />
                  <div className="flex gap-2 flex-1 justify-between items-center">
                    <p>{album.albumTitle}</p>
                    <span className="text-xs text-gray-500">
                      ({album.numberOfSongs} songs)
                    </span>
                  </div>

                  <Button className="group flex items-center gap-2 cursor-pointer">
                    <Play className="w-4 h-4 text-gray-900 group-hover:text-gray-500" />
                    <span className="sr-only">Play</span>
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </SidebarInset>
    </>
  );
}
