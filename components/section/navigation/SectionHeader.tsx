import BoxView from '@/components/view/BoxView';
import LogoView from '@/components/view/LogoView';
import { Layout } from '@/constants/Layout';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import ScreenManager from '@/manager/ScreenManager';

const SectionHeader = () => {
  return (
    <BoxView direction="row" style={styles.container}>
      <BoxView direction="row" style={styles.headerLeft}>
        <TouchableOpacity onPress={() => ScreenManager.toggleModal(null)}>
          <LogoView size={Layout.logo.size} />
        </TouchableOpacity>
      </BoxView>
  
      <BoxView direction="row" style={styles.headerRight}>
        
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: Layout.space.base,
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
