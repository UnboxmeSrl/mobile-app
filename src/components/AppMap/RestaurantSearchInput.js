import React, {useCallback, useEffect, useState} from 'react';
import {CustomTextInput} from '../Custom';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import _ from 'lodash';
import {getSearchRestaurants} from '../../services';
import {TouchableOpacity} from 'react-native-gesture-handler';

// #region Child Components
const ListItem = ({text}) => (
  <View style={styles.item}>
    <Text style={styles.name}>{text}</Text>
  </View>
);

// #endregion Child Components

function RestaurantSearchInput({onPressRestaurant = () => {}}) {
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(true);
  const [restaurants, setRestaurants] = useState([]);

  const RenderListItem = useCallback(
    ({item}) => (
      <TouchableOpacity
        onPress={() => {
          onPressRestaurant?.(item);
          setSearch('');
          setRestaurants([]);
        }}>
        <ListItem text={item.Name} />
      </TouchableOpacity>
    ),
    [onPressRestaurant],
  );

  const fetchRestaurants = useCallback(async query => {
    setIsSearching(true);
    const rests = await getSearchRestaurants({search: query});
    setRestaurants(rests);
    setIsSearching(false);
    // console.log('rests', rests);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    _.debounce(fetchRestaurants, 500), // Adjust the debounce delay as needed
    [],
  );

  useEffect(() => {
    if (search) {
      debouncedSearch(search);
    }
    // Cleanup function to cancel debounce in case the component unmounts
    return () => {
      debouncedSearch.cancel();
    };
  }, [search, debouncedSearch]);

  return (
    <View style={styles.container}>
      <CustomTextInput
        style={styles.input}
        placeholder={'Search'}
        value={search}
        isRemoveTextIconVisible
        handleOnChangeText={setSearch}
        returnKeyType="search"
      />
      {isSearching && !!search && (
        <View style={styles.list}>
          <ListItem text="Searching..." />
        </View>
      )}
      {!!search && !isSearching && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={restaurants}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={<View style={styles.separator} />}
          renderItem={RenderListItem}
          ListEmptyComponent={<ListItem text="No results found" />}
          style={styles.list}
        />
      )}
    </View>
  );
}

export default RestaurantSearchInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    borderRadius: 10,
    width: '88%',
    marginTop: 10, // Adjust based on your input's height and margin
    backgroundColor: 'white',
    maxHeight: 300,
    overflow: 'hidden',
  },
  input: {
    backgroundColor: 'white',
  },
  name: {
    color: 'black',
  },
  item: {
    padding: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
  },
});
