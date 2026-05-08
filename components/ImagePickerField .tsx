import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Alert, Pressable, Text, View } from "react-native";

type ImagePickerFieldProps = {
    value: ImagePicker.ImagePickerAsset[];
    onChange: (images: ImagePicker.ImagePickerAsset[]) => void;
    maxImages?: number;
};

const ImagePickerField = ({
    value,
    onChange,
    maxImages = 3,
}: ImagePickerFieldProps) => {
    const pickImages = async () => {
        try {
            const permission =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permission.granted) {
                Alert.alert(
                    "Permiso requerido",
                    "Necesitamos acceso a tu galería.",
                );
                return;
            }

            const remaining = maxImages - value.length;

            if (remaining <= 0) {
                Alert.alert(
                    "Límite alcanzado",
                    `Solo puedes seleccionar hasta ${maxImages} fotos.`,
                );
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsMultipleSelection: true,
                selectionLimit: remaining,
                quality: 0.7,
            });

            if (result.canceled) return;

            const newImages = [...value, ...result.assets];

            onChange(newImages);
        } catch (error) {
            Alert.alert("Error", "Ocurrió un problema al seleccionar fotos.");
        }
    };

    const removeImage = (uri: string) => {
        onChange(value.filter((image) => image.uri !== uri));
    };

    return (
        <>
            {/* without images */}
            {value.length === 0 && (
                <Pressable
                    onPress={pickImages}
                    className="justify-center items-center border-2 border-slate-300 border-dashed rounded-xl h-32"
                >
                    <Ionicons name="image-outline" size={40} color="#64748b" />

                    <Text className="font-medium text-slate-600">
                        Seleccionar fotos
                    </Text>

                    <Text className="mt-1 text-slate-400 text-sm">
                        Máximo {maxImages} fotos
                    </Text>
                </Pressable>
            )}

            {/* with images */}
            {value.length > 0 && (
                <View>
                    <View className="flex-row flex-wrap gap-3">
                        {value.map((image) => (
                            <View key={image.uri} className="relative">
                                <Image
                                    source={{ uri: image.uri }}
                                    className="border border-slate-300 rounded-xl w-28 h-28"
                                    contentFit="cover"
                                />

                                <Pressable
                                    onPress={() => removeImage(image.uri)}
                                    className="-top-2 -right-2 absolute justify-center items-center bg-red-500 shadow rounded-full w-7 h-7"
                                >
                                    <Ionicons
                                        name="close"
                                        size={16}
                                        color="white"
                                    />
                                </Pressable>
                            </View>
                        ))}

                        {/* button to add more */}
                        {value.length < maxImages && (
                            <Pressable
                                onPress={pickImages}
                                className="justify-center items-center border-2 border-slate-300 border-dashed rounded-xl w-28 h-28"
                            >
                                <Ionicons
                                    name="add"
                                    size={28}
                                    color="#64748b"
                                />

                                <Text className="mt-1 text-slate-500 text-xs">
                                    Agregar
                                </Text>
                            </Pressable>
                        )}
                    </View>

                    {/* Contador */}
                    <Text className="mt-1 text-slate-500 text-sm">
                        {value.length}/{maxImages} fotos seleccionadas
                    </Text>
                </View>
            )}
        </>
    );
};

export default ImagePickerField;
