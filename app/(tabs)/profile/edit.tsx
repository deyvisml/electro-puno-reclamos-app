import ActionButton from "@/components/ActionButton";
import FormField from "@/components/FormField";
import NavigationButton from "@/components/NavigationButton";
import PageHeader from "@/components/PageHeader ";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { z } from "zod";

const editProfileSchema = z.object({
    name: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(100, "El nombre no puede tener más de 100 caracteres"),
    lastName: z
        .string()
        .min(2, "El apellido debe tener al menos 2 caracteres")
        .max(100, "El apellido no puede tener más de 100 caracteres"),
    dni: z
        .string()
        .length(8, "El DNI debe tener exactamente 8 dígitos")
        .regex(/^\d+$/, "El DNI solo debe contener números"),
    phoneNumber: z
        .string()
        .length(9, "El número de teléfono debe tener exactamente 9 dígitos")
        .regex(/^\d+$/, "El número de teléfono solo debe contener números"),
});

type EditProfileForm = z.infer<typeof editProfileSchema>;

const EditProfile = () => {
    const {
        control,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm<EditProfileForm>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            name: "",
            lastName: "",
            dni: "",
            phoneNumber: "",
        },
        reValidateMode: "onSubmit",
    });

    const onSubmit = (data: EditProfileForm) => {
        console.log(data);
        alert("Perfil actualizado exitosamente");
    };

    return (
        <KeyboardAvoidingView
            behavior="padding"
            className="flex-1 bg-white p-3"
        >
            {/* Header */}
            <View className="pb-3">
                <PageHeader
                    title="Actualizar Perfil"
                    backHref="/profile"
                    showBackButton
                />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName=" flex-grow "
            >
                <View className="gap-4 mt-6">
                    <FormField label="Nombres" required>
                        <Controller
                            control={control}
                            name="name"
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <TextInput
                                    placeholder="Nombres"
                                    className="p-4 border border-slate-300 rounded-lg"
                                    onBlur={onBlur}
                                    onChangeText={(text) => {
                                        clearErrors("name");
                                        onChange(text);
                                    }}
                                    value={value}
                                />
                            )}
                        />
                        {errors.name && (
                            <Text className="text-red-500">
                                {errors.name.message}
                            </Text>
                        )}
                    </FormField>

                    <FormField label="Apellidos" required>
                        <Controller
                            control={control}
                            name="lastName"
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <TextInput
                                    placeholder="Apellidos"
                                    className="p-4 border border-slate-300 rounded-lg"
                                    onBlur={onBlur}
                                    onChangeText={(text) => {
                                        clearErrors("lastName");
                                        onChange(text);
                                    }}
                                    value={value}
                                />
                            )}
                        />
                        {errors.lastName && (
                            <Text className="text-red-500">
                                {errors.lastName.message}
                            </Text>
                        )}
                    </FormField>

                    <FormField label="DNI" required>
                        <Controller
                            control={control}
                            name="dni"
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <TextInput
                                    placeholder="DNI"
                                    className="p-4 border border-slate-300 rounded-lg"
                                    keyboardType="numeric"
                                    maxLength={8}
                                    onBlur={onBlur}
                                    onChangeText={(text) => {
                                        clearErrors("dni");
                                        onChange(text);
                                    }}
                                    value={value}
                                />
                            )}
                        />
                        {errors.dni && (
                            <Text className="text-red-500">
                                {errors.dni.message}
                            </Text>
                        )}
                    </FormField>

                    <FormField label="Nº de teléfono" required>
                        <Controller
                            control={control}
                            name="phoneNumber"
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <TextInput
                                    placeholder="Número de teléfono"
                                    className="p-4 border border-slate-300 rounded-lg"
                                    keyboardType="numeric"
                                    maxLength={9}
                                    onBlur={onBlur}
                                    onChangeText={(text) => {
                                        clearErrors("phoneNumber");
                                        onChange(text);
                                    }}
                                    value={value}
                                />
                            )}
                        />
                        {errors.phoneNumber && (
                            <Text className="text-red-500">
                                {errors.phoneNumber.message}
                            </Text>
                        )}
                    </FormField>
                </View>

                <View className="flex-row gap-2 mt-10 mb-10">
                    <NavigationButton href="/profile" label="Cancelar" />
                    <ActionButton
                        label="Guardar"
                        onPress={handleSubmit(onSubmit)}
                        icon={<Feather name="save" size={22} color="white" />}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default EditProfile;
