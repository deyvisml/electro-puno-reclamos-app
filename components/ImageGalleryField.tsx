import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import ImageViewing from "react-native-image-viewing";

type ImageGalleryFieldProps = {
    images: string[];
};

const ImageGalleryField = ({ images }: ImageGalleryFieldProps) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    if (images.length === 0) {
        return (
            <View className="justify-center items-center border border-slate-300 rounded-xl h-32">
                <Ionicons name="image-outline" size={36} color="#94a3b8" />

                <Text className="mt-2 text-slate-500">No hay imágenes</Text>
            </View>
        );
    }

    return (
        <>
            <View>
                <View className="flex-row flex-wrap gap-3">
                    {images.map((image, index) => (
                        <Pressable
                            key={image}
                            onPress={() => setSelectedIndex(index)}
                            className="relative"
                        >
                            <Image
                                source={{ uri: image }}
                                className="border border-slate-300 rounded-xl w-28 h-28"
                                contentFit="cover"
                            />

                            <View className="right-2 bottom-2 absolute justify-center items-center bg-black/60 rounded-full w-7 h-7">
                                <Ionicons
                                    name="expand-outline"
                                    size={16}
                                    color="white"
                                />
                            </View>
                        </Pressable>
                    ))}
                </View>
                <Text className="mt-1 text-slate-500 text-sm">
                    {images.length} foto(s)
                </Text>
            </View>

            <ImageViewing
                images={images.map((image) => ({
                    uri: image,
                }))}
                imageIndex={selectedIndex}
                visible={selectedIndex >= 0}
                onRequestClose={() => setSelectedIndex(-1)}
            />
        </>
    );
};

export default ImageGalleryField;
