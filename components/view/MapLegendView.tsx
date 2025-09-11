
import React, { useRef, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Text, Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { Layout } from '@/constants/Layout';
import IconView from './IconView';
import TextView from "./TextView";
import MapManager from "@/manager/MapManager";
import BoxView from "./BoxView";
import i18n from "@/translation/i18n";

type Props = {

};

const MapLegendView = ({ }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const widthAnim = useRef(new Animated.Value(0)).current;
  const appState = useSelector((state: any) => state.app, shallowEqual);

  const toggleLegend = () => {
    Animated.timing(widthAnim, {
      toValue: isVisible ? 0 : 200,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsVisible(!isVisible);
  };

  return (
    <>
      {!isVisible && (
        <TouchableOpacity
          style={styles.openButton}
          onPress={toggleLegend}
        >
          <IconView
            name="right"
            theme="transparent"
          />
        </TouchableOpacity>
      )}

      <Animated.View style={[styles.legendWrapper, { width: widthAnim }]}>
        <View style={styles.legendContainer}>
          <TextView style={styles.sectionTitle}>
            {i18n.t('Jams')}
          </TextView>
          {MapManager.getJamMarkersConfig().map((o: any) => {
            return (
              <BoxView key={o.key} direction="row" align="center" justify="flex-start">
                <TextView
                  color={o.titleColor}
                  backgroundColor={o.backgroundColor}
                  radius={Layout.radius.round}
                  paddingHorizontal={6}
                  paddingVertical={2}
                  size={10}
                  bold={true}
                >
                  {i18n.t('JAM')}
                </TextView>
                <TextView style={styles.textView}>
                  {o.label}
                </TextView>
              </BoxView>
            );
          })}

          <TextView style={styles.sectionTitle}>
            {i18n.t('Profiles')}
          </TextView>
          {MapManager.getProfileMarkersConfig().map((o: any) => {
            return (
              <BoxView 
                key={o.key} 
                direction="row" 
                align="center" 
                justify="flex-start"
                gap={5}
              >
                <IconView 
                  name={o.icon} 
                  theme="transparent" 
                  color={styles.textView.color} 
                />
                <TextView style={styles.textView}>{o.label}</TextView>
              </BoxView>
            );
          })}

          <TextView style={styles.sectionTitle}>
            {i18n.t('Industries')}
          </TextView>
          <BoxView 
            style={styles.sectorsContainer}
            direction="row"
            align="center"
            justify="flex-start"
            gap={5}
          >
            {appState.sectorsData.map((o: any) => {
              return (
                <TextView
                  key={o.id}
                  backgroundColor={o.color}
                  color={styles.sectorTag.color}
                  size={styles.sectorTag.fontSize}
                  paddingHorizontal={5}
                  paddingVertical={1}
                  radius={Layout.radius.round}
                >
                  {o.name}
                </TextView>
              );
            })}
          </BoxView>
        </View>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={toggleLegend}
        >
          <IconView
            name="left"
            theme="transparent"
          />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Layout.space.base,
  },
  openButton: {
    position: 'absolute',
    bottom: Layout.space.base * 5,
    backgroundColor: Layout.colors.white,
    padding: Layout.space.base / 2,
    height: 30,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    backgroundColor: Layout.colors.white,
    padding: Layout.space.base / 2,
    height: 30,
  },
  legendWrapper: {
    position: 'absolute',
    bottom: Layout.space.base * 5,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  legendContainer: {
    position: 'absolute',
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: Layout.colors.secondary,
    padding: Layout.space.base,
    gap: Layout.space.base,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    color: Layout.colors.gray,
    fontSize: 11,
  },
  textView: {
    color: Layout.colors.gray,
    fontSize: 11,
  },
  sectorsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sectorTag: {
    color: Layout.colors.white,
    flexShrink: 0, 
    includeFontPadding: false,
    textAlignVertical: 'center',
    fontSize: 11,
    padding: Layout.space.base,
  },
});

export default MapLegendView;