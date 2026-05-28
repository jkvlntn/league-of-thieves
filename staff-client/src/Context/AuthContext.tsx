import type { StaffPermissionName } from "@lot/common";
import React, { createContext, useContext, useState, useCallback } from "react";

interface AuthContextType {
	isAuthenticated: boolean;
	username: string | null;
	permissions: StaffPermissionName[];
	setAuth: (auth: {
		isAuthenticated: boolean;
		username: string | null;
		permissions: StaffPermissionName[];
	}) => void;
	clearAuth: () => void;
}

const defaultAuth: AuthContextType = {
	isAuthenticated: false,
	username: null,
	permissions: [],
	setAuth: () => {},
	clearAuth: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuth);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [username, setUsername] = useState<string | null>(null);
	const [permissions, setPermissions] = useState<StaffPermissionName[]>([]);

	const setAuth = useCallback(
		(auth: {
			isAuthenticated: boolean;
			username: string | null;
			permissions: StaffPermissionName[];
		}) => {
			setIsAuthenticated(auth.isAuthenticated);
			setUsername(auth.username);
			setPermissions(auth.permissions);
		},
		[],
	);

	const clearAuth = useCallback(() => {
		setIsAuthenticated(false);
		setUsername(null);
		setPermissions([]);
	}, []);

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, username, permissions, setAuth, clearAuth }}
		>
			{children}
		</AuthContext.Provider>
	);
};
