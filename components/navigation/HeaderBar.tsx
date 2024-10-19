import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import JamLogo from '@/components/image/AppLogo';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import TextBlock from '@/components/base/TextBlock';

export default () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => router.replace('/main')}>
          <JamLogo width={46} height={46} /> 
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

