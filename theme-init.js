const availableThemes = new Set([
	'default',
	'dark',
	'light',
	'moss',
	'frost',
	'rosewater',
	'midnight-pine',
	'blue-hour'
]);

function applySavedTheme() {
	const storedTheme = localStorage.getItem('user-theme');
	const savedTheme = availableThemes.has(storedTheme) ? storedTheme : 'default';
	document.documentElement.setAttribute('data-theme', savedTheme);
	if (storedTheme !== savedTheme) {
		localStorage.setItem('user-theme', savedTheme);
	}
}

applySavedTheme();
window.addEventListener('pageshow', applySavedTheme);
window.addEventListener('storage', (event) => {
	if (event.key === 'user-theme' || event.key === null) {
		applySavedTheme();
	}
});