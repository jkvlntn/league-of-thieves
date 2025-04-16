export default class Timer {
	secondsRemaining: number;
	onFinish: () => void;
	resetTo: number;
	isRunning: boolean;
	interval: NodeJS.Timeout | null;

	constructor(secondsRemaining: number) {
		this.secondsRemaining = secondsRemaining;
		this.onFinish = () => {};
		this.resetTo = secondsRemaining;
		this.isRunning = false;
		this.interval = null;
	}

	setOnFinish(onFinish: () => void) {
		this.onFinish = onFinish;
	}

	start() {
		if (this.isRunning) {
			return;
		}
		this.isRunning = true;
		this.interval = setInterval(this.passTime.bind(this), 1000);
	}

	stop() {
		if (!this.isRunning) {
			return;
		}
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

	getSecondsRemaining() {
		return this.secondsRemaining;
	}

	getIsRunning() {
		return this.isRunning;
	}

	passTime() {
		this.secondsRemaining -= 1;
		if (this.secondsRemaining === 0) {
			this.stop();
			this.onFinish();
		}
	}
}
