import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, SafeAreaView, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import MultiSelect from 'react-native-multiple-select';

const Inscription = () => {
  const [specialiteOptions, setSpecialiteOptions] = useState([]);
  const [villeActuelleOptions, setVilleActuelleOptions] = useState([]);
  const [villeDesireeOptions, setVilleDesireeOptions] = useState([]);
  const [selectedSpecialite, setSelectedSpecialite] = useState('');
  const [selectedVilleActuelle, setSelectedVilleActuelle] = useState('');
  const [selectedVilleDesiree, setSelectedVilleDesiree] = useState([]);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [grade, setGrade] = useState('');
  const [etablissement, setEtablissement] = useState('');

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = () => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs')
      .then((response) => response.json())
      .then((data) => {
        setSpecialiteOptions(extractUniqueSpecialites(data));
        setVilleActuelleOptions(extractUniqueVilles(data));
        setVilleDesireeOptions(extractUniqueVilles(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const extractUniqueSpecialites = (professors) => {
    const uniqueSpecialites = [...new Set(professors.map((professor) => professor.specialite))];
    return uniqueSpecialites;
  };

  const extractUniqueVilles = (professors) => {
    const uniqueVilles = new Set();

    professors.forEach((professor) => {
      if (professor.villeFaculteActuelle) {
        uniqueVilles.add(professor.villeFaculteActuelle);
      }

      if (professor.villeDesiree) {
        professor.villeDesiree.split(';').forEach((ville) => {
          uniqueVilles.add(ville);
        });
      }
    });

    const uniqueVillesList = Array.from(uniqueVilles);

    return uniqueVillesList;
  };

  const handleRegistration = () => {
    if (
      nom === '' ||
      prenom === '' ||
      tel === '' ||
      email === '' ||
      password === '' ||
      grade === '' ||
      etablissement === ''
    ) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const requestBody = {
      nom: nom,
      prenom: prenom,
      tel: tel,
      email: email.toLowerCase(),
      password: password,
      grade: grade,
      faculteActuelle: etablissement,
      specialite: selectedSpecialite,
      villeFaculteActuelle: selectedVilleActuelle,
      villeDesiree: selectedVilleDesiree.join(';'),
    };

    fetch('https://troubled-red-garb.cyclic.app/professeurs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          Alert.alert('Succès', 'Bien enregistré. Vous pouvez maintenant rechercher une possibilité de permutation');
          console.log('Authentication successful');
          console.log('Token:', data.token);
          // Redirect or navigate to the logged-in screen
          setNom('');
          setPrenom('');
          setTel('');
          setEmail('');
          setPassword('');
          setGrade('');
          setEtablissement('');
          setSelectedSpecialite('');
          setSelectedVilleActuelle('');
          setSelectedVilleDesiree([]);

        } else {
          console.log('Registration failed');
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Inscription</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nom</Text>
          <TextInput style={styles.input} placeholder="Entrez votre nom" onChangeText={setNom} value={nom} />

          <Text style={styles.label}>Prénom</Text>
          <TextInput style={styles.input} placeholder="Entrez votre prénom" onChangeText={setPrenom} value={prenom} />

          <Text style={styles.label}>Téléphone</Text>
          <TextInput style={styles.input} placeholder="Entrez votre numéro de téléphone" onChangeText={setTel} value={tel} />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="Entrez votre adresse email" onChangeText={setEmail} value={email} />

          <Text style={styles.label}>Mot de passe</Text>
          <TextInput style={styles.input} secureTextEntry={true} placeholder="Entrez votre mot de passe" onChangeText={setPassword} value={password} />

          <Text style={styles.label}>Grade</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{
              label: 'Choisissez votre grade',
              value: null,
            }}
            items={[
              { label: 'PA', value: 'PA' },
              { label: 'PH', value: 'PH' },
              { label: 'PES', value: 'PES' },
              { label: 'Technicien', value: 'Technicien' },
              { label: 'Administrateur', value: 'Administrateur' },
              { label: 'PESQ', value: 'PESQ' },
              { label: 'Ingénieur', value: 'Ingénieur' },
            ]}
            onValueChange={setGrade}
            value={grade}
          />

          <Text style={styles.label}>Etablissement (abréviation: FST, FS, EST, ENSA ...)</Text>
          <TextInput style={styles.input} placeholder="Entrez votre établissement" onChangeText={setEtablissement} value={etablissement} />

          <Text style={styles.label}>Spécialité</Text>
          <RNPickerSelect
            placeholder={{ label: 'Toutes les spécialités', value: '' }}
            items={specialiteOptions.map((specialite) => ({ label: specialite, value: specialite }))}
            onValueChange={setSelectedSpecialite}
            value={selectedSpecialite}
            style={pickerSelectStyles}
          />

          <Text style={styles.label}>Ville Actuelle</Text>
          <RNPickerSelect
            placeholder={{ label: 'Toutes les villes actuelles', value: '' }}
            items={villeActuelleOptions.map((ville) => ({ label: ville, value: ville }))}
            onValueChange={setSelectedVilleActuelle}
            value={selectedVilleActuelle}
            style={pickerSelectStyles}
          />

          <Text style={styles.label}>Villes Désirées</Text>
          <MultiSelect
            items={villeDesireeOptions.map((ville) => ({ id: ville, name: ville }))}
            uniqueKey="id"
            onSelectedItemsChange={setSelectedVilleDesiree}
            selectedItems={selectedVilleDesiree}
            selectText="Toutes les villes désirées"
            searchInputPlaceholderText="Rechercher..."
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#CCC"
            submitButtonText="Valider"
          />

          <Button title="S'inscrire" onPress={handleRegistration} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 50,
    paddingBottom: 70,
  },

  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
  },
  inputAndroid: {
    height: 40,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
  },
});

export default Inscription;
