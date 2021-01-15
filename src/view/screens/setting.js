import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Layout from 'Components/layout';
import Header from 'Components/header';
import ListItem from 'Components/listItem';
import Icon from 'Components/icon';
import { useTranslation, useThemeColor } from 'Stores/ui';
import { UiContext } from 'Stores';
import { getData, storeData } from 'Utils/local-storage';
import { StyleSheet } from 'react-native';

const THEME = ['dark', 'light'];
const LANG = ['en-US', 'zh'];

const Setting = () => {
  const { canGoBack, goBack } = useNavigation();
  const { appTheme, colorize } = useThemeColor();
  const { translate, languageName } = useTranslation();
  const { updateTheme, updateLang, lang } = useContext(UiContext);

  const updateThemeFn = useCallback(() => {
    const theme = getData('@theme') ?? 'light';
    const newThemeIndex =
      THEME.indexOf(theme) === THEME.length - 1 ? 0 : THEME.indexOf(theme) + 1;

    updateTheme(THEME[newThemeIndex]);
  }, [updateTheme]);

  const updateLangFn = useCallback(() => {
    const language = getData('@lang') ?? 'en';
    const newLangIndex =
      LANG.indexOf(language) === LANG.length - 1
        ? 0
        : LANG.indexOf(language) + 1;

    console.log(newLangIndex);
    updateLang(LANG[newLangIndex]);
  }, [updateLang]);

  const navigateBack = useCallback(() => {
    if (canGoBack) {
      goBack();
    }
  }, [canGoBack, goBack]);

  const getIcon = useMemo(() => {
    switch (appTheme) {
      case 'system':
        return 'smartphone';
      case 'dark':
        return 'moon';
      case 'light':
        return 'sun';
      default:
        return 'system';
    }
  }, [appTheme]);

  useEffect(() => {
    storeData('@theme', appTheme);
  }, [appTheme]);

  useEffect(() => {
    storeData('@lang', lang);
  }, [lang]);

  return (
    <Layout>
      <Header
        label={translate('screens.setting.title')}
        navigate={navigateBack}
      />
      <ListItem
        style={[
          styles.item,
          {
            borderBottomColor: colorize('border'),
          },
        ]}
        icon={
          <Icon name={getIcon} color={colorize('text')} style={styles.icon} />
        }
        title={translate('screens.setting.dark')}
        description={appTheme}
        onClick={updateThemeFn}
      />
      <ListItem
        style={[
          styles.item,
          {
            borderBottomColor: colorize('border'),
          },
        ]}
        icon={
          <Icon name="earth" color={colorize('text')} style={styles.icon} />
        }
        title={translate('screens.setting.lang')}
        description={languageName}
        onClick={updateLangFn}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 40,
    width: 40,
  },
  item: {
    paddingHorizontal: 24,
    borderBottomWidth: 1,
  },
});

export default Setting;
