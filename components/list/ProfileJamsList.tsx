import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from 'expo-router';
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import ImageView from "../view/ImageView";
import ScreenManager from "@/manager/ScreenManager";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import SpinnerView from "../view/SpinnerView";
import AddItemButton from "../button/AddItemButton";
import NoImageView from "../view/NoImageView";

type Props = {
  idArray?: any,
};

const ProfileJamsList = ({ idArray }: Props) => {
  const numColumns = 3;
  const router = useRouter();
  const [profileJams, setProfileJams] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const renderItemImage = (url: any) => {
    if (!url) return <NoImageView imageSize={48} />;

    return (
      <ImageView
        uri={Config.imageUrl + url}
        width={96.7}
        height={96.7}
        resizeMode="cover"
        style={[styles.image, ScreenManager.getGridCellSize(numColumns)]}
      />
    );
  };

  const renderItem = (row: any) => {
    if (row?.item?.id == "addItem") {
      return (
        <AddItemButton
          onPress={() => ScreenManager.toggleModal("AddJamForm")}
        />
      );
    }

    return (
      <TouchableOpacity
        key={row.item.id}
        onPress={() =>
          router.push({
            pathname: "/jam",
            params: { entityId: row.item.id },
          })
        }
      >
        <View style={styles.item}>
          {renderItemImage(row?.item?.medias?.[0]?.url)}
        </View>
      </TouchableOpacity>
    );
  };

  if (!profileJams?.length && idArray?.length) {
    EntityManager.getJams({ items_ids: idArray }).then((data: any) => {
      data.push({ id: "addItem" });
      setProfileJams(data);
      setIsLoaded(true);
    });
  }

  if (!isLoaded) return <SpinnerView />;

  return (
    <View style={styles.container}>
      <TextView style={styles.title}>{i18n.t("Saved Jams")}</TextView>

      {profileJams?.length > 0 && (
        <ListView
          data={profileJams}
          numColumns={numColumns}
          contentContainerStyle={{ gap: Layout.space.base }}
          columnWrapperStyle={{ gap: Layout.space.base }}
          scrollEnabled={false}
          renderItem={(row: any) => renderItem(row)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    marginBottom: Layout.space.base,
  },
  item: {
    flexDirection: "column",
    gap: Layout.space.small,
  },
  image: {
    borderRadius: Layout.space.base,
    width: 96.7,
    height: 96.7,
  },
});

export default ProfileJamsList;
