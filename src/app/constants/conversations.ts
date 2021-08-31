export interface Question extends TextEntry {
  answers: TextEntry[];
}

export interface TextEntry {
  text: string;
  outputText?: string;
  photoLeft?: string;
  photoRight?: string;
  person?: string;
  me: boolean;
  label?: string;
  next?: string;
  take?: string;
  give?: string;
}

export interface DialogTree {
  lines: Array<Question | TextEntry>;
}

export const Conversations: { [Key: string]: DialogTree } = {
  Dummy: {
    lines: [],
  },
  WelcomeToGym: {
    lines: [
      {
        text: "Welcome to Ted's Gym.",
        me: false,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/gloria/smile.png',
        person: 'Gloria',
      },
      {
        text: 'Hi Gloria',
        me: true,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/gloria/smile.png',
        person: 'Gloria',
      },
      {
        text: "Markus! Wow, I almost didn't recognise you.",
        me: false,
        photoLeft: '/assets/avatars/player/dress/smile1.png',
        photoRight: '/assets/avatars/gloria/shocked.png',
        person: 'Gloria',
      },
      {
        text: "This isn't my first choice in clothing, but my mother is on a power trip.",
        me: true,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/gloria/normal.png',
        person: 'Gloria',
      },
      {
        text: "That women has some funny ideas at times. I'm guessing she's taken all you rother clothes?",
        me: false,
        photoLeft: '/assets/avatars/player/dress/sad.png',
        photoRight: '/assets/avatars/gloria/angry.png',
        person: 'Gloria',
      },
      {
        text: 'Yes. Including my gym kit. Not that I would dare use the changing rooms dressed like this.',
        me: true,
        photoLeft: '/assets/avatars/player/dress/sad.png',
        photoRight: '/assets/avatars/gloria/angry.png',
        person: 'Gloria',
      },
      {
        text: 'I can see how that could cause trouble, espescially if you used the ladies.',
        me: false,
        photoLeft: '/assets/avatars/player/dress/smirk.png',
        photoRight: '/assets/avatars/gloria/laugh.png',
        person: 'Gloria',
      },
      {
        text: 'Is Ted about? I think it might be a good idea to do some practice sparring.',
        me: true,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/gloria/normal.png',
        person: 'Gloria',
      },
      {
        text: "Sure, he's through on the exercise mat to the right.",
        me: false,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/gloria/normal.png',
        person: 'Gloria',
      },
      {
        text: 'Thanks, I have a feeling I might need some self defense skills dressed like this.',
        me: true,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/gloria/normal.png',
        person: 'Gloria',
      },
    ],
  },
};
