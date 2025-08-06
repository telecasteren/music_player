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
      album: {
        name: "All Things Chet",
        img: {
          src: "src/assets/proxy-image.jpg",
          alt: "Chet Baker Album: All Things Chet",
        },
        releaseYear: "1953",
      },
    },
    {
      id: 2,
      name: "Iron Maiden",
      album: {
        name: "Killers",
        img: {
          src: "src/assets/proxy-image-1.jpg",
          alt: "Iron Maiden Album: Killers",
        },
        releaseYear: "1981",
      },
    },
    {
      id: 3,
      name: "Led Zeppelin",
      album: {
        name: "Coda",
        img: {
          src: "src/assets/proxy-image-4.jpg",
          alt: "Led Zeppelin album: Coda",
        },
        releaseYear: "1982",
      },
    },
    {
      id: 4,
      name: "Madonna",
      album: {
        name: "Like a Virgin",
        img: {
          src: "src/assets/proxy-image-3.jpg",
          alt: "Madonna Album: Like a Virgin",
        },
        releaseYear: "1980",
      },
    },
  ],
};

export default data;
