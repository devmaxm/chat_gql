import {useMutation, useQuery, useSubscription} from '@apollo/client';
import {messageAddedSubscription, addMessageMutation, messagesQuery} from './queries';

export function useAddMessage() {
  const [mutate] = useMutation(addMessageMutation);

  const addMessage = async (text) => {
    const { data: { message } } = await mutate({
      variables: { text }
    });
    return message;
  };
  return { addMessage };
}

export function useMessages() {
  const { data, loading, error } = useQuery(messagesQuery);
  useSubscription(messageAddedSubscription, {
    onData: ({ client, data }) => {

      const newMessage = data.data.message;
      client.cache.updateQuery({ query: messagesQuery }, ( {messages} ) => {
        console.log(data)
        return { messages: [...messages, newMessage] };
      });
    },
  });
  return {
    messages: data?.messages ?? [], loading, error
  };
}
