import { Spinner } from '../spinner/Spinner';
import { RandomErrorMessage } from '../error/ErrorMessage';
import { useMarvelService } from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {
	const [item, setItem] = useState(null);

	const { loading, error, getCharacter, clearError } = useMarvelService();

	useEffect(() => {
		onUpdate();
	}, [props.selectedItem]);

	const itemUpdate = (item) => {
		setItem(item);
	};

	const onUpdate = () => {
		const { selectedItem } = props;
		if (!selectedItem) {
			return;
		}

		clearError();
		getCharacter(selectedItem).then(itemUpdate);
	};

	const skeleton = item || loading || error ? null : <Skeleton />;
	const spinner = loading ? <Spinner /> : null;
	const warning = error && !loading ? <RandomErrorMessage /> : null;
	const content = !(loading || error || !item) ? (
		<VievInfo item={item} />
	) : null;

	return (
		<div className='char__info'>
			{skeleton}
			{warning}
			{spinner}
			{content}
		</div>
	);
};

const VievInfo = ({ item }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = item;

	const content = comics.map((item, i) => {
		// eslint-disable-next-line
		if (i > 9) return;
		return (
			<li className='char__comics-item' key={i}>
				{item.name}
			</li>
		);
	});

	return (
		<>
			<div className='char__basics'>
				<img src={thumbnail} alt={name} />
				<div>
					<div className='char__info-name'>{name}</div>
					<div className='char__btns'>
						<a href={homepage} className='button button__main'>
							<div className='inner'>homepage</div>
						</a>
						<a href={wiki} className='button button__secondary'>
							<div className='inner'>Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className='char__descr'>{description}</div>
			<div className='char__comics'>Comics:</div>
			<ul className='char__comics-list'>{content}</ul>
		</>
	);
};

export default CharInfo;
