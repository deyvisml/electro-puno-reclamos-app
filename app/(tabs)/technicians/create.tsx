import FormField from "@/components/FormField";
import PageHeader from "@/components/PageHeader ";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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

const createTechnicianSchema = z.object({
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
    email: z.email("El correo no es válido").min(1, "El correo es requerido"),
    password: z
        .string()
        .min(1, "La contraseña es requerida")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type CreateTechnicianForm = z.infer<typeof createTechnicianSchema>;

const CreateTechnician = () => {
    const {
        control,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm<CreateTechnicianForm>({
        resolver: zodResolver(createTechnicianSchema),
        defaultValues: {
            name: "",
            lastName: "",
            dni: "",
            phoneNumber: "",
            email: "",
            password: "",
        },
        reValidateMode: "onSubmit",
    });

    const onSubmit = (data: CreateTechnicianForm) => {
        console.log(data);
        alert("Técnico creado exitosamente");
    };

    return (
        <KeyboardAvoidingView
            behavior="padding"
            className="flex-1 bg-white p-3"
        >
            {/* Header */}
            <View className="pb-3">
                <PageHeader
                    title="Nuevo Técnico"
                    backHref="/technicians"
                    showBackButton
                />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName=" flex-grow "
            >
                <View className="gap-2 mt-6">
                    <Text className="font-light text-xl">Perfil</Text>

                    <View className="gap-4">
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
                </View>

                <View className="gap-2 mt-6">
                    <Text className="font-light text-xl">Credenciales</Text>

                    <View className="gap-4">
                        <FormField label="Correo electrónico" required>
                            <Controller
                                control={control}
                                name="email"
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <TextInput
                                        placeholder="Correo electrónico"
                                        className="p-4 border border-slate-300 rounded-lg"
                                        onBlur={onBlur}
                                        onChangeText={(text) => {
                                            clearErrors("email");
                                            onChange(text);
                                        }}
                                        value={value}
                                    />
                                )}
                            />
                            {errors.email && (
                                <Text className="text-red-500">
                                    {errors.email.message}
                                </Text>
                            )}
                        </FormField>

                        <FormField label="Contraseña" required>
                            <Controller
                                control={control}
                                name="password"
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <TextInput
                                        placeholder="Contraseña"
                                        secureTextEntry
                                        className="p-4 border border-slate-300 rounded-lg"
                                        onBlur={onBlur}
                                        onChangeText={(text) => {
                                            clearErrors("password");
                                            onChange(text);
                                        }}
                                        value={value}
                                    />
                                )}
                            />
                            {errors.password && (
                                <Text className="text-red-500">
                                    {errors.password.message}
                                </Text>
                            )}
                        </FormField>
                    </View>
                </View>

                <Pressable
                    onPress={handleSubmit(onSubmit)}
                    className="bg-amber-500 mt-6 mb-16 p-4 rounded-lg"
                >
                    <Text className="font-bold text-white text-center uppercase">
                        Crear técnico
                    </Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CreateTechnician;
