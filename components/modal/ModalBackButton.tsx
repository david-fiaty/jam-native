import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import BoxView from '@/components/view/BoxView';
import IconView from '@/components/view/IconView';
import TextView from '@/components/view/TextView';
import ModalManager from '@/manager/ModalManager';
import i18n from '@/translation/i18n';

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
        {i18n.t(currentModal?.title)}
      </TextView>

      {currentModal.toolbarButtons?.length > 0 && (
        <BoxView direction="row" align="center" justify="flex-end" style={styles.toolbar}>
          {currentModal.toolbarButtons.map((o: any, i: number) => {
            if (o.type == 'label') {
              return (
                <TouchableOpacity
                  key={`button-${i}`}
                  onPress={() => ModalManager.toggleModal(o.component)}
                >
                  <TextView underline={true}>{o.label}</TextView>
                </TouchableOpacity>
              )
            }
            else if (o.type == 'component') {
              {o.component}
            }
          })}
        </BoxView>
      )}

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
  toolbar: {
    flex: 1,
    paddingRight: Layout.space.base,
  },
});

export default ModalBackButton;
