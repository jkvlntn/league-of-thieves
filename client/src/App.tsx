import { Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route path="teams" element={<div>Teams</div>} />
				<Route path="match" element={<div>Match</div>} />
				<Route path="ranked" element={<div>Ranked</div>} />
			</Route>
		</Routes>
	);
}

export default App;
