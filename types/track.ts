export type Track = {
  id: string;
  title: string;
  artist?: string;
  uri: any;      // require('...') or remote URL
  artwork?: any; // require(...)
};
