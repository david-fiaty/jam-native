import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import i18n from '@/translation/i18n';
import { Layout } from '@/constants/Layout';


const JamStatusButton = () => {

  return (       
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.dot}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dot: {
    backgroundColor: Colors.primary,
    width: Layout.space.base*0.75,
    height: Layout.space.base*0.75,
    borderRadius: Layout.radius.round,
  },
  active: {
    backgroundColor: Colors.primary,
  },
  inactive: {
    backgroundColor: Colors.tertiary,
  },
});

export default JamStatusButton;