import { create } from "zustand";
import { supabase } from "../lib/supabase";

interface AuthState {
	user_id: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	checkAuth: () => void;
	login: (
		email: string,
		password: string
	) => Promise<{ error: Error | null }>;
	logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user_id: null,
	isAuthenticated: false,
	isLoading: true,

	checkAuth: async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		set({
			user_id: user?.id || null,
			isAuthenticated: !!user,
			isLoading: false,
		});
	},

	login: async (email: string, password: string) => {
		set({ isLoading: true });
		const {
			data: { user },
			error,
		} = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			set({ isLoading: false });
			return { error };
		}
		set({
			user_id: user?.id || null,
			isAuthenticated: true,
			isLoading: false,
		});
		return { error: null };
	},

	logout: async () => {
		await supabase.auth.signOut();
		set({ user_id: null, isAuthenticated: false });
	},
}));

supabase.auth.onAuthStateChange((_event, session) => {
	useAuthStore.setState({
		user_id: session?.user.id || null,
		isAuthenticated: !!session?.user,
		isLoading: false,
	});
});
