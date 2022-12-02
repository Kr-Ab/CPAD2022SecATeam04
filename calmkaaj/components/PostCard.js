import React, {useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../styles/FeedStyles';

import { Alert } from 'react-native';

import ProgressiveImage from './ProgressiveImage';

import {AuthContext} from '../navigation/AuthProvider';

import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const PostCard = ({item, onDelete, onPress}) => {
  const {user} = useContext(AuthContext);
  const [currentUser, setcurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);

  let likeIcon = item.liked ? 'heart' : 'heart-outline';
  let likeIconColor = item.liked ? '#2e64e5' : '#333';

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          // console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  const getCurrentUser = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        // console.log(documentSnapshot)
        if (documentSnapshot.exists) {
          setcurrentUser(documentSnapshot.data());
        }
      });
  }

  const onReach = async () => {
    await getCurrentUser().then( () => {
      let message = `Hey ${userData.fname + " " + userData.lname},\nI am ${currentUser.fname + " " + currentUser.lname} and I am interested in your post titled "${item.post}".\nPlease contact me at ${currentUser.phone != null ? currentUser.phone : currentUser.email}.`
      firestore()
      .collection('messages')
      .add({
        userId: user.uid,
        userName: currentUser.fname + " " + currentUser.lname,
        userImg: currentUser.userImg,
        messageTime: firestore.Timestamp.fromDate(new Date()),
        postUserId: item.userId,
        messageText: message,
      }).then(() => {
        Alert.alert("User Contacted");
      }).catch( err => {
        console.log(err)
        Alert.alert("Unable to contact the person");
      })
    }).catch( err => {
      Alert.alert("Unable to reach user.\n Please try again!")
    })
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Card key={item.id}>
      <UserInfo>
      {item.showinteractions != null ? (
        <UserImg
          source={{uri: item.userImg}}
        />
      ) : (
        <UserImg
          source={{
            uri: userData
              ? userData.userImg ||
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}
        />
      )}
        <UserInfoText>
          <TouchableOpacity onPress={onPress}>
            {item.showinteractions != null ? (
              <UserName>
                {item.userName}
              </UserName>
            ) : (
              <UserName>
                {userData ? userData.fname || 'Test' : 'Test'}{' '}
                {userData ? userData.lname || 'User' : 'User'}
              </UserName>
            )}
          </TouchableOpacity>
          <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {/* {item.postImg != null ? <PostImg source={{uri: item.postImg}} /> : <Divider />} */}
      {item.postImg != null ? (
        <ProgressiveImage
          defaultImageSource={require('../assets/default-img.jpg')}
          source={{uri: item.postImg}}
          style={{width: '100%', height: 250}}
          resizeMode="cover"
        />
      ) : (
        <Divider />
      )}

      <InteractionWrapper>
        {user.uid != item.userId ? (
          <Interaction active={false} onPress={() => onReach()}>
            <Ionicons name='chatbox-ellipses-outline' size={25} color='#fff' />
            <InteractionText active={false}>Reach</InteractionText>
          </Interaction>
        ) : null}
        {user.uid == item.userId ? (
          <Interaction onPress={() => onDelete(item.id)}>
            <Ionicons name="md-trash-bin" size={25} color='#fff' />
            <InteractionText>Delete</InteractionText>
          </Interaction>
        ) : null}
        </InteractionWrapper>
        {/* {item.showinteractions == null ? (
        ) : null} */}
    </Card>
  );
};

export default PostCard;
