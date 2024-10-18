import { useState } from 'react';
import { Tab } from '@rneui/themed';

const TestScreen = () => {
  const [index, setIndex] = useState(0);
  return (
    <>
      <Tab value={index} onChange={setIndex} dense>
        <Tab.Item>Tab</Tab.Item>
        <Tab.Item>Tab</Tab.Item>
      </Tab>
    </>
  );
};

export default TestScreen;