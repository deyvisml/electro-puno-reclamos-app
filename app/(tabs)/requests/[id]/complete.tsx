import ActionButton from "@/components/ActionButton";
import FormField from "@/components/FormField";
import NavigationButton from "@/components/NavigationButton";
import PageHeader from "@/components/PageHeader ";
import RequestStatus from "@/components/RequestStatus";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
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

const completeRequestSchema = z.object({
    requestResolution: z.enum(["0", "1"], {
        message: "Debe seleccionar una resolución válida",
    }),

    requestResolutionDetail: z
        .string()
        .max(200, "El detalle no puede tener más de 200 caracteres")
        .optional(),
});

type CompleteRequestForm = z.infer<typeof completeRequestSchema>;

const CompleteRequest = () => {
    const {
        control,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm<CompleteRequestForm>({
        resolver: zodResolver(completeRequestSchema),
        defaultValues: {
            requestResolution: "0",
            requestResolutionDetail: "",
        },
        reValidateMode: "onSubmit",
    });

    const onSubmit = (data: CompleteRequestForm) => {
        console.log(data);
        alert("Reclamo completado exitosamente");
    };

    return (
        <KeyboardAvoidingView
            behavior="padding"
            className="flex-1 bg-white p-3"
        >
            {/* Header */}
            <View className="pb-3">
                <PageHeader
                    title="Reclamo #123"
                    backHref="/requests/1"
                    showBackButton
                />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName=" flex-grow "
            >
                <RequestStatus status="Pendiente" statusId="0" />

                <View className="gap-4 mt-6">
                    <FormField label="Reclamo resuelto" required>
                        <Controller
                            control={control}
                            name="requestResolution"
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

                                        <Picker.Item label="Si" value="0" />

                                        <Picker.Item label="No" value="1" />
                                    </Picker>
                                </View>
                            )}
                        />
                        {errors.requestResolution && (
                            <Text className="text-red-500">
                                {errors.requestResolution.message}
                            </Text>
                        )}
                    </FormField>

                    <FormField label="Detalle de la resolución">
                        <Controller
                            control={control}
                            name="requestResolutionDetail"
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <TextInput
                                    placeholder="Detalle de la resolución"
                                    multiline
                                    numberOfLines={5}
                                    textAlignVertical="top"
                                    className="px-3 py-4 border border-slate-300 rounded-lg h-32"
                                    onBlur={onBlur}
                                    onChangeText={(text) => {
                                        clearErrors("requestResolutionDetail");
                                        onChange(text);
                                    }}
                                    value={value}
                                />
                            )}
                        />
                        {errors.requestResolutionDetail && (
                            <Text className="text-red-500">
                                {errors.requestResolutionDetail.message}
                            </Text>
                        )}
                    </FormField>
                </View>

                <View className="flex-row gap-2 mt-10 mb-10">
                    <NavigationButton href="/requests/1" label="Cancelar" />
                    <ActionButton
                        label="Completar"
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CompleteRequest;
