import React from "react";
import { View, FlatList, TouchableOpacity  } from "react-native";
import { Tab, TabView } from "@rneui/themed";
import { GlobalStyles, Colors } from "@/constants/GlobalStyles";
import { StaticImage } from './base/StaticImage';
import ApiClient from '@/classes/ApiClient';

const TestScreen = () => {
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
          height: 3,
        }}
      >
        <Tab.Item
          title="All"
          titleStyle={GlobalStyles.text}
        />
        <Tab.Item
          title="Jams"
          titleStyle={GlobalStyles.text}
        />
        <Tab.Item
          title="Projects"
          titleStyle={GlobalStyles.text}
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
                    <StaticImage 
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
                    <StaticImage 
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
                    <StaticImage 
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
    padding: GlobalStyles.space.container,
  },
  item: {
    backgroundColor: Colors.tertiary,
    borderRadius: 8,
    borderColor: Colors.tertiary,
    width: GlobalStyles.space.base*10.3,
    height: GlobalStyles.space.base*10.3,
  },
  image: {
    borderRadius: GlobalStyles.space.base,
  },
};

export default TestScreen;