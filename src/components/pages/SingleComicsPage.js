import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMarvelService } from '../../services/MarvelService';
import { Spinner } from '../spinner/Spinner';
import AppBanner from '../appBanner/AppBanner';
import Page404 from './Page404';

import decorationArrow from '../../resources/img/go-back-arrow.svg';

import './singleComicsPage.scss';

const SingleComicsPage = () => {
	const [comics, setComics] = useState(null);
	const { comicsId } = useParams();

	const { loading, error, clearError, getComic } = useMarvelService();

	useEffect(() => {
		updateComics();
	}, [comicsId]);

	const updateComics = () => {
		clearError();
		getComic(comicsId).then(comicsLoaded);
	};

	const comicsLoaded = (comics) => {
		setComics(comics);
	};

	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !comics) ? (
		<View comics={comics} />
	) : null;
	const ErrorMessage = error ? <Page404 /> : null;

	return (
		<>
			<AppBanner />
			{spinner}
			{ErrorMessage}
			{content}
		</>
	);
};

const View = ({ comics }) => {
	const { thumbnail, title, description, pageCount, language, price } =
		comics;
	const arrowBack = (
		<img
			style={{ paddingBottom: '3px' }}
			src={decorationArrow}
			alt='Back to all'
		/>
	);

	return (
		<div className='single-comic'>
			<img src={thumbnail} alt={title} className='single-comic__img' />
			<div className='single-comic__info'>
				<h2 className='single-comic__name'>{title}</h2>
				<p className='single-comic__descr'>{description}</p>
				<p className='single-comic__descr'>{pageCount}</p>
				<p className='single-comic__descr'>Language: {language}</p>
				<div className='single-comic__price'>{price}</div>
			</div>
			<Link to='/comics' className='single-comic__back'>
				{arrowBack} Back to all
			</Link>
		</div>
	);
};

export default SingleComicsPage;
