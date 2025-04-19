import BoxView from '@/components/view/BoxView';
import { Layout } from '@/constants/Layout';
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
    padding: Layout.space.base,
  },
});

export default SectionFooter;
