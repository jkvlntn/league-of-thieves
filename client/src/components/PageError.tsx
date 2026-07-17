function PageError({ message }: { message: string }) {
	return (
		<div className="flex w-full h-full items-center justify-center">
			<div className="h-1/4 flex justify-center items-center gap-8">
				<img src="/error_pirate.png" className="h-full object-contain" />
				<div className="flex flex-col justify-center gap-3">
					<div className="text-3xl font-bold">Whoops!</div>
					<div>{message}</div>
				</div>
			</div>
		</div>
	);
}

export default PageError;
