import { ListErrorMessage } from '../error/ErrorMessage';
import { Link } from 'react-router-dom';

const Page404 = () => {
	return (
		<div>
			<ListErrorMessage />
			<div className='alert alert-danger mt-4' role='alert'>
				<p style={{ textAlign: 'center', fontSize: '24px' }}>
					The page does not exist.
					<Link to='/' class='alert-link'>
						Give it a click if you want to go to the main page.
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Page404;
