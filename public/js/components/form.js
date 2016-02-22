import React from 'react';
import io from 'socket.io-client';

export default class FormComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			onOff: 0, // set state to off/false
		};
		this.toggleLights = this.toggleLights.bind(this);
	}

	componentDidMount() {
		// console.log('I have mounted');
		this.socket = io();

		this.socket.on('bg change', (msg) => {
			const onOffState = this.normaliseMsg(msg);

			this.setState({ onOff: onOffState });
			document.title = msg.toUpperCase();
			document.body.className = (onOffState === 0) ? 'body--off' : 'body--on';
		});
	}
	normaliseMsg(msg) {
		return (msg === 'on') ? 1 : 0;
	}
	toggleLights = (event) => {
		const onOffState = this.normaliseMsg(event.target.id);
		const emitState = (onOffState === 0) ? 'lights off' : 'lights on';

		this.socket.emit(emitState);
		this.setState({ onOff: onOffState });
		document.title = event.target.id.toUpperCase();
		document.body.className = (onOffState === 0) ? 'body--off' : 'body--on';
	};
	render() {
		return (
			<form>
				<input type="radio" id="on" name="onOff" onChange={this.toggleLights} checked={this.state.onOff === 1}/>
				<label htmlFor="on"><i></i><span>On</span></label>

				<input type="radio" id="off" name="onOff" defaultChecked checked={this.state.onOff === 0} onChange={this.toggleLights} />
				<label htmlFor="off"><i></i><span>Off</span></label>
			</form>
		);
	}
}

FormComponent.getDefaultState = {
	onOff: 'off',
};
