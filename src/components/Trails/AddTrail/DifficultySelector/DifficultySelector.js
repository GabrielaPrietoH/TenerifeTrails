import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { style } from './DifficultySelector.styles';


export function DifficultySelector ({ selectedDifficulty, onSelectDifficulty }) 
 {
  const difficulties = [
    { color: '#00a680', value: 'verde' },
    { color: '#ffcc00', value: 'amarillo' },
    { color: '#ff0000', value: 'rojo' },
  ];

  return (
    <View style={style.container}>
      <Text style={style.text}>Nivel de Dificultad:</Text>
      {difficulties.map((difficulty) => (
        <TouchableOpacity
          key={difficulty.value}
          style={[
            style.difficultyButton,
            { backgroundColor: difficulty.color },
            selectedDifficulty === difficulty.value && style.selectedButton,
          ]}
          onPress={() => onSelectDifficulty(difficulty.value)}
        />
      ))}
    </View>
  );
};
