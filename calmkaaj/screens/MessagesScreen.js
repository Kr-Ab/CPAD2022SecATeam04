import { React, useState, useEffect, useContext } from 'react';
import { StyleSheet, FlatList, Alert } from 'react-native';
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
          // // console.log('Total Messages: ', querySnapshot.size);

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
      setMessages(list);

      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = (postId) => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deleteMessage(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deleteMessage = (postId) => {
    firestore()
      .collection('messages')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'Your post has been deleted successfully!',
        );
        setDeleted(true);
      })
      .catch((e) => console.log('Error deleting posst.', e));
  };

  useEffect(() => {
    fetchMessages();
  }, [messages]);

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
            onDelete={handleDelete}
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
