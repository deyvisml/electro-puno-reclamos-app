import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { Link } from "expo-router";
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

const ElectroPunoLogo = require("@/assets/images/electro-puno-logo.png");

const registerSchema = z.object({
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

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
    const {
        control,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
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

    const onSubmit = (data: RegisterForm) => {
        console.log(data);
        alert("Registro exitoso");
    };

    return (
        <KeyboardAvoidingView
            behavior="padding"
            className="flex-1 justify-center bg-white border border-red-500"
        >
            <ScrollView contentContainerClassName="p-6 flex-grow justify-center">
                <View>
                    <Image
                        source={ElectroPunoLogo}
                        className="h-28"
                        contentFit="contain"
                    />
                    <Text className="mt-4 font-bold text-2xl text-center">
                        Sistema de Reclamos
                    </Text>
                </View>

                <View className="bg-white mt-4 p-4 border border-slate-300 rounded-lg">
                    <Text className="font-medium text-2xl">Regístrate</Text>

                    <View className="gap-2 mt-6">
                        <Text className="font-light text-xl">Perfil</Text>

                        <View className="gap-4">
                            <View className="gap-2">
                                <Text className="font-semibold">Nombres *</Text>
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <TextInput
                                            placeholder="Nombres"
                                            className="p-3 border border-slate-300 rounded-lg"
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
                            </View>
                            <View className="gap-2">
                                <Text className="font-semibold">
                                    Apellidos *
                                </Text>
                                <Controller
                                    control={control}
                                    name="lastName"
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <TextInput
                                            placeholder="Apellidos"
                                            className="p-3 border border-slate-300 rounded-lg"
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
                            </View>
                            <View className="gap-2">
                                <Text className="font-semibold">DNI *</Text>
                                <Controller
                                    control={control}
                                    name="dni"
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <TextInput
                                            placeholder="DNI"
                                            className="p-3 border border-slate-300 rounded-lg"
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
                            </View>
                            <View className="gap-2">
                                <Text className="font-semibold">
                                    Nº de teléfono *
                                </Text>
                                <Controller
                                    control={control}
                                    name="phoneNumber"
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <TextInput
                                            placeholder="Número de teléfono"
                                            className="p-3 border border-slate-300 rounded-lg"
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
                            </View>
                        </View>
                    </View>

                    <View className="gap-2 mt-6">
                        <Text className="font-light text-xl">Credenciales</Text>

                        <View className="gap-4">
                            <View className="gap-2">
                                <Text className="font-semibold">
                                    Correo electrónico *
                                </Text>
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <TextInput
                                            placeholder="Correo electrónico"
                                            className="p-3 border border-slate-300 rounded-lg"
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
                            </View>
                            <View className="gap-2">
                                <Text className="font-semibold">
                                    Contraseña *
                                </Text>
                                <Controller
                                    control={control}
                                    name="password"
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <TextInput
                                            placeholder="Contraseña"
                                            secureTextEntry
                                            className="p-3 border border-slate-300 rounded-lg"
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
                            </View>
                        </View>
                    </View>

                    <Pressable
                        onPress={handleSubmit(onSubmit)}
                        className="bg-amber-500 mt-6 p-3 rounded-lg"
                    >
                        <Text className="font-bold text-white text-center uppercase">
                            Registrarse
                        </Text>
                    </Pressable>

                    <View className="flex-row justify-center mt-6">
                        <Text>¿Ya tienes cuenta? </Text>
                        <Link
                            href="/login"
                            className="font-bold text-amber-500"
                        >
                            Inicia sesión
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Register;
