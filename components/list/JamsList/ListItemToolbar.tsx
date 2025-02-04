import { useState } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BaseProps } from "@/constants/Types";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import IconView from "@/components/view/IconView";
import TextView from "@/components/view/TextView";
import UserManager from "@/manager/UserManager";
import EntityManager from "@/manager/EntityManager";
import i18n from "@/translation/i18n";
import ScreenManager from "@/manager/ScreenManager";
import SpinnerView from "@/components/view/SpinnerView";

type Props = BaseProps & {
  row?: any;
};

const ListItemToolbar = ({ row }: Props) => {
  const router = useRouter();
  const [isLikeProcessing, setIsLikeProcessing] = useState<boolean>(false);
  const [isSaveProcessing, setIsSaveProcessing] = useState<boolean>(false);
  const [isShareProcessing, setIsShareProcessing] = useState<boolean>(false);
  const isLoggedIn: boolean = UserManager.isLoggedIn();

  const saveJam = async () => {
    setIsSaveProcessing(true);
    let result: any = await EntityManager.saveJam(row.item.id);
    
    let message: any = {
      title: i18n.t('Save Jam'),
      content: i18n.t('Jam successfully save.'),
    };

    if (result?.error) message.content = i18n.t(result.error)
    ScreenManager.showMessage(message);
    setIsSaveProcessing(false);
  };

  const likeJam = async () => {
    setIsLikeProcessing(true);
    let result: any = await EntityManager.likeJam(row.item.id);
    
    let message: any = {
      title: i18n.t('Like Jam'),
      content: i18n.t('Jam successfully liked.'),
    };

    if (result?.error) message.content = i18n.t(result.error)
    setIsLikeProcessing(false);
    ScreenManager.toggleModal('JammersList', { title: i18n.t('Jammers') });
    ScreenManager.showMessage(message);
  };

  const shareJam = async () => {
    setIsShareProcessing(true);
    isLoggedIn ? await EntityManager.shareJam(row?.item?.id) : ScreenManager.pushScreen(router, '/login');
    setIsShareProcessing(false);
  };

  const renderJammersButton = () => {
    return (
      <TouchableOpacity onPress={likeJam}>
        <BoxView
          direction="row"
          align="center"
        >
          {isLikeProcessing && (
            <View style={styles.likeSpinner}>
              <SpinnerView size="small" />
            </View>
          )}
  
          {!isLikeProcessing && (
            <IconView 
              name="users" 
              theme="tertiary" 
              size={12}
              padding={6.5}
            />
          )}

          <TextView>
            {parseInt(row?.item?.jammers?.length)} {i18n.t("jammers")}
          </TextView>
        </BoxView>
      </TouchableOpacity>
    );
  };

  const renderSaveButton = () => {
    if (isSaveProcessing) return <SpinnerView size="small" />;

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

  const renderShareButton = () => {
    if (isShareProcessing) return <SpinnerView size="small" />;
    
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

  const renderComponent = () => {
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
  
        <BoxView direction="row" align="center" justify="flex-end">
          <BoxView align="center">
            {renderSaveButton()}
          </BoxView>
  
          <BoxView align="center">
            {renderShareButton()}
          </BoxView>
        </BoxView>
      </BoxView>
    );  
  };

  return renderComponent();
};

const styles = StyleSheet.create({
  container: {
    padding: Layout.space.base*1.2,
  },
  likeSpinner: {
    marginLeft: 5,
  },
});

export default ListItemToolbar;
