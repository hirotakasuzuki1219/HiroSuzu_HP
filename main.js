const FORM_ENDPOINT = 'https://formspree.io/f/mgvjndgq';

// Language switching
function switchLanguage(lang) {
  document.documentElement.lang = lang;
  document.body.setAttribute('data-lang', lang);
  
  // Update page title and description
  const titleEl = document.getElementById('page-title');
  const descEl = document.getElementById('page-description');
  if (titleEl) {
    titleEl.textContent = lang === 'ja' 
      ? '鈴木裕敬 | Official Website'
      : 'Hirotaka Suzuki | Official Website';
  }
  if (descEl) {
    descEl.content = lang === 'ja'
      ? '鈴木裕敬のポートフォリオ兼公式サイト。プロフィール、提供価値、実績、活動情報をご覧いただけます。'
      : 'Hirotaka Suzuki\'s portfolio and official website. View profile, expertise, achievements, and activities.';
  }
  
  // Update all elements with data-ja and data-en attributes
  document.querySelectorAll('[data-ja][data-en]').forEach(el => {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      const placeholder = lang === 'ja' ? el.getAttribute('data-placeholder-ja') : el.getAttribute('data-placeholder-en');
      if (placeholder) {
        el.placeholder = placeholder;
      }
    } else {
      const content = el.getAttribute(`data-${lang}`);
      if (content) {
        // Use innerHTML for elements that may contain HTML tags like <br>
        if (content.includes('<br>') || content.includes('<br/>')) {
          el.innerHTML = content;
        } else {
          el.textContent = content;
        }
      }
    }
  });

  // Update elements with only text content
  document.querySelectorAll('[data-ja]').forEach(el => {
    if (!el.hasAttribute('data-en')) {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        el.textContent = text;
      }
    }
  });

  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Update form subject
  const subjectInput = document.querySelector('input[name="_subject"]');
  if (subjectInput) {
    subjectInput.value = lang === 'ja' 
      ? '鈴木裕敬HPからのお問い合わせ' 
      : 'Contact from Hirotaka Suzuki Website';
  }

  // Save preference
  localStorage.setItem('preferredLang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize language
  const savedLang = localStorage.getItem('preferredLang') || 'ja';
  switchLanguage(savedLang);

  // Language switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });

  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Form submission
  const form = document.querySelector('.contact__form');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const currentLang = document.body.getAttribute('data-lang') || 'ja';
    const successMsg = currentLang === 'ja' 
      ? 'ありがとうございます。お問い合わせを送信しました。'
      : 'Thank you! Your message has been sent.';
    const errorMsg = currentLang === 'ja'
      ? '送信に失敗しました。再度お試しください。'
      : 'Failed to send. Please try again.';

    try {
      const formData = new FormData(form);
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (response.ok) {
        alert(successMsg);
        form.reset();
        // Reset placeholders after form reset
        setTimeout(() => {
          switchLanguage(currentLang);
        }, 100);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      alert(errorMsg);
      console.error(error);
    }
  });
});

