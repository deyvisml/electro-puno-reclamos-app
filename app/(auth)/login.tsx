import { Image } from "expo-image";
import { Link, router } from "expo-router";
import React from "react";
import {
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

import FormField from "@/components/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const ElectroPunoLogo = require("@/assets/images/electro-puno-logo.png");

const loginSchema = z.object({
    email: z.email("El correo no es válido").min(1, "El correo es requerido"),
    password: z
        .string()
        .min(1, "La contraseña es requerida")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
    const {
        control,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        reValidateMode: "onSubmit",
    });

    const onSubmit = (data: LoginForm) => {
        alert("Login exitoso");

        router.replace("/(tabs)/requests");
    };

    return (
        <KeyboardAvoidingView behavior="padding" className="flex-1">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="p-3 flex-grow bg-white justify-center"
            >
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
                    <Text className="font-medium text-2xl">Iniciar Sesión</Text>

                    <View className="gap-4 mt-4">
                        <FormField label="Correo electrónico">
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

                        <FormField label="Contraseña">
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

                    <Link
                        href="/register"
                        className="mt-3 py-1 font-bold text-amber-500 text-right"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>

                    <Pressable
                        onPress={handleSubmit(onSubmit)}
                        className="bg-amber-500 mt-6 p-4 rounded-lg"
                    >
                        <Text className="font-bold text-white text-center uppercase">
                            Ingresar
                        </Text>
                    </Pressable>

                    <View className="flex-row justify-center mt-6">
                        <Text>¿No tienes cuenta? </Text>
                        <Link
                            href="/register"
                            className="font-bold text-amber-500"
                        >
                            Regístrate
                        </Link>
                    </View>

                    <Link href="/" className="font-bold text-amber-500">
                        index
                    </Link>
                    <Link
                        href="/(tabs)/requests"
                        className="font-bold text-amber-500"
                    >
                        reclamos
                    </Link>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Login;
