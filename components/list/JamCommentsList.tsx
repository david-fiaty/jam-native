import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
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
import UserManager from '@/manager/UserManager';
import ButtonView from '../view/ButtonView';
import CollapsibleView from '../view/CollapsibleView';
import InputTextField from '../field/InputTextField';

type Props = {
  entityId: any;
  entityType: any;
};

const profileImageSize: number = 34;

const JamCommentsList = ({ entityId, entityType }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [entityComments, setEntityComments] = useState<any[]>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const [isFormExpanded, setIsFormExpanded] = useState<boolean>(false);
  const [isSubmitProcessing, setIsSubmitProcessing] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});

  const getProfileData = async () => {
    return await UserManager.getProfileData();
  };

  const renderProfileImage = (row: any) => {
    return (
      <>
        {row?.item?.profile?.profile_picture?.url?.length > 0 && (
          <ImageView
            uri={MediaManager.getImageUrl(row.item.profile.profile_picture.url)}
            resizeMode="cover"
            width={profileImageSize}
            height={profileImageSize}
            style={styles.profileImage}
          />
        )}

        {!row?.item?.profile?.profile_picture?.url?.length && (
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
        style={styles.commentFormContainer}
      >
        <BoxView
          direction="row"
          align="flex-start"
          justify="flex-start"
          style={styles.commentContainerLeft}
        >
          {renderProfileImage({
            item: {
              profile: {
                profile_picture: profileData?.profile_picture,
              },
            }
          })}
        </BoxView>

        <BoxView
          direction="column"
          align="center"
          justify="flex-start"
          style={styles.commentContainerRight}
        >
          <CollapsibleView
            openedLabel={<></>}
            isExpanded={isFormExpanded}
            onLabelPress={() => setIsFormExpanded(true)}
            label={(
              <TouchableWithoutFeedback onPress={() => setIsFormExpanded(true)}>
                <InputTextField
                  placeholder={i18n.t('Add a comment...')}
                  disabled={true}
                />
              </TouchableWithoutFeedback>
            )}
            content={(
              <>
                <InputTextareaField
                  placeholder={i18n.t('Add a comment...')}
                  value={formData?.comment_text}
                  onChangeText={(value: string) => { setFormData({ comment_text: value }) }}
                />

                <BoxView
                  direction="row"
                  align="center"
                  justify="center"
                  style={styles.commentFormButtonsContainer}
                >
                  <ButtonView
                    label={i18n.t('Cancel')}
                    onPress={() => setIsFormExpanded(false)}
                    containerStyle={[styles.buttonStyle, styles.cancelButtonStyle]}
                  />

                  <ButtonView
                    label={i18n.t('Submit')}
                    onPress={submitComment}
                    containerStyle={[styles.buttonStyle, styles.submitButtonStyle]}
                    isProcessing={isSubmitProcessing}
                  />
                </BoxView>
              </>
            )}
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
          >
            <TextView style={styles.profileName}>@{row?.item?.profile?.profile_name}</TextView>
            <TextView style={styles.commentDate}>{moment(row?.item?.created_at).fromNow()}</TextView>
          </BoxView>

          <TextView>{row?.item?.comment_text}</TextView>

          <BoxView
            direction="row"
            align="center"
            justify="flex-start"
            style={styles.commentActionsContainer}
          >
            <TouchableOpacity onPress={() => console.log('on comment reply press')}>
              <TextView>{i18n.t('Reply')}</TextView>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log('on comment edit press')}>
              <TextView>{i18n.t('Edit')}</TextView>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log('on comment delete press')}>
              <TextView>{i18n.t('Delete')}</TextView>
            </TouchableOpacity>
          </BoxView>
        </BoxView>
      </BoxView>
    );
  };

  const submitComment = async () => {
    setIsSubmitProcessing(true);

    // Todo - Implement submit comment
    console.log('on comment submit');

    let payload: any = {
      profile_id: profileData.id,
      item_id: entityId,
      comment_text: formData?.comment_text,
    };

    console.log('comment payload', payload)

    //let result: any = await UserManager.register(payload);

    setIsSubmitProcessing(false);
  }

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProfileData(await getProfileData());

        let entityData: any = (await EntityManager.getJams(entityId))?.[0];
        let commentsData: any[] = await EntityManager.getComments(entityData.comments.map((o: any) => o.id));

        setEntityComments(commentsData);
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
      style={[Layout.screenContent, styles.container]}
    >
      {!entityComments.length &&
        <TextView>{i18n.t('No comments available.')}</TextView>
      }

      <ListView
        data={[
          ...[renderCommentForm()],
          ...(entityComments || []),
        ]}
        renderItem={(row: any) => renderItem(row)}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Layout.space.base * 4,
    width: '100%',
    height: '100%'
  },
  commentContainer: {
    ...Layout.listItem,
    ...{
      paddingVertical: Layout.space.base * 1.5,
      width: '100%',
    },
  },
  commentContainerLeft: {
    backgroundColor: Layout.colors.white,
    width: '10%',
  },
  commentContainerRight: {
    width: '78%',
  },
  commentFormContainer: {
    marginBottom: Layout.space.base * 1.5,
  },
  commentFormButtonsContainer: {
    width: '100%',
    marginTop: Layout.space.base,
  },
  commentActionsContainer: {
 
  },
  buttonStyle: {
    width: 'auto',
    height: Layout.space.base * 3,
    paddingHorizontal: Layout.space.base,
  },
  cancelButtonStyle: {

  },
  submitButtonStyle: {

  },
  profileName: {
    fontWeight: 'bold',
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
