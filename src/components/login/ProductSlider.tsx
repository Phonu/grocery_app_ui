import { View, Text, StyleSheet, Image } from "react-native";
import React, { FC, useMemo } from "react";
import { imageData } from "@utils/dummyData";
import AutoScroll from "@homielab/react-native-auto-scroll";
import { screenWidth } from "@utils/Scaling";

const ProductSlider = () => {
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < imageData.length; i += 4) {
      result.push(imageData.slice(i, i + 4));
    }
    return result;
  }, []);
  return (
    <View pointerEvents="none">
      <AutoScroll
        duration={10000}
        endPaddingWidth={0}
        style={styles.autoScroll}
      >
        <View style={styles.gridContainer}>
          {rows?.map((row: any, rowIndex: number) => {
            return <MemoizedRow row={row} rowIndex={rowIndex} key={rowIndex} />;
          })}
        </View>
      </AutoScroll>
    </View>
  );
};

const Row: FC<{ row: typeof imageData; rowIndex: number }> = ({
  row,
  rowIndex,
}) => {
  return (
    <View style={styles.row}>
      {row?.map((image, imageIndex) => {
        const horizontalShift = rowIndex % 2 === 0 ? -18 : 18;
        return (
          <View key={imageIndex} style={styles.itemContainer}>
            <Image source={image} style={styles.image} />
          </View>
        );
      })}
    </View>
  );
};

const MemoizedRow = React.memo(Row);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  autoScroll: {
    position: "absolute",
    zIndex: -2,
  },
  gridContainer: {
    justifyContent: "center",
    overflow: "visible",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 12,
    marginHorizontal: 10,
    width: screenWidth * 0.26,
    height: screenWidth * 0.26,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default ProductSlider;
