import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { setFormData } from "@/redux/slices/FormSlice";
import BoxView from "@/components/view/BoxView";
import ProfileProjectsList from "@/components/list/ProfileProjectsList";
import i18n from "@/translation/i18n";
import UserManager from "@/manager/UserManager";
import ProfileJamsList from "@/components/list/ProfileJamsList";
import ModalManager from "@/manager/ModalManager";
import SpinnerView from "@/components/view/SpinnerView";
import SectionManager from "@/manager/SectionManager";
import ProfileViewField from "./ProfileViewField";
import TextView from "@/components/view/TextView";
import ImageView from "@/components/view/ImageView";
import MediaManager from "@/manager/MediaManager";
import IconView from "@/components/view/IconView";
import CollapsibleView from "@/components/view/CollapsibleView";
import EntityManager from "@/manager/EntityManager";

const resource: string = 'profile';
const profileImageSize: number = 100;

type Props = {
  profileId?: any;
};

const ProfileSection = ({ profileId }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [entityId, setEntityId] = useState<number>(0);
  const [sectorsData, setSectorsData] = useState<any>([]);
  const formData = useSelector((state: any) => state.form?.[resource]);
  const userState = useSelector((state: any) => state.user);

  console.log(entityId)

  const renderHeader = () => {
    return (
      <>
        <BoxView direction="row" align="center" justify="center" style={styles.profileHeaderLeft}>
          {formData?.profile_picture?.url?.length > 0 && (
            <ImageView
              uri={MediaManager.getImageUrl(formData.profile_picture.url)}
              resizeMode="cover"
              width={profileImageSize}
              height={profileImageSize}
              style={styles.profileImage}
            />
          )}

          {!formData?.profile_picture?.url?.length && (
            <IconView
              name="user"
              theme="secondary"
              size={26}
              padding={28}
            />
          )}
        </BoxView>

        <View style={styles.profileHeaderRight}>
          <ProfileViewField>
            <TextView>
              {formData?.profile_name}
            </TextView>
          </ProfileViewField>

          <ProfileViewField>
            <BoxView direction="row" align="center" justify="flex-start">
              <IconView name="instagram" theme="transparent" size={19} padding={0} onPress={() => console.log('icon pressed')} />
              <IconView name="facebook" theme="transparent" size={19} padding={0} onPress={() => console.log('icon pressed')} />
              <IconView name="linkedin" theme="transparent" size={19} padding={0} onPress={() => console.log('icon pressed')} />
            </BoxView>
          </ProfileViewField>

          <ProfileViewField>
            <TextView>
              {formData?.email || i18n.t('Email unavailable')}
            </TextView>
          </ProfileViewField>
        </View>
      </>
    );
  };

  const renderSectors = () => {
    return (
      <TextView>
        {[20, 13, 6, 36, 31].map((id: any, i: number) => (
          <TextView key={id}>
            {(sectorsData.find((o: any) => o.id == id))?.name}
            {i < 4 && (<TextView>, </TextView>)}
          </TextView>
        ))}
      </TextView>
    );
  };

  const renderSubSectors = () => {
    return (
      <TextView>
        {[20, 13, 6, 36, 31].map((id: any, i: number) => (
          <TextView key={id}>
            {(sectorsData.find((o: any) => o.id == id))?.name}
            {i < 4 && (<TextView>, </TextView>)}
          </TextView>
        ))}
      </TextView>
    );
  };

  const renderCollapsibleFields = () => {
    if (formData?.profile_organization) {
      return (
        <BoxView direction="column">
          <ProfileViewField label={i18n.t('Organization name')}>
            <TextView>
              {formData?.profile_organization?.organization_name}
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Creation year')}>
            <TextView>
              {formData?.profile_organization?.creation_year || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Address')}>
            <TextView>
              {formData?.address || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>
        </BoxView>
      );
    }
    else if (formData?.profile_venue) {
      return (
        <BoxView direction="column">
          <ProfileViewField label={i18n.t('Venue name')}>
            <TextView>
              {formData?.profile_venue?.venue_name}
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Venue types')}>
            <TextView>
              Venue types
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Creation year')}>
            <TextView>
              {formData?.profile_venue?.creation_year || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Address')}>
            <TextView>
              {formData?.address || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>
        </BoxView>
      );
    }
    else if (formData?.profile_personal) {
      return (
        <BoxView direction="column">
          <ProfileViewField label={i18n.t('First name')}>
            <TextView>
              {formData?.profile_personal?.first_name || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Last name')}>
            <TextView>
              {formData?.profile_personal?.last_name || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>

          <ProfileViewField label={i18n.t('Address')}>
            <TextView>
              {formData?.address || i18n.t('Unavailable')}
            </TextView>
          </ProfileViewField>
        </BoxView>
      );
    }
  };

  useEffect(() => {
    (async () => {
      if (!Object.keys(formData)?.length) {
        setEntityId(profileId ? profileId : await UserManager.getProfileId());
        setSectorsData(await EntityManager.getSectors());

        dispatch(setFormData<any>({
          resource: resource,
          key: null,
          //value: userState.profileData, // Todo - Enable this
          value: await UserManager.getProfileData(),
        }));
      }
    })();
  }, [userState, formData, resource, profileId]);

  useEffect(() => {
    (async () => {
      if (!sectorsData?.length) {
        setSectorsData(await EntityManager.getSectors());
      }
    })();
  }, [sectorsData]);

  //if (!Object.keys(formData)?.length) return <SpinnerView />;

  return (
    <BoxView
      direction="column"
      align="flex-start"
      justify="center"
      style={styles.container}
      scroll={true}
    >
      <ProfileViewField>
        <TextView style={styles.profileTitle}>
          {UserManager.getProfileDisplayName(formData)}
        </TextView>
      </ProfileViewField>

      <BoxView direction="row" align="flex-start" justify="flex-start" style={styles.profileHeader}>
        {renderHeader()}
      </BoxView>

      <ProfileViewField label={i18n.t('Industries')}>
        {renderSectors()}
      </ProfileViewField>

      <ProfileViewField label={i18n.t('Sub-industries')}>
        {renderSubSectors()}
      </ProfileViewField>

      <ProfileViewField label={i18n.t('Description')}>
        <TextView>
          {formData?.profile_description || i18n.t('Unavailable')}
        </TextView>
      </ProfileViewField>

      <ProfileViewField label={i18n.t('Main activities')}>
        <TextView>
          Activities list
        </TextView>
      </ProfileViewField>

      <CollapsibleView
        label={(
          <BoxView direction="row" align="center" justify="space-between" style={styles.collapsibleHeaderClosed}>
            <TextView style={styles.collapsibleLabelClosed}>
              {i18n.t('View more')} ({UserManager.getProfileTypeLabel(formData?.profile_type)})
            </TextView>
            <IconView name="collapsed" theme="transparent" padding={0} />
          </BoxView>
        )}
        openedLabel={
          <BoxView direction="row" align="center" justify="space-between" style={styles.collapsibleHeaderOpened}>
            <TextView style={styles.collapsibleLabelOpened}>
              {i18n.t('View more')} ({UserManager.getProfileTypeLabel(formData?.profile_type)})
            </TextView>
            <IconView name="expanded" theme="white" padding={0} />
          </BoxView>
        }
        content={renderCollapsibleFields()}
      />

      <TextView style={styles.groupTitle}>
        {`${UserManager.getProfileDisplayName(formData)}'s`} {i18n.t('Projects')}
      </TextView>
      <ProfileProjectsList
        addButton={true}
        allButton={formData?.profile_projects?.length > 0}
        idArray={formData?.profile_projects || []}
        onAddButtonPress={() => SectionManager.push(router, 'add-project', { profileId: entityId, profileJams: formData?.profile_jams || [] })}
      />

      <TextView style={styles.groupTitle}>
        {`${UserManager.getProfileDisplayName(formData)}'s`} {i18n.t('Jams')}
      </TextView>
      <ProfileJamsList
        allButton={formData?.profile_jams?.length > 0}
        addButton={true}
        idArray={formData?.profile_jams || []}
        onAddButtonPress={() => ModalManager.toggleModal('JamForm', { resource: 'jam' })}
      />

      <TextView style={styles.groupTitle}>
        {i18n.t('Saved Jams')}
      </TextView>
      <ProfileJamsList
        allButton={formData?.saved_jams?.length > 0}
        idArray={formData?.saved_jams || []}
        emptyMessage={i18n.t('No data available.')}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    paddingBottom: Layout.space.base * 2,
  },
  groupTitle: {
    fontWeight: 'bold',
    marginTop: Layout.space.base,
  },
  profileHeader: {
    width: '100%',
    gap: Layout.space.base,
  },
  profileHeaderLeft: {
    width: profileImageSize,
    height: '100%',
    borderColor: Layout.colors.secondary,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    padding: 0,
  },
  profileHeaderRight: {
    flex: 1,
    height: '100%',
    gap: Layout.space.base,
    padding: 0,
  },
  profileImage: {
    width: profileImageSize,
    height: profileImageSize,
    borderRadius: profileImageSize,
  },
  profileTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  collapsibleHeaderClosed: {
    backgroundColor: Layout.colors.secondary,
    borderColor: Layout.colors.secondary,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    padding: Layout.space.base,
  },
  collapsibleHeaderOpened: {
    backgroundColor: Layout.colors.primary,
    borderColor: Layout.colors.primary,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    padding: Layout.space.base,
  },
  collapsibleLabelClosed: {
    color: Layout.colors.primary,
  },
  collapsibleLabelOpened: {
    color: Layout.colors.white,
  },
});

export default ProfileSection;