import { Text, View } from "react-native";

type FormFieldProps = {
    label: string;
    required?: boolean;
    children: React.ReactNode;
};

const FormField = ({ label, required = false, children }: FormFieldProps) => {
    return (
        <View className="gap-2">
            <Text className="font-semibold text-slate-700 text-sm uppercase">
                {label}
                {required && " *"}
            </Text>

            {children}
        </View>
    );
};

export default FormField;
