import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { BaseProps } from "@/constants/Types";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import IconView from "@/components/view/IconView";
import TextView from "@/components/view/TextView";
import ScreenManager from "@/manager/ScreenManager";
import UserManager from "@/manager/UserManager";
import EntityManager from "@/manager/EntityManager";
import i18n from "@/translation/i18n";
import ModalManager from "@/manager/ModalManager";
import SectionManager from "@/manager/SectionManager";

type Props = BaseProps & {
  row?: any;
};

const ListItemToolbar = ({ row }: Props) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoggedIn(await UserManager.isLoggedIn());
    })();
  });

  console.log(row?.item?.id)

  return (
    <BoxView
      direction="row"
      align="center"
      justify="space-between"
      style={styles.container}
    >
      {/* Jammers button */}
      <BoxView
        direction="row"
        align="center"
        onPress={() =>
          isLoggedIn
            ? ModalManager.toggleModal("JammersList", { jamId: row?.item?.id })
            : SectionManager.push(router, 'login')
        }
      >
        <IconView name="users" theme="tertiary" />
        <TextView>
          {parseInt(row?.item?.jammers?.length)} {i18n.t("jammers")}
        </TextView>
      </BoxView>

      <BoxView direction="row" align="center">
        {/* Save button */}
        <IconView
          name="save"
          theme="tertiary"
          onPress={() =>
            isLoggedIn
              ? ModalManager.toggleModal("SavedJamAction", { jamId: row?.item?.id })
              : SectionManager.push(router, 'login')
          }
        />

        {/* Share button */}
        <IconView
          name="share"
          theme="tertiary"
          onPress={() =>
            isLoggedIn
              ? EntityManager.shareJam(row?.item?.id)
              : SectionManager.push(router, 'login')
          }
        />
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Layout.space.base,
  },
});

export default ListItemToolbar;
