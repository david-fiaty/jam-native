import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { BaseProps } from "@/constants/Types";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import IconView from "@/components/view/IconView";
import TextView from "@/components/view/TextView";
import UserManager from "@/manager/UserManager";
import EntityManager from "@/manager/EntityManager";
import i18n from "@/translation/i18n";
import ModalButton from "@/components/button/ModalButton";
import ScreenManager from "@/manager/ScreenManager";

type Props = BaseProps & {
  row?: any,
};

const ListItemToolbar = ({ row }: Props) => {
  const router = useRouter();
  const isLoggedIn: boolean = UserManager.isLoggedIn();

  const saveJam = async () => {
    let result: any = await EntityManager.saveJam(row.item.id);
    
    let message: any = {
      title: i18n.t('Save Jam'),
      content: i18n.t('Jam successfully save.'),
    };

    if (result?.error) message.content = i18n.t(result.error)
    ScreenManager.showMessage(message);
  };

  const likeJam = async () => {
    let result: any = await EntityManager.likeJam(row.item.id);
    
    let message: any = {
      title: i18n.t('Like Jam'),
      content: i18n.t('Jam successfully liked.'),
    };

    if (result?.error) message.content = i18n.t(result.error)
    ScreenManager.showMessage(message);
  };

  const shareJam = async () => {
    isLoggedIn
    ? await EntityManager.shareJam(row?.item?.id)
    : router.push("/login");
  };

  const renderJammersButton = () => {
    return (
      <ModalButton 
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
      <BoxView
        direction="row"
        align="center"
      >
        <IconView 
          name="save"
          theme="tertiary"
          size={12}
          padding={6.5}
          onPress={saveJam}
        />
      </BoxView>
    );
  };

  const renderLikeButton = () => {
    return (
      <BoxView
        direction="row"
        align="center"
      >
        <IconView 
          name="like"
          theme="tertiary"
          size={12}
          padding={6.5}
          onPress={likeJam}
        />
      </BoxView>
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
          onPress={shareJam}
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
      <BoxView align="center">
        {renderJammersButton()}
      </BoxView>

      <BoxView direction="row" align="center">
        <BoxView align="center">
          {renderSaveButton()}
        </BoxView>

        <BoxView align="center">
          {renderLikeButton()}
        </BoxView>

        <BoxView align="center">
          {renderShareButton()}
        </BoxView>
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
