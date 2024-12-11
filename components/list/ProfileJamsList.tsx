import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
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
import BoxView from "../view/BoxView";
import { Colors } from "@/constants/Colors";
import DeviceManager from "@/manager/DeviceManager";

type Props = {
  title?: any,
  idArray?: any;
  addButton?: boolean,
};

const ProfileJamsList = ({ title, idArray, addButton }: Props) => {
  const numColumns = 3;
  const router = useRouter();
  const [profileJams, setProfileJams] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const getImageSize = () => {
    let windowWidth: any = DeviceManager.window.width;
    let imageDim: number = (windowWidth/3) - Layout.space.base*1.7;

    return {
      width: imageDim,
      height: imageDim,
    };
  };

  const renderItemImage = (url: any) => {
    if (!url) return <NoImageView imageSize={48} />;
    let imageSize = getImageSize();
    
    return (
      <ImageView
        uri={Config.imageUrl + url}
        width={imageSize.width}
        height={imageSize.height}
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
            params: { idArray: [row.item.id] },
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
      if (addButton) data.push({ id: "addItem" });
      setProfileJams(data);
      setIsLoaded(true);
    });
  }

  if (!isLoaded) return <SpinnerView />;

  return (
    <View style={styles.container}>
      <BoxView direction="row" align="center" justify="space-between">
        <TextView style={styles.title}>{title}</TextView>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/jam",
              params: { idArray: idArray },
            })
          }
        >
          <TextView style={styles.link}>{i18n.t("View all")}</TextView>
        </TouchableOpacity>
      </BoxView>

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
    flex: 1,
  },
  link: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
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
