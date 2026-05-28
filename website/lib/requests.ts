import { HttpError } from "@/lib/types/HttpError";

interface ApiResponse<T> {
	message: string;
	data: T;
}

export async function apiGet<T>(
	endpoint: string,
	apiURL?: string,
): Promise<ApiResponse<T>> {
	const baseUrl = apiURL || process.env.NEXT_PUBLIC_API_URL;
	const result = await fetch(`${baseUrl}/api${endpoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const response: ApiResponse<T> = await result.json();
	if (!result.ok) {
		throw new HttpError(response.message, result.status);
	}
	return response;
}

export async function apiPost<T>(
	endpoint: string,
	body: object,
): Promise<ApiResponse<T>> {
	const result = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api${endpoint}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		},
	);
	const response: ApiResponse<T> = await result.json();
	if (!result.ok) {
		throw new HttpError(response.message, result.status);
	}
	return response;
}
