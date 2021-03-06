import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'Screens/home';
import ContactScreen from 'Screens/contact';
import ConversationScreen from 'Screens/conversation';
import SettingScreen from 'Screens/setting';

const ProtectedStack = createStackNavigator();

const ProtectedRoute = () => {
	return (
		<ProtectedStack.Navigator screenOptions={{ headerShown: false }}>
			<ProtectedStack.Screen name="Home" component={HomeScreen} />
			<ProtectedStack.Screen name="Contact" component={ContactScreen} />
			<ProtectedStack.Screen
				name="Conversation"
				component={ConversationScreen}
			/>
			<ProtectedStack.Screen name="Setting" component={SettingScreen} />
		</ProtectedStack.Navigator>
	);
};

export default ProtectedRoute;
