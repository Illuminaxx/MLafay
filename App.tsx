import 'react-native-url-polyfill/auto';

import { Pressable, useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from './libs/themes';

import { FontAwesome5 } from '@expo/vector-icons';
import ForgetPassword from './components/ForgetPassword';
import HomeScreen from './components/Home';
import { NavigationContainer } from '@react-navigation/native';
import ResetPassword from './components/ResetPassword';
import { ThemeProvider } from 'styled-components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
	const scheme = useColorScheme();
	const [ theme, setTheme ] = useState(scheme === 'dark' ? darkTheme : lightTheme);

	const toggleTheme = () => {
		setTheme(theme === lightTheme ? darkTheme : lightTheme);
	};
	return (
		<ThemeProvider theme={theme}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Home" component={HomeScreen} options={{
						title: 'Accueil',
						headerRight: () => (
							<Pressable onPress={toggleTheme}>
								<FontAwesome5 name={theme === lightTheme ? 'sun' : 'moon'} size={24} color={theme.iconColor} />
							</Pressable>
						)
					}} />
					<Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{
						title: 'Mot de pass oublié ?',
						headerRight: () => (
							<Pressable onPress={toggleTheme}>
								<FontAwesome5 name={theme === lightTheme ? 'sun' : 'moon'} size={24} color={theme.iconColor} />
							</Pressable>
						)
					}} />
					<Stack.Screen name="NewPassword" component={ResetPassword} options={{
						headerRight: () => (
							<Pressable onPress={toggleTheme}>
								<FontAwesome5 name={theme === lightTheme ? 'sun' : 'moon'} size={24} color={theme.iconColor} />
							</Pressable>
						)
					}} />
				</Stack.Navigator>
			</NavigationContainer>
		</ThemeProvider>
	);
}
