document.addEventListener('DOMContentLoaded', (): void => {

  // ============================================
  // 1. SMOOTH SCROLL pour les liens d'ancrage
  // ============================================
  const anchorLinks: NodeListOf<HTMLAnchorElement> =
    document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((anchor: HTMLAnchorElement): void => {
    anchor.addEventListener('click', function (e: Event): void {
      e.preventDefault();

      const href: string | null = this.getAttribute('href');
      if (!href) return;

      const target: HTMLElement | null = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // ============================================
  // 2. ANIMATION AU SCROLL (Intersection Observer)
  // ============================================
  const observerOptions: IntersectionObserverInit = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px',
  };

  const animatedElements: NodeListOf<HTMLElement> = document.querySelectorAll(
    '.about-description-card, .team-bg, .bg-sponsor, .contact-bg, .carte'
  );

  const observer: IntersectionObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]): void => {
      entries.forEach((entry: IntersectionObserverEntry): void => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    observerOptions
  );

  animatedElements.forEach((el: HTMLElement): void => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  const visibleStyle: HTMLStyleElement = document.createElement('style');
  visibleStyle.textContent = `
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(visibleStyle);

  // ============================================
  // 3. NAVBAR ACTIVE LINK au scroll
  // ============================================
  const sections: NodeListOf<HTMLElement> =
    document.querySelectorAll('section[id]');
  const navLinks: NodeListOf<HTMLAnchorElement> =
    document.querySelectorAll('.nav-links li a');

  const updateActiveLink = (): void => {
    const scrollPos: number = window.scrollY + 200;

    sections.forEach((section: HTMLElement): void => {
      const top: number = section.offsetTop;
      const height: number = section.offsetHeight;
      const id: string | null = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link: HTMLAnchorElement): void => {
          link.parentElement?.classList.remove('active');

          const linkHref: string | null = link.getAttribute('href');
          if (linkHref === `#${id}` || linkHref?.includes(id ?? '')) {
            link.parentElement?.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink);

  // ============================================
  // 4. FORMULAIRE CONTACT - Validation simple
  // ============================================
  const contactForm: HTMLElement | null =
    document.querySelector('.contact-form');

  if (contactForm) {
    const button: HTMLButtonElement | null =
      contactForm.querySelector('button');

    if (button) {
      button.addEventListener('click', (): void => {
        const inputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement> =
          contactForm.querySelectorAll('input, textarea');
        let valid: boolean = true;

        inputs.forEach(
          (input: HTMLInputElement | HTMLTextAreaElement): void => {
            if (!input.value.trim()) {
              input.style.borderColor = '#e74c3c';
              valid = false;
            } else {
              input.style.borderColor = 'rgba(0, 0, 0, .12)';
            }
          }
        );

        if (valid) {
          alert('Message envoyé avec succès ! ✅');
          inputs.forEach(
            (input: HTMLInputElement | HTMLTextAreaElement): void => {
              input.value = '';
            }
          );
        } else {
          alert('Veuillez remplir tous les champs. ⚠️');
        }
      });
    }
  }

  // ============================================
  // 5. ANIMATION HERO au chargement
  // ============================================
  const heroText: HTMLElement | null =
    document.querySelector('.hero-text');

  if (heroText) {
    heroText.style.opacity = '0';
    heroText.style.transform = 'translateY(-20px)';
    heroText.style.transition =
      'opacity 0.8s ease, transform 0.8s ease';

    setTimeout((): void => {
      heroText.style.opacity = '1';
      heroText.style.transform = 'translateY(0)';
    }, 300);
  }
});