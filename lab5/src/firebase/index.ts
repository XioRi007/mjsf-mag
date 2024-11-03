import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyAh912aXbsXCVVYcDdEER-IrEorLVaMDLo',
    authDomain: 'test-21b2a.firebaseapp.com',
    projectId: 'test-21b2a',
    storageBucket: 'test-21b2a.firebasestorage.app',
    messagingSenderId: '344379520512',
    appId: '1:344379520512:web:602bc2fec7afe6b2d3cae5'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
