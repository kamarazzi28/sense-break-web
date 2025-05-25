import {Navigate} from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth';
import {getAuth} from 'firebase/auth';

const PrivateRoute = ({children}) => {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);

    if (loading) return null; // или <div>Loading...</div>
    return user ? children : <Navigate to="/login"/>;
};

export default PrivateRoute;
