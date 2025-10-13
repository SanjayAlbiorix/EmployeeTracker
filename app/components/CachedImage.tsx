import React, { useState, useMemo, memo } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ImageSourcePropType,
  ColorValue,
} from "react-native";
import { Image } from "expo-image";
import images from "../../assets/images";

interface FastImageLoadingProps {
  style?: any;
  imgStyle?: any;
  placeholderImage?: ImageSourcePropType;
  loaderSize?: number;
  placeHolderImageStyle?: any;
  backgroundColor?: ColorValue;
  children?: React.ReactNode;
  uri?: string;
}

const CachedImage = (props: FastImageLoadingProps) => {
  const {
    style,
    imgStyle,
    placeholderImage,
    loaderSize,
    children,
    placeHolderImageStyle,
    backgroundColor,
    uri,
    ...otherProps
  } = props;

  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );

  const renderLoading = () => (
    <View style={styles.imagePlaceHolderContainer}>
      <ActivityIndicator
        color={"blue"}
        size={loaderSize ? loaderSize : "large"}
      />
    </View>
  );

  const renderPlaceholder = () => (
    <View style={styles.imagePlaceHolderContainer}>
      <Image
        contentFit="contain"
        source={placeholderImage ? placeholderImage : images.placeHolder}
        style={[styles.placeHolderImage, placeHolderImageStyle]}
      />
    </View>
  );

  const CachedImageMemoized = useMemo(() => {
    return (
      <Image
        source={{ uri }}
        style={[styles.ActualImage, imgStyle]}
        onError={() => setStatus("error")}
        onLoad={() => setStatus("success")}
        transition={500} // ✅ nice fade-in effect
        {...otherProps}
      >
        {children}
      </Image>
    );
  }, [uri, imgStyle, otherProps, children]);

  return (
    <View style={[styles.outerView, style, { backgroundColor }]}>
      {CachedImageMemoized}
      {status === "loading" && renderLoading()}
      {status === "error" && renderPlaceholder()}
    </View>
  );
};

const styles = StyleSheet.create({
  imagePlaceHolderContainer: {
    position: "absolute",
    zIndex: -1,
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  outerView: { overflow: "hidden" },
  placeHolderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
  },
  ActualImage: { height: "100%", width: "100%" },
});

export default memo(CachedImage);
