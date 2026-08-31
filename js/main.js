let mmdElements = [];
let mmdHTML = [];

function initMermaidElements() {
	mmdElements = document.getElementsByClassName("mermaid");
	mmdHTML = [];
	for (let i = 0; i < mmdElements.length; i++) {
		mmdHTML[i] = mmdElements[i].innerHTML;
	}
}

function mermaidRender(theme) {
	if (mmdElements.length === 0) {
		initMermaidElements();
	}
	if (mmdElements.length === 0) {
		return;
	}

	initOptions = {
		startOnLoad: false,
		theme: (theme === "dark") ? "dark" : "default",
	};

	for (let i = 0; i < mmdElements.length; i++) {
		delete mmdElements[i].dataset.processed;
		mmdElements[i].innerHTML = mmdHTML[i];
	}
	mermaid.initialize(initOptions);
	mermaid.run();
}

function renderMermaidOnLoad() {
	if (typeof mermaid === "undefined" || typeof resolveMermaidTheme !== "function") {
		return;
	}
	initMermaidElements();
	if (mmdElements.length > 0) {
		mermaidRender(resolveMermaidTheme());
	}
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", renderMermaidOnLoad);
} else {
	renderMermaidOnLoad();
}
