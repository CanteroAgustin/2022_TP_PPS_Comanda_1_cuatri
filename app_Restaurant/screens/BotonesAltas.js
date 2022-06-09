import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import React, { Component } from "react";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const BotonesAltas = (props) => {
  const { navigation } = props;
  const goToAlta = (bgColor, tittle, tipoAlta) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: bgColor,
          width: WIDTH,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          navigation.navigate("Signup", {
            tipoAlta: tipoAlta,
          });
        }}
      >
        <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
          {tittle}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      {goToAlta("violet", "Alta dueño / Supervisor", "DuenioSupervisor")}
      {goToAlta("blue", "Alta de empleados", "Empleados")}
      {goToAlta("purple", "Alta de mesa", "Mesa")}
      {goToAlta("orange", "Alta de Producto", "Producto")}
    </View>
  );
};

export default BotonesAltas;
