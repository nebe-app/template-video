import audioFile from './audio.mp3';
import videoFile from './video.mp4';

window.RENDER = {
	duration: 21.42,
	audio_layers: [
		{ start: 0, file: audioFile.toString() }
	],
	video_layers: [
		{ start: 0, file: videoFile.toString() }
	],
	render_parts: [
		{ start: 4.5, end: 6.25 }, // Jackpot animation
		{ start: 17.5, end: 20.5 }, // Dealer animation
	]
};

window.FILL = async (inputs) => {
	// Fill jackpot

	const jackpotRaw = String(inputs.jackpot);
	const jackpotDigits = jackpotRaw.replace(/\D+/g, '');
	const jackpotPadded = '00000000' + jackpotDigits;
	const jackpot = jackpotPadded.substr(jackpotPadded.length - 8);

	let jackpotHTML = '';
	for (let i = 0; i < 8; i++) {
		jackpotHTML += `<div class="digit digit${i}">${jackpot[i]}</div>`;
	}
	const jackpotEl = document.querySelector('article.jackpot');
	jackpotEl.innerHTML = jackpotHTML;

	// Fill dealer info

	const nameEl = document.querySelector('.dealer-name');
	nameEl.innerHTML = `${inputs.name||''}`;

	const addressEl = document.querySelector('.dealer-address');
	addressEl.innerHTML = `${inputs.address||''}`;

	const cityEl = document.querySelector('.dealer-city');
	cityEl.innerHTML = `${inputs.postal_code||''} ${inputs.city||''}`;

	const phoneEl = document.querySelector('.dealer-phone');
	phoneEl.innerHTML = `${inputs.phone||''}`;

	const urlEl = document.querySelector('.dealer-url');
	urlEl.innerHTML = `${inputs.url||''}`;

	const logoEl = document.querySelector('.dealer-logo');
	logoEl.innerHTML = `<img src="${inputs.logo_horizontal||inputs.logo_vertical||''}" alt="">`;

	// Jackpot animation

	const digitClasses = ['.digit6', '.digit2', '.digit3', '.digit7', '.digit1', '.digit5', '.digit0', '.digit4'];
	const digitEls = digitClasses.map((className) => {
		return document.querySelector(className);
	});

	console.log(digitEls);
	console.log(jackpotEl);

	window.TIMELINE
		.fromTo(jackpotEl, 2, {scale: 1.05}, {scale: 1}, 4.5)
		.staggerFromTo(digitEls, .2, {opacity: 0}, {opacity: 1}, 0.1, 4.73)
		.set(digitEls, {opacity: 0}, 6.24);

	// Dealer info animations

	function shuffle(a) {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	const nameSplitText = new SplitText([nameEl, addressEl, cityEl, phoneEl, urlEl], {type: 'chars'});
	const shuffledChars = shuffle(nameSplitText.chars);

	console.log(shuffledChars);
	console.log(logoEl);

	const blueEl = document.querySelector('.blue');
	console.log(blueEl);

	window.TIMELINE
		.set(nameSplitText.chars, {opacity: 0}, 0)
		.set(logoEl, {opacity: 0}, 0)
		.fromTo(blueEl, 0.11, {opacity: 0}, {opacity: 1}, 17.54)
		.staggerFromTo(shuffledChars, .2, {opacity: 0, scale: 1.2, y: 10}, {opacity: 1, scale: 1, y: 0}, 0.01, 17.6)
		.fromTo(logoEl, .2, {opacity: 0}, {opacity: 1}, 18)
		.staggerTo(shuffledChars, .2, {opacity: 0, scale: 0.8, y: -10}, 0.01, 19.5)
		.to(logoEl, .2, {opacity: 0}, 19.5)
		.to(blueEl, 0.05, {opacity: 0}, 20.44);
};
