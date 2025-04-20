import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import BoxView from '@/components/view/BoxView';
import LogoView from '@/components/view/LogoView';
import ScreenManager from '@/manager/ScreenManager';
import TextView from '@/components/view/TextView';

const SectionHeader = () => {
  const router = useRouter();

  return (
    <BoxView direction="row" style={styles.container}>
      <BoxView direction="row" align="center" justify="flex-start" style={styles.headerLeft}>
        <TouchableOpacity onPress={() => router.replace('/')}>
          <LogoView size={Layout.logo.size} />
        </TouchableOpacity>
      </BoxView>
  
      <BoxView direction="row" align="center" justify="flex-end" style={styles.headerRight}>
          <TextView>x</TextView>
          <TextView>x</TextView>
          <TextView>x</TextView>
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    //padding: Layout.space.base,
  },
  headerLeft: {
    backgroundColor: 'yellow',
    width: '50%',
  },
  headerRight: {
    backgroundColor: 'yellow',
    width: '50%'
  },
});

export default SectionHeader;
