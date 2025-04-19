import BoxView from '@/components/view/BoxView';
import { StyleSheet, Text } from 'react-native';

const SectionFooter = () => {
  return (
    <BoxView direction="row" style={styles.container}>
      <Text>Section header</Text>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
  },
});

export default SectionFooter;
