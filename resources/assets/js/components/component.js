const defaultExport = function() {
		"use strict";
		var element = document.createElement('h1');
		element.innerHTML = 'Hello master';
		return element;
};
module.exports = defaultExport;