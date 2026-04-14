export type Item = {
  id: string;
  name: string;
  subName: string;
  category: 'Knife' | 'Gloves' | 'Rifle' | 'Pistol' | 'Stickers';
  basePrice: number;
  image: string;
  rarity: 'Common' | 'Rare' | 'Legendary' | 'Scarce' | 'New';
  wear?: string;
  change?: number;
};

const makeArtifactImage = (label: string, primary: string, secondary: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="100%" stop-color="${secondary}" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="600" rx="48" fill="url(#bg)" />
      <circle cx="300" cy="220" r="180" fill="url(#glow)" />
      <path d="M130 420 C220 300, 380 300, 470 420" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="18" stroke-linecap="round" />
      <text x="300" y="318" text-anchor="middle" font-family="Arial, sans-serif" font-size="54" font-weight="700" fill="rgba(255,255,255,0.95)">
        ${label}
      </text>
      <text x="300" y="380" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" letter-spacing="4" fill="rgba(255,255,255,0.72)">
        MIDNIGHT EXCHANGE
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const INITIAL_ITEMS: Item[] = [
  {
    id: '1',
    name: 'Spectral Talon',
    subName: 'Knife | Doppler Ph. 4',
    category: 'Knife',
    basePrice: 1420.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAppBoaw_XfZLXux-VqbRKGJKr-kj2fzCruEhxWpaTrSBHwju-8eSoilGy-5ZuLxcMj_PPOisOJg6wdpH2HWYm4Yn-W2NPN82plUS9OWV3o4aHaeMkzqw8klul4hwBXW3LqF8HchHD1yom0YyiG_sn4Fl5WFlsql7aw_iMWtAJubZTVKT67Hf0jcDh-9hE1eSEGFbMl3BM8bXr2Lv7b6vfZwRgN7gUNYE4axfA8OYe0tv_xsoum6WYcK6I0urvF4-8cwroYC0bNYX4',
    rarity: 'Scarce',
    wear: 'Factory New'
  },
  {
    id: '2',
    name: 'Marble Fade',
    subName: 'Gloves | Specialist',
    category: 'Gloves',
    basePrice: 845.50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeYULWRzFFN8SL5mruDp44ne8TVVnNem7AxK4EBvUznoDDr16t57LOXLKkyTGA2ssiZftbyzTRZlap8MwTh3IJTalirvt9l6XVUEron5mAd-nHfS72JOkgHyKwcxGnVXZqRuc6X3PDHgk0jnO0I5ZlKfqS0L0hjreboVplkd0mwmf8BgFhDz_cO31s1ywQr3kNnqnxh1w_CfxstCt0JYGQi8gcewBmuuZ0ZQL7yPnRmz4iatzuNODTuqnR5702R2S8mDAwWiKrl6s',
    rarity: 'Legendary',
    wear: 'Field-Tested'
  },
  {
    id: '3',
    name: 'Asiimov Core',
    subName: 'Rifle | AW-47',
    category: 'Rifle',
    basePrice: 2100.25,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVqNkwqu_FV7gmhadloNEmdP4ITBf2p6TfqXZr0DCA1zRRchzIgnXo4LT1WsmMUBc8MyrWBCpZm9ogUd8tg6AgKS952VhUdrln_6h0CRxmR75og5je4hnbcrQHerAMI4bSat4ZQlTnuwMwMBnMAjEDHU703jzpeSMHdFXrK88FfyRHbrGTxAd-RuLTtDta0ma3XMsM7h_7NvPaKvbRYCpRENPeOFNnz0qobLTbeKeC3tOL2yF4G6j5mkDijCCP86plfO0jAZ0WlPE',
    rarity: 'New',
    wear: 'Minimal Wear'
  },
  {
    id: '4',
    name: 'Ronin Holo',
    subName: 'Sticker | Katowice 2024',
    category: 'Stickers',
    basePrice: 120.99,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdAL-5X92jo11K55ZsTqLttmCpAGpBRU3ihNmvNQ9R_613yRwB17_kfhhod7YBNuYQxObga5tDAysgfaJuyTJpCfjAoFlBDpis66H_4Dz62_y9TgLPBFQx-QWwytmbkFjVQW8pBGIr-Bm0ys3wvD1zFDRcl-leVfu24orBDbjszFOutKc4JYkPILGbthINvUy6_ayZDk3btjl3ZUTqYr8jELkczRxmGUZYCwCxrVWML_SNcM9yhQyjieWG8-JkEZ2yt-5FgTrZpcE',
    rarity: 'Common'
  },
  {
    id: '5',
    name: 'Gilded Edge',
    subName: 'Knife | Lore',
    category: 'Knife',
    basePrice: 3450.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2vNJLnhBkSM4nq3b1vTjjKpfZEIbCV-Icnbr6PIknWCKFF61-FXBNS9PGXgdcneTivFw95mDQxxdYupKyuCciHHllVx_Mhl2MLIVQ86f7eyD1QceD4vHyv2FvMGfB4zpNh1CzJ8HViQ6RkpGpeftNu7e47CIY3b28DLi_YJIuxtHEIHakcOmSkFuwOMs15zOmMZf206vSvrTBMl7xYxhTgBLJfccHGc8-cizTFiDwCK6qoY5DJlzDPo2X0yShf5lI17i-q-j2d8A',
    rarity: 'Rare',
    wear: 'Factory New'
  },
  {
    id: '6',
    name: 'Void Walker',
    subName: 'Pistol | Carbon Fiber',
    category: 'Pistol',
    basePrice: 245.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8ji1KuF_Szr_5P6Gz4Ew3Lsz3qmuWNBwY8u7t3opB1majWGT1VTGj21e3ghc6DwOmMvwH7ERhhf-DzZVV-rIIEySizM_I6UsWAcspwlHisG0LGE4G6xywlMPrufJX-Ap07vSRqSBXm4nINA1tyVSPzRpd6InF6rbFfiA3mL77UymmARRyX2vrs-FvysUhCjIlCgv_K9P8n3h0Rk9Anr0a1Tx2UB76lgYbWMiiQXVPIQLqtOa1QAuglhHqiF2crY44Fs0uVpdthiA',
    rarity: 'Rare',
    wear: 'Field-Tested'
  },
  {
    id: '7',
    name: 'Solar Fang',
    subName: 'Knife | Emberline',
    category: 'Knife',
    basePrice: 2685.75,
    image: makeArtifactImage('FANG', '#f97316', '#7c2d12'),
    rarity: 'Legendary',
    wear: 'Minimal Wear'
  },
  {
    id: '8',
    name: 'Nova Shell',
    subName: 'Rifle | Photon Burst',
    category: 'Rifle',
    basePrice: 1820.40,
    image: makeArtifactImage('NOVA', '#38bdf8', '#1d4ed8'),
    rarity: 'New',
    wear: 'Factory New'
  },
  {
    id: '9',
    name: 'Silk Mirage',
    subName: 'Gloves | Lunar Thread',
    category: 'Gloves',
    basePrice: 690.15,
    image: makeArtifactImage('MIRAGE', '#d946ef', '#4c1d95'),
    rarity: 'Scarce',
    wear: 'Well-Worn'
  },
  {
    id: '10',
    name: 'Ghost Circuit',
    subName: 'Pistol | Neon Core',
    category: 'Pistol',
    basePrice: 310.00,
    image: makeArtifactImage('GHOST', '#22c55e', '#064e3b'),
    rarity: 'Rare',
    wear: 'Battle-Scarred'
  },
  {
    id: '11',
    name: 'Astral Crest',
    subName: 'Sticker | Championship 2026',
    category: 'Stickers',
    basePrice: 88.25,
    image: makeArtifactImage('CREST', '#facc15', '#78350f'),
    rarity: 'Common'
  },
  {
    id: '12',
    name: 'Arcwave Suppressor',
    subName: 'Rifle | Midnight Pattern',
    category: 'Rifle',
    basePrice: 1560.00,
    image: makeArtifactImage('ARCWAVE', '#a78bfa', '#312e81'),
    rarity: 'New',
    wear: 'Factory New'
  }
];
