import { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import ScreenManager from '@/manager/ScreenManager';
import SpinnerView from '../view/SpinnerView';

const AddJamToProjectForm = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const activeScreen: any = ScreenManager.getActiveScreen();
  const entityId: number = activeScreen.params.entityId;

  useEffect(() => {
    (async () => {
      if (!isLoaded) {

        setIsLoaded(true);
      }
      
    })();
  }, [isLoaded]);

  if (!isLoaded) return <SpinnerView />;

  console.log(entityId);

  return (
    <Text>
      ADD JAM TO PROJECT
    </Text>
  );
};

const styles = StyleSheet.create({
  content: {
    color: Colors.primary,
    fontSize: Layout.fontSize.base,
  },
});

export default AddJamToProjectForm;
