import {useAddMessage, useMessages} from '../lib/graphql/hooks';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

function Chat({user}) {
    const {messages, loading, error} = useMessages();
    const {addMessage} = useAddMessage();

    const handleSend = async (text) => {
        const message = await addMessage(text);
    };

    if(loading) {
      return <div>Loading...</div>
    }
    return (
        <section className="section">
            <div className="container">
                <h1 className="title is-4">
                    {`Chatting as ${user}`}
                </h1>
                <MessageList user={user} messages={messages}/>
                <MessageInput onSend={handleSend}/>
            </div>
        </section>
    );
}

export default Chat;
