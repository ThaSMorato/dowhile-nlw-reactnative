import React from "react";
import { View } from "react-native";
import { useAuth } from "../../hooks/auth";
import { COLORS } from "../../theme";
import Button from "../Button";

import { styles } from "./styles";

const SignInBox = () => {
  const { signIn, isSigningIn } = useAuth();

  return (
    <View style={styles.container}>
      <Button
        title='Entrar com o Github'
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        icon='github'
        isLoading={isSigningIn}
        onPress={signIn}
      />
    </View>
  );
};

export default SignInBox;
