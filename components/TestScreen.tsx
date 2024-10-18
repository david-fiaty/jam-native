import React from "react";
import { Tab, Text, TabView } from "@rneui/themed";

const TestScreen = () => {
  const [index, setIndex] = React.useState(0);

  return (
    <>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "white",
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          title="Recent"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "timer", type: "ionicon", color: "white" }}
        />
        <Tab.Item
          title="favorite"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "heart", type: "ionicon", color: "white" }}
        />
        <Tab.Item
          title="cart"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "cart", type: "ionicon", color: "white" }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring" containerStyle={styles.content}>
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