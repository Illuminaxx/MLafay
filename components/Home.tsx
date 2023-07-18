import 'react-native-url-polyfill/auto';

import { Dimensions, StyleSheet, View } from 'react-native';
import styled, { withTheme } from 'styled-components';
import { useEffect, useState } from 'react';

import Account from './Account';
import Login from './Login';
import { Session } from '@supabase/supabase-js';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../libs/supabase';

const Container = styled(View)`
	background-color: ${(props: { theme: { backgroundColor: string } }) => props.theme.backgroundColor}
`;

function Home(props: any) {
	const [ session, setSession ] = useState<Session | null>(null);
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	return (
		<Container>
			<View style={styles.view}>
				{session && session.user ? <Account key={session.user.id} session={session} /> : <Login />}
				<StatusBar style="auto" />
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	view: {
		height: Dimensions.get('screen').height,
		justifyContent: 'flex-start',
		marginTop: 0,
		top: 0,
		bottom: 0
	}
});

export default withTheme(Home);
