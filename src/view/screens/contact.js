import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ContactContext } from 'Stores';
import { useTranslation, useThemeColor } from 'Stores/ui';
import { transformContact } from 'Stores/contact';
import Header from 'Components/header';
import Layout from 'Components/layout';
import Icon from 'Components/icon';
import List from 'Components/list';
import ListItem from 'Components/listItem';
import { Colors } from 'Styles/colors';
import { FontSize } from 'Styles/typography';

const Contact = () => {
  const { translate } = useTranslation();
  const { colorize } = useThemeColor();
  const {
    contactList,
    isGettingList,
    getContactList,
    contactErrorMsg,
  } = useContext(ContactContext);
  const renderListItem = ({ item }) => (
    <View style={styles.catList}>
      <Text style={styles.category}>{item}</Text>
      <View style={styles.contactListItem}>
        {transformContact(contactList)?.[item]?.map((contact) => (
          <ListItem
            key={contact?.id}
            style={styles.listItem}
            avatar={contact?.avatar}
            title={contact?.name}
            description={contact?.mobile}
            titleStyle={[
              styles.name,
              {
                color: colorize('text'),
              },
            ]}
            descriptionStyle={styles.mobile}
          />
        ))}
      </View>
    </View>
  );

  useEffect(() => {
    if (!contactList.length) {
      getContactList();
    }
  }, [contactList, getContactList]);

  return (
    <Layout>
      <Header label={translate('screens.contact.title')} canBack>
        <Icon
          name="send"
          style={styles.icon}
          color={Colors.black}
          onClick={() => console.log('test')}
        />
      </Header>
      <List
        style={styles.contactList}
        data={Object.keys(transformContact(contactList))}
        isLoading={isGettingList}
        renderItem={renderListItem}
        error={contactErrorMsg}
        emptyMsg={translate('screens.contact.empty')}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30,
  },
  list: {},
  name: {
    fontSize: FontSize.XL,
  },
  mobile: {
    fontSize: FontSize.L,
  },
  catList: {
    flexDirection: 'row',
  },
  category: {
    paddingTop: 25,
    textAlign: 'center',
    fontSize: FontSize.XXL,
    color: Colors.secondary,
    fontWeight: 'bold',
    flex: 1,
  },
  contactListItem: {
    flex: 9,
  },
});

export default Contact;
