import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import tw from 'tailwind-rn'
import useAuth from '../hooks/useAuth';
//import { Picker } from '@react-native-picker/picker';
import { setDoc, doc, serverTimestamp } from '@firebase/firestore';
import { db } from '../firebase';



const ModalScreen = () => {
    const { user } = useAuth();
    const [selectedCareer, setSelectedCareer] = useState();
    const [image, setImage] = useState();
    const [bio, setBio] = useState();
    const [age, setAge] = useState();
    const [career, setCareer] = useState();

    const incompleteForm = !image || !bio || !age || !career;


    const updateUserProfile = () => {
        setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            displayName: user.displayName,
            photoURL: image,
            age: age,
            career: career,
            bio: bio,
            timeStamp: serverTimestamp(),
        }).then(() => {
            navigation.navigate('Home')
        }).catch(err => {
            alert(err.message);
        });
    };

    return (
        <View style={tw('flex-1 items-center pt-1')}>
            {/* change image description */}
            <Image
                style={tw('h-20 w-full')}
                resizeMode="contain"
                source={{ uri: "https://links.papareact.com/2pf" }}
            />
            <Text style={tw('text-xl text-gray-500 p-2 font-bold')}>Welcome {user.displayName}</Text>

            {/* Content profile */}

            <Text style={tw('text-center p-4 font-bold text-blue-400')}>
                Paso 1: Foto de perfil!!
            </Text>
            <TextInput
                value={image}
                onChangeText={setImage}
                style={tw('text-center text-xl pb-2')}
                placeholder="Ingrese una url para una foto"
            />
            <Text style={tw('text-center p-4 font-bold text-blue-400')}>
                Paso 2: Ingresa un estado o mini bio a tu perfil!!
            </Text>
            <TextInput
                value={bio}
                onChangeText={setBio}
                style={tw('text-center text-xl pb-2')}
                placeholder="Ingresa tu Bio!"
            />
            <Text style={tw('text-center p-4 font-bold text-blue-400')}>
                Paso 3: Ingrese tu edad!
            </Text>
            <TextInput
                value={age}
                onChangeText={setAge}
                style={tw('text-center text-xl pb-2')}
                placeholder="Ingrese su edad"
                maxLength={2}
                keyboardType="numeric"
            />
            <Text style={tw('text-center p-4 font-bold text-blue-400')}>
                Paso 4: Ingresa tu carrera!
            </Text>
            <TextInput
                value={career}
                onChangeText={setCareer}
                style={tw('text-center text-xl pb-2')}
                placeholder="ej: software"
            />
            <TouchableOpacity
                disabled={incompleteForm}
                onPress={updateUserProfile}
                style={[tw('w-64 p-3 rounded-xl absolute bottom-10'), incompleteForm ? tw('bg-gray-400') : tw('bg-blue-400')]} >
                <Text style={tw('text-center font-bold text-white')}>
                    Actualizar Perfil
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ModalScreen
