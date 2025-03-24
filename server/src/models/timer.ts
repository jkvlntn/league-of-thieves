export default class Timer {
	secondsRemaining: number;
	resetTo: number;
	isRunning: boolean;
	interval: NodeJS.Timeout | null;

	constructor(secondsRemaining: number) {
		this.secondsRemaining = secondsRemaining;
		this.resetTo = secondsRemaining;
		this.isRunning = false;
		this.interval = null;
	}

	start() {
		this.isRunning = true;
		this.interval = setInterval(this.passTime.bind(this), 1000);
	}

	stop() {
		this.isRunning = false;
		if (this.interval) {
			clearInterval(this.interval);
		}
		this.interval = null;
	}

	set(seconds: number) {
		this.stop();
		this.secondsRemaining = seconds;
		this.resetTo = seconds;
	}

	reset() {
		this.stop();
		this.secondsRemaining = this.resetTo;
	}

	passTime() {
		this.secondsRemaining -= 1;
		console.log(this.secondsRemaining);
		if (this.secondsRemaining === 0) {
			this.stop();
		}
	}
}
