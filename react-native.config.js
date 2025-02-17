module.exports = {
  project: {
    ios: {},
    android: {},
  },
  "react-native-vector-icons": {
    platforms: {
      ios: null,
    },
  },
  assets: ["./src/assets/fonts/"],
  getTransformModulePath() {
    return require.resolve("react-native-typescript-transformer");
  },
  getSourceExts() {
    return ["ts", "tsx"];
  },
};

// we have mentioned, were the font is linked
// we are using typescript -> add typescript-transformer
