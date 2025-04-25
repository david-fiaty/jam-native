import { useState, useEffect } from 'react';
import { View } from "react-native";
import { Layout } from "@/constants/Layout";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import EntityManager from '@/manager/EntityManager';
import ScreenManager from '@/manager/ScreenManager';

const ShareOptionsList = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const entityId: number = ScreenManager.getModalEntityId();
  const iconSize: number = 40;

  const shareOptions: any[] = [
    {
      key: 'facebook',
      label: i18n.t('Facebook'),
      url: 'http://www.facebook.com',
      render: (params: any) => {
        return (
          <FacebookShareButton {...params}>
            <FacebookIcon size={iconSize} round={true} />
          </FacebookShareButton>
        );
      }, 
    },
    {
      key: 'twitter',
      label: i18n.t('Twitter'),
      url: 'http://www.twitter.com',
      render: (params: any) => {
        return (
          <TwitterShareButton {...params}>
            <TwitterIcon size={iconSize} round={true} />
          </TwitterShareButton>
        );
      }, 
    },
    {
      key: 'whatsapp',
      label: i18n.t('Whatsapp'),
      url: 'http://www.whatsapp.com',
      render: (params: any) => {
        return (
          <WhatsappShareButton {...params}>
            <WhatsappIcon size={iconSize} round={true} />
          </WhatsappShareButton>
        );
      }, 
    },
  ];

  useEffect(() => {
    (async () => {
      setIsLoaded(true);
    })();

  }, [isLoaded, entityId]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <View style={Layout.borderedListContainer}>    
        <ListView
          data={shareOptions}
          renderItem={(row: any) => row.render({
            url: row.url,
            quote: 'item title...',
          })}
        />
      </View>
    </BoxView>
  );
};

export default ShareOptionsList;
