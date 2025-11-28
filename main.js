const FORM_ENDPOINT = 'https://formspree.io/f/mgvjndgq';

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const form = document.querySelector('.contact__form');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(form);
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (response.ok) {
        alert('ありがとうございます。お問い合わせを送信しました。');
        form.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      alert('送信に失敗しました。再度お試しください。');
      console.error(error);
    }
  });
});

