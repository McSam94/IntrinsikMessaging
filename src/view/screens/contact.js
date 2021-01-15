import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ContactContext } from 'Stores';
import { useTranslation, useThemeColor } from 'Stores/ui';
import { transformContact } from 'Stores/contact';
import Header from 'Components/header';
import Layout from 'Components/layout';
import Icon from 'Components/icon';
import List from 'Components/list';
import ListItem from 'Components/listItem';
import Avatar from 'Components/avatar';
import { getGroupName } from 'Utils/common';
import { Colors } from 'Styles/colors';
import { FontSize } from 'Styles/typography';

const Contact = () => {
  const { navigate, goBack, canGoBack } = useNavigation();
  const { translate } = useTranslation();
  const { colorize } = useThemeColor();
  const {
    contactList,
    isGettingList,
    getContactList,
    contactErrorMsg,
  } = useContext(ContactContext);

  const [selectedContacts, selectContacts] = useState([]);

  const selectContact = useCallback((contact, isSelected) => {
    if (!Object.keys(contact).length) {
      return;
    }

    if (isSelected) {
      selectContacts((prevState) => {
        return [
          ...prevState.filter(
            (prevStateItem) => prevStateItem.id !== contact.id,
          ),
        ];
      });
    } else {
      selectContacts((prevState) => {
        return [...prevState, contact];
      });
    }
  }, []);

  const navigateBack = useCallback(() => {
    if (canGoBack) {
      goBack();
    }
  }, [canGoBack, goBack]);

  const renderListItem = ({ item }) => (
    <View style={styles.catList}>
      <Text style={styles.category}>{item}</Text>
      <View style={styles.contactListItem}>
        {transformContact(contactList)?.[item]?.map((contact) => {
          const isSelected = selectedContacts?.some(
            (selectedContact) => selectedContact?.id === contact?.id,
          );
          return (
            <ListItem
              key={contact?.id}
              style={styles.listItem}
              icon={<Avatar uri={contact?.avatar} isSelected={isSelected} />}
              title={contact?.name}
              description={contact?.mobile}
              titleStyle={{
                ...styles.name,
                color: colorize('text'),
              }}
              descriptionStyle={styles.mobile}
              onClick={() => selectContact(contact, isSelected)}
            />
          );
        })}
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
      <Header
        label={translate('screens.contact.title')}
        navigate={navigateBack}>
        <Icon
          name="rightArrow"
          style={styles.icon}
          color={colorize('text')}
          onClick={() =>
            navigate('Conversation', {
              contactIds: selectedContacts.map((contact) => contact.id),
              name:
                selectedContacts.length > 1
                  ? getGroupName(selectedContacts)
                  : selectedContacts?.[0]?.name,
              avatar:
                selectedContacts.length > 1
                  ? null
                  : selectedContacts?.[0]?.avatar,
            })
          }
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
