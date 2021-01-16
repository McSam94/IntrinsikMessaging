import React, { useContext, useEffect } from 'react';
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
import Loading from 'Screens/loading';

const Navigation = () => {
  const { token, init, isInitialized, isInitializing } = useContext(
    AuthContext,
  );
  const { setTranslation } = useTranslation();
  const { appTheme } = useThemeColor();

  setTranslation(translationGetters);

  useEffect(() => {
    if (!token && !isInitialized) {
      init();
    }
  }, [token, init, isInitialized]);

  return (
    <NavigationContainer theme={appTheme === 'dark' ? DarkTheme : DefaultTheme}>
      {isInitialized & !isInitializing ? (
        <>{token ? <ProtectedRoute /> : <LoginScreen />}</>
      ) : (
        <Loading />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
