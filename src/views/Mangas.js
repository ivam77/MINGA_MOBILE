import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import inputActions from "../../redux/actions/mangas";
import axios from 'axios';
import menu from '../../assets/icono-menu.png';
import logo from '../../assets/minga-logo.png';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput, ScrollView,
  ImageBackground
} from 'react-native';

const MangasScreen = (props) => {
  const dispatch = useDispatch();
  const [mangas, setMangas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const checks = useSelector((store) => store.check.checks);
  const text = useSelector((store) => store.check.text);

  const dispatchFilters = (check) => {
    let payload = [];
    if (!checks.includes(check)) {
      payload = [...checks, check];
      dispatch(inputActions.changeChecks([...checks, check]));
    } else {
      payload = checks.filter((category) => category !== check);
    }
    dispatch(inputActions.changeChecks(payload));
  };

  const getMangas = async () => {
    try {
      let { data } = await axios.get("https://mingabackblueteam-production.up.railway.app/api/mangas" + `?title=${text}&category_id=${checks}&page=${page}`);
      setMangas(data.mangas);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      let { data } = await axios.get("https://mingabackblueteam-production.up.railway.app/api/categories");
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const resetFilters = () => {
    setCategoriesSelected([]);
    dispatch(inputActions.changeChecks([]));
  };

  const goToPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    getMangas();
    getCategories();
  }, [text, checks, page]);

  const handleChangeText = (text) => {
    dispatch(inputActions.changeText(text));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground source={require('../../assets/background-mangas.png')} style={styles.imageBackground} >
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            <Image source={menu} style={styles.menu} />
          </TouchableOpacity>
          <Image source={logo} style={styles.logo} />
        </View>
          <Text style={styles.title}>Mangas</Text>
          <View style={styles.searchContainer}>
            <TextInput style={styles.searchInput} onChangeText={handleChangeText} placeholder="Find your manga here" />
          </View>
        </ImageBackground>
        <View style={styles.mangasContainer}>
          <View style={styles.categoryContainer}>
            <TouchableOpacity onPress={() => resetFilters()} style={[styles.categoryAll, { backgroundColor: '#4338CA' }]}>
              <Text style={styles.categoryButtonText}>All</Text>
            </TouchableOpacity>
            {categories.map((category) => (
              <TouchableOpacity key={category._id} onPress={() => dispatchFilters(category._id)} style={[styles.categoryButton, { backgroundColor: checks?.includes(category._id) ? category.hover : category.color, }]} >
                <Text style={styles.categoryButtonText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.mangaContainer}>
            {mangas.length > 0
              ?
              (mangas.map((manga) => (
                <TouchableOpacity key={manga._id} style={styles.mangaCard} >
                  <View style={styles.cardContent}>
                    <Text style={styles.mangaTitle}>{manga.title}</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('MangaDetail', { mangaId: manga._id })} style={styles.detailButton}>
                      <Text style={styles.detailText}>Read</Text>
                    </TouchableOpacity>
                  </View>
                  <Image source={{ uri: manga.cover_photo }} style={styles.mangaImage} />
                </TouchableOpacity>
              ))
              )
              :
              <Text style={styles.noMangaFounded}>No mangas were founded with the selected filters.</Text>
            }
          </View>
          <View style={styles.paginationContainer}>
            <TouchableOpacity onPress={goToPrevPage} disabled={page == 1} style={[styles.paginationButton, page == 1 && styles.disabledButton]}>
              <Text style={styles.paginationButtonText}>Prev</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToNextPage} disabled={page == totalPages} style={[styles.paginationButton, page == totalPages && styles.disabledButton]}>
              <Text style={styles.paginationButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default MangasScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    paddingTop: 20,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  logo: {
    width: 54,
    height: 32,
    resizeMode: 'contain',
  },
  menu: {
    width: 55,
    height: 55,
  },
  imageBackground: {
    height: 350
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 90,
    marginBottom: 45,
    color: 'white'
  },
  searchInput: {
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 80,
    width: '90%',
    height: 50,
    fontSize: 22
  },
  mangasContainer: {
    width: '100%',
    backgroundColor: '#EBEBEB',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    marginTop: -30
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  categoryAll: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    marginTop: 40
  },
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    marginTop: 40
  },
  categoryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mangaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  mangaCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    height: 180,
    elevation: 6
  },
  cardContent: {
    height: 150,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  mangaTitle: {
    width: 130,
    fontSize: 18,
    paddingStart: 25,
    paddingEnd: 5
  },
  detailButton: {
    width: 80,
    marginStart: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#D1FBF0',
    textAlign: 'center'
  },
  detailText: {
    textAlign: 'center',
    color: '#00BA88'
  },
  mangaImage: {
    width: 180,
    height: 180,
    resizeMode: 'cover',
    borderTopLeftRadius: 85,
    borderBottomLeftRadius: 85,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  paginationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#4338CA',
  },
  disabledButton: {
    backgroundColor: '#B8B8B8',
  },
  paginationButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})