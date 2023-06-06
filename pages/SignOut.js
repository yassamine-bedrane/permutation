import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SignOut = ({ onLogout }) => {
  const handleLogout = () => {
    // Perform logout actions
    onLogout(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Out</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SignOut;
