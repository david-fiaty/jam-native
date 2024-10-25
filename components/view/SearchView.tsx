import React from "react";
import { View, FlatList, TouchableOpacity  } from "react-native";
import { Tab, TabView } from "@rneui/themed";
import { GlobalStyles} from "@/constants/GlobalStyles";
import { Colors } from "@/constants/Colors";
import ApiClient from '@/classes/ApiClient';
import ImageView from "./ImageView";
import { Layout } from "@/constants/Layout";

const SearchView = () => {
  const [index, setIndex] = React.useState(0);
  const jamsData = ApiClient.get('jams');
  const projectsData = ApiClient.get('projects');

  return (
    <View style={styles.container}>
      <Tab
        value={index}
        dense={true}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: Colors.primary,
          height: 1,
        }}
      >
        <Tab.Item
          title="All"
          titleStyle={styles.title}
          buttonStyle={styles.button}
        />
        <Tab.Item
          title="Calls"
          titleStyle={styles.title}
          buttonStyle={styles.button}
        />
        <Tab.Item
          title="Jams"
          titleStyle={styles.title}
          buttonStyle={styles.button}
        />
        <Tab.Item
          title="Projects"
          titleStyle={styles.title}
          buttonStyle={styles.button}
        />
      </Tab>

      <TabView 
        value={index} 
        onChange={setIndex} 
        animationType="timing" 
        disableTransition={true}
      >
        <TabView.Item style={styles.tab}>
          <FlatList 
            data={jamsData} 
            numColumns={3}
            contentContainerStyle={{gap: GlobalStyles.space.base}}
            columnWrapperStyle={{gap: GlobalStyles.space.base}}
            scrollEnabled={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity>
                  <View style={styles.item}>
                    <ImageView 
                      source={item.image} 
                      width="100%"
                      height="100%"
                      resizeMode="cover"
                      style={styles.image}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </TabView.Item>

        <TabView.Item style={styles.tab}>
          <FlatList 
            data={projectsData} 
            numColumns={3}
            contentContainerStyle={{gap: GlobalStyles.space.base}}
            columnWrapperStyle={{gap: GlobalStyles.space.base}}
            scrollEnabled={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity>
                  <View style={styles.item}>
                    <ImageView 
                      source={item.image} 
                      width="100%"
                      height="100%"
                      resizeMode="cover"
                      style={styles.image}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </TabView.Item>

        <TabView.Item style={styles.tab}>
          <FlatList 
            data={jamsData} 
            numColumns={3}
            contentContainerStyle={{gap: GlobalStyles.space.base}}
            columnWrapperStyle={{gap: GlobalStyles.space.base}}
            scrollEnabled={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity>
                  <View style={styles.item}>
                    <ImageView 
                      source={item.image} 
                      width="100%"
                      height="100%"
                      resizeMode="cover"
                      style={styles.image}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </TabView.Item>


        <TabView.Item style={styles.tab}>
          <FlatList 
            data={projectsData} 
            numColumns={3}
            contentContainerStyle={{gap: GlobalStyles.space.base}}
            columnWrapperStyle={{gap: GlobalStyles.space.base}}
            scrollEnabled={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity>
                  <View style={styles.item}>
                    <ImageView 
                      source={item.image} 
                      width="100%"
                      height="100%"
                      resizeMode="cover"
                      style={styles.image}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </TabView.Item>
      </TabView>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'column',
    height: '100%',
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
    borderRadius: GlobalStyles.space.base,
    width: 96.7,
    height: 96.7,
  },
};

export default SearchView;