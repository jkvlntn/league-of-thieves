"use client";

export default function ErrorPage({ error }: { error: Error }) {
	return (
		<div className="min-h-[calc(100vh-9rem)] flex flex-col items-center justify-center px-4 text-center">
			<div className="text-2xl mb-2">Something went wrong</div>
			<div className="text-gray-500">
				{error.message || "An unexpected error occurred"}
			</div>
		</div>
	);
}
