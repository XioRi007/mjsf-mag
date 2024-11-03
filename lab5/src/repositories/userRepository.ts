import auth from '@/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default class UserRepository {
    // public static async login(email: string, password: string): Promise<boolean> {

    static async login(email, password) {
        const response = await signInWithEmailAndPassword(auth, email, password);
        if (response) {
            return true;
        } else {
            throw new Error('Unable to login');
        }
    }

    static async register(email, password) {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        if (response) {
            return true;
        } else {
            throw new Error('Unable to register');
        }
    }

    static async logout() {
        await auth.signOut();
    }
}