import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import axiosInstance from "../services/axiosInstance";

interface AuthState {
    isAuthenticated: boolean;
    logout: () => Promise<void>;
    token: string | null;
    setToken: (token: string) => void;
    clearToken: () => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            isAuthenticated: false,
            setToken: (token: string) => {
                set({token: token, isAuthenticated: true});
            },
            clearToken: () => {
                set({token: null, isAuthenticated: false});
            },
            setIsAuthenticated: (isAuthenticated: boolean) => set({isAuthenticated}),
            logout: async () => {
                try {
                    await axiosInstance.post('/Auth/Logout');
                    set({token: null, isAuthenticated: false});
                } catch (error) {
                    console.error('Logout failed', error);
                }
                return Promise.resolve();
            },
        }),
        {
            name: 'auth-storage', // unique name
        }
    )
);

export default useAuthStore;