import { Component } from 'react';
import { RandomErrorMessage } from '../error/ErrorMessage';

class ErrorBoundary extends Component {
	state = {
		error: false,
	};

	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo);
		this.setState({
			error: true,
		});
	}

	render() {
		if (this.state.error) {
			return <RandomErrorMessage />;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
