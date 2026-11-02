export const PIN_COPY = {
  title: 'A Little Surprise Awaits...',
  subtitle: 'Only someone special knows the secret.',
  wrong: "Oops, that's not the secret. Try again, my love.",
  incomplete: 'Four little digits, please.',
} as const

export const ENVELOPE_COPY = {
  script: 'a tiny love note',
  title: 'A little something for you...',
  subtitle: 'Your birthday surprise is waiting.',
  tapHint: 'Tap the envelope',
  letter: ['This is for Arshi.', 'With all my love,', 'From Raja.'],
} as const

export const ROOM_COPY = {
  title: 'Shhhh... The room is waiting for you.',
  subtitle: 'Someone left the lights on for a purpose.',
  switchLabel: 'Turn on the lights',
  after: 'Now, let the magic begin...',
} as const

export const BIRTHDAY_COPY = {
  script: "Look who's having a birthday...",
  headline: 'Happy Birthday,',
  support:
    'Today is all about you, your beautiful smile, and all the little things that make you so wonderfully you.',
  cta: "There's More",
} as const

export const CAKE_COPY = {
  script: 'Cake time',
  title: 'One little cake. One very special girl.',
  hint: 'Swipe your finger down through the middle of the cake ✨ (or tap the button)',
  cutCta: 'Cut the Cake',
  doneScript: 'Cake time',
  done: 'You did it! Make a wish.',
  doneSub: 'The first slice is always the sweetest one.',
  wishCta: 'Make a Wish',
  closeEyes: 'Close your eyes and make a little wish...',
  closeEyesSub: 'Make a little wish for the year ahead.',
  skip: 'I made my wish',
  onItsWay: 'Your wish is on its way. ✨',
  memoriesCta: 'Open Your Little Memories',
} as const

export const MEMORY_COPY = {
  title: 'Little Moments, Big Feelings',
  subtitle: 'Every little memory with you deserves its own place.',
  back: 'Back to Memories',
  nextCta: 'Read My Little Letters',
  finaleBack: 'Back to the Finale',
  rooms: {
    chocolate: {
      title: 'Chocolate Room Meet',
      caption: 'sweet & cosy',
      message:
        'A little sweetness, a little laughter, and a memory I want to keep close to my heart.',
    },
    park: {
      title: 'Our Little Park Moment',
      caption: 'sunny & calm',
      message:
        "Some of the simplest moments become the most beautiful memories when they're shared with you.",
    },
    'dream-planners': {
      title: 'Dream Planners',
      caption: 'wishes & stars',
      message:
        "Here's to all the little dreams we're going to turn into beautiful memories together.",
    },
  },
} as const

export const LETTERS_COPY = {
  title: 'Five Little Love Letters',
  subtitle: 'Read them slowly. Each one is for you.',
  cta: 'One Last Surprise',
} as const

/** Exactly as supplied — do not edit. */
export const LOVE_LETTERS: readonly { id: number; text: string }[] = [
  {
    id: 1,
    text: 'Happy birthday to the girl who stole my heart and never gave it back. Every single day with you feels like a beautiful dream.',
  },
  {
    id: 2,
    text: 'To the most beautiful person inside and out—happy birthday! You are my biggest inspiration, my soulmate, and my forever love.',
  },
  {
    id: 3,
    text: "Happy birthday, my love! You don't need a special day to remind me how important you are. You bless my life every day, and you deserve to be loved like crazy today and always.",
  },
  {
    id: 4,
    text: 'Wishing a magical birthday to the one who brings so much magic into my life. I am constantly amazed by your beauty, intelligence, and kindness.',
  },
  {
    id: 5,
    text: 'Happy birthday to the woman who inspires me every day to be a better person. You make my world spin, and I love you to the moon and back!',
  },
]

export const FINALE_COPY = {
  headline: 'Happy Birthday,',
  line1: 'With all my love, today and always.',
  line2: 'Forever cheering for your happiness, your dreams, and your beautiful smile.',
  line3: 'I miss you, Arshi.',
  signature: 'Yours, Raja ♡',
  replay: 'Replay Our Little Story',
  revisit: 'Revisit the memory rooms',
} as const
