import { Layout } from '@/constants/Layout';
import { StyleSheet, Text } from 'react-native';
import IconView from '@/components/view/IconView';
import BoxView from '@/components/view/BoxView';
import ModalManager from '@/manager/ModalManager';

const SectionFooter = () => {
  return (
    <BoxView direction="row" align="center" justify="space-around" style={styles.container}>
      <IconView
        name="location"
        radius="round"
        size={16}
        padding={4}
        theme="secondary"
      />

      <IconView
        name="plus"
        radius="round"
        size={16}
        padding={4}
        theme="secondary"
        onPress={() => ModalManager.toggleModal('JamForm')}
      />

      <IconView
        name="search"
        radius="round"
        size={16}
        padding={4}
        theme="secondary"
      />

      <IconView
        name="user"
        radius="round"
        size={16}
        padding={4}
        theme="secondary"
        onPress={() => ModalManager.toggleModal('TestView')}
      />
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
