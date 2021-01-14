import React, { useContext } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { useTranslation, useThemeColor } from 'Stores/ui';
import { AuthContext } from 'Stores';
import { translationGetters } from 'i18n';
import LoginScreen from 'Screens/login';
import ProtectedRoute from './protected';

const Navigation = () => {
  const { token } = useContext(AuthContext);
  const { setTranslation } = useTranslation();
  const { appTheme } = useThemeColor();

  setTranslation(translationGetters);

  return (
    <NavigationContainer theme={appTheme === 'dark' ? DarkTheme : DefaultTheme}>
      {token ? <ProtectedRoute /> : <LoginScreen />}
    </NavigationContainer>
  );
};

export default Navigation;
