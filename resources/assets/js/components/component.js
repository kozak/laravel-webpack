const styles = require('../../sass/main.css');
const defaultExport = function() {
		"use strict";
		var element = document.createElement('h1');
		element.className = styles.redButton;
		element.innerHTML = 'Hello master';
		return element;
};
module.exports = defaultExport;