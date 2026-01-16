"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SelectedArtistDataProvider } from "@/context/selected-artist-data-provider";
import { useSelectedArtist } from "@/hooks/use-selected-artist";
import { Play, CircleArrowLeft } from "lucide-react";
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
import { useAudio } from "@/hooks/useAudio";
import { enhanceTrack, enhanceTracks } from "@/lib/helpers/data_mapping";

type Props = {
  listItems: string[];
};

function InnerList({ listItems }: Props) {
  const { state, isMobile } = useSidebar();
  const { selectedArtist, setSelectedArtist, selectedAlbum, setSelectedAlbum } =
    useSelectedArtist();
  const { playTrack, playAlbum } = useAudio();

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
                <BreadcrumbPage>{selectedArtist?.name}</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{selectedAlbum?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {selectedAlbum ? (
            selectedAlbum.tracks.map((track, trackIndex) => (
              <div
                className="bg-muted/50 aspect-video h-12 w-full rounded-lg flex items-center mb-2"
                key={trackIndex}
              >
                <div className="flex items-center justify-between gap-4 ml-8 mr-8 w-full">
                  <img
                    src={selectedAlbum.img?.src || "src/assets/proxy-image.png"}
                    alt={
                      selectedAlbum.img?.alt ||
                      selectedAlbum.name ||
                      "Album cover"
                    }
                    className="w-10 border border-white rounded-sm"
                  />
                  <div className="flex gap-2 flex-1 justify-between items-center">
                    <p>{track.name}</p>
                    <p>{track.duration || "0:00"}</p>{" "}
                    {/* Make sure duration is always displayed */}
                  </div>

                  <Button
                    className="group flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      const enhancedTrack = enhanceTrack(track);
                      playTrack(enhancedTrack);
                      console.log("Playing track:", track.name);
                    }}
                  >
                    <Play className="w-4 h-4 text-gray-900 group-hover:text-gray-500" />
                    <span className="sr-only">Play</span>
                  </Button>
                </div>
              </div>
            ))
          ) : selectedArtist ? (
            selectedArtist.albums.map((album, albumIndex) => (
              <div
                className="bg-muted/50 aspect-video h-12 w-full rounded-lg flex items-center mb-2"
                key={albumIndex}
              >
                <a
                  href="#"
                  key={`${selectedArtist.name}-${album.name}`}
                  className="flex items-center justify-between gap-4 w-full"
                  onClick={() => {
                    setSelectedArtist(selectedArtist);
                    setSelectedAlbum(album);
                  }}
                >
                  <div className="flex items-center justify-between gap-4 ml-8 mr-8 w-full">
                    <img
                      src={album.img?.src || "src/assets/proxy-image.png"}
                      alt={album.img?.alt || album.name || "Album cover"}
                      className="w-10 border border-white rounded-sm"
                    />
                    <div className="flex gap-2 flex-1 justify-between items-center">
                      <p>{album.name}</p>
                      <span className="text-xs text-gray-500">
                        ({album.tracks?.length || 0} songs)
                      </span>
                    </div>

                    <Button
                      className="group flex items-center gap-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        const enhancedTracks = enhanceTracks(album.tracks);
                        playAlbum(enhancedTracks);
                        console.log("Playing album:", album.name);
                      }}
                    >
                      <Play className="w-4 h-4 text-gray-900 group-hover:text-gray-500" />
                      <span className="sr-only">Play</span>
                    </Button>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-2 mx-auto">
              <CircleArrowLeft /> Select music from the catalog.
            </div>
          )}
        </div>
      </SidebarInset>
    </>
  );
}

export function InnerListWithProvider(props: Props) {
  return (
    <SelectedArtistDataProvider>
      <InnerList {...props} />
    </SelectedArtistDataProvider>
  );
}
