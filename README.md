# MUSIC APP PROJECT

## Satori music

**A simple audio player application**<br/>

![placeholder for image](image-url)

[Placeholder for url to live site](url)

### Description

A simple audio player for playing music, and exposing saved catalogues/playlists for browsing. It's being built as a native desktop app for the fun of learning and convenient personal use. When it is up and running, I plan to make a web version of the app--hopefully that can work with a shared backend logic. My goal will be using the adapter pattern to interact with multiple music providers, by translating their APIs into a common interface that's easier to maintain.

---

### Workspace structure

This is project is maintained as a monorepo. So all parts of the application live in this repository. I find it easier to share the API logic etc between the web and native apps, keeping dependencies in sync and being able to test both side by side.

```bash
music-project/
├── Satori
│ └── src             / frontend
│   └── app           / gui
│   └── components    / reusable bits
│   └── css           / styles
│   └── lib
│      └── api        / external content
│      └── utils
│ └── src-tauri
│ └── packages/config
└── README.md
```

## Tools

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
npm run tauri dev
```

## Deployment and build

**Web** !NOT IMPLEMENTED!<br/>
The web version of this app is deployed using [Vercel](https://vercel.com/home).

**Native**<br/>
The native desktop app is built using [Tauri](https://v2.tauri.app).

## Contributions

As I am building this app for personal use and learning purposes, I'm not looking for contributions right now.<br/> This can change over time, so if you're really interested-please check back some other time.
