import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

export default function HomeScreen() {

  const { user } = useContext(AuthenticatedUserContext);

  return (
    <View style={styles.container}>
      <Text>{user.uid}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaf6',
  },
});