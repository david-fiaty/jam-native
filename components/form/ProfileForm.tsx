import { StyleSheet, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import ListView from '../view/ListView';
import ApiClient from '@/classes/ApiClient';

const ProfileForm = ({style, children}: BaseProps) => {
  const data = ApiClient.get('jammers');

  return (
    <View style={styles.container}>
      <ListView data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default ProfileForm;