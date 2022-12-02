import { React, useState, useEffect, useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import {
  Container,
} from '../styles/MessageStyles';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';
import PostCard from '../components/PostCard';

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
