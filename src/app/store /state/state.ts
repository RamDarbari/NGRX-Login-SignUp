import { User } from "src/data";

export interface AuthState {
    user: User | null;
    error: string | null;
    isLoading: boolean;
  }
  
  export const initialAuthState: AuthState = {
    user: null,
    error: null,
    isLoading: false,
  };


