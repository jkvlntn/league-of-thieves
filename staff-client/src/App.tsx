import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import Layout from "./pages/Layout";
import TeamsPage from "./pages/TeamsPage";
import StaffPage from "./pages/StaffPage";
import PlayersPage from "./pages/PlayersPage";
import MatchPage from "./pages/MatchPage";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./Context/AuthContext";

function App() {
	return (
		<AuthProvider>
			<Toaster position="top-right" />
			<Routes>
				<Route path="/login" element={<LoginPage />}></Route>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="players" element={<PlayersPage />} />
					<Route path="teams" element={<TeamsPage />} />
					<Route path="staff" element={<StaffPage />} />
					<Route path="match" element={<MatchPage />} />
				</Route>
			</Routes>
		</AuthProvider>
	);
}

export default App;
