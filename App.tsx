import {Image, SafeAreaView, StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState} from 'react';
import Menu from './Menu';
import Game from './Game';

const App = () => {
  const [isGame, setIsGame] = useState(false);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  const createEmptyNameAlert = () =>
    Alert.alert('Empty Names', 'Please fill out both name fields', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  const createLongNameAlert = () =>
    Alert.alert('Long Names', 'Names cannot be longer than 12 characters', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  const createSameNameAlert = () =>
    Alert.alert('Same Names', 'Both Players cannot be names the same', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  const handlePlayPress = (player1: string, player2: string) => {
    if (player1.length === 0 || player2.length === 0) {
      createEmptyNameAlert();
    } else if (player1.length > 12 || player2.length > 12) {
      createLongNameAlert();
    } else if (player1 === player2) {
      createSameNameAlert();
    } else {
      setPlayer1Name(player1);
      setPlayer2Name(player2);
      setIsGame(true);
    }
  };

  const handleMainMenuPress = () => {
    setIsGame(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Image style={styles.image} source={require('./reactlogo.png')} />
      <View style={styles.content}>
        {isGame ? (
          <Game
            onMainMenuPress={handleMainMenuPress}
            player1={player1Name}
            player2={player2Name}
          />
        ) : (
          <Menu onPlayPress={handlePlayPress} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 10,
    marginTop: 15,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#ff0000',
    marginTop: 15,
  },
});

// borderStyle: 'solid',
// borderColor: 'black',
// borderWidth: 1,
