import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import ListView from "../view/ListView";
import i18n from "@/translation/i18n";
import JamListItem from "./list-item/JamListItem";
import TextView from "../view/TextView";
import SpinnerView from "../view/SpinnerView";
import SectionManager from "@/manager/SectionManager";
import BoxView from "../view/BoxView";
import ScreenManager from "@/manager/ScreenManager";
import MediaManager from "@/manager/MediaManager";

type Props = {
  data?: any;
  filter?: any;
};

const numColumns = 3;

const SearchJamsList = ({ data, filter }: Props) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<any[]>([]);
  const imageSize = MediaManager.getThumbnailSize();

  const onItemPress = (row: any) => {
    SectionManager.push(router, 'profile-jams', {
      jamId: JSON.stringify([row?.item?.id]),
      title: row?.item?.title,
      disableInfiniteScroll: true,
    });
  };

  const renderItem = (row: any) => {
    let output: any = null;
    let imageUrl: any = row?.item?.medias?.[0]?.url;

    if (imageUrl?.length > 0) {
      output = MediaManager.renderImage(imageUrl, {
        numColumns: numColumns,
        imageSize: imageSize,
      });
    }

    return (
      <TouchableOpacity onPress={() => onItemPress(row)}>
        {output}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (filter && filter != 'jam') setCurrentData(data.filter((o: any) => o.type == filter))
    else setCurrentData(data);

    if (!isLoaded) setIsLoaded(true);
  }, [isLoaded, data, filter]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      direction="column"
      align="flex-start"
      justify="flex-start"
      scroll={ScreenManager.isWeb() ? true : false}
      style={styles.container}
    >
      <ListView
        data={currentData}
        numColumns={numColumns}
        contentContainerStyle={{ gap: Layout.space.base }}
        columnWrapperStyle={{ gap: Layout.space.base }}
        renderItem={(row: any) => renderItem(row)}
      />
    </BoxView>
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
  item: {
    flexDirection: "column",
    gap: Layout.space.small,
  },
  image: {
    borderRadius: Layout.space.base,
  },
});

export default SearchJamsList;
