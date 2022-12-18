import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setSignIn} from '../Redux/AuthSlice';
import {EMAIL_ID, USER_NAME, PASSWORD} from './constants';

interface Props {
  navigation: any;
  route: any;
}

export default function Login(props: Props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState();
  const [auth, setAuth] = useState(false);
  const dispatch = useDispatch();


  const handleLogin = () => {
    if (EMAIL_ID !== userName || PASSWORD !== password) {
      ToastAndroid.showWithGravity(
        'PLease validate your credentials!!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      setAuth(true);
    }
    const user = {
      isLoggedIn: auth,
      email: userName,
      userName: USER_NAME,
      password: password,
    };
    dispatch(setSignIn(user));
  };

  

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/img/logo.png')}
      />
      <TextInput
        onChangeText={(text: any) => {
          setUserName(text);
        }}
        value={userName}
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor={'grey'}
      />
      <TextInput
        onChangeText={(text: any) => {
          setPassword(text);
        }}
        value={password}
        secureTextEntry={true}
        style={styles.textInput}
        placeholder="password"
        placeholderTextColor={'grey'}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          handleLogin();
        }}>
        <Text style={styles.submitText}>LOGIN</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bcbcbc',
  },
  textInput: {
    // borderWidth:1,
    borderColor: '#000',
    borderRadius: 10,
    width: '70%',
    textAlign: 'center',
    letterSpacing: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  submitButton: {
    width: '70%',
    backgroundColor: '#000',
    borderRadius: 10,
    marginTop: 15,
    padding: 15,
  },
  submitText: {
    color: '#fff',
    letterSpacing: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 10,
  },
});
