import React, { useState, JSX } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import moment from 'moment';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import CollapsibleView from '../view/CollapsibleView';
import i18n from '@/translation/i18n';
import IconView from '../view/IconView';
import SectionManager from '@/manager/SectionManager';

type Props = {
  entityId?: any;
  commentData?: any;
  profileImage?: JSX.Element;
  commentReplies?: any;
  globalStyles?: any;
};

const CommentItem = ({ entityId, commentData, profileImage, commentReplies, globalStyles }: Props) => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const componentStyles: any = {
    ...styles,
    ...globalStyles,
  };

  const viewProfile = (row: any) => {
    SectionManager.push(router, 'public-profile', { 
      profileId: commentData?.profile?.id,
      itemData: JSON.stringify(commentData?.profile),
    });
  };

  const deleteComment = async () => {
    // Todo - Implement delete comment
    setIsProcessing(true);
    console.log('delete comment', entityId);
    setIsProcessing(false);
  };

  const editComment = async () => {
    setIsProcessing(true);
    console.log('edit comment', entityId);
    setIsProcessing(false);
  };

  return (
    <BoxView
      key={commentData.id}
      direction="row"
      align="flex-start"
      justify="flex-start"
      style={componentStyles.commentContainer}
    >
      <BoxView
        direction="row"
        align="center"
        justify="flex-start"
        style={componentStyles.commentContainerLeft}
      >
        <TouchableOpacity onPress={viewProfile}>
          {profileImage}
        </TouchableOpacity>
      </BoxView>

      <BoxView
        direction="column"
        align="flex-start"
        justify="flex-start"
        style={componentStyles.commentContainerRight}
      >
        <BoxView
          direction="row"
          align="center"
          justify="flex-start"
        >
          <TouchableOpacity onPress={viewProfile}>
            <TextView style={componentStyles.profileName}>
              @{commentData?.profile?.profile_name}
            </TextView>
          </TouchableOpacity>
          <TextView style={componentStyles.commentDate}>
            {moment(commentData?.created_at).fromNow()}
          </TextView>
        </BoxView>

        <TextView>{commentData?.comment_text}</TextView>

        <BoxView
          direction="row"
          align="center"
          justify="flex-start"
          style={componentStyles.commentRepliesContainer}
        >
          {true && ( // Todo - Show only if there are replies
            <CollapsibleView
              content={commentReplies}
              label={(
                <BoxView direction="row" align="center" justify="flex-start">
                  <IconView name="collapsed" theme="transparent" padding={0} />
                  <TextView>{i18n.t('Replies')}</TextView>
                </BoxView>
              )}
              openedLabel={
                <BoxView direction="row" align="center" justify="flex-start">
                  <IconView name="expanded" theme="transparent" padding={0} />
                  <TextView>{i18n.t('Replies')}</TextView>
                </BoxView>
              }
            />
          )}
        </BoxView>
      </BoxView>

      <BoxView
        direction="column"
        align="flex-start"
        justify="flex-start"
        style={componentStyles.commentActionsContainer}
      >
        <IconView
          name="actions"
          theme="clear"
          size={18}
          padding={0}
        />
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default CommentItem;
