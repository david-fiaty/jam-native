import { useState, useEffect} from 'react';
import { StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import moment from 'moment';
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import EntityManager from '@/manager/EntityManager';
import BoxView from '../view/BoxView';
import ImageView from '../view/ImageView';
import MediaManager from '@/manager/MediaManager';
import IconView from '../view/IconView';
import InputTextareaField from '../field/InputTextareaField';

type Props = {
  entityId: any;
  entityType: any;
};

const profileImageSize: number = 34;

const JamCommentsList = ({ entityId, entityType }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [entityData, setEntityData] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({});

  const renderProfileImage = (row: any) => {
    return (
      <>
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
      </>
    );
  };

  const renderCommentForm = () => {
    return (
      <BoxView
        direction="row"
        align="flex-start"
        justify="flex-start"
      >
        <BoxView
          direction="row"
          align="flex-start"
          justify="flex-start"
          style={styles.commentContainerLeft}
        >
          {renderProfileImage({})}
        </BoxView>

        <BoxView
          direction="row"
          align="center"
          justify="flex-start"
          style={styles.commentContainerRight}
        >
          <InputTextareaField
            placeholder={i18n.t('Add a comment...')}
            //value={formData?.comment_text}
            //onChangeText={(value: string) => FormManager.updateField(resource, 'description', value, ['string'])}
          />
        </BoxView>
      </BoxView>
    );
  };

  const renderItem = (row: any) => {
    if (row.index === 0) {
      return renderCommentForm();
    }

    return (
      <BoxView
        key={row.item.id}
        direction="row"
        align="flex-start"
        justify="flex-start"
        style={styles.commentContainer}
      >
        <BoxView
          direction="row"
          align="center"
          justify="flex-start"
          style={styles.commentContainerLeft}
        >
          {renderProfileImage(row)}
        </BoxView>

        <BoxView
          direction="column"
          align="flex-start"
          justify="flex-start"
          style={styles.commentContainerRight}
        >
          <BoxView
            direction="row"
            align="center"
            justify="flex-start"
            style={styles.commentContainerRight}
          >
            <TextView style={styles.profileName}>@{row.item.profile.profile_name}</TextView>
            <TextView style={styles.commentDate}>{moment(row.item.created_at).fromNow()}</TextView>
          </BoxView>

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
      {!entityData?.comments?.length &&
        <TextView>{i18n.t('No comments available.')}</TextView>
      }
    
      <ListView
        data={[
          ...[renderCommentForm()],
          ...(entityData?.comments || []),
        ]}
        renderItem={(row: any) => renderItem(row)}
      />
    
    </BoxView>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    ...Layout.listItem,
    ...{
      paddingVertical: Layout.space.base * 1.5,
      width: '100%',
    },
  },
  commentContainerLeft: {
    backgroundColor: Layout.colors.white,
    width: '10%'
  },
  commentContainerRight: {
    //flex: 1,
    width: '78%'
  },
  profileName: {
    color: Layout.colors.secondary,
  },
  commentDate: {
    fontSize: 11.5,
  },
  profileImage: {
    width: profileImageSize,
    height: profileImageSize,
    borderRadius: profileImageSize,
  },
});

export default JamCommentsList;
