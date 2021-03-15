import React from 'react';
import {View, Text, FlatList} from 'react-native';

const ListComponent = ({data, year}) => {
  if (data) {
    const filteredData = data.filter(item => {
      return (
        item.bornCountryCode === 'RU' ||
        item.bornCountryCode === 'AZ' ||
        item.bornCountryCode === 'PL'
      );
    });

    let arrSort = [];

    filteredData.map(item => {
      const prize = item.prizes.map(res => {
        const result = {prizeYear: res.year, prizeCategory: res.category};
        return result;
      });

      const {prizeYear, prizeCategory} = prize[0];

      if (prizeYear > year && prizeYear < year + 10) {
        arrSort.push({
          id: item.id,
          firstname: item.firstname,
          surname: item.surname,
          year: prizeYear,
          category: prizeCategory,
        });
        arrSort.sort((a, b) => {
          return a.year - b.year;
        });

        console.log(arrSort);
      }
    });
    console.log('arr', arrSort);
    return (
      <FlatList
        data={arrSort}
        renderItem={item => {
          console.log('item', item);
          return (
            <View
              key={item.index}
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={{flex: 0.7}}>{item.item.firstname}</Text>
              <Text style={{flex: 1}}>{item.item.surname}</Text>
              <Text style={{flex: 1}}>{item.item.category}</Text>
              <Text style={{flex: 1}}>{item.item.year}</Text>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
    );
  }
  return null;
};

export default ListComponent;
