import { useCurrentUserQuery } from "@/api/user";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    const { data, error, isLoading } = useCurrentUserQuery("");

    useEffect(() => {
        if (data) {
            router.replace("/home");
        }
    }, [data]);
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="justify-center items-center h-screen ">
                    <Text className="text-3xl text-white bg">Welcome to Divided.</Text>
                    <CustomButton
                        title="Continue with Email"
                        handlePress={() => router.push("/logIn")}
                        containerStyles="w-full mt-7"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
