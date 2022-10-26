import { useState, useEffect, useRef } from 'react';
import { Spinner, LoadMoreSpinner } from '../spinner/Spinner';
import { ListErrorMessage } from '../error/ErrorMessage';
import { useMarvelService } from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {
	const { loading, error, clearError, getAllCharacters } = useMarvelService();

	const [charList, setCharList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);

	const marvelService = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
	}, []);

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllCharacters(offset).then(onCharListLoaded);
	};

	const onCharListLoaded = (newCharList) => {
		let ended = false;
		if (newCharList.length < 9) {
			ended = true;
		}

		setCharList((charList) => [...charList, ...newCharList]);
		setNewItemLoading(false);
		setOffset((offset) => offset + 9);
		setCharEnded(ended);
	};

	const itemRefs = useRef([]);

	const focusOnItem = (index) => {
		itemRefs.current.forEach((item) =>
			item.classList.remove('char__item_selected')
		);
		itemRefs.current[index].classList.add('char__item_selected');
		itemRefs.current[index].focus();
	};

	function renderItems(arr) {
		const items = arr.map((item, index) => {
			const { id, thumbnail, name } = item;

			return (
				<li
					className='char__item'
					tabIndex={0}
					ref={(el) => (itemRefs.current[index] = el)}
					key={id}
					onClick={() => {
						props.onItemSelected(id);
						focusOnItem(index);
					}}
				>
					<img src={thumbnail} alt={name} />
					<div className='char__name'>{name}</div>
				</li>
			);
		});

		return <ul className='char__grid'>{items}</ul>;
	}

	const items = renderItems(charList);

	const errorMessage = error ? <ListErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;

	return (
		<div className='char__list'>
			{errorMessage}
			{spinner}
			{items}
			<button
				className='button button__main button__long'
				onClick={() => onRequest(offset)}
				disabled={newItemLoading}
			>
				<div className='inner'>
					{newItemLoading ? <LoadMoreSpinner /> : 'Load more'}
				</div>
			</button>
		</div>
	);
};

export default CharList;
