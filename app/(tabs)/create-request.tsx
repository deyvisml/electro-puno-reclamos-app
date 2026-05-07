import ImagePickerField from "@/components/ImagePickerField ";
import LocationPickerField, {
    LocationValue,
} from "@/components/LocationPickerField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { ImagePickerAsset } from "expo-image-picker";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { z } from "zod";

const newRequestSchema = z.object({
    requestType: z.string().min(1, "El tipo de reclamo es requerido"),
    meterId: z.string().min(1, "El suministro es requerido"),
    description: z
        .string()
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .max(500, "La descripción no puede tener más de 500 caracteres"),
    locationReference: z
        .string()
        .min(2, "La referencia es requerida")
        .max(100, "La referencia no puede tener más de 100 caracteres"),
});

type NewRequestForm = z.infer<typeof newRequestSchema>;

const CreateRequest = () => {
    const {
        control,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm<NewRequestForm>({
        resolver: zodResolver(newRequestSchema),
        defaultValues: {},
        reValidateMode: "onSubmit",
    });

    const [images, setImages] = useState<ImagePickerAsset[]>([]);
    const [location, setLocation] = useState<LocationValue | null>(null);

    const onSubmit = (data: NewRequestForm) => {
        console.log(data);
        alert("Reclamo creado exitosamente");
    };

    return (
        <KeyboardAvoidingView behavior="padding" className="flex-1">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="p-3 bg-white flex-grow "
            >
                <Text className="font-bold text-3xl">Nuevo Reclamo</Text>

                <View className="gap-4 mt-6">
                    <View className="gap-2">
                        <Text className="font-semibold uppercase">
                            Tipo de Reclamo *
                        </Text>

                        <Controller
                            control={control}
                            name="requestType"
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <View className="border border-slate-300 rounded-lg">
                                    <Picker
                                        selectedValue={value}
                                        onValueChange={(itemValue) =>
                                            onChange(itemValue)
                                        }
                                    >
                                        <Picker.Item
                                            label="Seleccione una opción"
                                            value=""
                                        />

                                        <Picker.Item
                                            label="Soporte técnico"
                                            value="soporte"
                                        />

                                        <Picker.Item
                                            label="Facturación"
                                            value="facturacion"
                                        />

                                        <Picker.Item
                                            label="Instalación"
                                            value="instalacion"
                                        />
                                    </Picker>
                                </View>
                            )}
                        />
                        {errors.requestType && (
                            <Text className="text-red-500">
                                {errors.requestType.message}
                            </Text>
                        )}
                    </View>

                    <View className="gap-2">
                        <Text className="font-semibold uppercase">
                            Suministro *
                        </Text>

                        <Controller
                            control={control}
                            name="meterId"
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <View className="border border-slate-300 rounded-lg">
                                    <Picker
                                        selectedValue={value}
                                        onValueChange={(itemValue) =>
                                            onChange(itemValue)
                                        }
                                    >
                                        <Picker.Item
                                            label="Seleccione una opción"
                                            value=""
                                        />

                                        <Picker.Item
                                            label="Suministro 12345"
                                            value="12345"
                                        />
                                        <Picker.Item
                                            label="Suministro 67890"
                                            value="67890"
                                        />
                                        <Picker.Item
                                            label="Suministro 54321"
                                            value="54321"
                                        />
                                    </Picker>
                                </View>
                            )}
                        />
                        {errors.meterId && (
                            <Text className="text-red-500">
                                {errors.meterId.message}
                            </Text>
                        )}
                    </View>

                    <View className="gap-2">
                        <Text className="font-semibold uppercase">
                            Descripción del Reclamo *
                        </Text>
                        <Controller
                            control={control}
                            name="description"
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <TextInput
                                    placeholder="Descripción del reclamo"
                                    multiline
                                    numberOfLines={5}
                                    textAlignVertical="top"
                                    className="px-3 py-4 border border-slate-300 rounded-lg h-32"
                                    onBlur={onBlur}
                                    onChangeText={(text) => {
                                        clearErrors("description");
                                        onChange(text);
                                    }}
                                    value={value}
                                />
                            )}
                        />
                        {errors.description && (
                            <Text className="text-red-500">
                                {errors.description.message}
                            </Text>
                        )}
                    </View>

                    {/* IMAGE PICKER */}
                    <View className="gap-2">
                        <Text className="font-semibold uppercase">Fotos</Text>
                        <ImagePickerField
                            value={images}
                            onChange={setImages}
                            maxImages={3}
                        />
                    </View>

                    {/* LOCATION PICKER */}
                    <View className="gap-2">
                        <Text className="font-semibold uppercase">
                            Ubicación *
                        </Text>
                        <LocationPickerField
                            value={location}
                            onChange={setLocation}
                        />
                    </View>

                    <View className="gap-2">
                        <Text className="font-semibold uppercase">
                            Referencia *
                        </Text>
                        <Controller
                            control={control}
                            name="locationReference"
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <TextInput
                                    placeholder="Refencia de ubicación"
                                    className="px-4 py-4 border border-slate-300 rounded-lg"
                                    onBlur={onBlur}
                                    onChangeText={(text) => {
                                        clearErrors("locationReference");
                                        onChange(text);
                                    }}
                                    value={value}
                                />
                            )}
                        />
                        {errors.locationReference && (
                            <Text className="text-red-500">
                                {errors.locationReference.message}
                            </Text>
                        )}
                    </View>
                </View>

                <Pressable
                    onPress={handleSubmit(onSubmit)}
                    className="bg-amber-500 mt-10 mb-10 p-4 rounded-lg"
                >
                    <Text className="font-bold text-white text-center uppercase">
                        Crear reclamo
                    </Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CreateRequest;
