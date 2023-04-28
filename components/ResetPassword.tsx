import { Alert, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';

import { supabase } from '../libs/supabase';


const Container = styled(View)`
	background-color: ${(props: { theme: { backgroundColor: any } }) => props.theme.backgroundColor}
`;

function ResetPassword(event: any, props: any) {
	const [ password, setPassword ] = useState('');
	const [ error, setError ] = useState('');
	const [ success, setSuccess ] = useState(false);
	const [ loading, setLoading ] = useState(false);

<
	async function handleResetPassword() {
		const token = event.route.params.token;
		const {data, error} = await supabase.auth.getUser(token);
		const pass = newPassword;
		if (!data) {
			setError('Vous devez être connecté pour mettre à jour votre mot de passe');
			return;
		}
		try {
			setLoading(true);
			const { data: updateUserData, error: updateUserError } = await supabase.auth.updateUser({ password: pass });
			if (error) {
				setNewPassword('Il y a eu une erreur lors de la réinitialisaton du mot de passe..');
			} else {
				setSuccess(true);
				
			}
		} catch (error) {
			Alert.alert('Erreur !',);
		}
	}

	return (

		<Container>
			<View style={styles.container}>
				{error && <Text style={styles.errorText}>{error}</Text>}
				{success && <Text style={styles.successText}>Mot de passe réinitialisé avec succès</Text>}
				<View style={styles.input}>
					<Input
						placeholder="Nouveau mot de passe"
						secureTextEntry
						value={password}
						onChangeText={(text) => setPassword(text)}
					/>
				</View>
				<View>
					<TouchableOpacity>
						<Button
							title={loading ? 'Loading' : 'Réinitialiser le mot de passe'}
							disabled={loading}
							onPress={handleResetPassword}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		height: Dimensions.get('screen').height,
		maxHeight: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	input: {
		height: 40,
		width: '80%',
		marginVertical: 10,
		paddingHorizontal: 10
	},
	errorText: {
		color: 'red',
		marginBottom: 20
	},
	successText: {
		color: 'green',
		marginBottom: 20
	}
});

export default withTheme(ResetPassword);
