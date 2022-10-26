import randomError from './error-random.gif';
import listError from './error-list.gif';

const RandomErrorMessage = () => {
	return (
		<img
			style={{
				display: 'block',
				width: '200px',
				height: '200px',
				objectFit: 'contain',
				margin: '0 auto',
			}}
			src={randomError}
			alt='Error'
		/>
	);
};

const ListErrorMessage = () => {
	return (
		<img
			style={{
				display: 'block',
				width: '300px',
				height: '300px',
				objectFit: 'contain',
				margin: '0 auto',
			}}
			src={listError}
			alt='Error'
		/>
	);
};

export { RandomErrorMessage, ListErrorMessage };
