import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import TextView from './TextView';

type Props = BaseProps & {
  profileId: any;
};

const ProfileItemView = ({ profileId }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setIsLoaded(true);
      }  
    })();
  }, [isLoaded]);

  return (
    <TextView>{profileId}</TextView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default ProfileItemView;
