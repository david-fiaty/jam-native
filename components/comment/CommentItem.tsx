import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import moment from 'moment';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import CollapsibleView from '../view/CollapsibleView';
import i18n from '@/translation/i18n';

type Props = {
  commentData?: any;
  profileImage?: JSX.Element;
  styles?: any;
};

const CommentItem = ({ commentData, profileImage, styles }: Props) => {

  const renderReplies = (row: any) => {
    //console.log('----- render comment replies', row);

    return (
      <TextView>
        this is the comment replies list component for a commment
      </TextView>
    );
  }

  return (

    <BoxView
      key={commentData.id}
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
        {profileImage}
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
          <TextView style={styles.profileName}>@{commentData?.profile?.profile_name}</TextView>
          <TextView style={styles.commentDate}>{moment(commentData?.created_at).fromNow()}</TextView>
        </BoxView>

        <TextView>{commentData?.comment_text}</TextView>

        <BoxView
          direction="row"
          align="center"
          justify="flex-start"
          style={styles.commentToolbarContainer}
        >
          {true && (
            <CollapsibleView
              //
              //isExpanded={true}
              content={renderReplies(commentData)}
              //onLabelPress={() => this.toggleCommentForm()}
              label={(
                <>
                  <TextView>+ {commentData?.sub_ids?.length || 0} {i18n.t('replies')}</TextView>
                </>
              )}
              openedLabel={
                <>
                  <TextView>- {commentData?.sub_ids?.length || 0} {i18n.t('replies')}</TextView>
                </>
              }
            />
          )}

          <TouchableOpacity onPress={() => console.log('on comment reply press')}>
            <TextView>{i18n.t('Reply')}</TextView>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('on comment edit press')}>
            <TextView>{i18n.t('Edit')}</TextView>
          </TouchableOpacity>
        </BoxView>

      </BoxView>
    </BoxView>
  );
};

export default CommentItem;
