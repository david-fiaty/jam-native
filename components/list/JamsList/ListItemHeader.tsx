import { memo, useCallback } from "react";
import { StyleSheet } from "react-native";
import { BaseProps } from "@/constants/Types";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import TextView from "@/components/view/TextView";
import IconView from "@/components/view/IconView";
import i18n from "@/translation/i18n";
import JamStatusButton from "@/components/button/JamStatusButton";
import ModalButton from "@/components/button/ModalButton";

type Props = BaseProps & {
  row?: any;
};

const ListItemHeader = ({ row }: Props) => {

  const renderHosts = useCallback(() => {
    return (
      <ModalButton 
        login={true}
        name="HostsList"
        entityId={row.item.id}
        backTitle={i18n.t('Jam hosts')}
        trigger={
          <TextView>
            @{i18n.t("host")} +{parseInt(row?.item?.collaborators?.length)}
          </TextView>
        }
      />
    );
  }, [row]);

  const renderStatus = useCallback(() => {
    return <JamStatusButton active={row?.item?.is_active} />;
  }, [row]);

  const renderActions = useCallback(() => {
    return (
      <ModalButton 
        login={true}
        name="MoreJamActionsView"
        entityId={row.item.id}
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
  }, [row]);

  const renderComponent = useCallback(() => {
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
  }, []);

  return renderComponent();
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.space.base*1.2,
    paddingVertical: Layout.space.base,
    height: 39,
  },
});

export default memo(ListItemHeader);
