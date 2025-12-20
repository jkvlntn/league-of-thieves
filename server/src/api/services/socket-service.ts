import { Server } from "socket.io";
import http from "http";

let io: Server | null;

export function initialize(server: http.Server) {
	io = new Server(server);
}

export function emit(socketName: string): void;
export function emit(socketName: string, item: any): void;
export function emit(socketName: string, item?: any): void {
	io?.emit(socketName, item);
}
