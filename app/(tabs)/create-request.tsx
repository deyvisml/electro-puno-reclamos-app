import FormField from "@/components/FormField";
import ImagePickerField from "@/components/ImagePickerField ";
import LocationPickerField, {
    LocationValue,
} from "@/components/LocationPickerField";
import PageHeader from "@/components/PageHeader ";
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
    meterNumber: z.string().min(1, "El suministro es requerido"),
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
                {/* Header */}
                <PageHeader title="Nuevo Reclamo" />

                <View className="gap-4 mt-6">
                    <FormField label="Tipo de Reclamo" required>
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
                    </FormField>

                    <FormField label="Suministro" required>
                        <Controller
                            control={control}
                            name="meterNumber"
                            rules={{ required: true }}
                            render={({
                                field: { onBlur, onChange, value },
                            }) => (
                                <TextInput
                                    keyboardType="numeric"
                                    maxLength={20}
                                    placeholder="Número de suministro"
                                    className="px-4 py-4 border border-slate-300 rounded-lg"
                                    onBlur={onBlur}
                                    onChangeText={(text) => {
                                        clearErrors("meterNumber");
                                        onChange(text);
                                    }}
                                    value={value}
                                />
                            )}
                        />
                        {errors.meterNumber && (
                            <Text className="text-red-500">
                                {errors.meterNumber.message}
                            </Text>
                        )}
                    </FormField>

                    <FormField label="Descripción del Reclamo" required>
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
                    </FormField>

                    {/* IMAGE PICKER */}
                    <FormField label="Fotos">
                        <ImagePickerField
                            value={images}
                            onChange={setImages}
                            maxImages={3}
                        />
                    </FormField>

                    {/* LOCATION PICKER */}
                    <FormField label="Ubicación" required>
                        <LocationPickerField
                            value={location}
                            onChange={setLocation}
                        />
                    </FormField>

                    <FormField label="Referencia" required>
                        <Controller
                            control={control}
                            name="locationReference"
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <TextInput
                                    placeholder="Referencia de ubicación"
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
                    </FormField>
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
