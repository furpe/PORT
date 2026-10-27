/**
 * DAVI FURLAN — INTERACTION ENGINE
 * Inspirations: Arc Marumo (CRT HUD) & Overworld Audio (Ethereal Canvas & Sound)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. PROJECT DATA REPOSITORY (For 3D Showcase & Work Archive)
  // --------------------------------------------------------------------------
  const projectsData = [
    {
      index: '01',
      category: 'Front-end Interativo',
      title: 'Slider 2A',
      desc: 'Slider web dinâmico com transições suaves que desenvolvi em React e Vite para praticar controle de estado e CSS interativo.',
      tags: ['React', 'JavaScript', 'Vite', 'CSS3'],
      url: 'https://slider-2a-eight.vercel.app/',
      github: 'https://github.com/furpe/slider-2a',
      hasLive: true
    },
    {
      index: '02',
      category: 'UI & Validação',
      title: 'Telas de Login & Cadastro',
      desc: 'Exercício focado em experiência do usuário e validação de formulários web. Desenvolvi fluxos de login, feedback de erro visual e layout responsivo.',
      tags: ['React', 'JavaScript', 'CSS Modules', 'Forms'],
      url: 'https://telas-login-swart.vercel.app',
      github: 'https://github.com/furpe/TelasLogin',
      hasLive: true
    },
    {
      index: '03',
      category: 'Back-end & Segurança',
      title: 'TelaTrabalho — API REST',
      desc: 'API completa com rotas REST e persistência no MongoDB Atlas. Implementei autenticação segura com tokens JWT para controle de acesso.',
      tags: ['Node.js', 'Express', 'MongoDB Atlas', 'JWT'],
      url: 'https://github.com/furpe/TelaTrabalho',
      github: 'https://github.com/furpe/TelaTrabalho',
      hasLive: false
    },
    {
      index: '04',
      category: 'Banco de Dados na Nuvem',
      title: 'MongoDB Cloud Lab',
      desc: 'Aplicação prática para testar conexões com o MongoDB Atlas na nuvem, operações de CRUD e manipulação de documentos NoSQL.',
      tags: ['Node.js', 'Express', 'MongoDB Atlas', 'Vercel'],
      url: 'https://mongo-db-ashy.vercel.app',
      github: 'https://github.com/furpe/MongoDb',
      hasLive: true
    },
    {
      index: '05',
      category: 'Programação Java',
      title: 'ANIMAL (POO em Java)',
      desc: 'Projeto em Java aplicando os pilares da Orientação a Objetos na prática: herança, polimorfismo, encapsulamento e classes utilitárias.',
      tags: ['Java', 'POO', 'Arquitetura', 'Clean Code'],
      url: 'https://github.com/furpe/ANIMAL',
      github: 'https://github.com/furpe/ANIMAL',
      hasLive: false
    },
    {
      index: '06',
      category: 'Identidade & Criatividade',
      title: 'Portfólio Pessoal (CRT)',
      desc: 'Interface inspirada em monitores CRT clássicos com scanlines, curvatura de tubo, tema verde e roxo e sintetizador de som em JavaScript puro.',
      tags: ['HTML5', 'CSS3 Moderno', 'JavaScript', 'Web Audio API'],
      url: '#inicio',
      github: 'https://github.com/furpe',
      hasLive: true
    }
  ];

  // --------------------------------------------------------------------------
  // 2. TIMECODE & LOCAL CLOCK
  // --------------------------------------------------------------------------
  const timecodeEl = document.getElementById('crt-timecode');
  const clockEl = document.getElementById('crt-clock');
  const startTime = performance.now();

  function updateHUDTime() {
    // 1. Running Timecode (00:00:00.0)
    if (timecodeEl) {
      const elapsedMs = performance.now() - startTime;
      const totalSec = Math.floor(elapsedMs / 1000);
      const hours = String(Math.floor(totalSec / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
      const seconds = String(totalSec % 60).padStart(2, '0');
      const tenths = Math.floor((elapsedMs % 1000) / 100);
      timecodeEl.textContent = `${hours}:${minutes}:${seconds}.${tenths}`;
    }

    // 2. Local Clock (13:28:45 BRT)
    if (clockEl) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('pt-BR', { hour12: false });
      clockEl.textContent = `${timeStr} BRT`;
    }

    requestAnimationFrame(updateHUDTime);
  }
  requestAnimationFrame(updateHUDTime);

  // --------------------------------------------------------------------------
  // 3. 3D TILTED SCREEN SHOWCASE (Interactive Switcher & Cursor Tilt)
  // --------------------------------------------------------------------------
  let currentShowcaseIdx = 0;
  const showcaseContainer = document.getElementById('perspectiveShowcase');
  const showcaseFrame = document.getElementById('tiltedScreenFrame');
  const showcaseCategory = document.getElementById('showcaseCategory');
  const showcaseTitle = document.getElementById('showcaseTitle');
  const showcaseDesc = document.getElementById('showcaseDesc');
  const showcaseTags = document.getElementById('showcaseTags');
  const showcaseUrlBar = document.getElementById('showcaseUrlBar');
  const showcaseLiveLink = document.getElementById('showcaseLiveLink');
  const showcaseGithubLink = document.getElementById('showcaseGithubLink');
  const showcaseDots = document.getElementById('showcaseDots');
  const stageTabsStrip = document.getElementById('stageTabsStrip');

  function renderStageTabs() {
    if (!stageTabsStrip) return;
    stageTabsStrip.innerHTML = '';
    projectsData.forEach((proj, idx) => {
      const tab = document.createElement('button');
      tab.className = `stage-tab-btn ${idx === currentShowcaseIdx ? 'active' : ''}`;
      tab.textContent = `${proj.index} / ${proj.title}`;
      tab.addEventListener('click', () => {
        playClickSound();
        setProjectShowcase(idx);
      });
      stageTabsStrip.appendChild(tab);
    });
  }

  function renderShowcaseDots() {
    if (!showcaseDots) return;
    showcaseDots.innerHTML = '';
    projectsData.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `showcase-dot-btn ${idx === currentShowcaseIdx ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Ver projeto ${idx + 1}`);
      dot.addEventListener('click', () => {
        playClickSound();
        setProjectShowcase(idx);
      });
      showcaseDots.appendChild(dot);
    });
  }

  function setProjectShowcase(idx) {
    currentShowcaseIdx = idx;
    const proj = projectsData[idx];

    if (showcaseCategory) showcaseCategory.textContent = `${proj.index} / ${proj.category}`;
    if (showcaseTitle) showcaseTitle.textContent = proj.title;
    if (showcaseDesc) showcaseDesc.textContent = proj.desc;
    if (showcaseUrlBar) showcaseUrlBar.textContent = proj.url.startsWith('http') ? proj.url.replace('https://', '') : `furpe.github.io/${proj.title.toLowerCase().replace(/\s+/g, '-')}`;

    if (showcaseTags) {
      showcaseTags.innerHTML = proj.tags.map(t => `<span class="display-tag">${t}</span>`).join('');
    }

    if (showcaseLiveLink) {
      if (proj.hasLive) {
        showcaseLiveLink.style.display = 'inline-flex';
        showcaseLiveLink.href = proj.url;
        showcaseLiveLink.innerHTML = 'Testar projeto ao vivo ↗';
      } else {
        showcaseLiveLink.style.display = 'none';
      }
    }

    if (showcaseGithubLink) {
      showcaseGithubLink.href = proj.github;
      showcaseGithubLink.innerHTML = 'Ver código no GitHub ↗';
    }

    // Update active tab & dot
    if (stageTabsStrip) {
      Array.from(stageTabsStrip.children).forEach((btn, i) => {
        btn.classList.toggle('active', i === idx);
      });
    }

    if (showcaseDots) {
      Array.from(showcaseDots.children).forEach((btn, i) => {
        btn.classList.toggle('active', i === idx);
      });
    }
  }

  renderStageTabs();
  renderShowcaseDots();
  setProjectShowcase(0);

  // Interactive 3D Cursor Tilt
  if (showcaseContainer && showcaseFrame && window.innerWidth > 1080) {
    showcaseContainer.addEventListener('mousemove', (e) => {
      const rect = showcaseContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const rotateY = -12 + x * 16;
      const rotateX = 6 - y * 12;

      showcaseFrame.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`;
    });

    showcaseContainer.addEventListener('mouseleave', () => {
      showcaseFrame.style.transform = 'rotateY(-12deg) rotateX(6deg) rotateZ(-1deg) scale(1)';
    });
  }

  // --------------------------------------------------------------------------
  // 4. CRT CONTROLS (Theme Claro/Roxo, B&W Phosphor, Scanlines, Web Audio)
  // --------------------------------------------------------------------------
  const crtScreen = document.getElementById('crtScreen');
  const toggleThemeBtn = document.getElementById('toggleThemeBtn');
  const headerThemeBtn = document.getElementById('headerThemeBtn');
  const toggleBwBtn = document.getElementById('toggleBwBtn');
  const toggleScanlinesBtn = document.getElementById('toggleScanlinesBtn');
  const toggleAudioBtn = document.getElementById('toggleAudioBtn');

  function updateThemeUI(isDark) {
    if (toggleThemeBtn) {
      toggleThemeBtn.textContent = isDark ? 'Tema [ROXO]' : 'Tema [CLARO]';
      toggleThemeBtn.classList.toggle('active', isDark);
    }
    if (headerThemeBtn) {
      headerThemeBtn.innerHTML = isDark ? '🌙 Modo Roxo' : '☀️ Modo Claro';
    }
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', isDark ? '#080312' : '#ebedf2');
    }
  }

  function toggleThemeAction() {
    playClickSound();
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('user_theme', isDark ? 'dark' : 'light');
    updateThemeUI(isDark);
    showToast(isDark ? 'Tema Roxo Escuro ativado' : 'Tema Branco Claro ativado');
  }

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('user_theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    updateThemeUI(true);
  } else {
    document.body.classList.remove('dark-theme');
    updateThemeUI(false);
  }

  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener('click', toggleThemeAction);
  }
  if (headerThemeBtn) {
    headerThemeBtn.addEventListener('click', toggleThemeAction);
  }

  // Toggle B&W (Monochrome / Green Phosphor Terminal)
  let bwState = 0; // 0: Normal, 1: B&W, 2: Green Phosphor
  if (toggleBwBtn && crtScreen) {
    toggleBwBtn.addEventListener('click', () => {
      playClickSound();
      bwState = (bwState + 1) % 3;
      crtScreen.classList.remove('bw-mode', 'green-phosphor');

      if (bwState === 0) {
        toggleBwBtn.textContent = 'B&W [OFF]';
        toggleBwBtn.classList.remove('active');
        showToast('Modo de cores normal (Verde & Roxo)');
      } else if (bwState === 1) {
        crtScreen.classList.add('bw-mode');
        toggleBwBtn.textContent = 'B&W [MONO]';
        toggleBwBtn.classList.add('active');
        showToast('Filtro monocromático ativado');
      } else {
        crtScreen.classList.add('green-phosphor');
        toggleBwBtn.textContent = 'Fósforo [Verde P1]';
        toggleBwBtn.classList.add('active');
        showToast('Filtro de fósforo verde ativado');
      }
    });
  }

  // Toggle Scanlines
  if (toggleScanlinesBtn && crtScreen) {
    toggleScanlinesBtn.addEventListener('click', () => {
      playClickSound();
      const isOff = crtScreen.classList.toggle('no-scanlines');
      toggleScanlinesBtn.textContent = isOff ? 'Scanlines [OFF]' : 'Scanlines [ON]';
      toggleScanlinesBtn.classList.toggle('active', !isOff);
      showToast(isOff ? 'Linhas de varredura desativadas' : 'Linhas de varredura ativadas');
    });
  }

  // --------------------------------------------------------------------------
  // 5. SYNTHESIZED WEB AUDIO (Ambient Drone & Haptic Clicks)
  // --------------------------------------------------------------------------
  let audioCtx = null;
  let ambientOsc1 = null;
  let ambientOsc2 = null;
  let ambientGain = null;
  let isAudioEnabled = false;

  function initAudioEngine() {
    if (audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    audioCtx = new AudioContext();
  }

  function startAmbientDrone() {
    if (!audioCtx) initAudioEngine();
    if (!audioCtx) return;

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Master ambient gain
    ambientGain = audioCtx.createGain();
    ambientGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    ambientGain.gain.exponentialRampToValueAtTime(0.06, audioCtx.currentTime + 3);

    // Filter for deep, warm Overworld texture
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(240, audioCtx.currentTime);

    // Osc 1 (55Hz — A1 deep drone)
    ambientOsc1 = audioCtx.createOscillator();
    ambientOsc1.type = 'sine';
    ambientOsc1.frequency.setValueAtTime(55, audioCtx.currentTime);

    // Osc 2 (110Hz subtle overtone with detune for ethereal shimmer)
    ambientOsc2 = audioCtx.createOscillator();
    ambientOsc2.type = 'triangle';
    ambientOsc2.frequency.setValueAtTime(110, audioCtx.currentTime);
    ambientOsc2.detune.setValueAtTime(3, audioCtx.currentTime);

    ambientOsc1.connect(filter);
    ambientOsc2.connect(filter);
    filter.connect(ambientGain);
    ambientGain.connect(audioCtx.destination);

    ambientOsc1.start();
    ambientOsc2.start();
  }

  function stopAmbientDrone() {
    if (ambientGain && audioCtx) {
      ambientGain.gain.setValueAtTime(ambientGain.gain.value, audioCtx.currentTime);
      ambientGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);
      setTimeout(() => {
        try {
          if (ambientOsc1) ambientOsc1.stop();
          if (ambientOsc2) ambientOsc2.stop();
        } catch (_) {}
      }, 1500);
    }
  }

  function playClickSound() {
    if (!isAudioEnabled) return;
    try {
      if (!audioCtx) initAudioEngine();
      if (!audioCtx) return;

      const clickOsc = audioCtx.createOscillator();
      const clickGain = audioCtx.createGain();

      clickOsc.type = 'sine';
      clickOsc.frequency.setValueAtTime(740, audioCtx.currentTime);
      clickOsc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.035);

      clickGain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      clickGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.035);

      clickOsc.connect(clickGain);
      clickGain.connect(audioCtx.destination);

      clickOsc.start();
      clickOsc.stop(audioCtx.currentTime + 0.04);
    } catch (_) {}
  }

  if (toggleAudioBtn) {
    toggleAudioBtn.addEventListener('click', () => {
      initAudioEngine();
      isAudioEnabled = !isAudioEnabled;

      if (isAudioEnabled) {
        toggleAudioBtn.textContent = 'Áudio [ON]';
        toggleAudioBtn.classList.add('active');
        startAmbientDrone();
        playClickSound();
        showToast('Áudio ambiente ativado ♫');
      } else {
        toggleAudioBtn.textContent = 'Áudio [OFF]';
        toggleAudioBtn.classList.remove('active');
        stopAmbientDrone();
        showToast('Áudio silenciado');
      }
    });
  }

  // Add click sound to interactive buttons & links
  document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('click', () => {
      playClickSound();
    });
  });

  // --------------------------------------------------------------------------
  // 6. AMBIENT BACKGROUND CANVAS (Overworld Audio Ethereal Particles & Nebula)
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 22), 60);
    const colors = [
      'rgba(5, 150, 105, ',   // Emerald Green
      'rgba(16, 185, 129, ',  // Mint
      'rgba(124, 58, 237, ',  // Electric Purple
      'rgba(168, 85, 247, '   // Violet
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.45 + 0.15,
        alpha: 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.3
      });
    }

    function drawAmbientSpace() {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.body.classList.contains('dark-theme');

      // Glowing nebula center (adaptable for light/dark)
      const gradient = ctx.createRadialGradient(
        width * 0.5, height * 0.35, 40,
        width * 0.5, height * 0.35, width * 0.7
      );
      if (isDark) {
        gradient.addColorStop(0, 'rgba(62, 16, 102, 0.4)');
        gradient.addColorStop(0.5, 'rgba(10, 36, 22, 0.25)');
        gradient.addColorStop(1, 'transparent');
      } else {
        gradient.addColorStop(0, 'rgba(124, 58, 237, 0.05)');
        gradient.addColorStop(0.5, 'rgba(5, 150, 105, 0.04)');
        gradient.addColorStop(1, 'transparent');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Connect subtle constellation lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = i % 2 === 0
              ? (isDark ? `rgba(0, 255, 136, ${(1 - dist / 130) * 0.14})` : `rgba(5, 150, 105, ${(1 - dist / 130) * 0.12})`)
              : (isDark ? `rgba(168, 85, 247, ${(1 - dist / 130) * 0.14})` : `rgba(124, 58, 237, ${(1 - dist / 130) * 0.12})`);
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw bioluminescent particles
      particles.forEach(p => {
        p.pulsePhase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.18;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.05, p.alpha)})`;
        ctx.shadowColor = p.color + '0.7)';
        ctx.shadowBlur = p.radius * 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(drawAmbientSpace);
    }
    requestAnimationFrame(drawAmbientSpace);
  }

  // --------------------------------------------------------------------------
  // 7. TOAST NOTIFICATION UTILITY
  // --------------------------------------------------------------------------
  let toastTimer = null;
  function showToast(message) {
    let toast = document.getElementById('retroToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'retroToast';
      toast.className = 'retro-toast';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --------------------------------------------------------------------------
  // 8. MOBILE MENU TOGGLE
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      playClickSound();
      const open = navLinks.classList.toggle('open');
      menuToggle.textContent = open ? 'Fechar ✕' : 'Menu ☰';
    });

    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.textContent = 'Menu ☰';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 9. CONTACT FORM DISPATCHER
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      playClickSound();

      const f = new FormData(contactForm);
      const name = f.get('name') || '';
      const email = f.get('email') || '';
      const message = f.get('message') || '';

      const recipient = '28751@raphaeldisanto.com.br';
      const subject = encodeURIComponent(`Contato pelo portfólio — ${name}`);
      const body = encodeURIComponent(
        `Nome: ${name}\nE-mail para resposta: ${email}\n\nMensagem:\n${message}\n\n-- Enviado pelo portfólio de Davi Furlan`
      );

      if (formFeedback) {
        formFeedback.innerHTML = `<span style="color: var(--neon-green);">✓ Tudo pronto! Abrindo seu e-mail para enviar a mensagem...</span>`;
      }
      showToast('Abrindo seu aplicativo de e-mail...');

      setTimeout(() => {
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      }, 500);
    });
  }

  // Copy email shortcut
  const emailCopyBtn = document.getElementById('copyEmailBtn');
  if (emailCopyBtn) {
    emailCopyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      playClickSound();
      navigator.clipboard.writeText('28751@raphaeldisanto.com.br').then(() => {
        showToast('E-mail copiado: 28751@raphaeldisanto.com.br');
      });
    });
  }
});
