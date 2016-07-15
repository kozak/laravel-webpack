const defaultExport = function() {
		"use strict";
		var element = document.createElement('h1');
		// element.className = styles.redButton;
		// element.className = 'pure-button';
		element.innerHTML = 'Hello master';
		return element;
};
module.exports = defaultExport;