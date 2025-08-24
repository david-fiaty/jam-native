import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";
import SpinnerView from "../view/SpinnerView";
import ListView from "../view/ListView";
import JamView from "../view/JamView";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";

type Props = {
  idArray?: any;
  disableInfiniteScroll?: boolean;
};

const JamsList = ({ idArray, disableInfiniteScroll }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [listData, setListData] = useState<any[]>([]);
  const searchState: any = useSelector((state: any) => state.search);

  const renderItem = (row: any) => {
    return (
      <JamView
        jamId={row?.item?.id}
        isPublic={false}
      />
    );
  };

  const getListData = () => {
    let data: any[] = JSON.parse(searchState.currentResults)?.jam || [];

    if (idArray?.length > 0) {
      data = data.filter((o: any) => idArray.includes(o.id));
    }

    return data;
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setListData(getListData());
        setIsLoaded(true);
      }
    })();
  }, [isLoaded]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      direction="column"
      style={styles.container}
    >
      {isLoaded && !!listData?.length && (
        <ListView
          data={getListData()}
          contentContainerStyle={Layout.listContainer}
          renderItem={renderItem}
          keyExtractor={(row: any, index?: number) => `${row.id}-${index}`}
          onEndReachedThreshold={0.5}
          //onEndReached={onEndReached}
        />
      )}

      {isLoaded && !listData?.length && (
        <TextView>{i18n.t('No results available')}</TextView>
      )}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default JamsList;
