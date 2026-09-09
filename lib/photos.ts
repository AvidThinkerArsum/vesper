// Photographs from Pexels (free to use under the Pexels license). Referenced from
// Pexels' CDN rather than copied into the repo. `page` links back to the source.
const cdn = (id: string, w = 2400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const PHOTOS = {
  lake: { id: "38875042", src: cdn("38875042"), page: "https://www.pexels.com/photo/38875042/", alt: "A misty lake between forested mountains" },
  bedroom: { id: "33713554", src: cdn("33713554"), page: "https://www.pexels.com/photo/33713554/", alt: "A plywood cabin bedroom with a large window onto the forest" },
  breakfast: { id: "8652113", src: cdn("8652113", 1600), page: "https://www.pexels.com/photo/8652113/", alt: "Coffee and pastries on a table by an open window" },
  rooms: { id: "20854915", src: cdn("20854915", 1600), page: "https://www.pexels.com/photo/20854915/", alt: "A bedroom with a large window overlooking a misty lake" },
  water: { id: "17219009", src: cdn("17219009", 1600), page: "https://www.pexels.com/photo/17219009/", alt: "Forest reflected in a calm lake" },
  fog: { id: "37415014", src: cdn("37415014"), page: "https://www.pexels.com/photo/37415014/", alt: "Fog drifting over a forested hillside" },
  dusk: { id: "14871683", src: cdn("14871683"), page: "https://www.pexels.com/photo/14871683/", alt: "Mist over a lake at sunset" },
} as const;

export type PhotoKey = keyof typeof PHOTOS;
