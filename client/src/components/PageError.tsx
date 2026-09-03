function PageError({ message }: { message: string }) {
	return (
		<div className="flex w-full h-full items-center justify-center">
			<div className="flex flex-col items-center gap-2">
				<div className="text-3xl">Whoops!</div>
				<div>{message}</div>
			</div>
		</div>
	);
}

export default PageError;
