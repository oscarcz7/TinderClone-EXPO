import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import tw from 'tailwind-rn'


const MatchScreen = () => {
    const navigation = useNavigation();
    const { params } = useRoute();

    const { loggedInProfile, userSwiped } = params;
    return (
        <View style={[tw('h-full bg-blue-500 pt-20'), { opacity: 0.89 }]}>
            <View style={[tw('justify-center px-10 pt-20')]}>
                <Image style={[tw('h-24 w-full')]} source={{ uri: "https://links.papareact.com/mg9" }} />
            </View>

            <Text style={[tw('text-white text-center mt-5')]}>
                Tienes un nuevo match de estudios con {userSwiped.displayName}!! Impresionante!
            </Text>

            <View style={[tw('flex-row justify-evenly mt-5')]}>
                <Image source={{ uri: loggedInProfile.photoURL }} style={tw('h-32 w-32 rounded-full')} />
                <Image source={{ uri: userSwiped.photoURL }} style={tw('h-32 w-32 rounded-full')} />
            </View>

            <TouchableOpacity
                style={tw('bg-white m-5 px-10 py-8 rounded-full mt-20')}
                onPress={() => {
                    navigation.goBack();
                    navigation.navigate('Chat');
                }}
            >
                <Text style={tw('text-center')}> Chatea Ahora!</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MatchScreen
