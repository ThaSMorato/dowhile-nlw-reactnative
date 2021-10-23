import React, { useState } from "react";
import { Alert, Keyboard, TextInput, View } from "react-native";
import { api } from "../../services/api";
import { COLORS } from "../../theme";
import Button from "../Button";

import { styles } from "./styles";

const SendMessageForm = () => {
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  const handleMessageSubmit = async () => {
    const messageFormatted = message.trim();
    if (messageFormatted.length > 0) {
      setSendingMessage(true);

      await api.post("messages", { message: messageFormatted });

      setMessage("");
      Keyboard.dismiss();
      setSendingMessage(false);
    } else {
      Alert.alert("Escreva a mesnsagem para enviar.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance='dark'
        placeholder='Qual sua expectativa para o evento'
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        style={styles.input}
        editable={!sendingMessage}
      />

      <Button
        title='Enviar mensagem'
        isLoading={sendingMessage}
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        onPress={handleMessageSubmit}
      />
    </View>
  );
};

export default SendMessageForm;
