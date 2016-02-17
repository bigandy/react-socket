import $ from 'jquery';
import io from 'socket.io-client';

const socket = io();
const lightOn = document.getElementById('on');
const lightOff = document.getElementById('off');

lightOn.addEventListener('click', () => {
	socket.emit('lights on');

	document.title = 'ON';
}, false);

lightOff.addEventListener('click', () => {
	socket.emit('lights off');

	document.title = 'OFF';
}, false);

$('html').click((evt) => {
	if (evt.target.type !== 'radio') {
		const $body = $('body');
		if ($body.hasClass('body--on')) {
			socket.emit('lights off');
		} else {
			socket.emit('lights on');
		}

		$body.toggleClass('body--on');
		$('input[name="onOff"]').not(':checked').prop('checked', true);
	} else {
		console.log('radio clicked');
		return;
	}
});

socket.on('bg change', (msg) => {
	console.log(msg);

	if (msg === 'on') {
		$('body').addClass('body--on');
		document.title = 'ON';
		$('#on').prop('checked', true);
	} else {
		$('body').removeClass('body--on');
		document.title = 'OFF';
		$('#off').prop('checked', true);
	}
});
