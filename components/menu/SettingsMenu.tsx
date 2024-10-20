import { StyleSheet, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import ListView from '../view/ListView';
import ApiClient from '@/classes/ApiClient';

const items = [
  {
    'label': 'Account information',
    'path': '/account',
  },
  {
    'label': 'Change password',
    'path': '/password',
  },
  {
    'label': 'Language',
    'path': '/language',
  },
];

export default ({style, children}: BaseProps) => {
  return (
    <View style={styles.container}>
      <ListView data={items} labelField="label" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});
