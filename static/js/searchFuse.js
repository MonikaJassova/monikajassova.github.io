// Fuse-based site search.
// Zola emits the search index as a plain JSON array (index_format = "fuse_json"):
//   [{ url, title, description, body, path }, ...]
// one file per language at the site root: search_index.<lang>.json
// This script loads that file for the current language and drives the same
// search modal DOM that the Apollo theme provides (#searchModal, #searchInput,
// #search-button, #clear-search, #results, ...). Matching is a simple
// case-insensitive substring filter (all query terms must be present).

window.addEventListener('load', function () {
    if (!document.body.contains(document.getElementById('searchModal'))) {
        return;
    }

    const lang = (document.documentElement.lang || 'en').substring(0, 2);
    const searchInput = document.getElementById('searchInput');
    const searchModal = document.getElementById('searchModal');
    const searchButton = document.getElementById('search-button');
    const clearSearchButton = document.getElementById('clear-search');
    const resultsContainer = document.getElementById('results-container');
    const results = document.getElementById('results');
    const zeroSpan = document.getElementById('zero_results');
    const oneSpan = document.getElementById('one_result');
    const manySpan = document.getElementById('many_results');

    // Replace $SHORTCUT in the button title with the OS-specific shortcut.
    (function () {
        const shortcut =
            navigator.userAgent.toLowerCase().includes('mac') ? 'Cmd + K' : 'Ctrl + K';
        const title = searchButton.getAttribute('title');
        if (title && title.includes('$SHORTCUT')) {
            searchButton.setAttribute('title', title.replace('$SHORTCUT', shortcut));
        }
    })();

    // --- Index loading ---
    let searchItems = null;
    let loadPromise = null;
    function loadIndex() {
        if (loadPromise) {
            return loadPromise;
        }
        const base = document
            .querySelector("meta[name='base']")
            .getAttribute('content')
            .replace(/\/$/, '');
        loadPromise = fetch(base + '/search_index.' + lang + '.json')
            .then(function (r) {
                return r.json();
            })
            .then(function (data) {
                searchItems = Array.isArray(data) ? data : [];
            })
            .catch(function () {
                searchItems = [];
            });
        return loadPromise;
    }

    // --- Modal open / close ---
    let lastFocused = null;
    function openSearchModal() {
        lastFocused = document.activeElement;
        loadIndex();
        searchModal.style.display = 'block';
        searchInput.focus();
    }
    function closeModal() {
        searchModal.style.display = 'none';
        clearSearch();
        if (lastFocused && document.body.contains(lastFocused)) {
            lastFocused.focus();
        }
    }
    function toggleModalVisibility() {
        if (searchModal.style.display === 'block') {
            closeModal();
        } else {
            openSearchModal();
        }
    }

    searchButton.addEventListener('click', openSearchModal);
    searchButton.addEventListener('mouseover', loadIndex);
    searchButton.addEventListener('touchstart', openSearchModal, { passive: true });
    searchButton.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            searchButton.click();
        }
    });
    searchModal.addEventListener('click', function (event) {
        if (event.target === searchModal) {
            closeModal();
        }
        event.stopPropagation();
    });
    searchModal.addEventListener('touchend', function (event) {
        if (event.target === searchModal) {
            closeModal();
        }
        event.stopPropagation();
    }, { passive: true });

    // --- Clear ---
    function clearSearch() {
        searchInput.value = '';
        results.innerHTML = '';
        resultsContainer.style.display = 'none';
        searchInput.removeAttribute('aria-activedescendant');
        clearSearchButton.style.display = 'none';
    }
    clearSearchButton.addEventListener('click', function () {
        clearSearch();
        searchInput.focus();
    });
    clearSearchButton.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            clearSearch();
            searchInput.focus();
        }
    });

    // --- Selection (keyboard / mouse) ---
    function clearSelected(exceptDiv) {
        results.querySelectorAll('#results > div').forEach(function (div) {
            if (div !== exceptDiv) {
                div.setAttribute('aria-selected', 'false');
            }
        });
    }
    function updateSelection(div) {
        if (div.getAttribute('aria-selected') !== 'true') {
            clearSelected(div);
            div.setAttribute('aria-selected', 'true');
        }
        searchInput.setAttribute('aria-activedescendant', div.id);
    }

    // --- Snippet: locate the first match and show a little context ---
    function makeSnippet(text, terms) {
        if (!text) {
            return '';
        }
        const lower = text.toLowerCase();
        let pos = -1;
        for (const term of terms) {
            const p = lower.indexOf(term);
            if (p !== -1 && (pos === -1 || p < pos)) {
                pos = p;
            }
        }
        if (pos === -1) {
            return text.length > 150 ? text.substring(0, 150) + '…' : text;
        }
        const start = Math.max(0, pos - 40);
        const end = Math.min(text.length, pos + 120);
        let snip =
            (start > 0 ? '…' : '') +
            text.substring(start, end) +
            (end < text.length ? '…' : '');
        const matchInWindow = terms.find(function (t) {
            const p = lower.indexOf(t);
            return p !== -1 && p >= start && p < end;
        });
        if (matchInWindow) {
            snip = snip.replace(
                new RegExp(matchInWindow.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
                function (m) {
                    return '<b>' + m + '</b>';
                }
            );
        }
        return snip;
    }

    function updateResultText(count) {
        [zeroSpan, oneSpan, manySpan].forEach(function (span) {
            if (span) {
                span.style.display = 'none';
            }
        });
        let active = null;
        if (count === 0) {
            active = zeroSpan;
        } else if (count === 1) {
            active = oneSpan;
        } else {
            active = manySpan;
        }
        if (active) {
            active.style.display = 'inline';
            active.textContent = active.textContent.replace('$NUMBER', count.toString());
        }
    }

    // --- Search handling ---
    searchInput.addEventListener(
        'input',
        async function () {
            const inputValue = this.value;
            const term = inputValue.trim();
            const terms = term.split(/\s+/).filter(Boolean);
            await loadIndex();
            results.innerHTML = '';

            clearSearchButton.style.display =
                inputValue.length > 0 ? 'block' : 'none';
            resultsContainer.style.display = term.length > 0 ? 'block' : 'none';

            if (term.length === 0) {
                updateResultText(0);
                return;
            }

            const matches = (searchItems || []).filter(function (item) {
                const hay =
                    (item.title || '') +
                    ' ' +
                    (item.description || '') +
                    ' ' +
                    (item.body || '') +
                    ' ' +
                    (item.path || '');
                const lower = hay.toLowerCase();
                return terms.every(function (t) {
                    return lower.indexOf(t) !== -1;
                });
            });

            updateResultText(matches.length);
            let id = 0;
            matches.forEach(function (item) {
                const div = document.createElement('div');
                div.setAttribute('role', 'option');
                div.id = 'result-' + id++;
                div.innerHTML = '<a href><span></span><span></span></a>';
                const link = div.querySelector('a');
                const titleEl = div.querySelector('span:first-child');
                const snippetEl = div.querySelector('span:nth-child(2)');

                titleEl.textContent = item.title || item.path || '';
                snippetEl.innerHTML = makeSnippet(item.body, terms) || item.description || '';

                let href = item.url;
                if (item.body && term) {
                    href += `#:~:text=${encodeURIComponent(term)}`;
                }
                link.href = href;
                results.appendChild(div);
            });

            searchInput.setAttribute('aria-expanded', id > 0 ? 'true' : 'false');
            if (results.firstChild) {
                updateSelection(results.firstChild);
            }

            results.onmouseover = function (event) {
                const div = event.target.closest('div[role="option"]');
                if (div) {
                    updateSelection(div);
                }
            };
        },
        true
    );

    // --- Keyboard: shortcut, escape, tab, arrows, enter ---
    document.addEventListener('keydown', function (event) {
        const isMac = navigator.userAgent.toLowerCase().includes('mac');
        if (event.key === 'k' && (isMac ? event.metaKey : event.ctrlKey)) {
            event.preventDefault();
            toggleModalVisibility();
            return;
        }
        if (event.key === 'Escape') {
            closeModal();
        }

        const activeElement = document.activeElement;
        if (
            event.key === 'Tab' &&
            (activeElement === searchInput || activeElement === clearSearchButton)
        ) {
            event.preventDefault();
            const next =
                activeElement === searchInput ? clearSearchButton : searchInput;
            next.focus();
            return;
        }

        const divsArray = Array.from(results.querySelectorAll('#results > div'));
        if (divsArray.length === 0) {
            return;
        }
        let activeDiv = results.querySelector('[aria-selected="true"]');
        let idx = divsArray.indexOf(activeDiv);

        if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
            event.preventDefault();
            if (idx === -1) {
                idx = 0;
            } else if (event.key === 'ArrowUp') {
                idx = Math.max(idx - 1, 0);
            } else if (event.key === 'ArrowDown') {
                idx = Math.min(idx + 1, divsArray.length - 1);
            } else if (event.key === 'Home') {
                idx = 0;
            } else if (event.key === 'End') {
                idx = divsArray.length - 1;
            }
            updateSelection(divsArray[idx]);
            divsArray[idx].scrollIntoView({ block: 'nearest' });
        }

        if (event.key === 'Enter' && activeDiv) {
            const anchor = activeDiv.querySelector('a');
            if (anchor) {
                window.location.href = anchor.getAttribute('href');
            }
            closeModal();
        }
    });
});
