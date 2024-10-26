import {create} from 'zustand';
import axiosInstance from "../services/axiosInstance";

interface AuthState {
    isAuthenticated: boolean;
    logout: () => Promise<void>;
    token: string | null;
    setToken: (token: string) => void;
    clearToken: () => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({

    token: localStorage.getItem('token'),
    isAuthenticated: false,
    setToken: (token: string) => {
        localStorage.setItem('token', token);
        set({token: token, isAuthenticated: true});
    },
    clearToken: () => {
        localStorage.removeItem('token');
        set({token: null, isAuthenticated: false});
    },
    setIsAuthenticated: (isAuthenticated: boolean) => set({isAuthenticated}),
    logout: async () => {
        try {
            await axiosInstance.post('/Auth/Logout');
            localStorage.removeItem('token');
            set({token: null, isAuthenticated: false});
        } catch (error) {
            console.error('Logout failed', error);
        }
        return Promise.resolve();
    },
}));

export default useAuthStore;