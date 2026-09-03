import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import TeamsPage from "./pages/teams/TeamsPage";
import TeamPage from "./pages/team/TeamPage";
import MatchPage from "./pages/match/MatchPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route path="teams" element={<TeamsPage />} />
				<Route path="teams/:teamName" element={<TeamPage />} />
				<Route path="match" element={<MatchPage />} />
				<Route
					path="halloffame"
					element={<div>Coming soon... maybe... who knows</div>}
				/>
			</Route>
		</Routes>
	);
}

export default App;
