import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { BaseProps } from "@/constants/Types";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import TextView from "@/components/view/TextView";
import IconView from "@/components/view/IconView";
import ScreenManager from "@/manager/ScreenManager";
import UserManager from "@/manager/UserManager";
import i18n from "@/translation/i18n";
import JamStatusButton from "@/components/button/JamStatusButton";
import ModalManager from "@/manager/ModalManager";

type Props = BaseProps & {
  row?: any;
};

const ListItemHeader = ({ row }: Props) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoggedIn(await UserManager.isLoggedIn());
    })();
  });

  return (
    <BoxView
      direction="row"
      align="center"
      justify="space-between"
      style={styles.container}
    >
      <BoxView>
        <TouchableOpacity
          onPress={() =>
            isLoggedIn
              ? ModalManager.toggleModal("HostsList", { jamId: row?.item?.id })
              : ScreenManager.pushScreen(router, '/login')
          }
        >
          <TextView>
            @{i18n.t("host")} +{parseInt(row?.item?.collaborators?.length)}
          </TextView>
        </TouchableOpacity>
      </BoxView>
      <BoxView>
        <JamStatusButton active={row?.item?.is_active} />
      </BoxView>
      <BoxView>
        <IconView
          name="actions"
          theme="clear"
          onPress={() =>
            isLoggedIn
              ? ModalManager.toggleModal("MoreJamActionsView", { entityId: row?.item?.id })
              : ScreenManager.pushScreen(router, '/login')
          }
        />
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.space.base,
    paddingVertical: Layout.space.base/2,
  },
});

export default ListItemHeader;
