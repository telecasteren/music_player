# TO DO

### Ongoing / Next up

- Artist/Album navigation hot links
- Write a mapIndexToArtists(indexEntries) function to get the correct structure from the tracks metadata for the UI.
- Add dynamic listItems for menu breadcrumbs: src/app/dashboard/page.tsx

## Other features

- Enable making Playlists
  - expose an all songs list?
  - mark songs to add to playlist?
  - number of playlists restrictions?

### Data structure

1. API blueprint
2. Music provider select/sync
3. Sync user with chosen music provider

### Potential features

- Expose link to Ticketmaster in Events
- Different color schemes
- Toggle music provider + local folders


----
### THEME & STYLING

- Refactor all components to use the theme config and CSS to Tailwind styles
- Color themes - choices in settings component?

### CODE REFACTORING / BUGS

- FIX: bug in getTrackDuration missing Audio context for retrieving track duration. Files: '/scan-music-directory.ts' and '/get-track-duration.ts'
- FIX: Mobile side-menu, details don't show below ~400px
- Sample breadcrumb data: use real artist and album data in app breadcrumbs

### DEPLOY

- Setup backend with storage (local?)


### New features (future)

- User settings:
- user information
- notifications
  - color theme ?
  - layout density / text sizes ?

- Serve data from incoming API requests
  - Set up API requests to Discogs (fetch album details)
  - Set up API requests to known music providers
    - Users
    - Authentication
    - Data retrieval
    - Data caching
