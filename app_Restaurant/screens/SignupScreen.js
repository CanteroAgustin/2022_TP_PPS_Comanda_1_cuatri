import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import { Button, InputField, ErrorMessage } from "../components";
import Firebase from "../config/firebase";
import { Formik, useFormikContext } from "formik";
import { signupValidationSchema } from "../schemas/signupSchema";
import Spinner from "react-native-loading-spinner-overlay";
import SizesTxt from "../utils/Sizes";
import { Picker } from "@react-native-picker/picker";

const auth = Firebase.auth();
const db = Firebase.firestore();

export default function SignupScreen(props) {
  const { navigation, route } = props;
  const { tipoAlta } = route.params;

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [signupError, setSignupError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(false);
  selectedLanguage;
  const { validateForm } = useFormikContext;

  useEffect(() => {
    validateForm;
  }, []);

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const formUser = () => {
    return (
      <Formik
        validationSchema={signupValidationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { resetForm }) => {
          alert("oprimido");
          if (values.email !== "" && values.password !== "") {
            setIsLoading(true);
            auth
              .createUserWithEmailAndPassword(values.email, values.password)
              .then(data => {
                db.collection("usuarios").doc(data.user.uid).set({
                  email: values.email,
                  password: values.password,
                  rol: 'admin',
                  status: 'pendiente',
                  uid: data.user.uid
                });
                setTimeout(() => {
                  setIsLoading(false);
                  resetForm();
                }, 3000)
              })
              .catch((error) => {
                resetForm();
                setIsLoading(false);
                setSignupError(error);
              });
          }
        }}
      >
        {(props) => (
          <View>
            <InputField
              inputStyle={{
                fontSize: 14,
              }}
              containerStyle={{
                backgroundColor: "#fff",
                marginBottom: 20,
              }}
              leftIcon="email"
              placeholder="Correo electronico"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
              onChangeText={props.handleChange("email")}
              onBlur={props.handleBlur("email")}
              value={props.values.email}
              name={"email"}
            />
            {props.errors.email && props.dirty && props.touched.email && (
              <Text style={styles.errorMsg}>{props.errors.email}</Text>
            )}
            <InputField
              inputStyle={{
                fontSize: 14,
              }}
              containerStyle={{
                backgroundColor: "#fff",
                marginBottom: 20,
              }}
              leftIcon="lock"
              placeholder="Contraseña"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={passwordVisibility}
              textContentType="password"
              rightIcon={rightIcon}
              value={props.values.password}
              onChangeText={props.handleChange("password")}
              onBlur={props.handleBlur("password")}
              handlePasswordVisibility={handlePasswordVisibility}
            />
            {props.errors.password && props.dirty && props.touched.password && (
              <Text style={styles.errorMsg}>{props.errors.password}</Text>
            )}
            {signupError ? (
              <ErrorMessage error={signupError} visible={true} />
            ) : null}

            <Button
              onPress={props.handleSubmit}
              backgroundColor="#ff7961"
              title="Registrarme"
              tileColor="#fff"
              titleSize={20}
              containerStyle={{
                marginBottom: 24,
              }}
              disabled={!props.isValid}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.resetForm();
                navigation.navigate("Login");
                setSignupError("");
              }}
            >
              <Text style={styles.textButton}>Ya tengo una cuenta.</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.resetForm();
                navigation.navigate("BotonesAltas");
                setSignupError("");
              }}
            >
              <Text style={styles.textButton}>Altas.</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    );
  };
  const formUserV2 = () => {
    const onSubmitUser = (values) => {
      alert("enviado form alternativo");
      console.log(values);
    };
    return (
      <Formik
        validationSchema={signupValidationSchema}
        initialValues={{
          name: "",
          lastName: "",
          dni: "",
          cuil: "",
          foto: "",
          perfil: "",
          email: "",
          password: "",
        }}
        onSubmit={(values, { resetForm }) => {
          onSubmitUser(values);
        }}
      >
        {(props) => (
          <View>
            <InputField
              inputStyle={{
                fontSize: SizesTxt.small,
              }}
              containerStyle={{
                backgroundColor: "#fff",
                marginBottom: 20,
              }}
              //leftIcon="email"
              placeholder="Nombre(s)"
              autoFocus={true}
              onChangeText={props.handleChange("name")}
              onBlur={props.handleBlur("name")}
              value={props.values.name}
            />
            {props.errors.name && props.dirty && props.touched.name && (
              <Text style={styles.errorMsg}>{props.errors.name}</Text>
            )}

            <InputField
              inputStyle={{
                fontSize: SizesTxt.small,
              }}
              containerStyle={{
                backgroundColor: "#fff",
                marginBottom: 20,
              }}
              placeholder="Apellido(s)"
              autoFocus={true}
              onChangeText={props.handleChange("lastName")}
              onBlur={props.handleBlur("lastName")}
              value={props.values.lastName}
            />
            {props.errors.lastName && props.dirty && props.touched.lastName && (
              <Text style={styles.errorMsg}>{props.errors.lastName}</Text>
            )}

            <InputField
              inputStyle={{
                fontSize: SizesTxt.small,
              }}
              containerStyle={{
                backgroundColor: "#fff",
                marginBottom: 20,
              }}
              placeholder="Número de DNI"
              autoFocus={true}
              onChangeText={props.handleChange("dni")}
              onBlur={props.handleBlur("dni")}
              value={props.values.dni}
              keyboardType="number-pad"
            />
            {props.errors.dni && props.dirty && props.touched.dni && (
              <Text style={styles.errorMsg}>{props.errors.dni}</Text>
            )}

            <InputField
              inputStyle={{
                fontSize: SizesTxt.small,
              }}
              containerStyle={{
                backgroundColor: "#fff",
                marginBottom: 20,
              }}
              placeholder="Número de CUIL"
              autoFocus={true}
              onChangeText={props.handleChange("cuil")}
              onBlur={props.handleBlur("cuil")}
              value={props.values.cuil}
              keyboardType="number-pad"
            />
            {props.errors.cuil && props.dirty && props.touched.cuil && (
              <Text style={styles.errorMsg}>{props.errors.cuil}</Text>
            )}

            <InputField
              inputStyle={{
                fontSize: SizesTxt.small,
              }}
              containerStyle={{
                backgroundColor: "#fff",
                marginBottom: 20,
              }}
              leftIcon="email"
              placeholder="Correo electronico"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
              onChangeText={props.handleChange("email")}
              onBlur={props.handleBlur("email")}
              value={props.values.email}
            />
            {props.errors.email && props.dirty && props.touched.email && (
              <Text style={styles.errorMsg}>{props.errors.email}</Text>
            )}

            {/* PRUEBA PICKEER */}
            {false && (
              <Picker // cambiar a true para ver funcion
                label={"name"}
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) => {
                  alert("opcion Elegida" + itemValue);
                  setSelectedLanguage(itemValue);
                }}
                style={{
                  borderWidth: 0.5,
                  justifyContent: "flex-end",
                  alignContent: "center",
                }}
              >
                <Picker.Item label="Selecciona un perfil!" value="0" />
                <Picker.Item label="Tipo Perfil 1" value="perfil1" />
                <Picker.Item label="Tipo Perfil 2" value="perfil2" />
              </Picker>
            )}

            <InputField
              inputStyle={{
                fontSize: SizesTxt.small,
              }}
              containerStyle={{
                backgroundColor: "#fff",
                marginBottom: 20,
              }}
              leftIcon="lock"
              placeholder="Contraseña"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={passwordVisibility}
              textContentType="password"
              rightIcon={rightIcon}
              value={props.values.password}
              onChangeText={props.handleChange("password")}
              onBlur={props.handleBlur("password")}
              handlePasswordVisibility={handlePasswordVisibility}
            />
            {props.errors.password && props.dirty && props.touched.password && (
              <Text style={styles.errorMsg}>{props.errors.password}</Text>
            )}

            {signupError ? (
              <ErrorMessage error={signupError} visible={true} />
            ) : null}

            <Button
              onPress={props.handleSubmit}
              backgroundColor="#ff7961"
              title="Registrarme"
              tileColor="#fff"
              titleSize={20}
              containerStyle={{
                marginBottom: 24,
              }}
              disabled={!props.isValid}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.resetForm();
                navigation.navigate("Login");
                setSignupError("");
              }}
            >
              <Text style={styles.textButton}>Ya tengo una cuenta.</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <Text style={styles.title}>Crear una cuenta ({tipoAlta})</Text>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={isLoading}
        //Text with the Spinner
        textContent={"Cargando..."}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />
      <ScrollView>{formUserV2()}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eaf6",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: SizesTxt.big,
    fontWeight: "600",
    color: "black",
    alignSelf: "center",
    paddingBottom: 24,
  },
  button: {
    alignItems: "center",
  },
  textButton: {
    color: "#0000FF",
    fontSize: 18,
  },
  errorMsg: {
    color: "#ff0e0e",
    fontSize: SizesTxt.small,
    marginBottom: 10,
    fontWeight: "600",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
