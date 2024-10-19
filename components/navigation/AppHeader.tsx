import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Colors } from '@/constants/Colors';
import { GlobalStyles } from '@/constants/GlobalStyles';
import TextBlock from '@/components/base/TextBlock';
import { StaticImage } from '@/components/base/StaticImage';

const source = require('@/assets/images/logo-48.png'); 

export default () => {
  return (
    <View style={styles.container}>

      <View style={styles.left}>
        <TouchableOpacity onPress={() => {}}>
          <StaticImage source={source} width={48} height={48} />   
        </TouchableOpacity>
      </View>
      
      <View style={styles.right}>
        <TextBlock>X</TextBlock>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: GlobalStyles.space.container,
  },
  left: {
    gap: GlobalStyles.space.base,
  },
  right: {
    flexDirection: 'row',
    gap: GlobalStyles.space.base,
  },
  icon: {
    ...GlobalStyles.icon,
    ...{
      backgroundColor: Colors.tertiary,
      padding: 8,
      borderRadius: 40,
    },
  },
});
