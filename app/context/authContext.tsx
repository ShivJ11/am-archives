'use client'
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, User } from "firebase/auth";
import { auth } from "../firebase";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<{
    user: User | null;
    googleSignIn: () => void;
    logOut: () => void;
}>({
    user: null,
    googleSignIn: () => {},
    logOut: () => {}
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    // const router = useRouter();
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
        // router.push('/manga');
    }
    const logOut= () => {
        signOut(auth);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);   
            // router.push('/manga');         
        });
        return ()=> unsubscribe();
    }, [user]);
    return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(AuthContext);
}