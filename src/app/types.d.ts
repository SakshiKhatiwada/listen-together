export interface Song {
  id: number;
  name: string;
  artist: string;
  cover: string;
  audio: string;
}

export interface MusicPlayerCardProps {
  currentSong: Song;
}

export interface SidebarProps {
  currentSong: Song | null;
}
