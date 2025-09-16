import type { TourDate, Venue } from "../models/tour.model";

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
};

export const SHOWS_DATA: TourDate[] = [
	{
		id: "show-2025-10-03-ole-brook",
		date: "2025-10-03",
		venue: "Ole Brook Festival",
		city: "Brookhaven",
		state: "MS",
		time: "6:00 PM - 7:00 PM CDT",
		actionLink: "https://www.bandsintown.com/e/107374328?&came_from=210",
		actionText: "Event Info",
		featured: true,
		description: "Live performance at Ole Brook Festival.",
	},
	{
		id: "show-2025-09-06-backwater",
		date: "2025-09-06",
		venue: "Backwater Grill",
		city: "Brandon",
		state: "MS",
		time: "6:00 PM CDT",
		actionLink:
			"https://www.bandsintown.com/e/107170464-noah-lynch-at-backwater-grill-taphouse-and-oyster-bar?came_from=267&utm_medium=web&utm_source=artist_page&utm_campaign=event",
		manualStatus: "past",
		featured: false,
		description: "Join Noah Lynch for a live performance at Backwater Grill.",
	},
	{
		id: "show-2025-09-01-sunset",
		date: "2025-09-01",
		venue: "Sunset Grill",
		city: "Brandon",
		state: "MS",
		time: "12:00 PM CDT",
		manualStatus: "past",
		featured: false,
		description: "Join Noah Lynch for a live performance at Sunset Grill.",
	},
	{
		id: "show-2025-08-16-roof",
		date: "2025-08-16",
		venue: "The Roof at 1311",
		city: "Vicksburg",
		state: "MS",
		time: "7:00 PM CDT",
		featured: false,
		description: "Amazing performance at The Roof on the 3rd floor with a packed crowd.",
	},
	{
		id: "show-2025-06-14-magnolia",
		date: "2025-06-14",
		venue: "Magnolia Blues BBQ",
		city: "Brookhaven",
		state: "MS",
	},
	{
		id: "show-2025-02-01-rushing",
		date: "2025-02-01",
		venue: "Rushing Roadhouse",
		city: "Jefferson County",
		state: "MS",
		description: "Live acoustic performance at Rushing Roadhouse.",
	},
];
