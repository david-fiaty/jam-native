import React from "react";
import { Tab, Text, TabView } from "@rneui/themed";
import { GlobalStyles, Colors } from "@/constants/GlobalStyles";

const TestScreen = () => {
  const [index, setIndex] = React.useState(0);

  return (
    <>
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
          title="Recent"
          titleStyle={GlobalStyles.text}
        />
        <Tab.Item
          title="favorite"
          titleStyle={GlobalStyles.text}
        />
        <Tab.Item
          title="cart"
          titleStyle={GlobalStyles.text}
        />
      </Tab>

      <TabView 
        value={index} 
        onChange={setIndex} 
        animationType="timing" 
        containerStyle={styles.content}
        disableTransition={true}
      >
        <TabView.Item style={styles.item}>
          <Text h1>Recent</Text>
        </TabView.Item>
        <TabView.Item style={styles.item}>
          <Text h1>Favorite</Text>
        </TabView.Item>
        <TabView.Item style={styles.item}>
          <Text h1>Cart</Text>
        </TabView.Item>
      </TabView>
    </>
  );
};

const styles = {
  content: {
    flex: 1,
  },
  item: {
    width: '100%',
    height: 300,
    backgroundColor: 'red',
  },
};

export default TestScreen;