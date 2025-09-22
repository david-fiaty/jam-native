
import React, { useRef, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { Layout } from '@/constants/Layout';
import IconView from './IconView';
import TextView from "./TextView";
import MapManager from "@/manager/MapManager";
import BoxView from "./BoxView";
import i18n from "@/translation/i18n";

const MapLegendView = () => {
  const [isVisible, setIsVisible] = useState(false);
  const widthAnim = useRef(new Animated.Value(0)).current;
  const appState = useSelector((state: any) => state.app, shallowEqual);

  const toggleLegend = () => {
    Animated.timing(widthAnim, {
      toValue: isVisible ? 0 : 258,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsVisible(!isVisible);
  };

  return (
    <>
      {!isVisible && (
        <TouchableOpacity
          style={[styles.openButton, styles.shadow]}
          onPress={toggleLegend}
        >
          <IconView
            name="right"
            theme="transparent"
          />
        </TouchableOpacity>
      )}

      <Animated.View style={[styles.legendWrapper, styles.shadow, { width: widthAnim, overflow: 'hidden' }]}>
        <View style={styles.legendContainer}>
          <TextView style={styles.sectionTitle}>
            {i18n.t('Jams')}
          </TextView>
          {MapManager.getJamMarkersConfig().map((o: any) => {
            return (
              <BoxView 
                key={o.key} 
                direction="row" 
                align="center" 
                justify="flex-start"
              >
                <TextView
                  color={o.titleColor}
                  backgroundColor={o.backgroundColor}
                  radius={Layout.radius.round}
                  paddingHorizontal={6}
                  paddingVertical={1}
                  size={8.5}
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
    bottom: 40,
    height: 302,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  legendContainer: {
    position: 'absolute',
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: Layout.colors.white,
    padding: Layout.space.base,
    paddingTop: 0,
    gap: Layout.space.base/2,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    color: Layout.colors.darkGray,
    fontSize: 10,
    marginTop: Layout.space.base/2,
  },
  textView: {
    color: Layout.colors.darkGray,
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
    fontSize: 10,
    padding: Layout.space.base,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,    
  },
});

export default MapLegendView;