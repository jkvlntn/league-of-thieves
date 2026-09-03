import MatchTimer from "./MatchTimer";
import { useState } from "react";
import Loading from "../../components/Loading";
import PageError from "../../components/PageError";

function MatchPage() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	return (
		<div className="flex w-full flex-1 items-center justify-center">
			{loading && <Loading />}
			{!loading && error && <PageError message={error} />}
			{!error && (
				<MatchTimer
					className="text-8xl"
					onLoad={() => setLoading(false)}
					onError={setError}
				/>
			)}
		</div>
	);
}

export default MatchPage;
