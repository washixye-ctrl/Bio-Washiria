/* Basic deterrents only. Browser source/network access cannot be fully blocked. */
(() => {
  'use strict';
  const isEditable = (target) => target && (
    target.isContentEditable ||
    /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)
  );

  document.addEventListener('contextmenu', (event) => {
    if (!isEditable(event.target)) event.preventDefault();
  });

  document.addEventListener('keydown', (event) => {
    const key = (event.key || '').toLowerCase();
    const blocked =
      key === 'f12' ||
      (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].includes(key)) ||
      (event.ctrlKey && ['u', 's'].includes(key)) ||
      (event.metaKey && event.altKey && ['i', 'j', 'c'].includes(key)) ||
      (event.metaKey && key === 'u');

    if (blocked) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
})();
