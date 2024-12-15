import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import ListView from "../view/ListView";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";

type Props = {
  data?: any,
};

const SearchProfilesList = ({ data }: Props) => {
  const router = useRouter();

  const renderItem = (row: any) => (
    <TouchableOpacity onPress={() => console.log("clicked")}>
      <BoxView
        direction="row"
        align="center"
        justify="flex-start"
        style={Layout.listItem}
      >
        <IconView name="user" theme="tertiary" />
        <TextView>{row.item.profile_name}</TextView>
      </BoxView>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {data?.length > 0 && (
        <ListView
          data={data}
          renderItem={(row: any) => renderItem(row)}
          scrollEnabled={false}
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

export default SearchProfilesList;
