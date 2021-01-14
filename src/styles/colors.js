export const Colors = Object.freeze({
  primary: '#74d3ae',
  secondary: '#678d58',
  tertiary: '#a6c48a',
  black: '#000000',
  washout: '#8d99ae',
  white: '#ffffff',
  gray: '#e0e0e0',
  light: '#ebebeb',
  error: '#ff4d4d',
});

export const Gradients = Object.freeze({
  gradient_1: [Colors.primary, Colors.secondary, Colors.light],
});

export const Shadow = {
  shadowColor: Colors.washout,
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.34,
  shadowRadius: 6.27,

  elevation: 10,
};
