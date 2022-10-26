import { useState, useEffect } from 'react';
import { useMarvelService } from '../../services/MarvelService';
import { Spinner } from '../spinner/Spinner';
import { RandomErrorMessage } from '../error/ErrorMessage';
import mjolnir from '../../resources/img/mjolnir.png';

import './randomChar.scss';

const RandomChar = () => {
	const [char, setChar] = useState({});

	const { loading, error, getCharacter, clearError } = useMarvelService();

	useEffect(() => {
		updateChar();
		const timerId = setInterval(updateChar, 15000);

		return () => {
			clearInterval(timerId);
		};
	}, []);

	const onCharLoaded = (char) => {
		setChar(char);
	};

	const updateChar = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		clearError();
		getCharacter(id).then(onCharLoaded);
	};

	const onCharLoaderButton = () => {
		updateChar();
	};

	const warning = error ? <RandomErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error) ? <VievContent char={char} /> : null;

	return (
		<div className='randomchar'>
			{warning}
			{spinner}
			{content}
			<div className='randomchar__static'>
				<p className='randomchar__title rnd-title'>
					Random character for today!
				</p>
				<p className='randomchar__title rnd-title'>
					Do you want to get to know him better?
				</p>
				<p className='randomchar__title'>Or choose another one</p>
				<button
					className='button button__main'
					onClick={onCharLoaderButton}
				>
					<div className='inner'>try it</div>
				</button>
				<img
					src={mjolnir}
					alt='mjolnir'
					className='randomchar__decoration'
				/>
			</div>
		</div>
	);
};

const VievContent = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki } = char;

	return (
		<div className='randomchar__block'>
			<img
				src={thumbnail}
				alt='Random character'
				className='randomchar__img'
			/>
			<div className='randomchar__info'>
				<p className='randomchar__name'>{name}</p>
				<p className='randomchar__descr'>{description}</p>
				<div className='randomchar__btns'>
					<a
						href={homepage}
						className='button button__main'
						target='blank'
					>
						<div className='inner'>homepage</div>
					</a>
					<a
						href={wiki}
						className='button button__secondary'
						target='blank'
					>
						<div className='inner'>wiki</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default RandomChar;
