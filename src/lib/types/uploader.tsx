export type MusicFile = {
  name: string;
  path: string;
  file: File;
};

export type Folder = {
  name: string;
  children: (Folder | MusicFile)[];
};
