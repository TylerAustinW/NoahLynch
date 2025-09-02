export interface TourDate {
    id: number;
    date: string;
    venue: string;
    shortName?: string;
    city: string;
    state: string;
    time?: string;
    ticketLink?: string;
    soldOut?: boolean;
    description?: string;
    featured?: boolean;
    upcoming?: boolean;
}
export interface ShowNotificationConfig {
    hasUpcomingShow: boolean;
    date: string;
    time: string;
    venue: string;
    location: string;
    ticketUrl: string;
}
