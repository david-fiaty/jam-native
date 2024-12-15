import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import ImageView from "../view/ImageView";
import ScreenManager from "@/manager/ScreenManager";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import SpinnerView from "../view/SpinnerView";
import NoImageView from "../view/NoImageView";
import MediaManager from "@/manager/MediaManager";

type Props = {
  title?: any,
  idArray?: any,
};

const SearchProjectsList = ({ title, idArray }: Props) => {
  const numColumns = 3;
  const router = useRouter();
  const [projectsData, setProjectsData] = useState<any>([]);
  const [projectImages, addProjectImage] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const renderItem = (row: any) => {
    let imageSize: any = MediaManager.getThumbnailSize();
    let output: any = null;
    let uri: string = projectImages?.[row?.item?.id];

    if (!uri) {
      output = <NoImageView 
        width={imageSize.width} 
        height={imageSize.height} 
        rounded={true}
      />;
    }
    else {
      output = <View style={styles.item}>
        <ImageView
          uri={uri}
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
            pathname: "/project",
            params: { idArray: [row.item.id], title: title },
          })
        }
      >
        {output}
      </TouchableOpacity>
    }

    return output;
  }

  if (!projectsData?.length) {
    EntityManager.getProjects({ items_ids: idArray }).then((data: any) => {
      setProjectsData(data);
      setIsLoaded(true);
    });
  }

  if (projectsData?.length > 0 ) {
    projectsData.map((item: any) => {
      EntityManager.getProjectImageUrl(item).then((value: any) => {
        if (value && !projectImages?.[item?.id]) addProjectImage({ ...projectImages, ...{[item?.id]: value} });
      });
    });  
  }

  if (!isLoaded) return <SpinnerView />;

  return (
    <View style={styles.container}>
      {projectsData?.length > 0 && (
        <ListView
          data={projectsData}
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
  item: {
    flexDirection: "column",
    gap: Layout.space.small,
  },
  image: {
    borderRadius: Layout.space.base,
  },
});

export default SearchProjectsList;
