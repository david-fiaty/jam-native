import React from "react";
import { View, FlatList, TouchableOpacity  } from "react-native";
import { Tab, TabView } from "@rneui/themed";
import { GlobalStyles} from "@/constants/GlobalStyles";
import { Colors } from "@/constants/Colors";
import ApiClient from '@/classes/ApiClient';
import ImageView from "./ImageView";
import { Layout } from "@/constants/Layout";
import BoxView from "./BoxView";
import TextView from "./TextView";

const SearchView = () => {
  const [index, setIndex] = React.useState(0);
  const jamsData = ApiClient.get('jams');
  const projectsData = ApiClient.get('projects');

  return (
    <BoxView direction="column" align="flex-start" justify="flex-start" scroll={true} style={[Layout.screenContent, styles.container]}>
      <TextView>SearchView screen</TextView>
    </BoxView>
  );
};

const styles = {
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'red',
  },
  tab: {
    width: '100%',
    height: '100%',
    padding: Layout.space.base,
  },
  button: {
    padding: 0,
    margin: 0,
    fontWeight: 'normal',
    fontSize: Layout.fontSize,
  },
  title: {
    ...GlobalStyles.text,
  },
  item: {
    backgroundColor: Colors.tertiary,
    borderRadius: Layout.radius.round,
    borderColor: Colors.tertiary,
  },
  image: {
    borderRadius: Layout.space.base,
    width: 96.7,
    height: 96.7,
  },
};

export default SearchView;