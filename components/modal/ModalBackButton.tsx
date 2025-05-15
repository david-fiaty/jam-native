import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import BoxView from '@/components/view/BoxView';
import IconView from '@/components/view/IconView';
import TextView from '@/components/view/TextView';
import ModalManager from '@/manager/ModalManager';

type Props = {
  currentModal: any;
  visible?: boolean;
};

const ModalBackButton = ({ currentModal, visible }: Props) => {
  if (!visible === true) {
    return <></>;
  }

  return (
    <BoxView
      direction="row"
      align="center"
      justify="flex-start"
      style={styles.container}
      onPress={() => ModalManager.toggleModal(currentModal?.id)}
    >
      <IconView
        name="previous"
        theme="clear"
        padding={0}
      />

      <TextView style={styles.title}>
        {currentModal?.title}
      </TextView>

    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Layout.colors.white,
    width: '100%',
    padding: Layout.space.base,
    paddingLeft: 0,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default ModalBackButton;
