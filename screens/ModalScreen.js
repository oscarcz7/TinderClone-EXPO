import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Button,
} from "react-native";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { Picker } from "@react-native-picker/picker";
import { setDoc, doc, serverTimestamp } from "@firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react/cjs/react.development";
import { Entypo } from "@expo/vector-icons";

const ModalScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  //const [image, setImage] = useState();
  const [bio, setBio] = useState();
  const [age, setAge] = useState();
  const [career, setCareer] = useState("Desconocido");
  const [isChecked, setChecked] = useState(false);

  const incompleteForm = !bio;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      age: age,
      career: career,
      bio: bio,
      isChecked: isChecked,
      timeStamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const activeColor = "#B8860B";

  return (
    <SafeAreaView style={tw("flex-1  items-center pt-1")}>
      {/* change image description */}
      <View style={[tw('flex-row'),{ flex: 1, alignItems: "center", justifyContent: "center" }]}>
        <Entypo name="open-book" size={30} color={activeColor} />
        <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
          UDLA MATCH
        </Text>
      </View>
      <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
        Welcome {user.displayName}
      </Text>

      {/* sadasd */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={tw("text-center p-4 font-bold text-blue-400")}>
          Paso 1: Foto de perfil!!
        </Text>
        <Button title="Sube aqui tu imagen" onPress={pickImage} />
        {/* {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )} */}
      </View>

      {/* Content profile */}

      {/* <TextInput
        value={image }
        onChangeText={setImage}
        style={tw("text-center text-xl pb-2")}
        placeholder="Ingrese una url para una foto"
      />  */}

      <Text style={tw("text-center p-4 font-bold text-blue-400")}>
        Paso 2: Ingresa un estado o mini bio a tu perfil!!
      </Text>
      <TextInput
        value={bio}
        onChangeText={setBio}
        style={tw("text-center text-xl pb-2")}
        placeholder="Ingresa tu Bio!"
      />
      <Text style={tw("text-center p-4 font-bold text-blue-400")}>
        Paso 3: Ingrese tu edad!
      </Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        style={tw("text-center text-xl pb-2")}
        placeholder="Ingrese su edad"
        maxLength={2}
        keyboardType="numeric"
      />

      <View style={tw("mb-3")}>
        <Text style={tw("text-center pt-1 font-bold text-blue-400")}>
          Paso 4: Selecciona tu carrera!
        </Text>
        <Picker
          selectedValue={career}
          onValueChange={(value, index) => setCareer(value)}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="Selecciona tu carrera" value="Desconocido" />
          <Picker.Item label="Software" value="Software" />
          <Picker.Item label="Arquitectura" value="Arquitectura" />
          <Picker.Item label="Medicina" value="Medicina" />
          <Picker.Item label="Industrial" value="Industrial" />
          <Picker.Item label="Veterinaria" value="Veterinaria" />
        </Picker>
      </View>

      <View style={styles.container}>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
          />
          <Text style={styles.paragraph}>Check si quieres dar tutorias</Text>
        </View>
      </View>

      <TouchableOpacity
        disabled={incompleteForm}
        onPress={updateUserProfile}
        style={[
          tw("w-64 p-3 rounded-xl absolute bottom-10"),
          incompleteForm ? tw("bg-gray-400") : tw("bg-blue-400"),
        ]}
      >
        <Text style={tw("text-center font-bold text-white")}>
          Actualizar Perfil
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ModalScreen;
const styles = StyleSheet.create({
  picker: {
    width: 300,
  },
  container: {
    flex: 1,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 4,
  },
});
