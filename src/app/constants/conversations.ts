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
  Start: {
    lines: [
      {
        text: 'Yawn! I guess it is time to get up.',
        me: true,
        photoLeft: '/assets/avatars/player/nude/normal.png',
        photoRight: '',
        person: '',
      },
      {
        text: 'Schools out for summer, and my girlfriends parents are away.',
        me: true,
        photoLeft: '/assets/avatars/player/nude/normal.png',
        photoRight: '',
        person: '',
      },
      {
        text: 'Things are looking good.',
        me: true,
        photoLeft: '/assets/avatars/player/nude/normal.png',
        photoRight: '',
        person: '',
      },
      {
        text: 'But first, I really need to use the bathroom!',
        me: true,
        photoLeft: '/assets/avatars/player/nude/normal.png',
        photoRight: '',
        person: '',
      },
    ],
  },
  NoGoDown: {
    lines: [
      {
        text: "It's no use, I need to go to the bathroom first, I'm bursting",
        me: true,
        photoLeft: '/assets/avatars/player/nude/normal.png',
        photoRight: '',
        person: '',
      },
    ],
  },
  Toilet: {
    lines: [
      {
        text: "Ahh! Much better!",
        me: true,
        photoLeft: '/assets/avatars/player/nude/delighted2.png',
        photoRight: '',
        person: '',
      },
    ],
  },
  HelloMum: {
    lines: [
      {
        text: 'Morning, Mum.',
        me: true,
        photoLeft: '/assets/avatars/player/nude/normal.png',
        photoRight: '/assets/avatars/mother/normal.png',
        person: 'Mother',
      },
      {
        text: "Are, good you haven't dressed yet. Planning to go off gallivanting around town again today?",
        me: false,
        photoLeft: '/assets/avatars/player/nude/normal.png',
        photoRight: '/assets/avatars/mother/normal.png',
        person: 'Mother',
      },
      {
        text: "I haven't a specific destination in mind.",
        me: true,
        photoLeft: '/assets/avatars/player/nude/smirk.png',
        photoRight: '/assets/avatars/mother/normal.png',
        person: 'Mother',
      },
      {
        text: 'You should be concentrating on studying, your future is important you know.',
        me: false,
        photoLeft: '/assets/avatars/player/nude/normal.png',
        photoRight: '/assets/avatars/mother/normal.png',
        person: 'Mother',
      },
      {
        text: "It's the summer holidays.",
        me: true,
        photoLeft: '/assets/avatars/player/nude/normal.png',
        photoRight: '/assets/avatars/mother/normal.png',
        person: 'Mother',
      },
      {
        text: 'That is no excuse. I want no more of your stupid escapades.',
        me: false,
        photoLeft: '/assets/avatars/player/nude/normal.png',
        photoRight: '/assets/avatars/mother/annoyed.png',
        person: 'Mother',
      },
      {
        text: "Look, I'm sorry, but I didn't know that Giraffe would eat Mrs. Watson's hat.",
        me: true,
        photoLeft: '/assets/avatars/player/nude/normal.png',
        photoRight: '/assets/avatars/mother/normal.png',
        person: 'Mother',
      },
      {
        text: 'Well, you might think twice about going outside. While you where in the bathroom, I emptied your wardrobe.',
        me: false,
        photoLeft: '/assets/avatars/player/nude/normal.png',
        photoRight: '/assets/avatars/mother/smug.png',
        person: 'Mother',
      },
      {
        text: "I can't walk around in just boxer shorts. I freeze to death.",
        me: true,
        photoLeft: '/assets/avatars/player/nude/normal.png',
        photoRight: '/assets/avatars/mother/normal.png',
        person: 'Mother',
      },
      {
        text: "Here, you can wear this nice summer dress. It will keep you warm, and you won't want to go outside wearing it.",
        me: false,
        photoLeft: '/assets/avatars/player/nude/surprised.png',
        photoRight: '/assets/avatars/mother/delighted.png',
        person: 'Mother',
      },
      {
        text: 'Seriously?',
        me: true,
        photoLeft: '/assets/avatars/player/nude/surprised.png',
        photoRight: '/assets/avatars/mother/delighted2.png',
        person: 'Mother',
      },
      {
        text: 'Nobody else is here. Your father is away on business. With his secretary.',
        me: false,
        photoLeft: '/assets/avatars/player/nude/sad.png',
        photoRight: '/assets/avatars/mother/angry.png',
        person: 'Mother',
      },
      {
        text: "Oh, I'm sure he is very busy!",
        me: true,
        photoLeft: '/assets/avatars/player/nude/laugh.png',
        photoRight: '/assets/avatars/mother/angry.png',
        person: 'Mother',
      },
      {
        text: 'Never mind that. I want to see you dressed before I have to meet Lucy.',
        me: false,
        photoLeft: '/assets/avatars/player/nude/sad.png',
        photoRight: '/assets/avatars/mother/angry.png',
        person: 'Mother',
      },
      {
        text: 'I look like a girl!',
        me: true,
        photoLeft: '/assets/avatars/player/dress/sad.png',
        photoRight: '/assets/avatars/mother/delighted.png',
        person: 'Mother',
      },
      {
        text: 'Well, that is your own fault for not getting a haircut.',
        me: false,
        photoLeft: '/assets/avatars/player/dress/sad.png',
        photoRight: '/assets/avatars/mother/normal.png',
        person: 'Mother',
      },
      {
        text: 'Well, trying to find a barber operating during lockdown was impossible.',
        me: true,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/mother/normal.png',
        person: 'Mother',
      },
      {
        text: "It's time for me to leave. I'll be gone for a couple of days. I'll be staying at Lucy's. We are going dancing in the city.",
        me: false,
        photoLeft: '/assets/avatars/player/dress/sad.png',
        photoRight: '/assets/avatars/mother/normal.png',
        person: 'Mother',
      },
      {
        text: 'The horizontal lambada?',
        me: true,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/mother/normal.png',
        person: 'Mother',
      },
      {
        text: 'Cheeky sod. Any more of your nonsense and you will be going to school in a skirt.',
        me: false,
        photoLeft: '/assets/avatars/player/dress/sad.png',
        photoRight: '/assets/avatars/mother/normal.png',
        person: 'Mother',
      },
      {
        text: 'OK. I promise to be a good girl while you are gone.',
        me: true,
        photoLeft: '/assets/avatars/player/dress/smirk.png',
        photoRight: '/assets/avatars/mother/normal.png',
        person: 'Mother',
      },
      {
        text: "Just keep out of trouble. I'm just trying to protect your future.",
        me: false,
        photoLeft: '/assets/avatars/player/dress/sad.png',
        photoRight: '/assets/avatars/mother/normal.png',
        person: 'Mother',
      },
      {
        text: 'If anybody sees me in this, It could well effect my future.',
        me: true,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/mother/normal.png',
        person: 'Mother',
      },
      {
        text: 'In that case, stay indoors and study. See you later',
        me: false,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/mother/normal.png',
        person: 'Mother',
      },
      {
        text: "As if I'm going anywhere without a good reason.",
        me: true,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '',
        person: '',
      },
    ],
  },
  PhoneFromCeo: {
    lines: [
      {
        text: '(Answers phone) Hello?',
        me: true,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/geraldine/normal.png',
        person: '??',
      },
      {
        text: "Is that Marcus? It's Geraldine Glover over at Future Fabrications",
        me: false,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/geraldine/normal.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: "Yes, that's me. You're the big boss where my father works.",
        me: true,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/geraldine/normal.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: 'Yes. We have a problem, and we would normally get your father to fix it, but he has the day off.',
        me: false,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/geraldine/normal.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: "If you are hoping I know where he is, I don't. Also, he told us that he was away on a business trip.",
        me: true,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/geraldine/normal.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: 'Is that so? I would confirm that with his assistant, but she is off as well.',
        me: false,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/geraldine/annoyed.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: 'I take it that is probably against company policy?',
        me: true,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/geraldine/normal.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: "It is most certainly discouraged. I don't know where either of them are today.",
        me: false,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/geraldine/normal.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: "My guess is the're wearing out the bed springs in a cheap hotel on the east coast.",
        me: true,
        photoLeft: '/assets/avatars/player/dress/laugh.png',
        photoRight: '/assets/avatars/geraldine/shocked.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: 'In that case I will be having a serious conversation with the both of them when they return.',
        me: false,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/geraldine/angry.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: "If you are going to sack his lazy a**e, then do it on Tuesday. I'm out that evening and won't have to listen to his moaning. Also, my slut of a mother will be back from screwing her lover.",
        me: true,
        photoLeft: '/assets/avatars/player/dress/smile.png',
        photoRight: '/assets/avatars/geraldine/angry.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: "You don't have much respect for your parents.",
        me: false,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/geraldine/shocked.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: "They disappear for days on end, which I don't mind. Then decide to turn up and micro-manage me to make up for lost time.",
        me: true,
        photoLeft: '/assets/avatars/player/dress/smile.png',
        photoRight: '/assets/avatars/geraldine/angry.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: 'I am sorry to hear that. However, that is besides the point at the moment.',
        me: false,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/geraldine/normal.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: 'Previous conversations with your father suggest you have a talent for getting into things',
        me: false,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/geraldine/normal.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: "I'm an amateur lock-picker. I may even do it as a future career if I don't can't go to university.",
        me: true,
        photoLeft: '/assets/avatars/player/dress/laugh.png',
        photoRight: '/assets/avatars/geraldine/shocked.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: 'Our latest prototype is in out vault, and we need to show it to a customer this afternoon. However, the lock is jammed.',
        me: false,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/geraldine/normal.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: 'You want me to come and look at it?',
        me: false,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/geraldine/delighted.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: 'Would you kindly?',
        me: false,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/geraldine/normal.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: 'Slight problem. My mother has decided to force me to stay indoors by confiscating my clothes. The only thing I have to wear is a girls dress.',
        me: true,
        photoLeft: '/assets/avatars/player/dress/sad.png',
        photoRight: '/assets/avatars/geraldine/oh.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: 'We are an equal opportunity diversity aware employer. Nobody here will give you any issue with your gender presentation.',
        me: false,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/geraldine/smile.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: 'I have to walk through town to get to you though.',
        me: true,
        photoLeft: '/assets/avatars/player/dress/normal.png',
        photoRight: '/assets/avatars/geraldine/delighted.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: "Did I mention the £300 per hour consultancy fee that I'll pay you, with a minimum callout of 3 hours?",
        me: false,
        photoLeft: '/assets/avatars/player/dress/surprised.png',
        photoRight: '/assets/avatars/geraldine/smirk.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
      {
        text: "I'm on my way.",
        me: true,
        photoLeft: '/assets/avatars/player/dress/smile3.png',
        photoRight: '/assets/avatars/geraldine/delighted2.png',
        person: 'Geraldine Glover, CEO Future Fabrications Inc.',
      },
    ],
  },
  FactoryReception: {
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
        text: "Marcus! Wow, I almost didn't recognise you.",
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
        text: "That women has some funny ideas at times. I'm guessing she's taken all your other clothes?",
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
        text: 'I can see how that could cause trouble, especially if you used the ladies.',
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
