// Set by the template: "toggle" (light/dark) or "toggle-auto" (light/dark/auto)
var themeToggleMode = themeToggleMode || "toggle-auto";

function setTheme(mode) {
    localStorage.setItem("theme-storage", mode);
}

function getSystemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getSavedTheme() {
    let currentTheme = localStorage.getItem("theme-storage");
    if (!currentTheme) {
        currentTheme = getSystemPrefersDark() ? "dark" : "light";
    }

    if (themeToggleMode === "toggle" && currentTheme === "auto") {
        currentTheme = getSystemPrefersDark() ? "dark" : "light";
        setTheme(currentTheme);
    }

    return currentTheme;
}

function resolveMermaidTheme() {
    const mode = getSavedTheme();
    if (mode === "auto") {
        return getSystemPrefersDark() ? "dark" : "light";
    }
    return mode;
}

function toggleTheme() {
    const currentTheme = getSavedTheme();
    if (themeToggleMode === "toggle-auto") {
        if (currentTheme === "light") {
            setTheme("dark");
        } else if (currentTheme === "dark") {
            setTheme("auto");
        } else {
            setTheme("light");
        }
    } else {
        setTheme(currentTheme === "light" ? "dark" : "light");
    }
    updateItemToggleTheme();
}

function updateItemToggleTheme() {
    const mode = getSavedTheme();
    const useDark = (mode === "dark" || (mode === "auto" && getSystemPrefersDark()));

    const darkModeStyle = document.getElementById("darkModeStyle");
    if (darkModeStyle) {
        darkModeStyle.disabled = !useDark;
    }

    const syntaxDarkStyle = document.getElementById("syntaxDarkStyle");
    const syntaxLightStyle = document.getElementById("syntaxLightStyle");
    if (syntaxDarkStyle && syntaxLightStyle) {
        syntaxDarkStyle.disabled = !useDark;
        syntaxLightStyle.disabled = useDark;
    }

    const sunIcon = document.getElementById("sun-icon");
    const moonIcon = document.getElementById("moon-icon");
    const autoIcon = document.getElementById("auto-icon");
    if (sunIcon && moonIcon) {
        sunIcon.style.display = (mode === "light") ? "block" : "none";
        moonIcon.style.display = (mode === "dark") ? "block" : "none";

        if (autoIcon) {
            autoIcon.style.display = (mode === "auto") ? "block" : "none";
            autoIcon.style.filter = (mode === "auto") ? (getSystemPrefersDark() ? "invert(1)" : "invert(0)") : "none";
        }
    }

    const htmlElement = document.querySelector("html");
    htmlElement.classList.remove("light", "dark");
    htmlElement.classList.add(useDark ? "dark" : "light");

    if (typeof mermaidRender === "function") {
        mermaidRender(resolveMermaidTheme());
    }
}

// Update the toggle theme on page load
updateItemToggleTheme();

// Listen for system theme changes in auto mode
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (getSavedTheme() === "auto" && typeof mermaidRender === "function") {
            updateItemToggleTheme();
        }
    });
}
