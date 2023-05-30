const phonetic = (num) => {
  const mod = num % 26;
  switch (mod) {
    case 1:
      return 'Apples';
    case 2:
      return 'Butter';
    case 3:
      return 'Charlie';
    case 4:
      return 'Duff';
    case 5:
      return 'Edward';
    case 6:
      return 'Freddy';
    case 7:
      return 'George';
    case 8:
      return 'Harry';
    case 9:
      return 'Ink';
    case 10:
      return 'Johnnie';
    case 11:
      return 'King';
    case 12:
      return 'London';
    case 13:
      return 'Monkey';
    case 14:
      return 'Nuts';
    case 15:
      return 'Orenge';
    case 16:
      return 'Pudding';
    case 17:
      return 'Queeenie';
    case 18:
      return 'Robert';
    case 19:
      return 'Sugger';
    case 20:
      return 'Tommy';
    case 21:
      return 'Uncle';
    case 22:
      return 'Vinegar';
    case 23:
      return 'Willie';
    case 24:
      return 'Xerxes';
    case 25:
      return 'Yellow';
    case 0:
      return 'Zebra';
    default:
      return '';
  }
};

export default phonetic;
