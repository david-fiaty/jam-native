import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { BaseProps } from "@/constants/Types";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import IconView from "@/components/view/IconView";
import TextView from "@/components/view/TextView";
import ScreenManager from "@/manager/ScreenManager";
import UserManager from "@/manager/UserManager";
import EntityManager from "@/manager/EntityManager";
import i18n from "@/translation/i18n";
import ModalView from "@/components/view/ModalView";

type Props = BaseProps & {
  row?: any,
};

const ListItemToolbar = ({ row }: Props) => {
  const router = useRouter();
  const isLoggedIn = UserManager.isLoggedIn();

  const renderJammersButton = () => {
    return (
      <ModalView 
        login={true}
        name="JammersList"
        entityId={row.item.id}
        backTitle={i18n.t('Jammers')}
        trigger={
          <BoxView
            direction="row"
            align="center"
          >
            <IconView 
              name="users" 
              theme="tertiary" 
              size={12}
              padding={6.5}
            />
            <TextView>
              {parseInt(row?.item?.jammers?.length)} {i18n.t("jammers")}
            </TextView>
          </BoxView>
        }
      />
    );
  };

  const renderSaveButton = () => {
    return (
      <ModalView 
        login={true}
        name="SavedJamAction"
        entityId={row.item.id}
        backTitle={i18n.t('Save Jam')}
        trigger={
          <BoxView
            direction="row"
            align="center"
          >
            <IconView 
              name="save"
              theme="tertiary"
              size={12}
              padding={6.5}
            />
          </BoxView>
        }
      />
    );
  };

  const renderShareButton = () => {
    return (
      <BoxView
        direction="row"
        align="center"
      >
        <IconView
          name="share"
          theme="tertiary"
          size={12}
          padding={6.5}
          onPress={() =>
            isLoggedIn
              ? EntityManager.shareJam(row?.item?.id)
              : router.push("/login")
          }
        />
      </BoxView>
    );
  };

  return (
    <BoxView
      direction="row"
      align="center"
      justify="space-between"
      style={styles.container}
    >
      {renderJammersButton()}

      <BoxView direction="row" align="center">
        {renderSaveButton()}
        {renderShareButton()}
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Layout.space.base*1.2,
  },
});

export default ListItemToolbar;
