import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import IconView from "@/components/view/IconView";
import TextView from "@/components/view/TextView";
import UserManager from "@/manager/UserManager";
import EntityManager from "@/manager/EntityManager";
import i18n from "@/translation/i18n";
import ScreenManager from "@/manager/ScreenManager";
import SpinnerView from "@/components/view/SpinnerView";
import ModalManager from "@/manager/ModalManager";
import SectionManager from "@/manager/SectionManager";

type Props = {
  row?: any;
  profileData?: any;
  onListItemAction?: () => void;
};

const JamViewToolbar = ({ row, profileData, onListItemAction }: Props) => {
  const router = useRouter();
  const [isLikeProcessing, setIsLikeProcessing] = useState<boolean>(false);
  const [isSaveProcessing, setIsSaveProcessing] = useState<boolean>(false);
  const [isShareProcessing, setIsShareProcessing] = useState<boolean>(false);
  const [isCommentProcessing, setIsCommentProcessing] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const isJamLiked = () => {
    return profileData?.liked_jams?.includes(row?.id);
  };

  const isJamSaved = () => {
    return profileData?.saved_jams?.includes(row?.id);
  };

  const getLikeIconTheme = () => {
    return isJamLiked() ? "primary" : "tertiary";
  };

  const getSaveIconTheme = () => {
    return isJamSaved() ? "primary" : "tertiary";
  };

  const toggleSaveButton = async () => {
    if (!isLoggedIn) {
      SectionManager.push(router, 'login');
    }
    else {
      setIsSaveProcessing(true);
      let result: any = {};

      if (isJamSaved()) result = await UserManager.unsaveJam(row?.id)
      else result = await UserManager.saveJam(row?.id);

      if (onListItemAction) onListItemAction();

      setIsSaveProcessing(false);
      ScreenManager.showMessage(result.message);
    }
  };

  const toggleLikeButton = async () => {
    if (!isLoggedIn) {
      SectionManager.push(router, 'login');
    }
    else {
      setIsLikeProcessing(true);
      let result: any = {};

      if (isJamLiked()) result = await UserManager.unlikeJam(row?.id)
      else result = await UserManager.likeJam(row?.id);

      if (onListItemAction) onListItemAction();
      setIsLikeProcessing(false);
      ScreenManager.showMessage(result.message);
    }
  };

  const shareJam = async () => {
    if (!isLoggedIn) {
      SectionManager.push(router, 'login');
    }
    else {
      setIsShareProcessing(true);
      await EntityManager.shareJam(row?.id);
      setIsShareProcessing(false);
    }
  };

  const renderLikeButton = () => {
    return (
      <BoxView
        direction="row"
        align="center"
      >
        {isLikeProcessing && (
          <View style={styles.spinnerContainer}>
            <SpinnerView size="small" />
          </View>
        )}

        {!isLikeProcessing && (
          <IconView 
            name="like"
            theme={getLikeIconTheme()}
            size={12}
            padding={6}
            onPress={toggleLikeButton}
          />
        )}
      </BoxView>
    );
  };

  const renderJammersButton = () => {
    let jammersIds: any [] = [...row?.jammers || []];

    if (isJamLiked()) jammersIds = [...new Set([...jammersIds, profileData.id])];
    else jammersIds = jammersIds.filter((v: any) => v != profileData.id); 

    return jammersIds?.length > 0 && (
      <TouchableOpacity onPress={() => ModalManager.toggleModal('JammersList', { jamId: row?.id, jammersIds: jammersIds })}>
        <TextView>
          {jammersIds?.length} {jammersIds?.length == 1 ? i18n.t("jammer") : i18n.t("jammers")}
        </TextView>
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
          theme={getSaveIconTheme()}
          size={12}
          padding={6}
          onPress={toggleSaveButton}
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
        {isShareProcessing && (
          <View style={styles.spinnerContainer}>
            <SpinnerView size="small" />
          </View>
        )}

        {!isShareProcessing && (
          <IconView
            name="share"
            theme="tertiary"
            size={12}
            padding={6}
            onPress={shareJam}
          />
        )}
      </BoxView>
    );
  };

  const renderCommentsButton = () => {
    if (isCommentProcessing) return <SpinnerView size="small" />;
    let commentsCount: number = row?.comments?.length || 0; // Todo - Show comments count

    return (
      <BoxView
        direction="row"
        align="center"
      >
        <IconView 
          name="chat"
          theme="tertiary"
          size={12}
          padding={6}
          onPress={() => ModalManager.toggleModal('JamCommentsList', { 
            entityId: row?.id, 
            entityType: 'jam' 
          })}
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
        <BoxView direction="row" align="center" justify="flex-start">
          {renderLikeButton()}
          {renderJammersButton()}
        </BoxView>
  
        <BoxView direction="row" align="center" justify="flex-end">
          <BoxView align="center">
            {renderCommentsButton()}
          </BoxView>

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

  useEffect(() => {
    setIsLoggedIn(UserManager.isLoggedIn());
  });

  return renderComponent();
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Layout.space.base/2,
    padding: Layout.space.base*1.2,
  },
  spinnerContainer: {
    marginLeft: 5,
  },
});

export default JamViewToolbar;
