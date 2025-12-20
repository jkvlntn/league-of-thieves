import type { ApiResponse } from "@lot/common";

const baseURL = `${
	import.meta.env.VITE_API_URL || "http://localhost:8000"
}/api`;

async function request<T>(
	endpoint: string,
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
	body?: any
) {
	let response: Response;
	let responseJson: ApiResponse<T>;
	try {
		response = await fetch(baseURL + endpoint, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: body ? JSON.stringify(body) : undefined,
		});
		responseJson = await response.json();
	} catch {
		throw new Error("Network error occurred");
	}
	if (!response.ok) {
		throw new Error(responseJson.message);
	} else {
		return responseJson;
	}
}

export async function getRequest<T>(endpoint: string): Promise<ApiResponse<T>> {
	return await request<T>(endpoint, "GET");
}

export async function postRequest<T>(
	endpoint: string,
	body?: any
): Promise<ApiResponse<T>> {
	return await request<T>(endpoint, "POST", body);
}

export async function putRequest<T>(
	endpoint: string,
	body?: any
): Promise<ApiResponse<T>> {
	return await request<T>(endpoint, "PUT", body);
}

export async function patchRequest<T>(
	endpoint: string,
	body?: any
): Promise<ApiResponse<T>> {
	return await request<T>(endpoint, "PATCH", body);
}

export async function deleteRequest<T>(
	endpoint: string
): Promise<ApiResponse<T>> {
	return await request<T>(endpoint, "DELETE");
}
