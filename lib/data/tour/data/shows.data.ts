import type { TourDate, Venue } from "../models/tour.model";
import showsData from "./shows.data.json";

export const VENUES: Record<string, Venue> = {
  "backwater-grill": {
    id: "backwater-grill",
    name: "Backwater Grill",
    city: "Brandon",
    state: "MS",
    defaultLink:
      "https://www.bandsintown.com/e/107170464-noah-lynch-at-backwater-grill-taphouse-and-oyster-bar?came_from=267&utm_medium=web&utm_source=artist_page&utm_campaign=event",
  },
  "sunset-grill": {
    id: "sunset-grill",
    name: "Sunset Grill",
    city: "Brandon",
    state: "MS",
  },
  "roof-1311": {
    id: "roof-1311",
    name: "The Roof at 1311",
    city: "Vicksburg",
    state: "MS",
  },
  "magnolia-blues": {
    id: "magnolia-blues",
    name: "Magnolia Blues BBQ",
    city: "Brookhaven",
    state: "MS",
  },
  "rushing-roadhouse": {
    id: "rushing-roadhouse",
    name: "Rushing Roadhouse",
    city: "Jefferson County",
    state: "MS",
  },
  "ole-brook-festival": {
    id: "ole-brook-festival",
    name: "Ole Brook Festival",
    city: "Brookhaven",
    state: "MS",
    defaultLink: "https://visitbrookhavenms.com/stay/",
  },
  "station-jxn": {
    id: "station-jxn",
    name: "The Station JXN",
    city: "Jackson",
    state: "MS",
  },
};

export const SHOWS_DATA: TourDate[] = showsData;
