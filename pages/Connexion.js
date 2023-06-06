import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';

const Connexion = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [professorData, setProfessorData] = useState(null);
  const [token, setToken] = useState(null);

  const handleLogin = () => {
    const lowercaseEmail = email.toLowerCase(); // Convert email to lowercase

    fetch('https://troubled-red-garb.cyclic.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: lowercaseEmail, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the response as JSON
        } else {
          throw new Error('Login failed');
        }
      })
      .then((data) => {
        // The response data contains the token
        const { token } = data;
        setToken(token); // Set the token

        // Fetch all professors
        return fetch('https://troubled-red-garb.cyclic.app/professeurs');
      })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the response as JSON
        } else {
          throw new Error('Failed to fetch professors');
        }
      })
      .then((professors) => {
        // Find the professor with the matching email
        const loggedInProfessor = professors.find(
          (professor) => professor.email === lowercaseEmail
        );

        if (!loggedInProfessor) {
          throw new Error('Professor not found');
        }

        // Pass the professor data to the onLogin callback
        onLogin(loggedInProfessor);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'An error occurred while logging in.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Adresse e-mail:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Mot de passe:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
});

export default Connexion;
