import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setTabActive } from "@/redux/slices/TabSlice";
import { Layout } from '@/constants/Layout';
import { BaseProps } from '@/constants/Types';
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import SpinnerView from '../view/SpinnerView';
import i18n from '@/translation/i18n';
import TextView from '../view/TextView';

type Props = BaseProps & {
  item?: object,
};

const NotificationScreen = ({item}: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), Layout.animation.duration);
  });

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true}>
      <BackButton
        title={item.label}
        onPress={() => router.back() }
      />
      <BoxView direction="column" align="flex-start" justify="flex-start" style={Layout.pageContent}>
        <TextView>
          {item.content}
        </TextView>
      </BoxView>
    </BoxView>
  );
};

export default NotificationScreen;