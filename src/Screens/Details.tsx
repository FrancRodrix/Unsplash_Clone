import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Share,
  FlatList,
  ScrollView,
} from 'react-native';
import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import DownloadingController from '../Helpers/DownloadFile';

interface Props {
  navigation: any;
  route: any;
}
export default function Details(props: Props) {
  const data = props.route.params.data;
  const relatedQuery = props.route.params.data.user.first_name;
  //   console.log(props.route.params.data.user.first_name,"KKKKK")
  const [item, setItem] = useState(data);
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    searchPhotos();
  }, [relatedItems]);

  const searchPhotos = async () => {
    try {
      await Axios.get(
        `https://api.unsplash.com/search/photos?client_id=o5QIFPW3xkc3d1svOzCirLZB19n-NTi4mvCH7QJ5t_w&query=${relatedQuery}&page=1`,
      ).then((response: any) => {
        // console.log(response.data,"search")

        setRelatedItems(response.data.results);
        //    console.log(relatedItems,"PAVLLO")
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'App link',
        message: 'Please install this app and download unlimited photos ,',
        url: 'https://unsplash.com',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };

  const like = (item: any) => {
    item.isLiked = !item.isLiked;
    setItem({...item});
  };


  const imageSizes = (item: any) => {
    item.sizeWindow = !item.sizeWindow;
    setItem({...item});
  };

  return (
    <ScrollView style={{marginBottom: 20}}>
      <View
       
        style={styles.card}>
        <View style={styles.nameCol}>
          <Image
            source={{uri: item.user.profile_image.small}}
            style={styles.profile}
          />
          <Text style={styles.name}>{item.user.name}</Text>
        </View>

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
        <Image style={styles.image} source={{uri: item.urls.regular}} />

        <View style={styles.shareColumn}>
          <TouchableOpacity
            onPress={() => {
              onShare();
            }}
            style={styles.share}>
            <Image
              style={styles.shareImg}
              source={require('../../assets/img/sh.png')}
            />
          </TouchableOpacity>
          <View style={styles.share}>
            <Image
              style={styles.shareImg}
              source={require('../../assets/img/info.png')}
            />
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

        <View style={styles.viewsColumn}>
          <Text style={styles.views}>Views</Text>
          <Text style={styles.count}>1,57786</Text>
        </View>

        <View style={{paddingTop: 20}}>
          <Text style={styles.views1}>Downloads</Text>
          <Text style={styles.count}>1,8689</Text>
        </View>
      </View>
     { relatedItems.length>0?(
      <Text style={styles.relative}>Related Photos</Text>

     ):(
      null
     )}
      {
        relatedItems.length>0?(
          <View style={{marginHorizontal: 10}}>
        
          <FlatList
            data={relatedItems}
            numColumns={2}
            renderItem={({item, index}) => {
              return (
                <View>
                  <Image
                    style={styles.relatedimage}
                    source={{uri: item.urls.regular}}
                  />
                </View>
              );
            }}
          />
        </View>

        ):(
          null
        )
      }
   
    </ScrollView>
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
    height: 300,
  },
  relatedimage: {
    width: 200,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
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
    // transform: [{ rotate: '180deg'}]
  },
  likeImg: {
    alignSelf: 'center',
    width: 19,
    height: 18,
  },
  sizeColumn: {
    position: 'absolute',
    right: 10,
    top: 140,
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
  shareColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 10,
    // marginHorizontal:10
  },
  share: {
    borderWidth: 1,
    width: 25,
    height: 25,
    marginRight: 5,
    borderRadius: 5,
    borderColor: '#737373',
  },
  report: {
    borderWidth: 1,
    width: 35,
    height: 25,
    borderRadius: 5,
    borderColor: '#737373',
  },
  shareImg: {
    alignSelf: 'center',
    width: 15,
    height: 16,
    marginTop: 4,
  },
  viewsColumn: {
    position: 'absolute',
    bottom: 60,
  },
  views: {
    fontSize: 15,
    marginLeft: 8,
  },
  views1: {
    marginTop: 5,
    fontSize: 15,
    marginLeft: 8,
  },
  count: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
  },
  relative: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: '#000',
    paddingBottom:10
  },
});
