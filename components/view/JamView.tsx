import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";

type Props = {
  jamId?: any;
  isPublic?: boolean;
};

const JamView = ({ jamId, isPublic }: Props) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, jamId]);

  return (
    <TextView>JAM VIEW</TextView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingBottom: Layout.space.base * 3,
  },
  groupTitleContainer: {
    width: '100%',
    marginTop: Layout.space.base * 1.5,
  },
  groupTitle: {
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: Layout.space.base / 1.5,
  },
  projectTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  projectDescription: {
    width: '100%',
    marginTop: Layout.space.base / 1.5,
  },
  projectSectors: {
    width: '100%',
    flexWrap: 'wrap',
  },
});

export default JamView;
