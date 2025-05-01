import { StyleSheet, TouchableOpacity } from "react-native";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import TextView from "@/components/view/TextView";
import IconView from "@/components/view/IconView";
import i18n from "@/translation/i18n";
import JamStatusButton from "@/components/button/JamStatusButton";
import ModalManager from '@/manager/ModalManager';

type Props = {
  row?: any;
};

const ListItemHeader = ({ row }: Props) => {
  const collaboratorsCount = parseInt(row?.item?.collaborators?.length);

  const renderHosts = () => {
    // Todo - Get profile user name
    if (collaboratorsCount > 0) {
      return (
        <TouchableOpacity onPress={() => ModalManager.toggleModal('HostsList', { jamId: row?.item?.id })}>
          <TextView>
            @{i18n.t("host")} +{collaboratorsCount}
          </TextView>
        </TouchableOpacity>
      );
    }

    return (
      <TextView>@{i18n.t("host")}</TextView>
    );
  };

  const renderStatus = () => {
    return <JamStatusButton active={row?.item?.is_active} />;
  };

  const renderActions = () => {
    return (
      <IconView
        name="actions"
        theme="clear"
        size={16}
        padding={0}
        onPress={() => ModalManager.toggleModal('MoreJamActionsView', { jamId: row?.item?.id })}
      />
    );
  };

  const renderComponent = () => {
    return (
      <BoxView
        direction="row"
        align="center"
        justify="space-between"
        style={styles.container}
      >
        <BoxView align="center">
          {renderHosts()}
        </BoxView>
        <BoxView align="center">
          {renderStatus()}
        </BoxView>
        <BoxView align="center">
          {renderActions()}
        </BoxView>
      </BoxView>
    );
  };

  return renderComponent();
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.space.base * 1.2,
    paddingVertical: Layout.space.base,
    height: 39,
  },
});

export default ListItemHeader;
