import { Server } from "socket.io";
import http from "http";

let io: Server | null;

export const initializeSocket = (server: http.Server) => {
	io = new Server(server);
};

export const emitSocket = (socketName: string, item: any) => {
	if (io) {
		io.emit(socketName, item);
	}
};
