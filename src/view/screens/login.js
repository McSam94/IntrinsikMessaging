import React, { useCallback, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { useThemeColor, useTranslation } from 'Stores/ui';
import { AuthContext } from 'Stores';
import { Colors } from 'Styles/colors';
import { FontSize } from 'Styles/typography';
import Icon from 'Components/icon';
import { ControlledInput } from 'Components/input';
import Button from 'Components/button';
import Layout from 'Components/layout';
import { name } from '../../../package.json';

const Login = () => {
	const { colorize } = useThemeColor();
	const { translate } = useTranslation();
	const { login, isLoggingIn } = useContext(AuthContext);
	const { handleSubmit, control, errors } = useForm({
		mode: 'onChange',
	});
	const onSubmit = useCallback(
		(data) => {
			login(data);
		},
		[login],
	);

	return (
		<Layout>
			<View
				style={[
					styles.container,
					{
						backgroundColor: colorize('background'),
					},
				]}>
				<View style={styles.logoContainer}>
					<Icon
						name="chat"
						color={Colors.primary}
						style={styles.logo}
					/>
					<Text
						testID="login-name"
						style={[
							styles.name,
							{
								color: colorize('textWashOut'),
							},
						]}>
						{name}
					</Text>
				</View>
				<View style={styles.form}>
					<Text
						testID="login-title"
						style={[
							styles.title,
							{
								color: colorize('text'),
							},
						]}>
						{translate('screens.login.signin')}
					</Text>
					<ControlledInput
						testID="login-username-input"
						style={styles.input}
						name="username"
						control={control}
						rules={{
							required: {
								value: true,
								message: translate(
									'screens.login.validation.username',
								),
							},
						}}
						label={translate('screens.login.username')}
						error={errors?.username?.message}
						underline
						shouldAnimate
					/>
					<ControlledInput
						testID="login-password-input"
						style={styles.input}
						name="password"
						secureTextEntry
						control={control}
						rules={{
							required: {
								value: true,
								message: translate(
									'screens.login.validation.password',
								),
							},
						}}
						label={translate('screens.login.password')}
						error={errors?.password?.message}
						underline
						shouldAnimate
					/>
					<View style={styles.buttons}>
						<Button
							testID="login-submit-button"
							label={translate('screens.login.signin')}
							style={styles.button}
							isLoading={isLoggingIn}
							onClick={handleSubmit(onSubmit)}
						/>
						<Button
							isLink
							label={translate('screens.login.signup')}
							style={styles.button}
						/>
					</View>
				</View>
			</View>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 50,
		paddingHorizontal: 30,
		flex: 1,
	},
	logoContainer: {
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 3,
	},
	logo: {
		height: 100,
		width: 100,
		resizeMode: 'contain',
	},
	input: {
		marginTop: 12,
	},
	name: {
		fontSize: FontSize.XXL,
		marginTop: 12,
	},
	form: {
		flexDirection: 'column',
		flex: 7,
		paddingHorizontal: 24,
	},
	title: {
		fontSize: FontSize.XSL,
		fontWeight: 'bold',
		marginBottom: 24,
	},
	buttons: {
		marginTop: 32,
		alignSelf: 'center',
		width: '100%',
	},
	button: {
		marginBottom: 18,
	},
});

export default Login;
