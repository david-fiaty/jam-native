import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import JamsList from '../list/JamsList';
import EntityManager from "@/manager/EntityManager";

type Props = {
  jamId: any;
};

const JamItemSection = ({ jamId }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [jamItem, setJamItem] = useState<any>(null);
  jamId = parseInt(jamId);
  
  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setJamItem((await EntityManager.getJams({ items_ids: [jamId] }))?.[0]);
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, jamId]);

  if (!jamId || isNaN(jamId)) {
    return <></>;
  }

  return (<JamsList idArray={[jamId]} />);
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginTop: Layout.space.base,
  },
});

export default JamItemSection;
