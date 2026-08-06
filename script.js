document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. MONOCHROME TERMINAL ENGINE
    // --------------------------------------------------------------------------
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');
    const termChips = document.querySelectorAll('.term-chip');

    const commands = {
        help: `Available Shell Commands:
  <span class="cmd-highlight">whoami</span>       - Executive overview of Amogh Brahma R
  <span class="cmd-highlight">resume</span>       - Download Amogh Brahma R's Resume (PDF)
  <span class="cmd-highlight">skills</span>       - VAPT, Red Teaming, Languages & Toolset
  <span class="cmd-highlight">projects</span>     - Key security repositories & AI cyber simulators
  <span class="cmd-highlight">certs</span>        - List of TryHackMe, CEH & future credentials
  <span class="cmd-highlight">contact</span>      - Direct email, mobile, and GitHub profile
  <span class="cmd-highlight">clear</span>        - Clear terminal console`,
        whoami: `<strong>SYSTEM IDENTITY:</strong>
Name: Amogh Brahma R
Role: Security Engineer Intern @ Gigahertz Consultants | VAPT Analyst
Education: B.Tech ISE @ Acharya IT (2022-2026, GPA 8.5) | PUC @ Deeksha KMWA (2020-2022) | School @ B.P. Indian Public School (2011-2020)
Highlights: Winner @ Hack-a-League 3.0, Runner-up @ Acharya CTF`,
        resume: `<strong>DOWNLOADING RESUME:</strong>
Initiating download for <strong>Amogh_Brahma_R_Resume.pdf</strong>...
<a href="assets/Amogh_Brahma_R_Resume.pdf" download="Amogh_Brahma_R_Resume.pdf" style="color: var(--accent-secondary); text-decoration: underline;">Click here if download does not start automatically.</a>`,
        cv: `<strong>DOWNLOADING RESUME:</strong>
Initiating download for <strong>Amogh_Brahma_R_Resume.pdf</strong>...
<a href="assets/Amogh_Brahma_R_Resume.pdf" download="Amogh_Brahma_R_Resume.pdf" style="color: var(--accent-secondary); text-decoration: underline;">Click here if download does not start automatically.</a>`,
        skills: `<strong>SECURITY & TECHNICAL MATRIX:</strong>
• VAPT & Security: Nmap, Burp Suite, Metasploit, Wireshark, Hydra, Gobuster, ffuf, John the Ripper, Hashcat
• Languages & Web: Python, Bash, SQL, JavaScript, Flask, Node.js, Express.js, React, PyTorch
• Platforms & Cloud: Linux (Kali, Parrot, Ubuntu), Windows, Active Directory, Docker, AWS, GCP`,
        projects: `<strong>FEATURED PROJECTS:</strong>
1. <strong>VulnHunter</strong> - Web Security Scanner (MERN Stack, Security Analysis)
2. <strong>AI Password Security System</strong> - ML Password Vulnerability Detector (Flask, Scikit-learn)
3. <strong>Cyber WatchDogs</strong> - Raspberry Pi Intrusion Detection System (ELK Stack)
4. <strong>AI Cyber Warfare Simulator</strong> - Deep RL Red vs Blue Team Simulator (PyTorch, DarkBERT)`,
        certs: `<strong>CERTIFICATIONS & CREDENTIALS:</strong>
• TryHackMe - Jr Penetration Tester
• TryHackMe - Cyber Security 101
• TryHackMe - Pre-Security Path
• Certified Ethical Hacker (CEH) - EC-Council (Currently Pursuing)
• Target Certifications: eJPT & PJPT`,
        contact: `<strong>CONTACT CHANNELS:</strong>
• Email: amoghbrahma@gmail.com
• Mobile: +91 81233 68300
• GitHub: github.com/amogh344`
    };

    function executeCommand(cmd) {
        const cleanCmd = cmd.trim().toLowerCase();

        const inputLine = document.createElement('div');
        inputLine.className = 'terminal-line';
        inputLine.innerHTML = `<span class="prompt-user">amoghbrahma@sec-ops</span>:<span class="prompt-path">~</span>$ ${escapeHTML(cmd)}`;
        termOutput.appendChild(inputLine);

        if (cleanCmd === 'clear') {
            termOutput.innerHTML = `
                <div class="terminal-welcome">
                    <p class="cyber-green">A Shell v3.0 [Console Cleared]</p>
                </div>`;
        } else if (commands[cleanCmd]) {
            const resLine = document.createElement('div');
            resLine.className = 'terminal-response';
            resLine.innerHTML = commands[cleanCmd].replace(/\n/g, '<br>');
            termOutput.appendChild(resLine);

            if (cleanCmd === 'resume' || cleanCmd === 'cv') {
                const downloadLink = document.createElement('a');
                downloadLink.href = 'assets/Amogh_Brahma_R_Resume.pdf';
                downloadLink.download = 'Amogh_Brahma_R_Resume.pdf';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                downloadLink.remove();
                showToast('Resume PDF download initiated!');
            }
        } else if (cleanCmd !== '') {
            const errLine = document.createElement('div');
            errLine.className = 'terminal-response muted';
            errLine.innerHTML = `bash: command not found: '${escapeHTML(cleanCmd)}'. Type <span class="cmd-highlight">'help'</span> for valid commands.`;
            termOutput.appendChild(errLine);
        }

        termOutput.scrollTop = termOutput.scrollHeight;
    }

    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = termInput.value;
                executeCommand(val);
                termInput.value = '';
            }
        });
    }

    termChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            executeCommand(cmd);
        });
    });

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g,
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
    }

    // --------------------------------------------------------------------------
    // 3. UNIFIED PROJECT & REPOSITORY FILTERING
    // --------------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('#projects-container .project-card');
    const githubRepoWrapper = document.getElementById('github-repos-container')?.parentElement;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });

    // --------------------------------------------------------------------------
    // 4. GOLD-STANDARD THEME TOGGLE (Dark / Light)
    // --------------------------------------------------------------------------
    const themeBtn = document.getElementById('theme-btn');
    const moonIcon = document.querySelector('.theme-icon-moon');
    const sunIcon = document.querySelector('.theme-icon-sun');
    const themes = ['monochrome-dark', 'monochrome-light'];
    let currentThemeIdx = 0;

    function updateIcons(theme) {
        if (theme === 'monochrome-light') {
            if (moonIcon) moonIcon.style.display = 'none';
            if (sunIcon) sunIcon.style.display = 'inline-block';
        } else {
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'inline-block';
        }
    }

    const savedTheme = localStorage.getItem('amogh_mono_theme');
    if (savedTheme && themes.includes(savedTheme)) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        currentThemeIdx = themes.indexOf(savedTheme);
        updateIcons(savedTheme);
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', (e) => {
            const rect = themeBtn.getBoundingClientRect();
            const x = e.clientX || (rect.left + rect.width / 2);
            const y = e.clientY || (rect.top + rect.height / 2);

            currentThemeIdx = (currentThemeIdx + 1) % themes.length;
            const newTheme = themes[currentThemeIdx];

            const changeTheme = () => {
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('amogh_mono_theme', newTheme);
                updateIcons(newTheme);
            };

            // Industry-Standard Circular Screen Reveal (View Transitions API)
            if (document.startViewTransition) {
                const transition = document.startViewTransition(() => {
                    changeTheme();
                });

                transition.ready.then(() => {
                    const radius = Math.hypot(
                        Math.max(x, window.innerWidth - x),
                        Math.max(y, window.innerHeight - y)
                    );

                    document.documentElement.animate(
                        {
                            clipPath: [
                                `circle(0px at ${x}px ${y}px)`,
                                `circle(${radius}px at ${x}px ${y}px)`
                            ]
                        },
                        {
                            duration: 480,
                            easing: 'cubic-bezier(0.25, 1, 0.4, 1)',
                            pseudoElement: '::view-transition-new(root)'
                        }
                    );
                });
            } else {
                changeTheme();
            }

            showToast(`Theme: ${newTheme === 'monochrome-dark' ? 'DARK MODE' : 'LIGHT MODE'}`);
        });
    }

    // --------------------------------------------------------------------------
    // 5. TOAST NOTIFICATIONS & COPY TO CLIPBOARD
    // --------------------------------------------------------------------------
    function showToast(msg) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fas fa-terminal"></i> <span>${msg}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    function setupCopyBtn(elementId, textToCopy, label) {
        const el = document.getElementById(elementId);
        if (el) {
            el.addEventListener('click', () => {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied ${label} to clipboard!`);
                }).catch(() => {
                    showToast(`Failed to copy ${label}`);
                });
            });
        }
    }

    setupCopyBtn('copy-email-btn', 'amoghbrahma@gmail.com', 'Email');
    setupCopyBtn('copy-phone-btn', '+91 81233 68300', 'Mobile Number');
    setupCopyBtn('contact-email', 'amoghbrahma@gmail.com', 'Email');
    setupCopyBtn('contact-phone', '+91 81233 68300', 'Mobile Number');

    // --------------------------------------------------------------------------
    // 7. MOBILE MENU & SMOOTH SCROLL HIGHLIGHT
    // --------------------------------------------------------------------------
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 180;

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });

    // --------------------------------------------------------------------------
    // 8. PURE CLIENT-SIDE TRYHACKME STATS FETCH (ZERO BACKEND DEPENDENCY)
    // --------------------------------------------------------------------------
    async function fetchTHMStats() {
        const username = 'shdwmnch344';
        const topPercEl = document.getElementById('thm-top-perc');
        const roomsEl = document.getElementById('thm-rooms-count');
        const streakEl = document.getElementById('thm-streak-days');

        const profileUrl = `https://tryhackme.com/api/v2/public-profile?username=${username}`;
        const rankUrl = `https://tryhackme.com/api/user/rank/${username}`;
        const proxyUrl = `https://api.allorigins.win/raw?url=`;

        async function safeFetchJson(url) {
            try {
                const res = await fetch(url);
                if (res.ok) return await res.json();
            } catch (e) { }
            try {
                const res = await fetch(proxyUrl + encodeURIComponent(url));
                if (res.ok) return await res.json();
            } catch (e) { }
            return null;
        }

        try {
            const [profileData, rankData] = await Promise.all([
                safeFetchJson(profileUrl),
                safeFetchJson(rankUrl)
            ]);

            if (profileData && profileData.data) {
                const { completedRoomsCount, streak } = profileData.data;
                if (completedRoomsCount !== undefined && completedRoomsCount !== null && roomsEl) {
                    roomsEl.textContent = completedRoomsCount;
                }
                if (streak !== undefined && streak !== null && streakEl) {
                    streakEl.textContent = `${streak} Days`;
                }
            }

            if (rankData && rankData.topPerc) {
                if (topPercEl) topPercEl.textContent = `Top ${rankData.topPerc}%`;
            } else if (profileData && profileData.data && profileData.data.topPerc) {
                if (topPercEl) topPercEl.textContent = `Top ${profileData.data.topPerc}%`;
            }
        } catch (err) {
            // Silently fall back to pre-rendered defaults (196 Rooms, 56 Days, Top 2%)
        }
    }

    fetchTHMStats();

    // --------------------------------------------------------------------------
    // 9. LIVE GITHUB REPOSITORIES FETCH ENGINE
    // --------------------------------------------------------------------------
    async function fetchGitHubRepos() {
        const container = document.getElementById('github-repos-container');
        if (!container) return;

        try {
            const res = await fetch('https://api.github.com/users/amogh344/repos?sort=updated&per_page=10');
            if (!res.ok) throw new Error('GitHub API HTTP Error');
            let repos = await res.json();

            // Exclude portfolio meta repos (amogh344.github.io and amogh344)
            if (Array.isArray(repos)) {
                repos = repos.filter(repo => {
                    const name = (repo.name || '').toLowerCase();
                    return name !== 'amogh344.github.io' && name !== 'amogh344';
                });
            }

            if (!Array.isArray(repos) || repos.length === 0) {
                container.innerHTML = `
                    <div class="repo-card glass-panel">
                        <div class="repo-top"><div class="repo-icon"><i class="fab fa-github"></i></div></div>
                        <h3 class="repo-title"><a href="https://github.com/amogh344" target="_blank">github.com/amogh344</a></h3>
                        <p class="repo-desc">Explore security tools, VAPT scripts, and machine learning models directly on GitHub.</p>
                        <div class="repo-bottom">
                            <span class="repo-lang"><i class="fas fa-code"></i> Repositories</span>
                            <a href="https://github.com/amogh344" target="_blank" class="repo-link">Visit GitHub Profile <i class="fas fa-arrow-up-right-from-square"></i></a>
                        </div>
                    </div>`;
                return;
            }

            container.innerHTML = repos.map(repo => `
                <div class="repo-card glass-panel">
                    <div class="repo-top">
                        <div class="repo-icon"><i class="fab fa-github"></i></div>
                        <div class="repo-meta-pills">
                            ${repo.stargazers_count > 0 ? `<span class="repo-pill"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>` : ''}
                            ${repo.forks_count > 0 ? `<span class="repo-pill"><i class="fas fa-code-fork"></i> ${repo.forks_count}</span>` : ''}
                        </div>
                    </div>
                    <h3 class="repo-title"><a href="${repo.html_url}" target="_blank">${escapeHTML(repo.name)}</a></h3>
                    <p class="repo-desc">${escapeHTML(repo.description || 'Cybersecurity, VAPT & security engineering repository.')}</p>
                    <div class="repo-bottom">
                        <span class="repo-lang"><i class="fas fa-code"></i> ${escapeHTML(repo.language || 'Security Code')}</span>
                        <a href="${repo.html_url}" target="_blank" class="repo-link">View Code <i class="fas fa-arrow-up-right-from-square"></i></a>
                    </div>
                </div>
            `).join('');
        } catch (err) {
            container.innerHTML = `
                <div class="repo-card glass-panel">
                    <div class="repo-top"><div class="repo-icon"><i class="fab fa-github"></i></div></div>
                    <h3 class="repo-title"><a href="https://github.com/amogh344" target="_blank">github.com/amogh344</a></h3>
                    <p class="repo-desc">Explore security tools, VAPT scripts, and machine learning models directly on GitHub.</p>
                    <div class="repo-bottom">
                        <span class="repo-lang"><i class="fas fa-code"></i> Repositories</span>
                        <a href="https://github.com/amogh344" target="_blank" class="repo-link">Visit GitHub Profile <i class="fas fa-arrow-up-right-from-square"></i></a>
                    </div>
                </div>`;
        }
    }

    fetchGitHubRepos();
});
