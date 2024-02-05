import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

let gameover = false;

interface GameProps {
  onMainMenuPress: () => void;
  player1: string;
  player2: string;
}

const Game: React.FC<GameProps> = ({onMainMenuPress, player1, player2}) => {
  const handleMenuPress = () => {
    restartGame();
    onMainMenuPress();
  };

  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const [moveHistory, setMoveHistory] = useState<
    {rowIndex: number; colIndex: number}[]
  >([]);

  const [turn, setTurn] = useState(player1);

  const handleBoxPress = (rowIndex: number, colIndex: number) => {
    if (!gameover && board[rowIndex][colIndex] === '') {
      const newBoard = [...board];
      if (turn === player1) {
        newBoard[rowIndex][colIndex] = 'X';
      } else {
        newBoard[rowIndex][colIndex] = 'O';
      }
      setBoard(newBoard);

      checkWinner();

      if (!gameover) {
        setMoveHistory([...moveHistory, {colIndex, rowIndex}]);
        setTurn(turn === player1 ? player2 : player1);
      }
    }
  };

  const restartGame = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setTurn(player1);
    gameover = false;
    setMoveHistory([]);
  };

  const checkWinner = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      const valueA = board[Math.floor(a / 3)][a % 3];
      const valueB = board[Math.floor(b / 3)][b % 3];
      const valueC = board[Math.floor(c / 3)][c % 3];
      // const valueA = board[a][a];
      // const valueB = board[b][b];
      // const valueC = board[c][c];

      if (valueA && valueA === valueB && valueA === valueC) {
        gameover = true;
        break;
      }
    }
  };

  const undo = () => {
    if (moveHistory.length > 0 && !gameover) {
      const lastMove = moveHistory.pop();

      if (lastMove) {
        const {rowIndex, colIndex} = lastMove;

        const newBoard = [...board];
        newBoard[rowIndex][colIndex] = '';

        setBoard(newBoard);
        setTurn(turn === player1 ? player2 : player1);
      }
    }
  };

  return (
    <View style={styles.gameContainer}>
      <Text style={styles.turn}>
        {gameover ? 'Winner: ' + turn : 'Playing: ' + turn}
      </Text>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((value, colIndex) => (
            <View
              key={colIndex}
              style={styles.box}
              onTouchEnd={() => handleBoxPress(rowIndex, colIndex)}>
              <Text style={styles.text}>{value}</Text>
            </View>
          ))}
        </View>
      ))}
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={restartGame} style={styles.btn}>
          <Text>Restart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={undo} style={styles.btn}>
          <Text>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMenuPress} style={styles.btn}>
          <Text>Main Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  box: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '900',
    fontSize: 50,
    color: 'red',
  },
  btnContainer: {
    marginTop: 25,
    flex: 1,
    flexGrow: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    padding: 10,
    backgroundColor: '#ff7777',
    borderRadius: 3,
    borderColor: 'black',
    borderWidth: 1,
  },
  turn: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
});
