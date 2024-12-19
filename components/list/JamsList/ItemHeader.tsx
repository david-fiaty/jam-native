import { StyleSheet, Text } from "react-native";
import { BaseProps } from "@/constants/Types";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";

const ItemHeader = ({ style, children }: BaseProps) => {
  return (
    <BoxView
      direction="row"
      align="center"
      justify="space-between"
      style={styles.listItemHeader}
    >
      <BoxView>
        <TouchableOpacity
          onPress={() =>
            isLoggedIn
              ? ScreenManager.toggleModal("HostsList", row?.item?.id)
              : router.push("/login")
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
              ? ScreenManager.toggleModal("MoreJamView", row?.item?.id)
              : router.push("/login")
          }
        />
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  content: {
    color: Colors.primary,
    fontSize: Layout.fontSize.base,
  },
});

export default ItemHeader;
