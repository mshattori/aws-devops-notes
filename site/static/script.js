// Restore scroll position on page load
window.addEventListener('load', () => {
  try {
    const key = location.pathname;
    const pos = localStorage.getItem(key);
    if (pos) {
      window.scrollTo(0, parseInt(pos, 10));
    }
  } catch (e) {
    // localStorage might not be available, ignore error
  }
});

// Save scroll position
const saveScrollPosition = () => {
  try {
    localStorage.setItem(location.pathname, String(window.scrollY));
  } catch (e) {
    // localStorage might not be available, ignore error
  }
};

// Save on page unload
window.addEventListener('beforeunload', saveScrollPosition);

// Save when page becomes hidden
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    saveScrollPosition();
  }
});

// Floating footer: show title + scroll percentage
document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('.footer');
  const footerTitle = document.getElementById('title');
  const scrollPercentage = document.getElementById('scrollPercentage');

  if (footerTitle) {
    footerTitle.textContent = document.title;
  }

  const updatePercentage = () => {
    if (!scrollPercentage) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = Math.max(document.documentElement.scrollHeight - document.documentElement.clientHeight, 0);
    const scrolled = docHeight === 0 ? 100 : (scrollTop / docHeight) * 100;
    scrollPercentage.textContent = scrolled.toFixed(0) + '%';
  };

  const showFooterTemporarily = () => {
    if (!footer) return;
    footer.style.display = 'flex';
    clearTimeout(footer._hideTimeout);
    footer._hideTimeout = setTimeout(() => {
      footer.style.display = 'none';
    }, 1200);
  };

  updatePercentage();
  showFooterTemporarily();

  window.addEventListener('scroll', () => {
    updatePercentage();
    showFooterTemporarily();
  });
});
