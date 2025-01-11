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

type Props = BaseProps & {
  row?: any,
};

const ListItemHeader = ({ row }: Props) => {
  const router = useRouter();
  const isLoggedIn = UserManager.isLoggedIn();

  const renderHosts = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          isLoggedIn
            ? ScreenManager.toggleScreen("HostsList", { entityId: row?.item?.id })
            : router.push("/login")
        }
      >
      <TextView>
        @{i18n.t("host")} +{parseInt(row?.item?.collaborators?.length)}
      </TextView>
      </TouchableOpacity>
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
        onPress={() =>
          isLoggedIn
            ? ScreenManager.toggleScreen("MoreJamActionsView", { entityId: row?.item?.id })
            : router.push("/login")
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
      <BoxView>
        {renderHosts()}
      </BoxView>
      <BoxView>
        {renderStatus()}
      </BoxView>
      <BoxView>
        {renderActions()}
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
