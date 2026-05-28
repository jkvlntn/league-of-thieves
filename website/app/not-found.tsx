import ErrorPage from "@/app/error";
import { HttpError } from "@/lib/types/HttpError";

export default function NotFound() {
	return <ErrorPage error={new HttpError("Page not found", 404)} />;
}
