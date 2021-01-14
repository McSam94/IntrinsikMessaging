import React, { useCallback, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { useThemeColor, useTranslation } from 'Stores/ui';
import { AuthContext } from 'Stores';
import { Colors } from 'Styles/colors';
import { FontSize } from 'Styles/typography';
import Icon from 'Components/icon';
import { ControlledInput } from 'Components/input';
import StatusBar from 'Components/statusBar';
import Button from 'Components/button';
import { name } from '../../../package.json';

const Login = () => {
  const { colorize } = useThemeColor();
  const { translate } = useTranslation();
  const { login } = useContext(AuthContext);
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
    <>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Icon name="chat" color={Colors.washout} style={styles.logo} />
          <Text
            style={[
              styles.name,
              {
                color: colorize('text'),
              },
            ]}>
            {name}
          </Text>
        </View>
        <View style={styles.form}>
          <Text
            style={[
              styles.title,
              {
                color: colorize('text'),
              },
            ]}>
            {translate('screens.login.signin')}
          </Text>
          <ControlledInput
            name="username"
            control={control}
            rules={{
              required: {
                value: true,
                message: translate('screens.login.validation.username'),
              },
            }}
            label={translate('screens.login.username')}
            error={errors?.username?.message}
          />
          <ControlledInput
            name="password"
            secureTextEntry
            control={control}
            rules={{
              required: {
                value: true,
                message: translate('screens.login.validation.password'),
              },
            }}
            label={translate('screens.login.password')}
            error={errors?.password?.message}
          />
          <View style={styles.buttons}>
            <Button
              label={translate('screens.login.signin')}
              style={styles.button}
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
    </>
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
  name: {
    fontSize: FontSize.XL,
    marginTop: 12,
  },
  form: {
    flexDirection: 'column',
    flex: 7,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: FontSize.XXL,
    fontWeight: 'bold',
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
