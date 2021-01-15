export const getName = (tag) => {
  switch (tag) {
    case 'en':
      return 'English';
    case 'zh':
      return '华语';
    default:
      return 'English';
  }
};
