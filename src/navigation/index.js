import React, { useContext, useEffect } from 'react';
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from '@react-navigation/native';
import { useTranslation, useThemeColor } from 'Stores/ui';
import { AuthContext, UiContext } from 'Stores';
import { translationGetters } from 'i18n';
import LoginScreen from 'Screens/login';
import Loader from 'Components/loader';
import ProtectedRoute from './protected';

const Navigation = () => {
	const {
		token,
		init: initAuth,
		isInitialized: isAuthInitialized,
	} = useContext(AuthContext);
	const { init: initUi, isInitialized: isUiInitialized } = useContext(
		UiContext,
	);
	const { setTranslation } = useTranslation();
	const { appTheme } = useThemeColor();

	useEffect(() => {
		setTranslation(translationGetters);
	}, [setTranslation]);

	useEffect(() => {
		if (!isAuthInitialized) {
			initAuth();
		}
	}, [initAuth, isAuthInitialized]);

	useEffect(() => {
		if (!isUiInitialized) {
			initUi();
		}
	}, [initUi, isUiInitialized]);

	if (!isAuthInitialized || !isUiInitialized) {
		return <Loader testID="init-loader" />;
	}

	return (
		<NavigationContainer
			theme={appTheme === 'dark' ? DarkTheme : DefaultTheme}>
			{token ? <ProtectedRoute /> : <LoginScreen />}
		</NavigationContainer>
	);
};

export default Navigation;
