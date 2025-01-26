import { StyleSheet } from "react-native";
import { BaseProps } from "@/constants/Types";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import TextView from "@/components/view/TextView";
import IconView from "@/components/view/IconView";
import i18n from "@/translation/i18n";
import JamStatusButton from "@/components/button/JamStatusButton";
import ModalView from "@/components/view/ModalView";
import MoreJamActionsView from "@/components/view/MoreJamActionsView";
import HostsList from "../HostsList";

type Props = BaseProps & {
  row?: any,
};

const ListItemHeader = ({ row }: Props) => {
  const renderHosts = () => {
    return (
      <ModalView 
        login={true}
        content={<HostsList entityId={row.item.id} />}
        backTitle={i18n.t('Jam hosts')}
        trigger={
          <TextView>
            @{i18n.t("host")} +{parseInt(row?.item?.collaborators?.length)}
          </TextView>
        }
      />
    );
  };

  const renderStatus = () => {
    return <JamStatusButton active={row?.item?.is_active} />;
  };

  const renderActions = () => {
    return (
      <ModalView 
        login={true}
        content={<MoreJamActionsView entityId={row.item.id} />}
        backTitle={i18n.t('More actions')}
        trigger={
          <IconView
            name="actions"
            theme="clear"
            size={16}
            padding={0}
          />
        }
      />
    );
  };

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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.space.base*1.2,
    paddingVertical: Layout.space.base,
  },
});

export default ListItemHeader;
