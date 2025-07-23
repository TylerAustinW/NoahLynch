export interface EPKData {
  artist: {
    name: string;
    tagline: string;
    location: string;
    genre: string;
    influences: string;
  };
  bio: {
    short: string;
    long: string;
  };
  featuredVideo?: {
    title: string;
    video: {
      videoId: string;
      title: string;
      description?: string;
      type: 'performance' | 'music-video' | 'acoustic' | 'interview';
    };
  };
  liveShow: {
    format: string; 
    setup: string[];
    repertoire: string;
    venueTypes: string[];
    paSystem: boolean;
  };
  notableShows: {
    venue: string;
    description?: string;
  }[];
  releases: {
    title: string;
    date: string;
    highlights?: string;
    coverArt?: string;
  }[];
  gallery: {
    title: string;
    photos: {
      src: string;
      alt: string;
      caption: string;
      venue?: string;
    }[];
  };
  press: {
    quotes: {
      text: string;
      source: string;
    }[];
    highlights: string[];
  };
  contact: {
    booking: string;
    website: string;
    social: {
      instagram: string;
      facebook: string;
      tiktok: string;
      youtube: string;
    };
  };
}

export const epkData: EPKData = {
  artist: {
    name: 'Noah Lynch',
    tagline: 'Singer–Songwriter | Guitarist | Storyteller',
    location: 'Meadville, MS',
    genre: 'Acoustic Soul – Soft Rock – Alt-Pop',
    influences: 'RIYL: John Mayer, Jack Johnson, Shawn Mendes',
  },
  bio: {
    short:
      'Noah Lynch is a Mississippi-born singer-songwriter blending acoustic soul, soft rock, and alt-pop into emotionally rich, story-driven music. Known for his heartfelt guitar playing and honest lyrics, Noah delivers performances that feel both intimate and universal. His songs speak to the real — love, heartbreak, growth — all anchored in smooth grooves and Southern sincerity.',
    long: 'Noah Lynch is a solo artist from Meadville, Mississippi, crafting a sound rooted in acoustic soul, soft rock, and alternative pop. With over a decade of experience behind the guitar, Noah delivers stripped-back performances that spotlight the heart of each song. His lyrics speak to real-life moments — heartbreak, healing, and hope — with a calm confidence that draws listeners in. From backyard shows to packed venues, Noah has built a loyal following across Mississippi and beyond. His music has been featured on CraG Radio UK, where tracks like "For You" and "Good Things Take Time" found international ears. Whether he\'s playing a small-town stage or recording his next single, Noah\'s focus is always the same: connect through the song. With a growing catalog and an unmistakable sound, Noah Lynch is quickly becoming a voice of his generation — one story, one song at a time.',
  },
  featuredVideo: {
    title: 'Featured Performance',
    video: {
      videoId: 'Yp4nSrtlNmI',
      title: 'Noah Lynch - "For You" (Live Acoustic Performance)',
      description: 'Live Performance at Magnolia Blues BBQ in Mississippi.',
      type: 'performance',
    },
  },
  liveShow: {
    format: 'Solo Acoustic Performance',
    setup: ['2 acoustic guitars', '1 cajon (percussion)'],
    repertoire:
      'Cover songs from John Mayer, Edwin McCain, James Taylor, Lifehouse, The Fray, and more, with 3–5 original songs integrated into each set',
    venueTypes: ['Songwriter rounds', 'Listening rooms', 'Patios', 'Restaurants', 'Festivals'],
    paSystem: true,
  },
  notableShows: [
    {
      venue: 'Magnolia Blues BBQ',
      description: 'Packed house, 90+ draw',
    },
    {
      venue: 'Rushings RoudHouse',
    },
    {
      venue: 'The Roof at 1311',
      description: 'Return show August 16',
    },
  ],
  releases: [
    {
      title: 'Honest',
      date: 'May 2025',
      coverArt: '/honest-cover.jpeg',
    },
    {
      title: 'For You',
      date: 'June 2024',
      highlights: 'Featured on CraG Radio UK',
      coverArt: '/foryou.jpg',
    },
    {
      title: 'Good Things Take Time',
      date: '2024',
      highlights: 'Featured on CraG Radio UK',
      coverArt: '/gttt.jpg',
    },
  ],
  gallery: {
    title: 'Live Performance Gallery',
    photos: [
      {
        src: '/magnoila-blues.jpg',
        alt: 'Noah Lynch performing at Magnolia Blues BBQ with packed crowd',
        caption: 'Packed house, 90+ draw',
        venue: 'Magnolia Blues BBQ',
      },
    ],
  },
  press: {
    quotes: [
      {
        text: "Noah played a full 3-hour set and had the place moving. Definitely someone we'll be booking again.",
        source: 'Venue Owner, Magnolia Blues BBQ',
      },
      {
        text: "A voice that's laid-back but cuts deep. If John Mayer grew up in the Deep South, he might sound like Noah Lynch.",
        source: 'Local Listener Review',
      },
    ],
    highlights: [
      'International airplay on CraG Radio UK – "For You" and "Good Things Take Time" featured',
    ],
  },
  contact: {
    booking: 'noahlynchcontact@gmail.com',
    website: 'www.noahlynch.com',
    social: {
      instagram: 'https://instagram.com/noahlynchmusic',
      facebook: 'https://facebook.com/noahlynchmusic',
      tiktok: 'https://tiktok.com/@noahlynchmusic',
      youtube: 'https://youtube.com/@noahlynch',
    },
  },
};
