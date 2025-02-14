import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button, InputField, ErrorMessage } from "../components";
import Firebase from "../config/firebase";
import { Formik, useFormikContext } from "formik";
import { loginValidationSchema } from "../schemas/loginSchema";
import Spinner from "react-native-loading-spinner-overlay";

const auth = Firebase.auth();

export default function LoginScreen({ navigation }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { validateForm } = useFormikContext;
  const [isMockLogin, setIsMockLogin] = useState(false);

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

  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <Text style={styles.title}>Ingreso a la app</Text>
      <Spinner
        visible={isLoading}
        textContent={"Cargando..."}
        textStyle={StyleSheet.flatten(styles.spinnerTextStyle)}
      />
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { resetForm }) => {
          if (values.email !== "" && values.password !== "") {
            setIsLoading(true);
            auth
              .signInWithEmailAndPassword(values.email, values.password)
              .then(() => {
                setTimeout(() => {
                  setIsLoading(false);
                  resetForm();
                }, 3000);
              })
              .catch((error) => {
                setTimeout(() => {
                  resetForm();
                  setIsLoading(false);
                  setLoginError(error);
                }, 3000);
              });
          }
        }}
      >
        {(props) => (
          <View>
            <InputField
              inputStyle={{
                fontSize: 24,
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
            <InputField
              inputStyle={{
                fontSize: 24,
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
              handlePasswordVisibility={handlePasswordVisibility}
              onChangeText={() => {
                setIsMockLogin(true);
                props.handleChange("password");
              }}
              onBlur={props.handleBlur("password")}
              value={props.values.password}
            />
            {loginError ? (
              <ErrorMessage error={loginError} visible={true} />
            ) : null}
            {props.errors.email && props.dirty && props.touched.email && (
              <Text style={styles.errorMsg}>{props.errors.email}</Text>
            )}
            {props.errors.password && props.dirty && props.touched.password && (
              <Text style={styles.errorMsg}>{props.errors.password}</Text>
            )}
            <Button
              onPress={props.handleSubmit}
              backgroundColor="#757ce8"
              title="Ingreso"
              tileColor="#fff"
              titleSize={20}
              containerStyle={{
                marginBottom: 10,
                height: 60,
              }}
              disabled={!props.isValid && !isMockLogin}
            />
            <Button
              onPress={() => {
                props.resetForm();
                setLoginError("");
                navigation.navigate("BotonesAltas");
              }}
              title="Registrarme"
              backgroundColor="#ff7961"
              titleSize={20}
              containerStyle={{
                marginBottom: 10,
                height: 60,
              }}
            />
            <Button
              onPress={() => {
                props.setFieldValue('email', 'admin@admin.com');
                props.setFieldValue('password', '123456');
                setIsMockLogin(true);
              }}
              title='Prueba administrador'
              backgroundColor='gray'
              titleSize={20}
              containerStyle={{
                marginBottom: 1,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'gray',
                borderStyle: 'dashed',
                height: 100
              }}
            />
            <Button
              onPress={() => {
                props.setFieldValue('email', 'invitado@invitado.com');
                props.setFieldValue('password', '123456');
                setIsMockLogin(true);
              }}
              title='Prueba invitado'
              backgroundColor='red'
              titleSize={20}
              containerStyle={{
                marginBottom: 1,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'gray',
                borderStyle: 'dashed',
                height: 100
              }}
            />
            {/*
            <Button
              onPress={() => {
                props.setFieldValue('email', 'tester@tester.com');
                props.setFieldValue('password', '123456');
                setIsMockLogin(true);
              }}
              title='prueba desarrollador'
              backgroundColor='gray'
              titleSize={20}
              containerStyle={{
                marginBottom: 1,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'gray',
                borderStyle: 'dashed',
                height: 100
              }}
            /> */}
          </View>
        )}
      </Formik>
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
    fontSize: 50,
    fontWeight: "600",
    color: "#ADDEC8",
    alignSelf: "center",
    paddingBottom: 24,
    fontWeight: "bold",
  },
  errorMsg: {
    color: "#ff0e0e",
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "600",
  },
  spinnerTextStyle: {
    color: "#fff",
  },
});
