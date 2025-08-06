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
          {Array.from({ length: 14 }).map((_, index) => (
            <div
              key={index}
              className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
            >
              <div className="flex items-center justify-center gap-8">
                <img
                  src={artists[1].album.img.src}
                  alt={artists[1].album.img.alt}
                  className="w-12 border border-white rounded-sm"
                />
                <p>{artists[1].album.name}</p>
                <Button className="group flex items-center gap-2 cursor-pointer">
                  <Play className="w-4 h-4 text-gray-900 group-hover:text-gray-500" />
                  <span className="sr-only">Play</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SidebarInset>
    </>
  );
}
