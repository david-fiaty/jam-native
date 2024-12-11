import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
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
import MediaManager from "@/manager/MediaManager";

type Props = {
  title?: any;
  idArray?: any;
  addButton?: boolean;
};

const ProfileProjectsList = ({ title, idArray, addButton }: Props) => {
  const numColumns = 3;
  const router = useRouter();
  const [profileProjects, setProfileProjects] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const renderItem = (row: any) => {
    let imageSize = MediaManager.getThumbnailSize();
    let output = <></>;


    if (row?.item?.id == "addItem") {
      output = <AddItemButton
        width={imageSize.width}
        height={imageSize.height}
        onPress={() => ScreenManager.toggleModal("AddJamForm")}
      />;
    }
    else if (!row?.item?.medias?.[0]?.url) {
      output = <NoImageView 
        width={imageSize.width} 
        height={imageSize.height} 
        rounded={true}
      />;
    }
    else {
      output = <View style={styles.item}>
        <ImageView
          uri={MediaManager.getImageUrl(row.item.medias[0].url)}
          width={imageSize.width}
          height={imageSize.height}
          resizeMode="cover"
          style={[styles.image, ScreenManager.getGridCellSize(numColumns)]}
        />
      </View>
    }

    if (parseInt(row?.item?.id) > 0) {
      output = <TouchableOpacity
        key={row.item.id}
        onPress={() =>
          router.push({
            pathname: "/jam",
            params: { idArray: [row.item.id] },
          })
        }
      >
        {output}
      </TouchableOpacity>
    }

    return output;
  }

  if (!profileProjects?.length && idArray?.length) {
    EntityManager.getProjects({ items_ids: idArray }).then((data: any) => {
      console.log(data);
      //if (addButton === true) data.push({ id: "addItem" });
      setProfileProjects(data);
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

      {profileProjects?.length > 0 && (
        <ListView
          data={profileProjects}
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
  },
});

export default ProfileProjectsList;
