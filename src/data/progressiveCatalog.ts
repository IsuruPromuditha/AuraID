import { Track, RecordLabel, IDRequestPost, GlobalDrop, SyncedDevice } from '../types';

export const RECORD_LABELS: RecordLabel[] = [
  {
    id: 'afterlife',
    name: 'Afterlife',
    founder: 'Tale of Us (Carmine Conte & Matteo Milleri)',
    hq: 'Berlin / Milan',
    description: 'The epicenter of melodic techno and visual-audio consciousness, pioneering ethereal synth lines, thunderous rolling bass, and stadium-filling emotional journeys.',
    subGenres: ['Melodic House & Techno', 'Peak-Time Progressive'],
    catalogCount: 184,
    featuredArtists: ['Tale of Us', 'Anyma', 'Mind Against', 'Kevin de Vries', 'Mathame', 'Colyn', 'Cassian', 'Argy'],
    officialPlatforms: {
      beatport: 'https://www.beatport.com/label/afterlife-recordings/56799',
      bandcamp: 'https://afterliferecordings.bandcamp.com',
      soundcloud: 'https://soundcloud.com/afterlifeofc',
      mixcloud: 'https://www.mixcloud.com/discover/afterlife/',
      spotify: 'https://open.spotify.com/genre/edm_dance',
      apple_music: 'https://music.apple.com/us/curator/afterlife/1454508491'
    }
  },
  {
    id: 'anjunadeep',
    name: 'Anjunadeep',
    founder: 'Above & Beyond & James Grant',
    hq: 'London, United Kingdom',
    description: 'Renowned independent record label curating deep, melodic, and emotional electronic music spanning progressive house, organic downtempo, and atmospheric techno.',
    subGenres: ['Deep Progressive', 'Progressive House', 'Organic House', 'Melodic House & Techno'],
    catalogCount: 890,
    featuredArtists: ['Ben Böhmer', 'Lane 8', 'Yotto', 'Luttrell', 'Eli & Fur', 'Marsh', 'Nox Vahn', 'Tinlicker'],
    officialPlatforms: {
      beatport: 'https://www.beatport.com/label/anjunadeep/1390',
      bandcamp: 'https://anjunadeep.bandcamp.com',
      soundcloud: 'https://soundcloud.com/anjunadeep',
      mixcloud: 'https://www.mixcloud.com/anjunadeep/',
      spotify: 'https://open.spotify.com/user/anjunadeep',
      apple_music: 'https://music.apple.com/us/curator/anjunadeep/1041935741'
    }
  },
  {
    id: 'bedrock',
    name: 'Bedrock Records',
    founder: 'John Digweed & Nick Muir',
    hq: 'Brighton / London, UK',
    description: 'The gold standard of underground progressive house and forward-thinking techno since 1999. Pioneers of deep hypnotic grooves and immaculate sonic engineering.',
    subGenres: ['Progressive House', 'Deep Progressive', 'Peak-Time Progressive'],
    catalogCount: 460,
    featuredArtists: ['John Digweed', 'Nick Muir', 'Guy J', 'Marc Romboy', 'Pig&Dan', 'Quivver', 'Hannes Bieger'],
    officialPlatforms: {
      beatport: 'https://www.beatport.com/label/bedrock-records/192',
      bandcamp: 'https://bedrockrecords.bandcamp.com',
      soundcloud: 'https://soundcloud.com/bedrock-records',
      mixcloud: 'https://www.mixcloud.com/johndigweed/',
      spotify: 'https://open.spotify.com/user/bedrockrecords',
      apple_music: 'https://music.apple.com/us/curator/bedrock-records/1547898877'
    }
  },
  {
    id: 'lost-and-found',
    name: 'Lost & Found',
    founder: 'Guy J',
    hq: 'Tel Aviv / Amsterdam',
    description: 'Guy J’s curated haven for intricate melodies, warm analog synths, and deeply hypnotic progressive architecture that transcends typical club arrangements.',
    subGenres: ['Progressive House', 'Deep Progressive'],
    catalogCount: 132,
    featuredArtists: ['Guy J', 'Chicola', 'Khen', 'Roy Rosenfeld', 'Eli Nissan', 'Sahar Z', 'Cornucopia'],
    officialPlatforms: {
      beatport: 'https://www.beatport.com/label/lost-found/27532',
      bandcamp: 'https://lostandfoundrec.bandcamp.com',
      soundcloud: 'https://soundcloud.com/lostandfoundrec',
      mixcloud: 'https://www.mixcloud.com/discover/lost-and-found/',
      spotify: 'https://open.spotify.com/user/lostandfound',
      apple_music: 'https://music.apple.com/us/label/lost-found/894982631'
    }
  },
  {
    id: 'innervisions',
    name: 'Innervisions',
    founder: 'Dixon & Âme (Kristian Beyer & Frank Wiedemann)',
    hq: 'Berlin, Germany',
    description: 'Iconic visionary label shaping the electronic landscape with sophisticated, rhythmically daring, and emotive house and techno compositions.',
    subGenres: ['Melodic House & Techno', 'Deep Progressive'],
    catalogCount: 220,
    featuredArtists: ['Dixon', 'Âme', 'Trikk', 'Denis Horvat', 'Jimi Jules', 'Marcus Worgull'],
    officialPlatforms: {
      beatport: 'https://www.beatport.com/label/innervisions/2422',
      bandcamp: 'https://innervisions.bandcamp.com',
      soundcloud: 'https://soundcloud.com/innervisions',
      mixcloud: 'https://www.mixcloud.com/discover/innervisions/',
      spotify: 'https://open.spotify.com/user/innervisions',
      apple_music: 'https://music.apple.com/us/label/innervisions/262795898'
    }
  },
  {
    id: 'cercle-records',
    name: 'Cercle Records',
    founder: 'Derek Barbolla & Philippe Tuchmann',
    hq: 'Paris, France',
    description: 'Broadcasting breathtaking live electronic performances from historic monuments, castles, and natural wonders, alongside an elite sonic release catalog.',
    subGenres: ['Melodic House & Techno', 'Organic House', 'Deep Progressive'],
    catalogCount: 78,
    featuredArtists: ['Monolink', 'Christian Löffler', 'Stephan Bodzin', 'Jan Blomqvist', 'Hania Rani', 'Colyn'],
    officialPlatforms: {
      beatport: 'https://www.beatport.com/label/cercle-records/90382',
      bandcamp: 'https://cerclerecords.bandcamp.com',
      soundcloud: 'https://soundcloud.com/cerclerecords',
      mixcloud: 'https://www.mixcloud.com/cerclemusic/',
      spotify: 'https://open.spotify.com/user/cerclemusic',
      apple_music: 'https://music.apple.com/us/curator/cercle/1507771239'
    }
  },
  {
    id: 'all-day-i-dream',
    name: 'All Day I Dream',
    founder: 'Lee Burridge & Matthew Dekay',
    hq: 'New York / London',
    description: 'Fairy-tale daydream electronica, blending gentle acoustic instruments, delicate pads, and ethereal melancholic grooves perfect for sunrise and sunset gatherings.',
    subGenres: ['Organic House', 'Deep Progressive'],
    catalogCount: 165,
    featuredArtists: ['Lee Burridge', 'Tim Green', 'Roy Rosenfeld', 'Gorje Hewek', 'Sebastien Leger', 'Lost Desert'],
    officialPlatforms: {
      beatport: 'https://www.beatport.com/label/all-day-i-dream/21432',
      bandcamp: 'https://alldayidream.bandcamp.com',
      soundcloud: 'https://soundcloud.com/alldayidream',
      mixcloud: 'https://www.mixcloud.com/discover/all-day-i-dream/',
      spotify: 'https://open.spotify.com/user/alldayidream',
      apple_music: 'https://music.apple.com/us/curator/all-day-i-dream/1529124401'
    }
  },
  {
    id: 'pryda',
    name: 'Pryda Recordings',
    founder: 'Eric Prydz',
    hq: 'Stockholm / Los Angeles',
    description: 'The monumental home of progressive house royalty. Defined by soaring synth arpeggios, massive chord progressions, and immaculate soundstage mastering.',
    subGenres: ['Progressive House', 'Peak-Time Progressive'],
    catalogCount: 110,
    featuredArtists: ['Eric Prydz', 'Pryda', 'Cirez D', 'Cristoph'],
    officialPlatforms: {
      beatport: 'https://www.beatport.com/label/pryda-recordings/2034',
      bandcamp: 'https://ericprydz.bandcamp.com',
      soundcloud: 'https://soundcloud.com/eric-prydz',
      mixcloud: 'https://www.mixcloud.com/discover/eric-prydz/',
      spotify: 'https://open.spotify.com/artist/5L1lO4eRHmwbE6hn8U0P2X',
      apple_music: 'https://music.apple.com/us/curator/eric-prydz-epic-radio/1183141126'
    }
  },
  {
    id: 'sudbeat',
    name: 'Sudbeat Music',
    founder: 'Hernan Cattaneo & Graziano Raffa',
    hq: 'Buenos Aires / Barcelona',
    description: 'The South American bastion of pure progressive culture, driven by Hernan Cattaneo’s discerning ear for intricate rhythms, hypnotic chords, and warm bass.',
    subGenres: ['Progressive House', 'Deep Progressive'],
    catalogCount: 290,
    featuredArtists: ['Hernan Cattaneo', 'Graziano Raffa', 'Marcelo Vasami', 'Soundexile', 'Kamilo Sanclemente', 'Ezequiel Arias'],
    officialPlatforms: {
      beatport: 'https://www.beatport.com/label/sudbeat-music/13307',
      bandcamp: 'https://sudbeat.bandcamp.com',
      soundcloud: 'https://soundcloud.com/sudbeat',
      mixcloud: 'https://www.mixcloud.com/hernancattaneo/',
      spotify: 'https://open.spotify.com/user/sudbeatmusic',
      apple_music: 'https://music.apple.com/us/label/sudbeat-music/911009848'
    }
  },
  {
    id: 'monstercat-silk',
    name: 'Monstercat Silk',
    founder: 'Jacob Henry (Silk Music)',
    hq: 'Vancouver, Canada',
    description: 'Lush atmospheric progressive house and downtempo ambient electronica focused on soothing acoustic textures, nostalgic chord lines, and piano-infused beauty.',
    subGenres: ['Deep Progressive', 'Organic House', 'Melodic Trance'],
    catalogCount: 340,
    featuredArtists: ['Shingo Nakamura', 'Vintage & Morelli', 'A.M.R', 'PROFF', 'Terry Da Libra', 'Sound Quelle'],
    officialPlatforms: {
      beatport: 'https://www.beatport.com/label/monstercat-silk/93601',
      bandcamp: 'https://monstercatsilk.bandcamp.com',
      soundcloud: 'https://soundcloud.com/monstercatsilk',
      mixcloud: 'https://www.mixcloud.com/monstercatsilk/',
      spotify: 'https://open.spotify.com/user/silkmusic',
      apple_music: 'https://music.apple.com/us/curator/monstercat-silk/1566898491'
    }
  }
];

export const PROGRESSIVE_TRACKS: Track[] = [
  {
    id: 'trk-afterlife-01',
    title: 'Explore Your Future',
    version: 'Extended Mix',
    artist: 'Anyma',
    recordLabel: 'Afterlife',
    releaseDate: '2023-04-14',
    bpm: 125,
    musicalKey: '8A (A minor)',
    subGenre: 'Melodic House & Techno',
    coverImage: '/src/assets/images/progressive_cover_afterlife_1790355441114.jpg',
    durationSeconds: 342,
    catalogId: 'AL074',
    beatportTrackId: '17604921',
    isrc: 'IT-A01-23-00042',
    identifiedStems: {
      leadSynth: 'Analog Detuned Dual-Sawtooth with 24dB Moog Lowpass Filter Sweep',
      bassline: 'Sub-bass rolling 8th-note octaves at 45Hz with saturation',
      percussion: '909 Punchy Kick Drum, tight closed hi-hats, subtle clap reverb',
      vocalPad: 'Ethereal robotic vocoder whispers: "Explore your future"',
    },
    platforms: [
      {
        platform: 'beatport',
        url: 'https://www.beatport.com/track/explore-your-future/17604921',
        label: 'Extended Mix (Lossless AIFF/WAV)',
        price: '$2.49',
        available: true,
        extraMeta: 'Beatport #1 Melodic Techno'
      },
      {
        platform: 'bandcamp',
        url: 'https://afterliferecordings.bandcamp.com/track/explore-your-future',
        label: 'Lossless Digital Download',
        price: '€1.99',
        available: true
      },
      {
        platform: 'soundcloud',
        url: 'https://soundcloud.com/afterlifeofc/anyma-explore-your-future',
        label: 'Official Stream & Free Teaser',
        available: true,
        extraMeta: '1.4M plays'
      },
      {
        platform: 'mixcloud',
        url: 'https://www.mixcloud.com/discover/anyma-explore-your-future/',
        label: 'Tale of Us Live @ Hi Ibiza 2023',
        available: true,
        extraMeta: 'Timestamp 00:38:20'
      },
      {
        platform: 'spotify',
        url: 'https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC',
        label: 'Listen on Spotify',
        available: true
      },
      {
        platform: 'apple_music',
        url: 'https://music.apple.com/us/album/explore-your-future-single/1681283921',
        label: 'Apple Lossless & Spatial Audio',
        available: true
      }
    ],
    acousticSignature: {
      spectralCentroid: 1420,
      energyDistribution: [0.38, 0.28, 0.16, 0.12, 0.06],
      dominantFreq: 440,
      harmonicPurity: 0.94
    },
    playedInSets: [
      {
        event: 'Afterlife Tulum Zamna',
        dj: 'Anyma & Tale of Us',
        location: 'Tulum, Mexico',
        timestamp: '03:14:00',
        date: 'Jan 2024'
      },
      {
        event: 'Printworks Closing Weekend',
        dj: 'Tale of Us',
        location: 'London, UK',
        timestamp: '01:45:22',
        date: 'Apr 2023'
      }
    ],
    notes: 'Massive signature lead synth with detuned unison sawtooths and sub-bass rolling octaves.'
  },
  {
    id: 'trk-anjuna-01',
    title: 'Breathing',
    version: 'Club Mix',
    artist: 'Ben Böhmer, Nils Hoffmann & Malou',
    recordLabel: 'Anjunadeep',
    releaseDate: '2019-11-22',
    bpm: 122,
    musicalKey: '11B (A Major)',
    subGenre: 'Deep Progressive',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    durationSeconds: 388,
    catalogId: 'ANJCD084',
    beatportTrackId: '12739824',
    isrc: 'GB-L67-19-00142',
    identifiedStems: {
      leadSynth: 'Warm Rhodes electric piano chords with gentle tape flutter',
      bassline: 'Deep analog Moog sub bass line in A Major',
      percussion: 'Organic brushed kick, subtle acoustic shaker & crisp closed hats',
      vocalPad: 'Ethereal airy vocals by Malou: "Can you hear me breathing"',
    },
    platforms: [
      {
        platform: 'beatport',
        url: 'https://www.beatport.com/track/breathing-extended-mix/12739824',
        label: 'Extended Club Mix',
        price: '$2.19',
        available: true,
        extraMeta: 'Anjunadeep Best Seller'
      },
      {
        platform: 'bandcamp',
        url: 'https://anjunadeep.bandcamp.com/album/breathing',
        label: 'Direct Artist Support + Digital 24-bit',
        price: '£2.00',
        available: true
      },
      {
        platform: 'soundcloud',
        url: 'https://soundcloud.com/anjunadeep/ben-bohmer-breathing',
        label: 'Anjunadeep Official Audio',
        available: true,
        extraMeta: '3.8M plays'
      },
      {
        platform: 'mixcloud',
        url: 'https://www.mixcloud.com/anjunadeep/anjunadeep-edition-280-with-ben-b%C3%B6hmer/',
        label: 'Anjunadeep Edition #280 Guest Mix',
        available: true,
        extraMeta: 'Timestamp 00:24:10'
      },
      {
        platform: 'spotify',
        url: 'https://open.spotify.com/track/1234567890',
        label: 'Open in Spotify',
        available: true
      },
      {
        platform: 'apple_music',
        url: 'https://music.apple.com/us/album/breathing/1484920491',
        label: 'Apple Music Lossless',
        available: true
      }
    ],
    acousticSignature: {
      spectralCentroid: 1150,
      energyDistribution: [0.26, 0.32, 0.22, 0.14, 0.06],
      dominantFreq: 440,
      harmonicPurity: 0.91
    },
    playedInSets: [
      {
        event: 'Cercle Live above Cappadocia',
        dj: 'Ben Böhmer',
        location: 'Cappadocia, Turkey',
        timestamp: '00:42:00',
        date: 'Aug 2020'
      }
    ],
    notes: 'Warm Rhodes chords over analog Moog bassline, coupled with breathy emotional vocal timbre.'
  },
  {
    id: 'trk-lostfound-01',
    title: 'Nirvana',
    version: 'Original Mix',
    artist: 'Guy J',
    recordLabel: 'Lost & Found',
    releaseDate: '2021-06-18',
    bpm: 122,
    musicalKey: '7A (D minor)',
    subGenre: 'Progressive House',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    durationSeconds: 520,
    catalogId: 'LF088',
    beatportTrackId: '15392019',
    isrc: 'IL-G01-21-00088',
    identifiedStems: {
      leadSynth: 'Modular analog synth bell arpeggios modulating pitch every 32 bars',
      bassline: 'Hypnotic rolling sub groove tuned to D minor (7A)',
      percussion: 'Polyrhythmic filtered rimshots, subtle woodblocks & 909 analog groove',
      vocalPad: 'Atmospheric ambient noise floor and cosmic delay sweeps',
    },
    platforms: [
      {
        platform: 'beatport',
        url: 'https://www.beatport.com/track/nirvana/15392019',
        label: 'Original 8-minute Journey',
        price: '$2.49',
        available: true
      },
      {
        platform: 'bandcamp',
        url: 'https://lostandfoundrec.bandcamp.com/track/nirvana',
        label: 'Bandcamp Vinyl + WAV',
        price: '€2.50',
        available: true
      },
      {
        platform: 'soundcloud',
        url: 'https://soundcloud.com/guy-j/guy-j-nirvana-preview',
        label: 'Official Lost & Found Channel',
        available: true
      },
      {
        platform: 'mixcloud',
        url: 'https://www.mixcloud.com/guy-j/the-sound-of-lost-found-ep-52/',
        label: 'The Sound of Lost & Found #52',
        available: true,
        extraMeta: 'Timestamp 00:51:30'
      },
      {
        platform: 'spotify',
        url: 'https://open.spotify.com/album/guy-j-nirvana',
        label: 'Spotify Stream',
        available: true
      },
      {
        platform: 'apple_music',
        url: 'https://music.apple.com/us/album/nirvana-single/1572918239',
        label: 'Apple Music Stream',
        available: true
      }
    ],
    acousticSignature: {
      spectralCentroid: 980,
      energyDistribution: [0.35, 0.35, 0.18, 0.08, 0.04],
      dominantFreq: 293.66,
      harmonicPurity: 0.88
    },
    playedInSets: [
      {
        event: 'We Are Lost Festival',
        dj: 'Guy J',
        location: 'Amsterdam, Netherlands',
        timestamp: '02:30:15',
        date: 'May 2022'
      }
    ],
    notes: 'Hypnotic hypnotic groove with Guy J’s trademark filtered percussion and analog modular delays.'
  },
  {
    id: 'trk-bedrock-01',
    title: 'Heaven Scent',
    version: 'Marc Romboy & Stephan Bodzin Remix',
    artist: 'Bedrock (John Digweed & Nick Muir)',
    remixer: 'Marc Romboy & Stephan Bodzin',
    recordLabel: 'Bedrock Records',
    releaseDate: '2020-03-06',
    bpm: 126,
    musicalKey: '2A (E-flat minor)',
    subGenre: 'Peak-Time Progressive',
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
    durationSeconds: 472,
    catalogId: 'BEDROM01',
    beatportTrackId: '13109283',
    isrc: 'GB-BDR-20-00015',
    identifiedStems: {
      leadSynth: 'Stephan Bodzin iconic Moog Sub 37 distorted sync lead in E-flat minor',
      bassline: 'Driving 16th-note acid bassline with resonant cutoff automation',
      percussion: 'Heavy industrial club kick and crisp 909 ride cymbals',
      vocalPad: 'Rising white noise risers and pitch-bent tension sweeps',
    },
    platforms: [
      {
        platform: 'beatport',
        url: 'https://www.beatport.com/track/heaven-scent-remixes/13109283',
        label: 'Extended Remaster',
        price: '$2.49',
        available: true,
        extraMeta: 'All Time Progressive Classic'
      },
      {
        platform: 'bandcamp',
        url: 'https://bedrockrecords.bandcamp.com/album/heaven-scent-remixes',
        label: 'Bedrock Bandcamp Direct',
        price: '£2.49',
        available: true
      },
      {
        platform: 'soundcloud',
        url: 'https://soundcloud.com/bedrock-records/heaven-scent-remix',
        label: 'Bedrock Soundcloud Rip',
        available: true
      },
      {
        platform: 'mixcloud',
        url: 'https://www.mixcloud.com/johndigweed/transitions-820/',
        label: 'Transitions Radio Show with John Digweed',
        available: true,
        extraMeta: 'Timestamp 00:15:00'
      },
      {
        platform: 'spotify',
        url: 'https://open.spotify.com/track/heaven-scent-remix',
        label: 'Spotify Catalog',
        available: true
      },
      {
        platform: 'apple_music',
        url: 'https://music.apple.com/us/album/heaven-scent-remixes/1498172918',
        label: 'Apple Music Master',
        available: true
      }
    ],
    acousticSignature: {
      spectralCentroid: 1650,
      energyDistribution: [0.32, 0.28, 0.20, 0.14, 0.06],
      dominantFreq: 311.13,
      harmonicPurity: 0.96
    },
    playedInSets: [
      {
        event: 'Bedrock 20th Anniversary',
        dj: 'John Digweed',
        location: 'Ministry of Sound, London',
        timestamp: '03:10:00',
        date: 'Oct 2018'
      }
    ],
    notes: 'The definitive anthem of progressive club culture updated with Bodzin’s signature Moog Sub 37 arpeggio.'
  },
  {
    id: 'trk-pryda-01',
    title: 'The Return',
    version: 'Original Mix',
    artist: 'Pryda',
    recordLabel: 'Pryda Recordings',
    releaseDate: '2023-08-11',
    bpm: 126,
    musicalKey: '4A (F minor)',
    subGenre: 'Progressive House',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    durationSeconds: 494,
    catalogId: 'PRY048',
    beatportTrackId: '17928192',
    isrc: 'SE-UM7-23-00004',
    identifiedStems: {
      leadSynth: 'Towering Eric Prydz supersaw brass leads with pitch detune & stadium reverb',
      bassline: 'Punchy electro-progressive sidechained bassline',
      percussion: 'LinnDrum side-stick and massive punchy progressive kick',
      vocalPad: 'Epic filtered white noise crescendo and harmonic risers',
    },
    platforms: [
      {
        platform: 'beatport',
        url: 'https://www.beatport.com/track/the-return/17928192',
        label: 'Extended 8-minute Club Edit',
        price: '$2.49',
        available: true,
        extraMeta: 'Beatport #1 Overall'
      },
      {
        platform: 'bandcamp',
        url: 'https://ericprydz.bandcamp.com',
        label: 'Bandcamp Digital Vault',
        price: '$2.50',
        available: true
      },
      {
        platform: 'soundcloud',
        url: 'https://soundcloud.com/eric-prydz/the-return-preview',
        label: 'SoundCloud Teaser',
        available: true
      },
      {
        platform: 'mixcloud',
        url: 'https://www.mixcloud.com/discover/eric-prydz-epic-radio/',
        label: 'EPIC Radio Live Stream',
        available: true,
        extraMeta: 'Episode 38'
      },
      {
        platform: 'spotify',
        url: 'https://open.spotify.com/album/pryda-return',
        label: 'Spotify Stream',
        available: true
      },
      {
        platform: 'apple_music',
        url: 'https://music.apple.com/us/album/the-return-single/1699920192',
        label: 'Apple Music Stream',
        available: true
      }
    ],
    acousticSignature: {
      spectralCentroid: 1780,
      energyDistribution: [0.33, 0.27, 0.22, 0.12, 0.06],
      dominantFreq: 349.23,
      harmonicPurity: 0.95
    },
    playedInSets: [
      {
        event: 'HOLO Coachella Outdoor Theater',
        dj: 'Eric Prydz',
        location: 'Indio, California',
        timestamp: '00:54:10',
        date: 'Apr 2023'
      }
    ],
    notes: 'Towering synth brass chords with filtered white noise sweeps and dynamic 16-bar buildup tension.'
  },
  {
    id: 'trk-cercle-01',
    title: 'Sirens',
    version: 'Live Version',
    artist: 'Monolink',
    recordLabel: 'Cercle Records',
    releaseDate: '2021-10-15',
    bpm: 120,
    musicalKey: '6A (G minor)',
    subGenre: 'Organic House',
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',
    durationSeconds: 384,
    catalogId: 'CER014',
    beatportTrackId: '15829102',
    isrc: 'FR-9W1-21-00014',
    identifiedStems: {
      leadSynth: 'Live acoustic & electric guitar fingerpicking through space delay',
      bassline: 'Warm acoustic-modeled upright sub-bass',
      percussion: 'TR-808 organic percussion, bongos & delicate shaker patterns',
      vocalPad: 'Intimate indie vocal lead: "Sirens in the distance call me home"',
    },
    platforms: [
      {
        platform: 'beatport',
        url: 'https://www.beatport.com/track/sirens/15829102',
        label: 'Extended Master',
        price: '$2.19',
        available: true
      },
      {
        platform: 'bandcamp',
        url: 'https://cerclerecords.bandcamp.com/track/sirens-live',
        label: 'Cercle Bandcamp Direct',
        price: '€2.00',
        available: true
      },
      {
        platform: 'soundcloud',
        url: 'https://soundcloud.com/cerclerecords/monolink-sirens',
        label: 'Cercle Live Audio Rip',
        available: true,
        extraMeta: 'Cercle Sunset Broadcast'
      },
      {
        platform: 'mixcloud',
        url: 'https://www.mixcloud.com/cerclemusic/monolink-live-at-gaatafushi-island-maldives/',
        label: 'Cercle Live at Maldives Island',
        available: true,
        extraMeta: 'Timestamp 00:32:45'
      },
      {
        platform: 'spotify',
        url: 'https://open.spotify.com/track/monolink-sirens',
        label: 'Spotify Stream',
        available: true
      },
      {
        platform: 'apple_music',
        url: 'https://music.apple.com/us/album/sirens-live-cercle-single/1589128391',
        label: 'Apple Lossless Audio',
        available: true
      }
    ],
    acousticSignature: {
      spectralCentroid: 1040,
      energyDistribution: [0.28, 0.34, 0.22, 0.11, 0.05],
      dominantFreq: 392.00,
      harmonicPurity: 0.90
    },
    playedInSets: [
      {
        event: 'Cercle Live Gaatafushi',
        dj: 'Monolink (Live)',
        location: 'Maldives',
        timestamp: '00:33:00',
        date: 'Jul 2021'
      }
    ],
    notes: 'Warm electric guitar fingerpicking combined with analog Roland TR-808 percussion and indie vocals.'
  },
  {
    id: 'trk-adid-01',
    title: 'Tears In Rain',
    version: 'Original Mix',
    artist: 'Tim Green',
    recordLabel: 'All Day I Dream',
    releaseDate: '2022-04-29',
    bpm: 121,
    musicalKey: '9A (E minor)',
    subGenre: 'Organic House',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    durationSeconds: 512,
    catalogId: 'ADID082',
    beatportTrackId: '16472891',
    isrc: 'GB-B03-22-00082',
    identifiedStems: {
      leadSynth: 'Organic chromatic kalimba motif layered with acoustic harp plucks',
      bassline: 'Deep gentle sub-bass pulse at 41Hz with warm saturation',
      percussion: 'Live wooden shakers, subtle hi-hat ticks & soft felt kick',
      vocalPad: 'Lush cinematic string section and sunset atmospheric ambience',
    },
    platforms: [
      {
        platform: 'beatport',
        url: 'https://www.beatport.com/track/tears-in-rain/16472891',
        label: 'Lossless Digital Download',
        price: '$2.49',
        available: true
      },
      {
        platform: 'bandcamp',
        url: 'https://alldayidream.bandcamp.com/album/tears-in-rain-ep',
        label: 'Bandcamp 12" Vinyl + WAV',
        price: '£2.50',
        available: true
      },
      {
        platform: 'soundcloud',
        url: 'https://soundcloud.com/alldayidream/tim-green-tears-in-rain',
        label: 'ADID Soundcloud Stream',
        available: true
      },
      {
        platform: 'mixcloud',
        url: 'https://www.mixcloud.com/alldayidream/all-day-i-dream-radio-044-tim-green/',
        label: 'ADID Radio Episode 44',
        available: true,
        extraMeta: 'Timestamp 00:19:40'
      },
      {
        platform: 'spotify',
        url: 'https://open.spotify.com/album/tim-green-tears',
        label: 'Stream on Spotify',
        available: true
      },
      {
        platform: 'apple_music',
        url: 'https://music.apple.com/us/album/tears-in-rain-ep/1619283948',
        label: 'Apple Music Stream',
        available: true
      }
    ],
    acousticSignature: {
      spectralCentroid: 890,
      energyDistribution: [0.24, 0.38, 0.24, 0.10, 0.04],
      dominantFreq: 329.63,
      harmonicPurity: 0.89
    },
    playedInSets: [
      {
        event: 'All Day I Dream Festival',
        dj: 'Lee Burridge',
        location: 'Woodstock, New York',
        timestamp: '04:12:00',
        date: 'May 2022'
      }
    ],
    notes: 'Gentle kalimba accents, sub-bass pulse, and lush string ensembles weaving an intimate sunset tapestry.'
  },
  {
    id: 'trk-sudbeat-01',
    title: 'Polybius',
    version: 'Hernan Cattaneo & Marcelo Vasami Remix',
    artist: 'Soundexile',
    remixer: 'Hernan Cattaneo & Marcelo Vasami',
    recordLabel: 'Sudbeat Music',
    releaseDate: '2023-01-20',
    bpm: 122,
    musicalKey: '10A (B minor)',
    subGenre: 'Progressive House',
    coverImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800&auto=format&fit=crop',
    durationSeconds: 468,
    catalogId: 'SUD198',
    beatportTrackId: '17392819',
    isrc: 'AR-F02-23-00198',
    identifiedStems: {
      leadSynth: 'Analog modular sequenced pluck melody with tape echo modulation',
      bassline: 'Deep South American progressive rolling bassline with sub drive',
      percussion: 'Crisp percussive groove, syncopated ride cymbals & acoustic claps',
      vocalPad: 'Ethereal ambient vocal pads and harmonic frequency swell',
    },
    platforms: [
      {
        platform: 'beatport',
        url: 'https://www.beatport.com/track/polybius-remixes/17392819',
        label: 'Sudbeat Exclusive Cut',
        price: '$2.49',
        available: true,
        extraMeta: 'Sudbeat Chart Top 5'
      },
      {
        platform: 'bandcamp',
        url: 'https://sudbeat.bandcamp.com/album/polybius-remixes',
        label: 'Sudbeat Bandcamp Store',
        price: '€2.20',
        available: true
      },
      {
        platform: 'soundcloud',
        url: 'https://soundcloud.com/sudbeat/soundexile-polybius-cattaneo-vasami',
        label: 'SoundCloud Sudbeat Channel',
        available: true
      },
      {
        platform: 'mixcloud',
        url: 'https://www.mixcloud.com/hernancattaneo/resident-612/',
        label: 'Resident Episode #612 by Hernan Cattaneo',
        available: true,
        extraMeta: 'Timestamp 00:46:18'
      },
      {
        platform: 'spotify',
        url: 'https://open.spotify.com/album/sudbeat-polybius',
        label: 'Spotify Stream',
        available: true
      },
      {
        platform: 'apple_music',
        url: 'https://music.apple.com/us/album/polybius-remixes-ep/1663920194',
        label: 'Apple Music Stream',
        available: true
      }
    ],
    acousticSignature: {
      spectralCentroid: 1120,
      energyDistribution: [0.34, 0.32, 0.20, 0.10, 0.04],
      dominantFreq: 493.88,
      harmonicPurity: 0.93
    },
    playedInSets: [
      {
        event: 'Forja Outdoor Cordoba',
        dj: 'Hernan Cattaneo',
        location: 'Cordoba, Argentina',
        timestamp: '03:45:00',
        date: 'Mar 2023'
      }
    ],
    notes: 'Rolling deep groove, shimmering percussive textures, and masterclass harmonic progression from Cattaneo.'
  },
  {
    id: 'trk-monstercat-01',
    title: 'Before Valhalla',
    version: 'Extended Mix',
    artist: 'Vintage & Morelli',
    recordLabel: 'Monstercat Silk',
    releaseDate: '2021-08-20',
    bpm: 124,
    musicalKey: '5B (E-flat Major)',
    subGenre: 'Melodic Trance',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    durationSeconds: 436,
    catalogId: 'SILK094',
    beatportTrackId: '15602918',
    isrc: 'CA-B58-21-00094',
    identifiedStems: {
      leadSynth: 'Widescreen euphoric trance lead arpeggio with stereo chorus',
      bassline: 'Melodic progressive rolling bassline with 16th-note accents',
      percussion: 'Crisp progressive trance drum pattern with open hi-hat swing',
      vocalPad: 'Choir-like vocal pad washes and celestial reverb reflections',
    },
    platforms: [
      {
        platform: 'beatport',
        url: 'https://www.beatport.com/track/before-valhalla/15602918',
        label: 'Extended Silk Mix',
        price: '$2.19',
        available: true
      },
      {
        platform: 'bandcamp',
        url: 'https://monstercatsilk.bandcamp.com/track/before-valhalla',
        label: 'Bandcamp Digital Download',
        price: '$2.00',
        available: true
      },
      {
        platform: 'soundcloud',
        url: 'https://soundcloud.com/monstercatsilk/vintage-morelli-before-valhalla',
        label: 'Monstercat Silk Stream',
        available: true
      },
      {
        platform: 'mixcloud',
        url: 'https://www.mixcloud.com/monstercatsilk/monstercat-silk-showcase-episode-610/',
        label: 'Monstercat Silk Showcase #610',
        available: true,
        extraMeta: 'Timestamp 00:28:10'
      },
      {
        platform: 'spotify',
        url: 'https://open.spotify.com/track/vintage-valhalla',
        label: 'Spotify Stream',
        available: true
      },
      {
        platform: 'apple_music',
        url: 'https://music.apple.com/us/album/before-valhalla-single/1579201948',
        label: 'Apple Lossless',
        available: true
      }
    ],
    acousticSignature: {
      spectralCentroid: 1540,
      energyDistribution: [0.29, 0.31, 0.22, 0.12, 0.06],
      dominantFreq: 311.13,
      harmonicPurity: 0.94
    },
    playedInSets: [
      {
        event: 'Silk Showcase Live',
        dj: 'Vintage & Morelli',
        location: 'Belgrade, Serbia',
        timestamp: '01:05:00',
        date: 'Sep 2021'
      }
    ],
    notes: 'Lush widescreen pads, cascading arpeggios, and uplifting European progressive trance sentiment.'
  }
];

export const INITIAL_SYNCED_DEVICES: SyncedDevice[] = [
  {
    id: 'dev-desktop-web',
    name: 'MacBook Pro 16" (Studio Web)',
    type: 'desktop_web',
    lastActive: 'Active Now',
    isCurrent: true,
    syncedTracksCount: 148
  },
  {
    id: 'dev-mobile-iphone',
    name: 'iPhone 16 Pro (Mobile Companion)',
    type: 'mobile_ios',
    lastActive: '2 minutes ago',
    isCurrent: false,
    batteryLevel: 84,
    syncedTracksCount: 148
  },
  {
    id: 'dev-carplay',
    name: 'CarPlay Audio Scanner',
    type: 'carplay',
    lastActive: '3 hours ago',
    isCurrent: false,
    syncedTracksCount: 139
  }
];

export const INITIAL_GLOBAL_DROPS: GlobalDrop[] = [
  {
    id: 'drop-01',
    trackTitle: 'Explore Your Future',
    artist: 'Anyma',
    recordLabel: 'Afterlife',
    city: 'Ibiza',
    venueOrFestival: 'Hï Ibiza Theatre',
    identifiedAgo: '4m ago',
    userHandle: '@tale_of_julian',
    coverImage: '/src/assets/images/progressive_cover_afterlife_1790355441114.jpg',
    musicalKey: '8A',
    bpm: 125
  },
  {
    id: 'drop-02',
    trackTitle: 'Breathing (Club Mix)',
    artist: 'Ben Böhmer',
    recordLabel: 'Anjunadeep',
    city: 'Amsterdam',
    venueOrFestival: 'Gashouder (ADE)',
    identifiedAgo: '11m ago',
    userHandle: '@melodic_sarah',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    musicalKey: '11B',
    bpm: 122
  },
  {
    id: 'drop-03',
    trackTitle: 'The Return',
    artist: 'Pryda',
    recordLabel: 'Pryda Recordings',
    city: 'Miami',
    venueOrFestival: 'Club Space Terrace',
    identifiedAgo: '24m ago',
    userHandle: '@eric_p_cult',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    musicalKey: '4A',
    bpm: 126
  },
  {
    id: 'drop-04',
    trackTitle: 'Polybius (Cattaneo Remix)',
    artist: 'Soundexile',
    recordLabel: 'Sudbeat Music',
    city: 'Buenos Aires',
    venueOrFestival: 'Mandarine Park Sunset',
    identifiedAgo: '38m ago',
    userHandle: '@prog_arg',
    coverImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800&auto=format&fit=crop',
    musicalKey: '10A',
    bpm: 122
  }
];

export const INITIAL_ID_REQUESTS: IDRequestPost[] = [
  {
    id: 'req-01',
    title: 'Unreleased Anyma x Solomun ID from Tulum 2024 Sunrise?',
    submittedBy: 'Marcus Vance',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    eventContext: 'Zamna Tulum · Afterlife Closing Set (06:15 AM)',
    timestamp: '2 hours ago',
    audioSnippetDescription: 'Tremendous low brass pluck, vocal chop whispering "echoes in the dark", 125 BPM, Key 5A / C minor.',
    upvotes: 42,
    hasBeenSolved: true,
    solvedTrack: PROGRESSIVE_TRACKS[0],
    repliesCount: 19
  },
  {
    id: 'req-02',
    title: 'Hernan Cattaneo closing ID at Forja Cordoba 2024',
    submittedBy: 'Camila Rossi',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    eventContext: 'Forja Cordoba · 7-hour marathon set',
    timestamp: '5 hours ago',
    audioSnippetDescription: 'Deep hypnotic warm chord progression, continuous Roland 909 closed hi-hat ride, vocal pad.',
    upvotes: 27,
    hasBeenSolved: false,
    repliesCount: 8
  },
  {
    id: 'req-03',
    title: 'Guy J sunset ID from We Are Lost Festival',
    submittedBy: 'Liam O’Connor',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    eventContext: 'We Are Lost Amsterdam Beach Stage',
    timestamp: 'Yesterday',
    audioSnippetDescription: 'Mesmerizing modular arpeggio that modulates pitch every 32 bars. Classic Lost & Found sonic imprint.',
    upvotes: 35,
    hasBeenSolved: true,
    solvedTrack: PROGRESSIVE_TRACKS[2],
    repliesCount: 14
  }
];
