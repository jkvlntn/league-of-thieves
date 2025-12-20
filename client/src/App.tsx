import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import TeamsPage from "./pages/TeamsPage";
import StaffPage from "./pages/StaffPage";
import PlayersPage from "./pages/PlayersPage";
import MatchPage from "./pages/MatchPage";

function App() {
	return (
		<div>
			<Toaster position="top-right" />
			<Routes>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/" element={<Layout />}>
					<Route path="teams" element={<TeamsPage />} />
					<Route path="players" element={<PlayersPage />} />
					<Route path="staff" element={<StaffPage />} />
					<Route path="match" element={<MatchPage />} />
					<Route path="settings" element={<div>Settings</div>} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
