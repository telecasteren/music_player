# MUSIC APP PROJECT

## Satori music

**A simple audio player application**<br/>

![image](src/assets/satori-screenshot.png)

### Description

A simple audio player for playing music, and exposing saved catalogues. Built for the enjoyment of learning and the want and need of a more custom audio player without all the fuzz.

**Current state:**
Upload your local music folders, and the app will recreate the folder structure and expose them for you in a intuitive catalogue for navigating and listening.

**Coming:**

- The ability to create playlists
- The ability to synchronise with your favourite music stream provider
- The ability to search for events in your country

---

### Workspace structure

This is project is maintained as a monorepo. So all parts of the application live in this repository.

```bash
music-project/
├── Satori
│ └── backendData     / backend data - user uploads
│ └── src             / frontend
│   └── app           / gui
│   └── assets        / static
│   └── components    / reusable bits
│   └── context       / createContext
│   └── css           / styles
│   └── hooks         / hooks
│   └── lib
│      └── api        / external content (not implemented yet)
│      └── data       / sample content
│      └── utils
│ └── src-tauri       / backend
│ └── packages/config
└── README.md
```

## Build and Tools

**languages**

- JavaScript/Typescript (frontend)
- HTML/CSS (frontend)
- Rust (backend)

**frameworks/tools**

- React
- Tauri
- Vite
- Tailwind
- shadcn (components)

### Audio player

Built with
[react-h5-audioplayer](https://www.npmjs.com/package/react-h5-audio-player/v/2.3.2)
and custom [styles](src/css/audioplayer/README.md)

## Install dependencies and run application

### Prerequisites

To run this app locally, install or check your latest versions:

- Node.js
- npm
- Rust (for building the native app)
- Tauri CLI

```bash
cargo install create-tauri-app
```

Install all the dependencies:

```bash
npm install
```

---

**Run app**

```bash
npm run dev:all

```

This starts both backend and frontend (server, tauri and vite).

```bash
npm run tauri
```

This starts and launches the app with Tauri and Vite only.

---
### Paths and compiling

Tauri creates a path in src-tauri, so if you change the location of the parent project folder locally, you need to navigate to the new folder and run the following:
```bash
rm -rf src-tauri # removes existing wrong path
npm run dev:all # compiles the project again and creates the new path
```
This will update the path in Tauri and you're good to go again.

## Deployment and build

**Native**<br/>
The native desktop app is built using [Tauri](https://v2.tauri.app).

<s>**Web** !NOT IMPLEMENTED!<br/>
The web version of this app is deployed using [Vercel](https://vercel.com/home).</s>

## Contributions

As I am building this app for personal use and learning purposes, I'm not looking for contributions right now.<br/> This can change over time, so if you're really interested-please check back some other time.
