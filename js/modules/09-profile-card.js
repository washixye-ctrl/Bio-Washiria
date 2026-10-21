// ========== Profile card flip (QR back) ==========
const profileCard = document.getElementById('profileCard');
if (profileCard) {
  let flipBusy = false;
  const isTouchDevice = () =>
    window.matchMedia('(hover: none), (pointer: coarse)').matches ||
    window.matchMedia('(max-width: 720px)').matches;

  function toggleProfileFlip(onComplete) {
    if (flipBusy) return;
    flipBusy = true;
    const willShowBack = !profileCard.classList.contains('is-flipped');
    profileCard.classList.add('is-flipping');
    // สลับหน้า/หลังตรงกลาง animation (ตอน scaleX ≈ 0)
    setTimeout(() => {
      profileCard.classList.toggle('is-flipped');
    }, 320);
    setTimeout(() => {
      profileCard.classList.remove('is-flipping');
      flipBusy = false;
      if (typeof onComplete === 'function') onComplete(willShowBack);
    }, 720);
  }

  profileCard.addEventListener('click', (e) => {
    // อย่าพลิกเมื่อกดลิงก์โซเชียล
    if (e.target.closest('a.social-btn')) return;

    // มือถือ: ครั้งที่ 1 → ด้านหลัง · ครั้งที่ 2 → กลับหน้า + เปลี่ยนพื้นหลัง
    if (isTouchDevice()) {
      const showingBack = profileCard.classList.contains('is-flipped');
      if (showingBack) {
        toggleProfileFlip(() => {
          if (entered) cycleTheme(1);
        });
      } else {
        toggleProfileFlip();
      }
      return;
    }

    toggleProfileFlip();
  });

  profileCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleProfileFlip();
    }
  });
}


