
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface UserContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, type: 'cavalier' | 'pro') => Promise<void>;
    logout: () => Promise<void>;
    unlockedArticles: string[];
    unlockArticle: (articleId: string, cost: number) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email: string, type: 'cavalier' | 'pro') => {
        setIsLoading(true);
        try {
            const loggedUser = await api.auth.login(email, type);
            setUser(loggedUser);
        } catch (error) {
            console.error("Login error:", error);
            alert("Erreur de connexion");
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await api.auth.logout();
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const unlockArticle = async (articleId: string, cost: number): Promise<boolean> => {
        if (!user) return false;
        
        // Optimistic UI could be implemented here, but let's stick to safe async
        try {
            const updatedUser = await api.user.updatePoints(cost, articleId);
            setUser(updatedUser);
            return true;
        } catch (error) {
            console.error("Unlock error:", error);
            alert("Impossible de débloquer l'article : Solde insuffisant ou erreur réseau.");
            return false;
        }
    };

    // Dérivé de l'état utilisateur pour faciliter l'accès
    const unlockedArticles = user?.unlockedArticles || [];

    return (
        <UserContext.Provider value={{ user, isLoading, login, logout, unlockedArticles, unlockArticle }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
