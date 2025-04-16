import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BaseProps } from '@/constants/Types';
import BoxView from '@/components/view/BoxView';

const SectionView = ({style, children}: BaseProps) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <BoxView direction="column" align="center" justify="center" style={styles.container}>
        {children}
      </BoxView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
});

export default SectionView;