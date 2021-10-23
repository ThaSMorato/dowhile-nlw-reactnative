import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { api } from "../../services/api";
import Message, { IMessage } from "../Message";

import { styles } from "./styles";

import { io } from "socket.io-client";

const socket = io(String(api.defaults.baseURL));

let messageQueue: IMessage[] = [];

socket.on("new_message", (newMessage) => messageQueue.push(newMessage));

const MessageList: React.FC = () => {
  const [currentMessages, setCurrentMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messageResponse = await api.get<IMessage[]>("messages/last3");
      setCurrentMessages(messageResponse.data);
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messageQueue.length > 0) {
        setCurrentMessages((messages) => [messageQueue[0], messages[0], messages[1]]);
        messageQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps='never'>
      {currentMessages.map((message) => (
        <Message key={message.id} data={message} />
      ))}
    </ScrollView>
  );
};

export default MessageList;
