import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

interface MenuProps {
  onPlayPress: (player1: string, player2: string) => void;
}

const Menu: React.FC<MenuProps> = ({onPlayPress}) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handlePlay = () => {
    onPlayPress(player1, player2);
  };

  return (
    <View style={styles.menuContainer}>
      <TextInput
        placeholder="Player 1"
        style={styles.input}
        onChangeText={text => setPlayer1(text)}
      />
      <TextInput
        placeholder="Player 2"
        style={styles.input}
        onChangeText={text => setPlayer2(text)}
      />
      <View>
        <TouchableOpacity style={styles.btn} onPress={handlePlay}>
          <Text style={styles.btnText}>Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    flexGrow: 1,
    padding: 20,
  },
  input: {
    fontSize: 24,
    margin: 10,
    padding: 5,
    borderColor: '#f00',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
  },
  btn: {
    backgroundColor: '#ff7777',
    padding: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    fontWeight: '700',
    fontSize: 20,
  },
});
