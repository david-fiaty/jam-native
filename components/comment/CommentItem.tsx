import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import moment from 'moment';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import CollapsibleView from '../view/CollapsibleView';
import i18n from '@/translation/i18n';
import IconView from '../view/IconView';

type Props = {
  commentData?: any;
  profileImage?: JSX.Element;
  globalStyles?: any;
};

const CommentItem = ({ commentData, profileImage, globalStyles }: Props) => {
  const componentStyles: any = {
    ...styles,
    ...globalStyles,
  };

  const renderReplies = (row: any) => {
    //console.log('----- render comment replies', row);

    return (
      <TextView>
        this is the comment replies list component for a commment
      </TextView>
    );
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
        {profileImage}
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
          <TextView style={componentStyles.profileName}>@{commentData?.profile?.profile_name}</TextView>
          <TextView style={componentStyles.commentDate}>{moment(commentData?.created_at).fromNow()}</TextView>
        </BoxView>

        <TextView>{commentData?.comment_text}</TextView>

        <BoxView
          direction="row"
          align="center"
          justify="flex-start"
          style={componentStyles.commentActionsContainer}
        >
          {true && ( // Todo - Show only if there are replies
            <CollapsibleView
              content={renderReplies(commentData)}
              label={(
                <BoxView direction="row" align="center" justify="flex-start">
                  <IconView name="collapsed" theme="transparent" padding={0} /> 
                  <TextView>
                    {commentData?.sub_ids?.length || 0} {i18n.t('replies')}
                  </TextView>
                </BoxView>
              )}
              openedLabel={
                <BoxView direction="row" align="center" justify="flex-start">
                  <IconView name="expanded" theme="transparent" padding={0} />
                  <TextView>
                    {commentData?.sub_ids?.length || 0} {i18n.t('replies')}
                  </TextView>
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
        <TextView>x</TextView>
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
