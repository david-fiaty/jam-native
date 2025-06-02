import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import { useRouter } from "expo-router";
import moment from 'moment';
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import EntityManager from '@/manager/EntityManager';
import ProfileListItem from './list-item/ProfileListItem';
import SectionManager from '@/manager/SectionManager';
import BoxView from '../view/BoxView';
import ImageView from '../view/ImageView';
import MediaManager from '@/manager/MediaManager';
import IconView from '../view/IconView';

type Props = {
  entityId: any;
  entityType: any;
};

const profileImageSize: number = 34;

const JamCommentsList = ({ entityId, entityType }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [entityData, setEntityData] = useState<any[]>([]);

  const renderItem = (row: any) => {
    return (
      <BoxView
        key={row.item.id}
        direction="row"
        align="center"
        justify="flex-start"
        style={styles.commentContainer}
      >
        <BoxView
          direction="row"
          align="center"
          justify="flex-start"
          style={styles.commentContainerLeft}
        >
          {row?.item?.profile_picture?.url?.length > 0 && (
            <ImageView
              uri={MediaManager.getImageUrl(row.item.profile_picture.url)}
              resizeMode="cover"
              width={profileImageSize}
              height={profileImageSize}
              style={styles.profileImage}
            />
          )}

          {!row?.item?.profile_picture?.url?.length && (
            <IconView
              name="user"
              theme="secondary"
              size={14}
              padding={10}
            />
          )}
        </BoxView>

        <BoxView
          direction="column"
          align="flex-start"
          justify="flex-start"
          style={styles.commentContainerRight}
        >
          <TextView style={styles.profileName}>@{row.item.profile.profile_name}</TextView>
          <TextView style={styles.commentDate}>{moment(row.item.created_at).fromNow()}</TextView>
          <TextView>{row.item.comment_text}</TextView>
        </BoxView>
      </BoxView>
    );
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setEntityData((await EntityManager.getJams(entityId))?.[0]);
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, entityId]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      direction="column"
      align="flex-start"
      justify="flex-start"
      style={Layout.screenContent}
    >
      {entityData?.comments?.length > 0 &&
        <ListView
          data={entityData?.comments}
          renderItem={(row: any) => renderItem(row)}
        />
      }

      {!entityData?.comments?.length &&
        <TextView>{i18n.t('No comments available.')}</TextView>
      }
    </BoxView>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    ...Layout.listItem,
    ...{
      padding: Layout.space.base / 1.3,
    },
  },
  commentContainerLeft: {
    backgroundColor: 'red',
  },
  commentContainerRight: {
    backgroundColor: 'green',
  },
  commentDate: {
    fontSize: 13,
  },
  profileName: {
    color: Layout.colors.secondary,
    fontSize: 13,
  },
  profileImage: {
    width: profileImageSize,
    height: profileImageSize,
    borderRadius: profileImageSize,
  },
});


export default JamCommentsList;
