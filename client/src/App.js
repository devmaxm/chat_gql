import {ApolloProvider} from '@apollo/client';
import {useState} from 'react';
import {getUser, logout} from './lib/auth';
import Chat from './components/Chat';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import {apolloClient} from './lib/graphql/client';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import RegisterForm from "./components/RegisterForm";

function App() {
    const [user, setUser] = useState(getUser);

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    return (
        <ApolloProvider client={apolloClient}>
            <BrowserRouter>
                <header>
                    <NavBar user={user} onLogout={handleLogout}/>
                </header>
                <main>
                    <Routes>
                        <Route path='/' element={Boolean(user) ? (
                            <Chat user={user}/>
                        ) : (
                            <LoginForm onLogin={setUser}/>
                        )}/>
                        <Route path='/register' element={<RegisterForm onLogin={setUser}/>}/>
                    </Routes>


                </main>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
