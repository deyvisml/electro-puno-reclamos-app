import ActionButton from "@/components/ActionButton";
import FormField from "@/components/FormField";
import PageHeader from "@/components/PageHeader ";
import ReadOnlyTextField from "@/components/ReadOnlyTextField";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { ScrollView, View } from "react-native";

const Technician = () => {
    return (
        <View className="flex-1 bg-white p-3">
            {/* Header */}
            <View className="pb-3">
                <PageHeader
                    title="Técnico #123"
                    backHref="/technicians"
                    showBackButton
                />
            </View>

            <ScrollView contentContainerClassName="flex-grow">
                <View className="mt-4">
                    <View className="gap-4">
                        <FormField label="Nombres">
                            <ReadOnlyTextField value="Juan" />
                        </FormField>

                        <FormField label="Apellidos">
                            <ReadOnlyTextField value="Pérez García" />
                        </FormField>

                        <FormField label="DNI">
                            <ReadOnlyTextField value="12345678" />
                        </FormField>

                        <FormField label="Nº de teléfono">
                            <ReadOnlyTextField value="+51 999 888 777" />
                        </FormField>
                    </View>
                </View>

                <View className="mt-10 mb-16">
                    <View className="h-14">
                        <ActionButton
                            label="Eliminar Técnico"
                            onPress={() => {
                                alert("Eliminar técnico");
                            }}
                            className="bg-red-500"
                            icon={
                                <Feather
                                    name="trash-2"
                                    size={24}
                                    color="white"
                                />
                            }
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Technician;
