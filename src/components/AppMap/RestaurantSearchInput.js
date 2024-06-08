import React, {useCallback, useEffect, useState} from 'react';
import {CustomTextInput} from '../Custom';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import _ from 'lodash';
import {getSearchRestaurants} from '../../services';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../constants';

// #region Child Components

// #endregion Child Components

function RestaurantSearchInput({onPressRestaurant = () => {}}) {
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  console.log('restaurant', restaurants);
  const ListItem = ({text}) => (
    <View style={styles.item}>
      <Text style={styles.name}>{text}</Text>
    </View>
  );

  const RenderListItem = useCallback(
    ({item}) => {
      const name =
        item.Name.length > 23 ? item.Name.slice(0, 23) + '...' : item.Name;
      return (
        <TouchableOpacity
          style={styles.itemMain}
          onPress={() => {
            onPressRestaurant?.(item);
            setSearch('');
            setRestaurants([]);
          }}>
          <ListItem text={name} />
          {!!item.city && (
            <Text style={{marginRight: 12}}>{item.city?.CityName}</Text>
          )}
        </TouchableOpacity>
      );
    },
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
        placeholder={'Search by restaurant'}
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
        <View
          style={[
            styles.resultWrapper,
            !restaurants.length && {paddingVertical: 0},
          ]}>
          {!!restaurants.length && (
            <Text style={{marginLeft: moderateScale(12), color: 'black'}}>
              Did you mean?
            </Text>
          )}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={restaurants}
            keyExtractor={item => item.id.toString()}
            // ItemSeparatorComponent={<View style={styles.separator} />}
            renderItem={RenderListItem}
            ListEmptyComponent={<ListItem text="No results found" />}
            style={[styles.list, !restaurants.length && {marginTop: 0}]}
          />
        </View>
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
    paddingHorizontal: moderateScale(14),
    // backgroundColor: 'yellow',
  },
  list: {
    flex: 1,
    borderRadius: 10,
    width: '100%',
    marginTop: 10, // Adjust based on your input's height and margin
    backgroundColor: 'white',
    maxHeight: 300,
    overflow: 'hidden',
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
  },
  name: {
    color: 'black',
  },
  resultWrapper: {
    backgroundColor: 'white',
    width: '100%',
    marginVertical: moderateScale(12),
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(18),
    // backgroundColor: 'yellow',
  },
  itemMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 9,
    borderColor: '#00000015',
    marginVertical: 4,
    // backgroundColor: 'blue',
  },
  item: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(14),
    // backgroundColor: 'yellow'
    // width: '100%',
    // marginVertical: moderateScale(12),
  },
  // separator: {
  //   height: 1,
  //   backgroundColor: '#ccc',
  //   width: '100%',
  // },
});
