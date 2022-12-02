import { React, useState, useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyles';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';
import ProgressiveImage from '../components/ProgressiveImage';
import PostCard from '../components/PostCard';
import moment from 'moment';

// const Messages = [
//   {
//     id: '1',
//     userName: 'Jenny Doe',
//     userImg: require('../assets/users/user-3.jpg'),
//     messageTime: '4 mins ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
//   {
//     id: '2',
//     userName: 'John Doe',
//     userImg: require('../assets/users/user-1.jpg'),
//     messageTime: '2 hours ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
//   {
//     id: '3',
//     userName: 'Ken William',
//     userImg: require('../assets/users/user-4.jpg'),
//     messageTime: '1 hours ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
//   {
//     id: '4',
//     userName: 'Selina Paul',
//     userImg: require('../assets/users/user-6.jpg'),
//     messageTime: '1 day ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
//   {
//     id: '5',
//     userName: 'Christy Alex',
//     userImg: require('../assets/users/user-7.jpg'),
//     messageTime: '2 days ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
// ];



const MessagesScreen = ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchMessages = async () => {
    try {
      const list = [];

      await firestore()
        .collection('messages')
        .where('postUserId', '==', user.uid)
        .orderBy('messageTime', 'desc')
        .get()
        .then((querySnapshot) => {
          console.log('Total Messages: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              userId,
              userName,
              userImg,
              messageTime,
              postUserId,
              messageText,
            } = doc.data();
            list.push({
              id: doc.id,
              userName,
              userImg,
              messageTime,
              messageText,
              postUserId
            });
          });
        });
        console.log(list)
      setMessages(list);

      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <Container>
      <FlatList 
        data={messages}
        keyExtractor={item=>item.id}
        renderItem={({item}) => (
          <PostCard
            item={{
              id: item.id,
              post: item.messageText,
              postImg: null,
              postTime: item.messageTime,
              userId: item.postUserId,
              userImg: item.userImg,
              userName: item.userName,
              showinteractions: false
            }}
          />
        )}
      />
    </Container>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
