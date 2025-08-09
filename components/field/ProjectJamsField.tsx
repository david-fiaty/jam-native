import { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { Layout } from '@/constants/Layout';
import ProjectJamsList from '../list/ProjectJamsList';
import ModalManager from '@/manager/ModalManager';
import UserManager from '@/manager/UserManager';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import SectionManager from '@/manager/SectionManager';
import MediaManager from '@/manager/MediaManager';
import AddItemButton from '../button/AddItemButton';
import i18n from '@/translation/i18n';

const numColumns = 3;

type Props = {
  resource: string;
  field: string;
  value?: any;
  placeholder?: any;
  emptyMessage?: any;
  onPress?: () => void;
};

const ProjectJamsField = ({ resource, field, value, placeholder, emptyMessage, onPress }: Props) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<any>([]);
  const formData: any = useSelector((state: any) => state.form[resource]);
  const imageSize = MediaManager.getThumbnailSize();

  const onItemPress = (row: any) => {
    SectionManager.push(router, 'profile-jams', {
      jamId: JSON.stringify([row?.item?.id]),
      title: row?.item?.title,
      disableInfiniteScroll: true,
    });
  };

  const renderAddButton = () => {
    return (
      <AddItemButton
        label={i18n.t('Add')}
        width={imageSize.width}
        height={imageSize.height}
        onPress={() => SectionManager.push(router, 'add-jam')}
      />
    );
  };

  const renderItem = (row: any) => {
    let output: any = null;
    let imageUrl: any = row?.item?.medias?.[0]?.url;

    if (row?.item?.id == "addItem") {
      output = renderAddButton();
    }
    else {
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

  const getCurrentValue = () => {
    return formData?.[field] || [];
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setIsLoaded(true);
      }

      setCurrentValue(getCurrentValue());        
    })();    
  }, [isLoaded, formData, field]);

  return (
    <View style={styles.container}>
      {currentValue?.length > 0 && (
        <ListView
          data={currentValue}
          numColumns={numColumns}
          contentContainerStyle={{ gap: Layout.space.base }}
          columnWrapperStyle={{ gap: Layout.space.base }}
          scrollEnabled={false}
          emptyMessage={<TextView>{emptyMessage}</TextView>}
          renderItem={(row: any) => renderItem(row)}
        />
      )}

      {!currentValue?.length && (renderAddButton())}
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
});

export default ProjectJamsField;
