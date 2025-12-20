export interface Player {
	id: number;
	username: string;
	image: string | null;
	teamId: number | null;
	teamName: string | null;
	priority: number;
}
