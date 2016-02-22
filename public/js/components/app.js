import React from 'react';

export default class AppComponent extends React.Component {
	render() {
		return (
			<div>
				<main className="row content-container">
					<article role="article" className="large-8 large-push-2 small-12 columns">
						{ this.props.children }
					</article>
				</main>
			</div>

		);
	}
}

AppComponent.propTypes = {
	children: React.PropTypes.object.isRequired,
};
