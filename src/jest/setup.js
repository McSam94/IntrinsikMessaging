/* eslint-disable no-undef */
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// jest.mock('react-native-safe-area-context', () => {
//   return {
//     useSafeArea: () => {
//       return {
//         bottom: 0,
//         top: 0,
//         left: 0,
//         right: 0,
//       };
//     },
//   };
// });
