/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import axios from 'axios';

import ListComponent from './src/Components/ListComponent';

const App = () => {
  const [laureates, setLaureates] = useState(null);
  const [statePrizeYear, setStatePrizeYear] = useState(1900);

  const getData = () => {
    axios
      .get('http://api.nobelprize.org/v1/laureate.json')
      .then(result => {
        setLaureates(() => result.data.laureates);
      })
      .catch(err => console.log('ERR', err));
  };

  const DecreaseButton = () => {
    if (statePrizeYear > 1900) {
      return (
        <Button
          title="-10 лет"
          onPress={() => {
            setStatePrizeYear(() => statePrizeYear - 10);
          }}
        />
      );
    }
    return null;
  };

  const IncreaseButton = () => {
    if (statePrizeYear < 2020) {
      return (
        <Button
          title="+10 лет"
          onPress={() => {
            setStatePrizeYear(() => statePrizeYear + 10);
          }}
        />
      );
    }
    return null;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <View style={{flexDirection: 'row'}}></View>
      <Text style={{textAlign: 'center'}}>
        Лауреаты нобелевской премии из России, СССР, Российской Империи, за
        период
      </Text>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <DecreaseButton />
        <Text
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            marginHorizontal: 10,
          }}>
          с {statePrizeYear} по {statePrizeYear + 10}
        </Text>
        <IncreaseButton />
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <Text style={{flex: 0.7}}>Имя</Text>
        <Text style={{flex: 1}}>Фамилия</Text>
        <Text style={{flex: 1}}>Область</Text>
        <Text style={{flex: 1}}>Год получения</Text>
      </View>
      <ListComponent data={laureates} year={statePrizeYear} />
    </View>
  );
};

export default App;
