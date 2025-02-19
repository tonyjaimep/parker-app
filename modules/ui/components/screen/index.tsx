import React from "react";

import {
  FlatList,
  FlatListProps,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Screen as BtsScreen } from "react-native-screens";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FlatListScreenProps<T> = {
  list: true;
} & FlatListProps<T>;

type ScrollableScreenProps = { list?: false } & ScrollViewProps;

type ScreenProps<T> = FlatListScreenProps<T> | ScrollableScreenProps;

const isListScreenProps = <T = any,>(
  list: boolean,
  _props: ScreenProps<T>,
): _props is FlatListScreenProps<T> => {
  return list;
};

export const Screen = <T = any,>({
  list = false,
  ...props
}: ScreenProps<T>) => {
  const safeAreaInsets = useSafeAreaInsets();

  const containerStyle: StyleProp<ViewStyle> = StyleSheet.compose(
    {
      paddingBottom: Math.max(safeAreaInsets.bottom, 16),
      paddingHorizontal: 16,
    },
    props.contentContainerStyle,
  );

  return (
    <BtsScreen className="flex flex-1">
      {isListScreenProps(list, props) ? (
        <>
          <FlatList {...props} contentContainerStyle={containerStyle} />
          {props.children}
        </>
      ) : (
        <ScrollView
          {...props}
          className="flex flex-1"
          contentContainerStyle={containerStyle}
        >
          {props.children}
        </ScrollView>
      )}
    </BtsScreen>
  );
};
