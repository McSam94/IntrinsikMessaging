import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useInsets = () => {
  const { bottom, top, left, right } = useSafeAreaInsets();

  return {
    bottom: bottom === 0 ? 12 : bottom,
    top,
    left,
    right,
  };
};
