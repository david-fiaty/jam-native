import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import BoxView from '@/components/view/BoxView';
import TextView from '@/components/view/TextView';

type Props = {
  name?: any;
};

export default ({ name }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <BoxView direction="column" align="center" justify="center" style={styles.container}>
        {name} 
        <TextView>dynamic section</TextView>
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
