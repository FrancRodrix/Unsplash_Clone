import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Axios from 'axios';
import DownloadingController from '../Helpers/DownloadFile';
import {setSignOut} from '../Redux/AuthSlice';
// import { SafeAreaView } from 'react-native';

interface Props {
  navigation: any;
  route: any;
}

export default function Home(props: Props) {
  const BASE_URL = 'https://api.unsplash.com';
  const [images, setImages] = useState([]);
  const [searchImages, setSearchImages] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSeach, setIsSearch] = useState(false);
  const [logBox, setLogBox] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getRandomPhotos();
  }, []);


//   Random Photos
  const getRandomPhotos = async () => {
    try {
      await Axios.get(
        BASE_URL +
          '/photos/?client_id=o5QIFPW3xkc3d1svOzCirLZB19n-NTi4mvCH7QJ5t_w',
      ).then(response => {
        setSearchResults([]);
        var tempData = response.data;
        tempData.map((item: any) => {
          item['isLiked'] = false;
          item['sizeWindow'] = false;
        });
        setImages(tempData);
      });
    } catch (error) {
      console.log(error);
    }
  };


// Search Photos
  const searchPhotos = async (query: any) => {
    try {
      await Axios.get(
        `https://api.unsplash.com/search/photos?client_id=o5QIFPW3xkc3d1svOzCirLZB19n-NTi4mvCH7QJ5t_w&query=${query}&page=1`,
      ).then(response => {
        console.log(response.data.results, 'search');
        setImages([]);
        var tempData = response.data.results;
        tempData.map((item: any) => {
          item['isLiked'] = false;
        });
        setImages(tempData);

        setSearchResults(tempData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //   Like Function
  const like = (item: any) => {
    images.map((a: any) => {
      console.log(item.id, 'YHYHG');
      if (a.id === item.id) {
        item.isLiked = !item.isLiked;
      }
    });
    setImages([...images]);
  };

//   Image Dialoge Box Function
  const imageSizes = (item: any) => {
    images.map((a: any) => {
      console.log(item.id, 'YHYHG');
      if (a.id === item.id) {
        item.sizeWindow = !item.sizeWindow;
      }
    });
    setImages([...images]);
  };


//   Search Function
  const handleSearch = (text: any) => {
    setSearchImages(text);
    if (text.length > 0) {
      setIsSearch(true);
      searchPhotos(text);
    } else {
      setIsSearch(false);
      getRandomPhotos();
    }
  };

//  Flat list Render Design

  const displayImages = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Details', {
            data: item,
          });
        }}
        style={styles.card}>
        <View style={styles.nameCol}>
          <Image
            source={{uri: item.user.profile_image.small}}
            style={styles.profile}
          />
          <Text style={styles.name}>{item.user.name}</Text>
        </View>
        <ImageBackground
          style={styles.image}
          source={{uri: item.urls.regular}}></ImageBackground>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              like(item);
            }}
            style={styles.like}>
            {item.isLiked ? (
              <Image
                style={styles.likeImg}
                source={require('../../assets/img/like.png')}
              />
            ) : (
              <Image
                style={styles.likeImg}
                source={require('../../assets/img/dislike.png')}
              />
            )}
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                const dc = new DownloadingController();
                dc._checkPermission(item.urls.full);
              }}
              style={styles.download}>
              <Text style={styles.downloadText}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                imageSizes(item);
              }}
              style={styles.arrow}>
              <Image
                style={styles.arrowImg}
                source={require('../../assets/img/down-arrow.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {item.sizeWindow ? (
          <View style={styles.sizeColumn}>
            <TouchableOpacity
              onPress={() => {
                const sc = new DownloadingController();
                sc._checkPermission(item.urls.small);
              }}>
              <Text style={styles.imgSize}>
                Small<Text style={styles.pixel}>(640x426)</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const sc = new DownloadingController();
                sc._checkPermission(item.urls.regular);
              }}>
              <Text style={styles.imgSize}>
                Medium<Text style={styles.pixel}>(1920x1280)</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const sc = new DownloadingController();
                sc._checkPermission(item.urls.full);
              }}>
              <Text style={styles.imgSize}>
                Large<Text style={styles.pixel}>(2400x1600)</Text>
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        <View>

      <View style={styles.navBar}>
        <Image
          source={require('../../assets/img/logo.png')}
          style={styles.logo}
        />
        <TextInput
          placeholder="Search photos"
          style={styles.searchBar}
          placeholderTextColor={'#000'}
          onChangeText={text => {
            handleSearch(text);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setLogBox(!logBox);
          }}>
          <Image
            source={require('../../assets/img/profile.png')}
            style={styles.logo}
          />
        </TouchableOpacity>

        <Image
          source={require('../../assets/img/bar.png')}
          style={styles.logo}
        />
      </View>
      {isSeach == false ? (
        <FlatList
          testID="flaltList1"
          data={images}
          renderItem={displayImages}
        />
      ) : null}
      {isSeach && <FlatList data={searchResults} renderItem={displayImages} />}
      {logBox ? (
        <TouchableOpacity
          onPress={() => {
            dispatch(setSignOut());
          }}
          style={styles.logoutColumn}>
          <Text style={styles.logText}>LOGOUT</Text>
        </TouchableOpacity>
      ) : null}
              </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    width: 30,
    height: 30,
  },
  searchBar: {
    height: 40,
    width: '65%',
    backgroundColor: '#c5c5c5',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  image: {
    width: '100%',
    height: 600,
  },
  profile: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 10,
  },
  card: {
    marginBottom: 20,
  },
  nameCol: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    marginHorizontal: 12,
  },
  like: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#737373',
    paddingTop: 8,
  },
  download: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#737373',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    // backgroundColor:'#BEBEBE'
  },
  downloadText: {
    color: '#000',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  arrow: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#737373',
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
  },
  arrowImg: {
    alignSelf: 'center',
    width: 19,
    height: 18,
    transform: [{rotate: '180deg'}],
  },
  likeImg: {
    alignSelf: 'center',
    width: 19,
    height: 18,
  },
  sizeColumn: {
    position: 'absolute',
    right: 10,
    bottom: 60,
    backgroundColor: '#000',
    width: 190,
    height: 160,
    padding: 10,
  },
  imgSize: {
    fontSize: 15,
    color: '#fff',
    paddingVertical: 10,
    textAlign: 'right',
    letterSpacing: 1.2,
  },
  pixel: {
    color: '#bcbcbc',
  },
  logoutColumn: {
    position: 'absolute',
    top: 70,
    right: 40,
    width: 100,
    height: 65,
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
  },
  logText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    paddingTop: 8,
    letterSpacing: 1.5,
  },
});
