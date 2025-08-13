import { FileMusic, ListMusic, Music2, Ticket } from "lucide-react";

// Sample data
const data = {
  user: {
    name: "telecaster",
    email: "nilsen.tele@proton.me",
    avatar: "/src/assets/tele-avatar-dark-blue.png",
  },
  navMain: [
    {
      title: "Artists",
      url: "#",
      icon: Music2,
      isActive: true,
    },
    {
      title: "Albums",
      url: "#",
      icon: FileMusic,
      isActive: false,
    },
    {
      title: "Playlists",
      url: "#",
      icon: ListMusic,
      isActive: false,
    },
    {
      title: "Events",
      url: "#",
      icon: Ticket,
      isActive: false,
    },
  ],
  artists: [
    {
      id: 1,
      name: "Chet Baker",
      albums: [
        {
          title: "All Things Chet",
          releaseYear: "1953",
          img: {
            src: "src/assets/proxy-image.jpg",
            alt: "Chet Baker Album: All Things Chet",
          },
          songs: [
            {
              title: "My Funny Valentine",
              duration: "5:30",
              src: "src/lib/data/musicFiles/Tell-Me-What_Denys-Brodovskyi.mp3",
            },
            {
              title: "There Will Never Be Another You",
              duration: "6:00",
              src: "src/lib/data/musicFiles/Tell-Me-What_Denys-Brodovskyi.mp3",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Iron Maiden",
      albums: [
        {
          title: "Killers",
          releaseYear: "1981",
          img: {
            src: "src/assets/proxy-image-1.jpg",
            alt: "Iron Maiden Album: Killers",
          },
          songs: [
            {
              title: "Rime Of The Ancient Mariner",
              duration: "5:30",
              src: "src/lib/data/musicFiles/tvari-tokyo-cafe_TVARI.mp3",
            },
            {
              title: "Seventh Son Of A Seventh Son",
              duration: "6:00",
              src: "src/lib/data/musicFiles/tvari-tokyo-cafe_TVARI.mp3",
            },
            {
              title: "The Trooper",
              duration: "4:00",
              src: "src/lib/data/musicFiles/tvari-tokyo-cafe_TVARI.mp3",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Led Zeppelin",
      albums: [
        {
          title: "Coda",
          releaseYear: "1982",
          img: {
            src: "src/assets/proxy-image-4.jpg",
            alt: "Led Zeppelin album: Coda",
          },
          songs: [
            {
              title: "In The Evening",
              duration: "5:30",
              src: "src/lib/data/musicFiles/Future-design_penguinmusic.mp3",
            },
            {
              title: "I'm Gonna Leave You",
              duration: "6:00",
              src: "src/lib/data/musicFiles/Future-design_penguinmusic.mp3",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      name: "Madonna",
      albums: [
        {
          title: "Like a Virgin",
          releaseYear: "1980",
          img: {
            src: "src/assets/proxy-image-3.jpg",
            alt: "Madonna Album: Like a Virgin",
          },
          songs: [
            {
              title: "Material Girl",
              duration: "4:00",
              src: "src/lib/data/musicFiles/tvari-tokyo-cafe_TVARI.mp3",
            },
            {
              title: "Like a Virgin",
              duration: "3:30",
              src: "",
            },
          ],
        },
      ],
    },
  ],
};

export default data;
