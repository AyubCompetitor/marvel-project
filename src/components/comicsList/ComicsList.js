import { useEffect } from 'react';
import { useState } from 'react';
import { useMarvelService } from '../../services/MarvelService';
import { Spinner, LoadMoreSpinner } from '../spinner/Spinner';
import { ListErrorMessage } from '../error/ErrorMessage';
import { Link } from 'react-router-dom';

import './comicsList.scss';

const ComicsList = () => {
	const { loading, error, clearError, getAllComics } = useMarvelService();

	const [comics, setComics] = useState([]);
	const [newComicsLoaded, setNewComicsLoaded] = useState(false);
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		onRequest(offset, true);
	}, []);

	const onRequest = (offset, initial) => {
		initial ? setNewComicsLoaded(false) : setNewComicsLoaded(true);
		clearError();
		getAllComics(offset).then(onLoadComics);
	};

	const onLoadComics = (newComics) => {
		setNewComicsLoaded(false);
		setComics([...comics, ...newComics]);
		setOffset(offset + 8);
	};

	const renderContent = (arr) => {
		const content = arr.map((item, index) => {
			const { thumbnail, title, price, id } = item;

			return (
				<li className='comics__item' key={index}>
					<Link to={`${id}`}>
						<img
							className='comics__item-img'
							src={thumbnail}
							alt={title}
						/>
						<div className='comics__item-name'>{title}</div>
						<div className='comics__item-price'>{price}</div>
					</Link>
				</li>
			);
		});

		return <ul className='comics__grid'>{content}</ul>;
	};

	const content = renderContent(comics);
	const spinner = loading && !newComicsLoaded ? <Spinner /> : null;
	const errorBanner = error ? <ListErrorMessage /> : null;

	return (
		<div className='comics__list'>
			{spinner}
			{errorBanner}
			{content}
			<button
				className='button button__main button__long pt-5'
				onClick={() => onRequest(offset)}
				disabled={newComicsLoaded}
			>
				<div className='inner'>
					{newComicsLoaded ? <LoadMoreSpinner /> : 'load more'}
				</div>
			</button>
		</div>
	);
};

export default ComicsList;
