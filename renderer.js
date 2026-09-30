// =========================================================================
// 1. БАЗА ДАННЫХ И DOM ЭЛЕМЕНТЫ
// =========================================================================
let DB = { users: {}, currentUser: null, settings: {} };
async function syncLoadDB() {
    try { if (window.vibeAPI?.dbLoad) { const l = await window.vibeAPI.dbLoad(); if (l) { DB.users = l.users || {}; DB.currentUser = l.currentUser || null; DB.settings = l.settings || {}; } } } catch (e) { console.error('DB Load Err:', e); }
}
async function syncSaveDB() {
    try { if (window.vibeAPI?.dbSave) await window.vibeAPI.dbSave(DB); } catch (e) { console.error('DB Save Err:', e); }
}

const $ = id => document.getElementById(id);
const authScreen = $('authScreen'), playerScreen = $('playerScreen');
const tabLoginBtn = $('tabLoginBtn'), tabRegisterBtn = $('tabRegisterBtn');
const loginForm = $('loginForm'), registerForm = $('registerForm');
const loginUsername = $('loginUsername'), loginPassword = $('loginPassword');
const actionLoginBtn = $('actionLoginBtn'), actionRegBtn = $('actionRegBtn');
const regUsername = $('regUsername'), regPassword = $('regPassword'), authError = $('authError');
const displayUsername = $('displayUsername'), logoutBtn = $('logoutBtn');
const deleteAccountBtn = $('deleteAccountBtn');
const settingsLogoutBtn = $('settingsLogoutBtn');
const userProfileBtn = $('userProfileBtn'), avatarInput = $('avatarInput');
const userAvatarIcon = $('userAvatarIcon'), userAvatarImg = $('userAvatarImg'), userAvatarBox = $('userAvatarBox');
const navDashboardBtn = $('navDashboardBtn'), navSearchBtn = $('navSearchBtn'), navLikedBtn = $('navLikedBtn');
const navPlaylistsBtn = $('navPlaylistsBtn'), navSettingsBtn = $('navSettingsBtn');
const navStatsBtn = $('navStatsBtn'), navFriendsBtn = $('navFriendsBtn'), friendsBadge = $('friendsBadge');
const dashboardView = $('dashboardView'), tracksView = $('tracksView'), playlistsView = $('playlistsView');
const settingsView = $('settingsView'), lyricsView = $('lyricsView'), statsView = $('statsView'), friendsView = $('friendsView');
const dashGreeting = $('dashGreeting'), dashTimeHHMM = $('dashTimeHHMM'), dashTimeSS = $('dashTimeSS');
const dashDate = $('dashDate'), dashLikesCount = $('dashLikesCount'), dashHistoryCount = $('dashHistoryCount');
const dashArt = $('dashArt'), dashTitle = $('dashTitle'), dashAuthor = $('dashAuthor');
const dashVisBars = document.querySelectorAll('.np-b');
const topSearchPanel = $('topSearchPanel'), searchInput = $('searchInput'), searchBtn = $('searchBtn');
const searchTypeTracks = $('searchTypeTracks'), searchTypePlaylists = $('searchTypePlaylists');
const resultsList = $('resultsList'), tracksTitleText = $('tracksTitleText'), backToPlBtn = $('backToPlBtn');
const playlistsGrid = $('playlistsGrid'), createPlaylistBtn = $('createPlaylistBtn'), importPlaylistBtn = $('importPlaylistBtn');
const playlistModal = $('playlistModal'), plModalTitle = $('plModalTitle'), newPlaylistName = $('newPlaylistName');
const savePlaylistBtn = $('savePlaylistBtn'), closeModalBtn = $('closeModalBtn');
const uploadBgBtn = $('uploadBgBtn'), bgFileInput = $('bgFileInput'), bgGallery = $('bgGallery');
const bgLayer = $('bgLayer'), bgLayer2 = $('bgLayer2'), vignetteLayer = $('vignetteLayer'), dynamicBgToggle = $('dynamicBgToggle');
const bgBlur = $('bgBlur'), valBlur = $('valBlur'), bgSat = $('bgSat'), valSat = $('valSat'), bgVig = $('bgVig'), valVig = $('valVig');
const uploadMiniBgBtn = $('uploadMiniBgBtn'), miniBgFileInput = $('miniBgFileInput'), miniBgGallery = $('miniBgGallery');
const particleCount = $('particleCount'), particleCountVal = $('particleCountVal');
const particleSpeed = $('particleSpeed'), particleSpeedVal = $('particleSpeedVal');
const particlesContainer = $('particlesContainer'), particleFileInput = $('particleFileInput');
const nowPlayingText = $('nowPlayingText'), playPauseBtn = $('playPauseBtn');
const playIconSVG = $('playIconSVG'), pauseIconSVG = $('pauseIconSVG');
const prevTrackBtn = $('prevTrackBtn'), nextTrackBtn = $('nextTrackBtn'), miniPlayerBtn = $('miniPlayerBtn');
const volumeRange = $('volumeRange'), iframeElement = $('sc-iframe');
const currentTimeText = $('currentTimeText'), durationTimeText = $('durationTimeText'), seekbarRange = $('seekbarRange');
const shuffleBtn = $('shuffleBtn'), repeatBtn = $('repeatBtn'), repeatIcon = $('repeatIcon');
const lyricsBtn = $('lyricsBtn'), lyricsContent = $('lyricsContent'), visualizer = $('visualizer');
const actionOverlay = $('actionOverlay'), aoPlay = $('ao-play'), aoPause = $('ao-pause');
// Новые элементы
const statTotalTime = $('statTotalTime'), statTracksCount = $('statTracksCount'), statLikesCount = $('statLikesCount'), statFriendsCount = $('statFriendsCount');
const topArtistsList = $('topArtistsList'), topTracksList = $('topTracksList'), weekChart = $('weekChart');
const friendSearchInput = $('friendSearchInput'), friendSearchBtn = $('friendSearchBtn');
const friendSearchResults = $('friendSearchResults'), friendRequestsList = $('friendRequestsList');
const friendsList = $('friendsList'), requestsCount = $('requestsCount');
const profileModal = $('profileModal'), profileModalContent = $('profileModalContent');
const openEqBtn = $('openEqBtn'), openGameBtn = $('openGameBtn');
const eqModal = $('eqModal'), closeEqBtn = $('closeEqBtn'), eqPresets = $('eqPresets'), eqSliders = $('eqSliders'), eqToggle = $('eqToggle'), eqResetBtn = $('eqResetBtn');
const gameModal = $('gameModal'), closeGameBtn = $('closeGameBtn');
const gameModeSelect = $('gameModeSelect'), gamePlayArea = $('gamePlayArea'), gameResults = $('gameResults');
const gameFriendsList = $('gameFriendsList');
const gfListContainer = $('gfListContainer');
const gfBackBtn = $('gfBackBtn');
const gameInviteScreen = $('gameInviteScreen');
const gameLobby = $('gameLobby');
const lobbyNames = $('lobbyNames');
const lobbyCountdown = $('lobbyCountdown');
const gameSoloBtn = $('gameSoloBtn'), gameDuoBtn = $('gameDuoBtn');
const player1ScoreBox = $('player1ScoreBox'), player2ScoreBox = $('player2ScoreBox');
const player1Label = $('player1Label'), player2Label = $('player2Label');
const player1Score = $('player1Score'), player2Score = $('player2Score'), gameRound = $('gameRound');
const gameLyricsBox = $('gameLyricsBox'), gameResult = $('gameResult');
const gameAnswerInput = $('gameAnswerInput'), gameSubmitBtn = $('gameSubmitBtn');
const gameReplayBtn = $('gameReplayBtn');
const gameSkipBtn = $('gameSkipBtn'), gameGiveUpBtn = $('gameGiveUpBtn'), playAgainBtn = $('playAgainBtn'), finalResults = $('finalResults');

// =========================================================================
// 2. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И УТИЛИТЫ
// =========================================================================
const fallbackAudioPlayer = new Audio();
let widget = null, isPlaying = false, isUsingFallback = false, currentUser = null, currentTrack = null;
let originalQueue = [], currentQueue = [], currentTrackDurationMs = 0;
let searchTimeout = null, searchRequestId = 0, currentView = 'dashboard', searchType = 'tracks', modalMode = 'create';
let dynamicBgEnabled = false, lastDynamicArt = null, isShuffle = false, repeatMode = 0, fallbackRetryTimeout = null;

const ICONS = {
    heart: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
    heartActive: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#ec4899"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
    plus: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,
    cross: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`,
    music: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`,
    playlist: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/></svg>`,
    repeatOff: `<path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>`,
    repeatOne: `<path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z"/>`
};

function escapeHtml(v) { return String(v ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }
function forceSliderUpdate(el) { if (el) el.style.setProperty('--range-val', ((el.value - el.min) / (el.max - el.min) * 100) + '%'); }
function showActionOverlay(isPlayingState) {
    if (!actionOverlay || !aoPlay || !aoPause) return;
    aoPlay.style.display = isPlayingState ? 'block' : 'none'; aoPause.style.display = isPlayingState ? 'none' : 'block';
    actionOverlay.classList.remove('pop'); void actionOverlay.offsetWidth; actionOverlay.classList.add('pop');
    setTimeout(() => actionOverlay.classList.remove('pop'), 400);
}
function getGreeting() {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return "Доброе утро"; if (h >= 12 && h < 18) return "Добрый день";
    if (h >= 18 && h < 23) return "Добрый вечер"; return "Доброй ночи";
}
function shuffleArray(array) { let c = array.length, r; while (c !== 0) { r = Math.floor(Math.random() * c); c--; [array[c], array[r]] = [array[r], array[c]]; } return array; }
function formatTime(seconds) { if (!isFinite(seconds) || seconds < 0) return '0:00'; return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60) < 10 ? '0' : ''}${Math.floor(seconds % 60)}`; }

document.addEventListener('mousedown', function(e) {
    const target = e.target;
    if (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA' || target.closest('.switch')) return;
    const ripple = document.createElement('div'); ripple.className = 'ripple';
    ripple.style.left = `${e.clientX - 20}px`; ripple.style.top = `${e.clientY - 20}px`;
    ripple.style.width = '40px'; ripple.style.height = '40px';
    document.body.appendChild(ripple); setTimeout(() => { if (ripple.parentNode) ripple.remove(); }, 700);
});

// =========================================================================
// 3. DASHBOARD, SHUFFLE, REPEAT
// =========================================================================
function updateClock() {
    const now = new Date();
    if (dashTimeHHMM) dashTimeHHMM.innerText = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    if (dashTimeSS) dashTimeSS.innerText = String(now.getSeconds()).padStart(2, '0');
    if (dashDate) dashDate.innerText = now.toLocaleDateString('ru-RU', { weekday: 'long', month: 'long', day: 'numeric' });
}
setInterval(updateClock, 1000);

function updateDashboardStats() {
    if (!currentUser || !DB.users[currentUser]) return;
    const u = DB.users[currentUser];
    if (dashLikesCount) dashLikesCount.innerText = u.liked ? u.liked.length : 0;
    if (dashHistoryCount) dashHistoryCount.innerText = `В истории: ${u.history ? u.history.length : 0}`;
    if (dashGreeting) dashGreeting.innerText = `${getGreeting()}, ${currentUser}`;
}
function updateDashboardNowPlaying() {
    if (!dashArt) return;
    if (currentTrack) {
        dashArt.innerHTML = currentTrack.artwork ? `<img src="${escapeHtml(currentTrack.artwork)}">` : `<svg viewBox="0 0 24 24" fill="white"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`;
        if (dashTitle) dashTitle.innerText = currentTrack.title || 'Без названия';
        if (dashAuthor) dashAuthor.innerText = currentTrack.author || '';
    }
    dashVisBars.forEach(b => {
        if (isPlaying) { b.style.animation = 'dance 1s ease-in-out infinite alternate'; b.style.opacity = '1'; }
        else { b.style.animation = 'none'; b.style.height = '4px'; b.style.opacity = '0.4'; }
    });
}
function animateDashboard() { document.querySelectorAll('.bento-card').forEach((el, i) => { el.classList.remove('visible'); setTimeout(() => el.classList.add('visible'), 100 + i * 100); }); }

if (shuffleBtn) shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    if (isShuffle) { shuffleBtn.classList.add('active'); if (originalQueue.length > 0) { const f = originalQueue.filter(t => t.url !== currentTrack?.url); currentQueue = currentTrack ? [currentTrack, ...shuffleArray(f)] : shuffleArray([...originalQueue]); } }
    else { shuffleBtn.classList.remove('active'); currentQueue = [...originalQueue]; }
});
if (repeatBtn) repeatBtn.addEventListener('click', () => {
    repeatMode = (repeatMode + 1) % 3;
    if (repeatMode === 0) { repeatBtn.classList.remove('active'); repeatIcon.innerHTML = ICONS.repeatOff; }
    else if (repeatMode === 1) { repeatBtn.classList.add('active'); repeatIcon.innerHTML = ICONS.repeatOff; }
    else { repeatBtn.classList.add('active'); repeatIcon.innerHTML = ICONS.repeatOne; }
});
function playNextTrack(userInitiated = true) {
    if (!currentQueue.length || !currentTrack) return;
    if (!userInitiated && repeatMode === 2) { playTrack(currentTrack); return; }
    const idx = currentQueue.findIndex(t => t.url === currentTrack.url);
    if (idx !== -1) { if (idx + 1 < currentQueue.length) playTrack(currentQueue[idx + 1]); else if (repeatMode === 1) playTrack(currentQueue[0]); else { updatePlayButtonIcon(false); isPlaying = false; updateDashboardNowPlaying(); } }
}
function playPrevTrack() {
    if (!currentQueue.length || !currentTrack) return;
    let ms = isUsingFallback ? fallbackAudioPlayer.currentTime * 1000 : (Number(seekbarRange.value)/100) * currentTrackDurationMs;
    if (ms > 3000) { if (isUsingFallback) fallbackAudioPlayer.currentTime = 0; else if (widget) widget.seekTo(0); return; }
    const idx = currentQueue.findIndex(t => t.url === currentTrack.url);
    if (idx > 0) playTrack(currentQueue[idx - 1]); else if (repeatMode === 1) playTrack(currentQueue[currentQueue.length - 1]);
}
if (nextTrackBtn) nextTrackBtn.addEventListener('click', () => playNextTrack(true));
if (prevTrackBtn) prevTrackBtn.addEventListener('click', () => playPrevTrack());

// =========================================================================
// 4. ВИЗУАЛИЗАТОР И ТЕКСТЫ (БЕЗ ЭМОДЗИ)
// =========================================================================
let visBars = [], engineLoopId = null, lastKnownPositionSec = 0, lastKnownPositionTime = performance.now();
let currentLyricsData = [], lastActiveLyricIndex = -1;

function initVisualizer() {
    if (!visualizer) return; visualizer.innerHTML = ''; visBars = [];
    for (let i = 0; i < 64; i++) { const bar = document.createElement('div'); bar.className = 'vis-bar'; visualizer.appendChild(bar); visBars.push({ el: bar, val: 0.02, target: 0.02, curve: Math.sin((i / 63) * Math.PI) }); }
}
function startRenderEngine() {
    if (engineLoopId) cancelAnimationFrame(engineLoopId); let beatAccum = 0;
    function loop() {
        if (isPlaying) {
            let maxVal = 0;
            visBars.forEach(bar => { if (Math.random() < 0.25) bar.target = 0.05 + (Math.random() * 0.8 * bar.curve); bar.val += (bar.target - bar.val) * 0.2; const s = Math.max(0.02, bar.val); if (s > maxVal) maxVal = s; if (lyricsView?.classList.contains('active')) { bar.el.style.transform = `scaleY(${s})`; bar.el.style.boxShadow = `0 0 ${12 * Math.min(1, s / 0.6)}px rgba(255,255,255,${0.4 * Math.min(1, s / 0.6)})`; } });
            beatAccum += (maxVal - beatAccum) * 0.2;
            if (playPauseBtn) playPauseBtn.style.transform = `scale(${1 + (beatAccum * 0.15)})`;
            if (userAvatarBox) userAvatarBox.style.transform = `scale(${1 + (beatAccum * 0.1)})`;
        } else {
            visBars.forEach(bar => { bar.val += (0.02 - bar.val) * 0.1; if (lyricsView?.classList.contains('active')) { bar.el.style.transform = `scaleY(${Math.max(0.02, bar.val)})`; bar.el.style.boxShadow = 'none'; } });
            if (playPauseBtn) playPauseBtn.style.transform = `scale(1)`; if (userAvatarBox) userAvatarBox.style.transform = `scale(1)`;
        }
        if (isPlaying && currentLyricsData.length > 0 && lyricsView?.classList.contains('active')) updateLyricsHighlight(lastKnownPositionSec + (performance.now() - lastKnownPositionTime) / 1000 + 0.55);
        engineLoopId = requestAnimationFrame(loop);
    }
    engineLoopId = requestAnimationFrame(loop);
}
function updateLyricsHighlight(timeSec) {
    if (!lyricsContent) return; let activeIndex = -1;
    for (let i = 0; i < currentLyricsData.length; i++) { if (timeSec >= currentLyricsData[i].time) activeIndex = i; else break; }
    if (activeIndex !== -1 && activeIndex !== lastActiveLyricIndex) {
        lastActiveLyricIndex = activeIndex; const lines = lyricsContent.querySelectorAll('.lyric-line'); lines.forEach(l => l.classList.remove('active'));
        const activeEl = lines[activeIndex]; if (activeEl) { activeEl.classList.add('active'); lyricsContent.scrollTo({ top: activeEl.offsetTop - lyricsContent.clientHeight / 2 + (activeEl.clientHeight / 2), behavior: 'smooth' }); }
    }
}
function parseLRC(lrcText) {
    const result = []; const regex = /\[(\d{2}):(\d{2}(?:\.\d{2,3})?)\](.*)/;
    for (let line of lrcText.split('\n')) { const match = line.match(regex); if (match && match[3].trim()) result.push({ time: parseInt(match[1], 10) * 60 + parseFloat(match[2]), text: match[3].trim() }); }
    return result;
}
async function fetchAndShowLyrics(track) {
    if (!lyricsContent) return; lyricsContent.innerHTML = 'Ищем текст...'; lyricsContent.classList.add('loading'); currentLyricsData = []; lastActiveLyricIndex = -1;
    try {
        let rawTitle = track.title || '', searchArtist = track.author || '', searchTitle = rawTitle;
        if (rawTitle.includes(' - ')) { const parts = rawTitle.split(' - '); searchArtist = parts[0].trim(); searchTitle = parts.slice(1).join(' ').trim(); }
        const cleanTitle = searchTitle.replace(/\(.*?\)|\[.*?\]/g, '').trim(), cleanArtist = searchArtist.replace(/\(.*?\)|\[.*?\]/g, '').trim();
        let bestMatch = null;
        for (const query of [`${cleanArtist} ${cleanTitle}`, cleanTitle]) {
            if (!query) continue;
            try { const res = await fetch(`https://lrclib.net/api/search?q=${encodeURIComponent(query)}`); const data = await res.json(); if (data?.length > 0) { bestMatch = data[0]; break; } } catch (err) {}
        }
        if (bestMatch) {
            lyricsContent.innerHTML = '';
            if (bestMatch.syncedLyrics) {
                currentLyricsData = parseLRC(bestMatch.syncedLyrics);
                if (currentLyricsData.length > 0) currentLyricsData.forEach(l => { const d = document.createElement('div'); d.className = 'lyric-line'; d.innerText = l.text; lyricsContent.appendChild(d); });
                else lyricsContent.innerHTML = `<div class="lyric-line active" style="font-size:24px;">${escapeHtml(bestMatch.plainLyrics).replace(/\n/g, '<br>')}</div>`;
            } else if (bestMatch.plainLyrics) lyricsContent.innerHTML = `<div class="lyric-line active" style="font-size:24px;">${escapeHtml(bestMatch.plainLyrics).replace(/\n/g, '<br>')}</div>`;
            else lyricsContent.innerHTML = '<div class="lyric-line active">Инструментал</div>';
        } else lyricsContent.innerHTML = `<div class="lyric-line active" style="font-size:20px;">Текст не найден</div>`;
    } catch (e) { lyricsContent.innerHTML = '<div class="lyric-line active">Ошибка сети</div>'; }
    finally { lyricsContent.classList.remove('loading'); if (lyricsContent) lyricsContent.scrollTop = 0; }
}
if (lyricsBtn) lyricsBtn.addEventListener('click', () => {
    if (lyricsView.classList.contains('active')) { lyricsView.classList.remove('active'); lyricsBtn.classList.remove('active'); }
    else { lyricsView.classList.add('active'); lyricsBtn.classList.add('active'); if (currentLyricsData.length > 0) { lastActiveLyricIndex = -1; updateLyricsHighlight(isUsingFallback ? fallbackAudioPlayer.currentTime : (Number(seekbarRange?.value || 0) / 100) * (currentTrackDurationMs / 1000)); } }
});

// =========================================================================
// 5. ЧАСТИЦЫ
// =========================================================================
let currentParticleType = 'none', currentParticleMode = 'fall';
function setupCustomSelects() {
    const typeWrapper = $('customParticleType'), modeWrapper = $('customParticleMode'); if (!typeWrapper || !modeWrapper) return;
    const tBtn = typeWrapper.querySelector('.custom-select-btn'), tMenu = typeWrapper.querySelector('.custom-select-menu'), tSpan = $('ptSelectedText');
    const mBtn = modeWrapper.querySelector('.custom-select-btn'), mMenu = modeWrapper.querySelector('.custom-select-menu'), mSpan = $('pmSelectedText');
    if (tBtn) tBtn.addEventListener('click', (e) => { e.stopPropagation(); if (mMenu) mMenu.classList.remove('open'); tMenu.classList.toggle('open'); });
    if (mBtn) mBtn.addEventListener('click', (e) => { e.stopPropagation(); if (tMenu) tMenu.classList.remove('open'); mMenu.classList.toggle('open'); });
    document.addEventListener('click', () => { if (tMenu) tMenu.classList.remove('open'); if (mMenu) mMenu.classList.remove('open'); });
    typeWrapper.querySelectorAll('.custom-select-item').forEach(item => { item.addEventListener('click', async (e) => { e.stopPropagation(); tMenu.classList.remove('open'); if (tSpan) tSpan.innerText = item.innerText.trim(); if (item.getAttribute('data-val') === 'custom') { if (particleFileInput) particleFileInput.click(); return; } currentParticleType = item.getAttribute('data-val'); await updateParticleSettingsAndReload(); }); });
    modeWrapper.querySelectorAll('.custom-select-item').forEach(item => { item.addEventListener('click', async (e) => { e.stopPropagation(); mMenu.classList.remove('open'); if (mSpan) mSpan.innerText = item.innerText; currentParticleMode = item.getAttribute('data-val'); await updateParticleSettingsAndReload(); }); });
}
async function updateParticleSettingsAndReload() {
    if (!DB.settings) DB.settings = {}; if (!DB.settings.particles) DB.settings.particles = {};
    DB.settings.particles = { type: currentParticleType, mode: currentParticleMode, count: particleCount?.value || '30', speed: particleSpeed?.value || '5', customImg: DB.settings.particles.customImg || '' };
    await syncSaveDB(); loadParticles();
}
function loadParticles() {
    if (!particlesContainer) return; const ps = DB.settings?.particles || {};
    currentParticleType = ps.type || 'none'; currentParticleMode = ps.mode || 'fall';
    const pc = ps.count || '30', pspd = ps.speed || '5';
    const ts = $('ptSelectedText'), ms = $('pmSelectedText');
    if (ts) { const map = { 'none': 'Отключено', 'snow': 'Снег', 'rain': 'Дождь', 'circle': 'Круги', 'square': 'Квадраты', 'stardust': 'Звёздная пыль', 'custom': 'Картинка' }; ts.innerText = map[currentParticleType] || 'Отключено'; }
    if (ms) ms.innerText = currentParticleMode === 'float' ? 'Парение' : 'Падение';
    if (particleCount) { particleCount.value = pc; forceSliderUpdate(particleCount); } if (particleCountVal) particleCountVal.innerText = pc;
    if (particleSpeed) { particleSpeed.value = pspd; forceSliderUpdate(particleSpeed); } if (particleSpeedVal) particleSpeedVal.innerText = pspd;
    document.querySelectorAll('.particle').forEach(p => { p.classList.add('fade-out'); setTimeout(() => p.remove(), 2000); });
    if (currentParticleType === 'none') return;
    for (let i = 0; i < parseInt(pc); i++) setTimeout(() => createParticle(currentParticleType, currentParticleMode, parseInt(pspd), ps.customImg), Math.random() * 1000);
}
function createParticle(type, mode, speed, customImg) {
    if (!particlesContainer) return; const p = document.createElement('div'); p.className = 'particle active';
    const size = Math.random() * 15 + 5; p.style.width = size + 'px'; p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + 'vw'; p.style.top = (Math.random() * 50 - 150) + 'px';
    if (type === 'snow') { p.style.backgroundColor = 'white'; p.style.borderRadius = '50%'; }
    else if (type === 'rain') { p.classList.add('rain'); p.style.height = (size * 3) + 'px'; p.style.animationDelay = Math.random() * 2 + 's'; }
    else if (type === 'circle') { p.style.border = '2px solid rgba(255,255,255,0.5)'; p.style.borderRadius = '50%'; p.style.width = (size*2)+'px'; p.style.height = (size*2)+'px'; }
    else if (type === 'square') { p.style.backgroundColor = 'rgba(255,255,255,0.4)'; }
    else if (type === 'custom' && customImg) { p.style.backgroundImage = `url("${customImg}")`; p.style.width = (size*2)+'px'; p.style.height = (size*2)+'px'; }
    else if (type === 'stardust') { p.style.backgroundColor = '#fff'; p.style.borderRadius = '50%'; p.style.boxShadow = `0 0 ${size*2}px ${size}px rgba(168,85,247,0.8)`; p.style.width = (size/2)+'px'; p.style.height = (size/2)+'px'; mode = 'float'; }
    p.style.animation = type === 'rain' ? `rainDrop ${(2 / speed) + Math.random()}s linear infinite` : (mode === 'fall' ? `fall ${(20 / speed) + Math.random() * 10}s linear infinite` : `float ${(20 / speed) + Math.random() * 10}s ease-in-out infinite alternate`);
    p.style.animationDelay = Math.random() * 5 + 's'; particlesContainer.appendChild(p);
}
if (particleCount) particleCount.addEventListener('change', updateParticleSettingsAndReload);
if (particleSpeed) particleSpeed.addEventListener('change', updateParticleSettingsAndReload);
if (particleCount) particleCount.addEventListener('input', () => { if (particleCountVal) particleCountVal.innerText = particleCount.value; });
if (particleSpeed) particleSpeed.addEventListener('input', () => { if (particleSpeedVal) particleSpeedVal.innerText = particleSpeed.value; });
if (particleFileInput) particleFileInput.addEventListener('change', async (e) => {
    const file = e.target.files?.[0]; if (!file) return; const r = new FileReader();
    r.onload = async (ev) => { currentParticleType = 'custom'; if (!DB.settings) DB.settings = {}; if (!DB.settings.particles) DB.settings.particles = {}; DB.settings.particles.customImg = ev.target.result; await updateParticleSettingsAndReload(); };
    r.readAsDataURL(file); particleFileInput.value = '';
});

// =========================================================================
// 6. SOUNDCLOUD WIDGET & PLAYBACK
// =========================================================================
function loadScWidgetScript() {
    if (window.SC && window.SC.Widget) { initWidget(); return; }
    const script = document.createElement('script'); script.src = 'https://w.soundcloud.com/player/api.js'; script.async = true;
    script.onload = () => initWidget(); document.head.appendChild(script);
}
function getCurrentVolume() { return volumeRange ? Number(volumeRange.value) : 80; }
function applyCurrentVolume() {
    const vol = getCurrentVolume(); if (widget && typeof widget.setVolume === 'function') try { widget.setVolume(vol); } catch {} fallbackAudioPlayer.volume = vol / 100;
}
function updatePlayButtonIcon(playing) { if (playIconSVG && pauseIconSVG) { playIconSVG.style.display = playing ? 'none' : 'block'; pauseIconSVG.style.display = playing ? 'block' : 'none'; } }
function initWidget() {
    if (widget) return widget; if (!iframeElement) return null;
    if (window.SC && window.SC.Widget) { try { widget = SC.Widget(iframeElement); bindWidgetEvents(); } catch (e) { console.error("Widget Err:", e); } } return widget;
}
function bindWidgetEvents() {
    if (!widget) return;
    widget.bind(SC.Widget.Events.READY, () => applyCurrentVolume());
    widget.bind(SC.Widget.Events.PLAY, () => { if (isUsingFallback) return; isPlaying = true; applyCurrentVolume(); updatePlayButtonIcon(true); widget.getDuration(ms => { currentTrackDurationMs = ms || 0; if (durationTimeText) durationTimeText.innerText = formatTime(currentTrackDurationMs / 1000); }); sendMiniState({ playing: true }); updateDashboardNowPlaying(); });
    widget.bind(SC.Widget.Events.PAUSE, () => { if (isUsingFallback) return; isPlaying = false; updatePlayButtonIcon(false); sendMiniState({ playing: false }); updateDashboardNowPlaying(); });
    widget.bind(SC.Widget.Events.FINISH, () => { if (isUsingFallback) return; isPlaying = false; updatePlayButtonIcon(false); if (seekbarRange) { seekbarRange.value = 0; forceSliderUpdate(seekbarRange); } if (currentTimeText) currentTimeText.innerText = '0:00'; sendMiniState({ playing: false, progress: 0, current: 0 }); playNextTrack(false); });
    widget.bind(SC.Widget.Events.ERROR, async () => { if (currentTrack && !isUsingFallback) await playFallback(currentTrack); });
    widget.bind(SC.Widget.Events.PLAY_PROGRESS, data => { if (isUsingFallback || !currentTrackDurationMs) return; const progress = (data.currentPosition / currentTrackDurationMs) * 100; if (seekbarRange) { seekbarRange.value = progress; forceSliderUpdate(seekbarRange); } if (currentTimeText) currentTimeText.innerText = formatTime(data.currentPosition / 1000); sendMiniProgress(); lastKnownPositionSec = data.currentPosition / 1000; lastKnownPositionTime = performance.now(); });
}
fallbackAudioPlayer.addEventListener('timeupdate', () => { if (!isUsingFallback || !fallbackAudioPlayer.duration) return; const progress = (fallbackAudioPlayer.currentTime / fallbackAudioPlayer.duration) * 100; if (seekbarRange) { seekbarRange.value = progress; forceSliderUpdate(seekbarRange); } if (currentTimeText) currentTimeText.innerText = formatTime(fallbackAudioPlayer.currentTime); if (durationTimeText) durationTimeText.innerText = formatTime(fallbackAudioPlayer.duration); sendMiniProgress(); lastKnownPositionSec = fallbackAudioPlayer.currentTime; lastKnownPositionTime = performance.now(); });
fallbackAudioPlayer.addEventListener('ended', () => { if (!isUsingFallback) return; isPlaying = false; updatePlayButtonIcon(false); sendMiniState({ playing: false }); playNextTrack(false); });
if (seekbarRange) seekbarRange.addEventListener('input', e => { const val = Number(e.target.value); forceSliderUpdate(seekbarRange); if (isUsingFallback) { if (fallbackAudioPlayer.duration) fallbackAudioPlayer.currentTime = (val / 100) * fallbackAudioPlayer.duration; } else { const w = initWidget(); if (w && currentTrackDurationMs > 0) w.seekTo((val / 100) * currentTrackDurationMs); } });
if (volumeRange) volumeRange.addEventListener('input', () => { applyCurrentVolume(); forceSliderUpdate(volumeRange); sendMiniState(); });
if (playPauseBtn) playPauseBtn.addEventListener('click', () => {
    if (!currentTrack) return;
    if (isUsingFallback) { if (fallbackAudioPlayer.paused) { fallbackAudioPlayer.play(); showActionOverlay(true); } else { fallbackAudioPlayer.pause(); showActionOverlay(false); } }
    else { const w = initWidget(); if (w) { if (isPlaying) { w.pause(); showActionOverlay(false); } else { w.play(); showActionOverlay(true); } } }
    setTimeout(() => sendMiniState(), 100);
});
async function playFallback(track) {
    clearTimeout(fallbackRetryTimeout);
    try { const fallbackStream = await window.vibeAPI.getFallbackStream(track.fallbackQuery || `${track.author} - ${track.title}`); if (fallbackStream) { isUsingFallback = true; fallbackAudioPlayer.src = fallbackStream; fallbackAudioPlayer.play(); updatePlayButtonIcon(true); sendMiniState({ playing: true }); updateDashboardNowPlaying(); return true; } } catch (e) { console.error("Fallback Err:", e); }
    updatePlayButtonIcon(false); isPlaying = false; fallbackRetryTimeout = setTimeout(() => playNextTrack(false), 2500); return false;
}
async function playTrack(track) {
    if (!track || !track.url) return; currentTrack = track; isPlaying = true; isUsingFallback = false; currentTrackDurationMs = 0; clearTimeout(fallbackRetryTimeout);
    try { fallbackAudioPlayer.pause(); } catch {}
    document.querySelectorAll('.track-card, .track-item').forEach(el => { if (el._trackData && el._trackData.url === track.url) el.classList.add('playing'); else el.classList.remove('playing'); });
    try { if (currentUser && DB.users[currentUser]) { const u = DB.users[currentUser]; if (!u.history) u.history = []; u.history = u.history.filter(t => t && t.url !== track.url); u.history.unshift({...track, playedAt: Date.now()}); if (u.history.length > 100) u.history.pop(); await syncSaveDB(); updateDashboardStats(); } } catch (e) {}
    fetchAndShowLyrics(track);
    if (nowPlayingText) nowPlayingText.innerHTML = `<b style="font-size:15px;">${escapeHtml(track.title)}</b><div style="font-size:13px;color:var(--accent-color);margin-top:2px;">${escapeHtml(track.author)}</div>`;
    updatePlayButtonIcon(true); updateDashboardNowPlaying();
    if (currentTimeText) currentTimeText.innerText = '0:00'; if (durationTimeText) durationTimeText.innerText = '0:00'; if (seekbarRange) { seekbarRange.value = 0; forceSliderUpdate(seekbarRange); }
    if (dynamicBgEnabled && track.artwork) setDynamicBackground(track.artwork);
    if (track.isFallbackOnly || (track.url && track.url.includes('/search?q='))) { await playFallback(track); return; }
    const w = initWidget(); if (!w) { await playFallback(track); return; }
    try { w.load(track.url, { auto_play: true, show_artwork: false, callback: () => applyCurrentVolume() }); applyCurrentVolume(); setTimeout(applyCurrentVolume, 400); setTimeout(applyCurrentVolume, 1000); sendMiniState({ playing: true }); } catch (err) { await playFallback(track); }
}

// =========================================================================
// 7. ФОНЫ И ПЛЕЙЛИСТЫ
// =========================================================================
function getBgFilterString() { const b = Number(bgBlur?.value ?? 0), s = Number(bgSat?.value ?? 100); return (dynamicBgEnabled && lastDynamicArt) ? `blur(${b}px) saturate(${s}%) brightness(0.50)` : `blur(${b}px) saturate(${s}%)`; }
function applyFilters() {
    const filterStr = getBgFilterString(), vig = Number(bgVig?.value ?? 0), isDynamic = dynamicBgEnabled && !!lastDynamicArt;
    [bgLayer, bgLayer2].forEach(layer => { if (!layer) return; layer.style.setProperty('filter', filterStr); layer.style.setProperty('transform', isDynamic ? 'scale(1.15)' : 'none'); });
    if (vignetteLayer) vignetteLayer.style.background = `radial-gradient(circle, transparent 40%, rgba(0,0,0,${vig / 100}) 150%)`;
    if (!DB.settings) DB.settings = {}; if (bgBlur) DB.settings.blur = bgBlur.value; if (bgSat) DB.settings.sat = bgSat.value; if (bgVig) DB.settings.vig = bgVig.value; syncSaveDB();
}
function loadFilters() { if (bgBlur) { bgBlur.value = DB.settings?.blur || '0'; forceSliderUpdate(bgBlur); } if (bgSat) { bgSat.value = DB.settings?.sat || '100'; forceSliderUpdate(bgSat); } if (bgVig) { bgVig.value = DB.settings?.vig || '0'; forceSliderUpdate(bgVig); } applyFilters(); }
if (bgBlur) bgBlur.addEventListener('input', () => { applyFilters(); forceSliderUpdate(bgBlur); }); if (bgSat) bgSat.addEventListener('input', () => { applyFilters(); forceSliderUpdate(bgSat); }); if (bgVig) bgVig.addEventListener('input', () => { applyFilters(); forceSliderUpdate(bgVig); });
function setDynamicBackground(artworkUrl) {
    if (!dynamicBgEnabled || !artworkUrl || artworkUrl === lastDynamicArt) return; lastDynamicArt = artworkUrl; if (!bgLayer || !bgLayer2) return;
    bgLayer2.style.backgroundImage = `url("${artworkUrl}")`; bgLayer2.style.setProperty('filter', getBgFilterString()); bgLayer2.style.setProperty('transform', 'scale(1.15)');
    bgLayer2.style.opacity = '0'; void bgLayer2.offsetWidth; bgLayer2.style.opacity = '1'; bgLayer.style.opacity = '0';
    setTimeout(() => { bgLayer.style.backgroundImage = bgLayer2.style.backgroundImage; bgLayer.style.setProperty('filter', getBgFilterString()); bgLayer.style.setProperty('transform', 'scale(1.15)'); bgLayer.style.opacity = '1'; bgLayer2.style.opacity = '0'; document.body.classList.add('dynamic-bg-active', 'has-custom-bg'); applyFilters(); }, 900);
}
function clearDynamicBackground() {
    lastDynamicArt = null; document.body.classList.remove('dynamic-bg-active');
    if (bgLayer) { bgLayer.style.opacity = '1'; bgLayer.style.setProperty('transform', 'none'); }
    if (bgLayer2) { bgLayer2.style.opacity = '0'; bgLayer2.style.setProperty('transform', 'none'); bgLayer2.style.backgroundImage = 'none'; }
    const savedBg = currentUser && DB.users[currentUser] ? DB.users[currentUser].activeBg : null;
    if (savedBg) { if (bgLayer) bgLayer.style.backgroundImage = `url("${savedBg}")`; document.body.classList.add('has-custom-bg'); } else { if (bgLayer) bgLayer.style.backgroundImage = 'none'; document.body.classList.remove('has-custom-bg'); } applyFilters();
}
function loadBackgrounds() {
    if (!currentUser || !DB.users[currentUser]) return; const list = DB.users[currentUser].backgrounds || [], active = DB.users[currentUser].activeBg || null;
    if (active && !dynamicBgEnabled) { if (bgLayer) bgLayer.style.backgroundImage = `url("${active}")`; document.body.classList.add('has-custom-bg'); } else if (!dynamicBgEnabled) { if (bgLayer) bgLayer.style.backgroundImage = 'none'; document.body.classList.remove('has-custom-bg'); }
    if (bgGallery) {
        bgGallery.innerHTML = ''; const def = document.createElement('div'); def.className = 'bg-thumb' + (!active ? ' active' : '');
        def.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#111;color:#aaa;font-size:11px;">Сток</div>`;
        def.onclick = async () => { DB.users[currentUser].activeBg = null; await syncSaveDB(); loadBackgrounds(); applyFilters(); }; bgGallery.appendChild(def);
        list.forEach((src, i) => { const t = document.createElement('div'); t.className = 'bg-thumb' + (active === src ? ' active' : ''); t.innerHTML = `<button class="bg-delete">✖</button><img src="${src}">`;
            t.onclick = async () => { DB.users[currentUser].activeBg = src; await syncSaveDB(); loadBackgrounds(); applyFilters(); };
            const delBtn = t.querySelector('.bg-delete'); if (delBtn) delBtn.onclick = async (e) => { e.stopPropagation(); list.splice(i, 1); if (DB.users[currentUser].activeBg === src) DB.users[currentUser].activeBg = null; await syncSaveDB(); loadBackgrounds(); applyFilters(); }; bgGallery.appendChild(t);
        });
    }
}
async function saveBg(data) { if (!currentUser || !DB.users[currentUser]) return; if (!DB.users[currentUser].backgrounds) DB.users[currentUser].backgrounds = []; DB.users[currentUser].backgrounds.push(data); DB.users[currentUser].activeBg = data; await syncSaveDB(); loadBackgrounds(); applyFilters(); }
if (uploadBgBtn) uploadBgBtn.addEventListener('click', () => { if (bgFileInput) bgFileInput.click(); });
if (bgFileInput) bgFileInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader();
    reader.onload = ev => { if (file.type === 'image/gif') saveBg(ev.target.result); else { const img = new Image(); img.onload = () => { const c = document.createElement('canvas'); let w = img.width, h = img.height; const max = 1600; if (w > max || h > max) { if (w > h) { h = Math.round(h * max / w); w = max; } else { w = Math.round(w * max / h); h = max; } } c.width = w; c.height = h; c.getContext('2d').drawImage(img, 0, 0, w, h); saveBg(c.toDataURL('image/jpeg', 0.8)); }; img.src = ev.target.result; } };
    reader.readAsDataURL(file); bgFileInput.value = '';
});
function loadMiniBackgrounds() {
    if (!currentUser || !DB.users[currentUser]) return; const list = DB.users[currentUser].miniBackgrounds || [], active = DB.users[currentUser].activeMiniBg || null;
    if (miniBgGallery) {
        miniBgGallery.innerHTML = ''; const def = document.createElement('div'); def.className = 'bg-thumb' + (!active ? ' active' : '');
        def.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#111;color:#aaa;font-size:11px;">Сток</div>`;
        def.onclick = async () => { DB.users[currentUser].activeMiniBg = null; await syncSaveDB(); loadMiniBackgrounds(); sendMiniState(); }; miniBgGallery.appendChild(def);
        list.forEach((src, i) => { const t = document.createElement('div'); t.className = 'bg-thumb' + (active === src ? ' active' : ''); t.innerHTML = `<button class="bg-delete">✖</button><img src="${src}">`;
            t.onclick = async () => { DB.users[currentUser].activeMiniBg = src; await syncSaveDB(); loadMiniBackgrounds(); sendMiniState(); };
            const delBtn = t.querySelector('.bg-delete'); if (delBtn) delBtn.onclick = async (e) => { e.stopPropagation(); list.splice(i, 1); if (DB.users[currentUser].activeMiniBg === src) DB.users[currentUser].activeMiniBg = null; await syncSaveDB(); loadMiniBackgrounds(); sendMiniState(); }; miniBgGallery.appendChild(t);
        });
    }
}
async function saveMiniBg(data) { if (!currentUser || !DB.users[currentUser]) return; if (!DB.users[currentUser].miniBackgrounds) DB.users[currentUser].miniBackgrounds = []; DB.users[currentUser].miniBackgrounds.push(data); DB.users[currentUser].activeMiniBg = data; await syncSaveDB(); loadMiniBackgrounds(); sendMiniState(); }
if (uploadMiniBgBtn) uploadMiniBgBtn.addEventListener('click', () => { if (miniBgFileInput) miniBgFileInput.click(); });
if (miniBgFileInput) miniBgFileInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader();
    reader.onload = ev => { if (file.type === 'image/gif') saveMiniBg(ev.target.result); else { const img = new Image(); img.onload = () => { const c = document.createElement('canvas'); let w = img.width, h = img.height; const max = 800; if (w > max || h > max) { if (w > h) { h = Math.round(h * max / w); w = max; } else { w = Math.round(w * max / h); h = max; } } c.width = w; c.height = h; c.getContext('2d').drawImage(img, 0, 0, w, h); saveMiniBg(c.toDataURL('image/jpeg', 0.8)); }; img.src = ev.target.result; } };
    reader.readAsDataURL(file); miniBgFileInput.value = '';
});

function getUserPlaylists() { return currentUser && DB.users[currentUser] ? DB.users[currentUser].playlists || [] : []; }
async function saveUserPlaylists(pls) { if (currentUser && DB.users[currentUser]) { DB.users[currentUser].playlists = pls; await syncSaveDB(); } }
if (createPlaylistBtn) createPlaylistBtn.addEventListener('click', () => { modalMode = 'create'; if (plModalTitle) plModalTitle.innerText = 'Создать плейлист'; if (newPlaylistName) { newPlaylistName.placeholder = 'Название'; newPlaylistName.value = ''; } if (savePlaylistBtn) savePlaylistBtn.innerText = 'Создать'; if (playlistModal) playlistModal.style.display = 'flex'; });
if (importPlaylistBtn) importPlaylistBtn.addEventListener('click', () => { modalMode = 'import'; if (plModalTitle) plModalTitle.innerText = 'Импорт Плейлиста'; if (newPlaylistName) { newPlaylistName.placeholder = 'Ссылка SoundCloud/Spotify'; newPlaylistName.value = ''; } if (savePlaylistBtn) savePlaylistBtn.innerText = 'Импортировать'; if (playlistModal) playlistModal.style.display = 'flex'; });
if (closeModalBtn) closeModalBtn.addEventListener('click', () => { if (playlistModal) playlistModal.style.display = 'none'; });
if (savePlaylistBtn) savePlaylistBtn.addEventListener('click', async () => {
    const val = newPlaylistName?.value.trim(); if (!val) return;
    if (modalMode === 'create') { const pls = getUserPlaylists(); pls.push({ id: 'pl_' + Date.now(), name: val, tracks: [] }); await saveUserPlaylists(pls); if (playlistModal) playlistModal.style.display = 'none'; renderPlaylistsGrid(); }
    else { const origText = savePlaylistBtn.innerText; savePlaylistBtn.innerText = 'Сканируем...'; savePlaylistBtn.disabled = true; try { const data = await window.vibeAPI.importPlaylistUrl(val); if (data.error) alert(data.error); else if (data.tracks?.length > 0) { const pls = getUserPlaylists(); pls.push({ id: 'pl_' + Date.now(), name: data.name || 'Импорт', tracks: data.tracks }); await saveUserPlaylists(pls); if (playlistModal) playlistModal.style.display = 'none'; renderPlaylistsGrid(); alert(`Добавлено "${data.name}": ${data.tracks.length} треков`); } else alert('Треки не найдены'); } catch(e) { alert('Ошибка импорта: ' + (e.message || e)); } savePlaylistBtn.disabled = false; savePlaylistBtn.innerText = origText; }
});
function getLiked() { return currentUser && DB.users[currentUser] ? DB.users[currentUser].liked || [] : []; }
function isLiked(url) { return getLiked().some(t => t.url === url); }
async function toggleLike(track, btn, isCardBtn) {
    if (!currentUser || !DB.users[currentUser]) return; let liked = DB.users[currentUser].liked || []; const idx = liked.findIndex(t => t.url === track.url);
    if (idx > -1) { liked.splice(idx, 1); btn.classList.remove('liked'); btn.innerHTML = ICONS.heart; } else { liked.push(track); btn.classList.add('liked'); btn.innerHTML = isCardBtn ? ICONS.heartActive : ICONS.heart; }
    DB.users[currentUser].liked = liked; await syncSaveDB(); updateDashboardStats(); if (currentView === 'liked') renderLikedTracks();
}
function renderLikedTracks() { const liked = getLiked(); if (tracksTitleText) tracksTitleText.innerHTML = `Любимые треки`; if (resultsList) resultsList.innerHTML = ''; if (!liked.length) { if (resultsList) resultsList.innerHTML = `<div class="empty-state">Нет любимых треков</div>`; return; } liked.forEach(t => createTrackElement(t, { format: 'list' }, resultsList)); }
function createTrackElement(itemData, options = {}, container) {
    if (!container) return; const isPlaylist = itemData.type === 'playlists', isCard = options.format === 'card';
    const item = document.createElement('div'); const likedClass = isLiked(itemData.url) ? 'liked' : '', heartSvg = isLiked(itemData.url) ? ICONS.heartActive : ICONS.heart; item._trackData = itemData;
    const sourceBadge = itemData.source === 'spotify' 
        ? `<span style="background:#1DB954;color:#000;padding:2px 6px;border-radius:4px;font-size:9px;font-weight:800;margin-left:6px;">SPOTIFY</span>` 
        : itemData.source === 'soundcloud'
        ? `<span style="background:#ff5500;color:#fff;padding:2px 6px;border-radius:4px;font-size:9px;font-weight:800;margin-left:6px;">SOUNDCLOUD</span>`
        : '';
    if (isCard) {
        item.className = 'track-card'; if (currentTrack && currentTrack.url === itemData.url && !isPlaylist) item.classList.add('playing');
        const art = itemData.artwork ? `<img class="track-card-art" src="${escapeHtml(itemData.artwork)}" referrerpolicy="no-referrer" loading="lazy">` : `<div class="track-card-art-box" style="display:flex;align-items:center;justify-content:center;">${isPlaylist ? ICONS.playlist : ICONS.music}</div>`;
        const actionHtml = isPlaylist ? `<div style="font-size:11px;font-weight:bold;">ОТКРЫТЬ</div>` : `<button class="action-btn add-btn" title="В плейлист">${ICONS.plus}</button><div class="dropdown-menu" style="top:auto; bottom:-10px; right:0; left:0;"></div><button class="action-btn like-btn ${likedClass}" title="Нравится">${heartSvg}</button>`;
        item.innerHTML = `<div class="track-card-art-box">${art}<div class="track-card-overlay">${actionHtml}</div></div><div class="track-card-title">${escapeHtml(itemData.title)}${sourceBadge}</div><div class="track-card-author">${escapeHtml(itemData.author)}</div>`;
        if (!isPlaylist) { const likeBtn = item.querySelector('.like-btn'), addBtn = item.querySelector('.add-btn'); if (likeBtn) likeBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleLike(itemData, e.currentTarget, true); }); if (addBtn) addBtn.addEventListener('click', (e) => showAddToPlaylistMenu(e, itemData, item.querySelector('.dropdown-menu')));
            item.addEventListener('click', () => { document.querySelectorAll('.track-card, .track-item').forEach(el => el.classList.remove('playing')); item.classList.add('playing'); if (container) { currentQueue = []; originalQueue = []; container.querySelectorAll('.track-card, .track-item').forEach(el => { if(el._trackData) originalQueue.push(el._trackData); }); if (isShuffle) { const f = originalQueue.filter(t => t.url !== itemData.url); currentQueue = [itemData, ...shuffleArray(f)]; } else currentQueue = [...originalQueue]; } playTrack(itemData); });
        } else item.addEventListener('click', () => openSoundCloudPlaylist(itemData)); container.appendChild(item); return;
    }
    item.className = 'track-item'; if (currentTrack && currentTrack.url === itemData.url && !isPlaylist) item.classList.add('playing');
    const indexHtml = options.index ? `<div style="color:var(--text-muted); width:24px; text-align:right; margin-right:12px;">${options.index}</div>` : '';
    const art = itemData.artwork ? `<img class="track-art" src="${escapeHtml(itemData.artwork)}" referrerpolicy="no-referrer" loading="lazy">` : `<div class="track-art" style="display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.05);">${isPlaylist ? ICONS.playlist : ICONS.music}</div>`;
    const titleBadge = isPlaylist ? `<span style="background:var(--accent-color);color:white;padding:2px 8px;border-radius:6px;font-size:10px;margin-left:10px;vertical-align:middle;">ПЛЕЙЛИСТ</span>` : '';
    const actionHtml = isPlaylist ? `<div style="font-size:12px; color:var(--text-muted);">Кликни чтобы открыть</div>` : (options.inPlaylistId ? `<button class="action-btn remove-from-pl-btn" style="color:#ff4757;">${ICONS.cross}</button>` : `<button class="action-btn add-btn">${ICONS.plus}</button><div class="dropdown-menu"></div>`);
    item.innerHTML = `<div class="track-info" style="display:flex; align-items:center;">${indexHtml}<div class="track-art-box">${art}</div><div class="track-text"><div class="track-title">${escapeHtml(itemData.title)}${titleBadge}${sourceBadge}</div><div class="track-author">${escapeHtml(itemData.author)}</div></div></div><div class="track-actions">${actionHtml}${!isPlaylist ? `<button class="action-btn like-btn ${likedClass}">${heartSvg}</button>` : ''}</div>`;
    if (!isPlaylist) { const likeBtn = item.querySelector('.like-btn'), addBtn = item.querySelector('.add-btn'), rmBtn = item.querySelector('.remove-from-pl-btn');
        if (likeBtn) likeBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleLike(itemData, e.currentTarget, false); });
        if (options.inPlaylistId && rmBtn) rmBtn.addEventListener('click', async (e) => { e.stopPropagation(); const pls = getUserPlaylists(); const pl = pls.find(p => p.id === options.inPlaylistId); if (pl) { pl.tracks = pl.tracks.filter(t => t.url !== itemData.url); await saveUserPlaylists(pls); openMyPlaylistDetail(pl); } });
        else if (addBtn) addBtn.addEventListener('click', (e) => showAddToPlaylistMenu(e, itemData, item.querySelector('.dropdown-menu')));
        item.addEventListener('click', () => { document.querySelectorAll('.track-card, .track-item').forEach(el => el.classList.remove('playing')); item.classList.add('playing'); if (container) { currentQueue = []; originalQueue = []; container.querySelectorAll('.track-card, .track-item').forEach(el => { if(el._trackData) originalQueue.push(el._trackData); }); if (isShuffle) { const f = originalQueue.filter(t => t.url !== itemData.url); currentQueue = [itemData, ...shuffleArray(f)]; } else currentQueue = [...originalQueue]; } playTrack(itemData); });
    } else item.addEventListener('click', () => openSoundCloudPlaylist(itemData)); container.appendChild(item);
}
document.addEventListener('click', () => document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = 'none'));
function showAddToPlaylistMenu(e, track, menuContainer) {
    e.stopPropagation(); document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = 'none'); const pls = getUserPlaylists(); if (!menuContainer) return; menuContainer.innerHTML = '';
    if (!pls.length) menuContainer.innerHTML = `<div style="padding:10px; font-size:11px; color:#aaa; text-align:center;">Сначала создай в Мои Плейлисты</div>`;
    else pls.forEach(pl => { const btn = document.createElement('button'); btn.className = 'dropdown-item'; btn.innerText = pl.name; btn.addEventListener('click', async (ev) => { ev.stopPropagation(); if (!pl.tracks.some(t => t.url === track.url)) { pl.tracks.push(track); const allPls = getUserPlaylists(); allPls[allPls.findIndex(p => p.id === pl.id)] = pl; await saveUserPlaylists(allPls); alert(`Добавлено в "${pl.name}"`); } else alert('Уже есть в плейлисте!'); menuContainer.style.display = 'none'; }); menuContainer.appendChild(btn); });
    menuContainer.style.display = 'flex';
}
function renderPlaylistsGrid() {
    if (!playlistsGrid) return; playlistsGrid.innerHTML = ''; const pls = getUserPlaylists(); if (!pls.length) { playlistsGrid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">Нет плейлистов</div>`; return; }
    pls.forEach(pl => { const card = document.createElement('div'); card.className = 'playlist-card'; let art = `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;">${ICONS.playlist}</div>`; if (pl.tracks?.[0]?.artwork) art = `<img src="${pl.tracks[0].artwork}" referrerpolicy="no-referrer">`;
        card.innerHTML = `<button class="delete-pl-btn" title="Удалить">${ICONS.cross}</button><div class="pl-icon">${art}</div><div class="pl-title" style="font-weight:700;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(pl.name)}</div><div class="pl-count" style="font-size:12px;color:var(--text-muted);">${pl.tracks.length} треков</div>`;
        const delBtn = card.querySelector('.delete-pl-btn'); if (delBtn) delBtn.onclick = async (e) => { e.stopPropagation(); if (confirm('Удалить плейлист?')) { await saveUserPlaylists(getUserPlaylists().filter(p => p.id !== pl.id)); renderPlaylistsGrid(); } };
        card.onclick = () => openMyPlaylistDetail(pl); playlistsGrid.appendChild(card);
    });
}
function openMyPlaylistDetail(pl) { currentView = 'playlist_detail'; if (playlistsView) playlistsView.classList.remove('active'); if (tracksView) tracksView.classList.add('active'); if (backToPlBtn) { backToPlBtn.style.display = 'inline-flex'; backToPlBtn.onclick = () => switchView('playlists'); } if (tracksTitleText) tracksTitleText.innerHTML = `${escapeHtml(pl.name)}`; if (resultsList) resultsList.innerHTML = ''; if (!pl.tracks?.length) { if (resultsList) resultsList.innerHTML = `<div class="empty-state">Плейлист пуст</div>`; return; } pl.tracks.forEach((track, i) => createTrackElement(track, { format: 'list', inPlaylistId: pl.id, index: i + 1 }, resultsList)); }
async function openSoundCloudPlaylist(plData) { currentView = 'playlist_detail'; if (playlistsView) playlistsView.classList.remove('active'); if (tracksView) tracksView.classList.add('active'); if (backToPlBtn) { backToPlBtn.style.display = 'inline-flex'; backToPlBtn.onclick = () => switchView('search'); } if (tracksTitleText) tracksTitleText.innerHTML = `${escapeHtml(plData.title)}`; if (resultsList) resultsList.innerHTML = `<div class="empty-state">Загрузка треков...</div>`; try { const tracks = await window.vibeAPI.getPlaylistTracks(plData.url); if (resultsList) resultsList.innerHTML = ''; if (!tracks?.length) { if (resultsList) resultsList.innerHTML = `<div class="empty-state">Не удалось получить треки</div>`; return; } tracks.forEach((track, i) => createTrackElement(track, { format: 'list', index: i + 1 }, resultsList)); } catch(e) { if (resultsList) resultsList.innerHTML = `<div class="empty-state" style="color:#ff4757">Ошибка загрузки</div>`; } }

// =========================================================================
// 8. ПОИСК И ЭКВАЛАЙЗЕР
// =========================================================================
async function searchTracks() {
    const q = searchInput?.value.trim();
    
    if (!q) {
        await showRecommendations();
        return;
    }
    
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
        const rid = ++searchRequestId;
        if (resultsList) resultsList.innerHTML = `<div class="empty-state">Поиск в SoundCloud и Spotify...</div>`;
        
        try {
            const items = await window.vibeAPI.searchSoundCloud(q, searchType);
            if (rid !== searchRequestId) return;
            if (resultsList) resultsList.innerHTML = '';
            
            if (!items?.length) {
                if (resultsList) resultsList.innerHTML = `<div class="empty-state">Ничего не найдено</div>`;
                return;
            }
            
            if (searchType === 'playlists') {
                const row = document.createElement('div');
                row.className = 'style-row';
                items.forEach(i => createTrackElement(i, { format: 'card' }, row));
                resultsList.appendChild(row);
            } else {
                items.forEach(t => createTrackElement(t, { format: 'list' }, resultsList));
            }
        } catch (e) {
            if (rid === searchRequestId && resultsList) {
                resultsList.innerHTML = `<div class="empty-state" style="color:#ff4757">Ошибка поиска</div>`;
            }
        }
    }, 300);
}

async function showRecommendations() {
    if (!resultsList) return;
    
    const user = DB.users[currentUser];
    if (!user) return;
    
    resultsList.innerHTML = `<div class="empty-state">Загружаем рекомендации...</div>`;
    
    try {
        const recommendations = await window.vibeAPI.getRecommendations(user.history || [], user.liked || []);
        
        if (!recommendations?.length) {
            resultsList.innerHTML = `
                <div style="text-align:center;padding:40px;">
                    <div style="font-size:18px;font-weight:700;margin-bottom:12px;">Начни слушать музыку!</div>
                    <div style="color:var(--text-muted);font-size:14px;">После прослушивания треков здесь появятся персональные рекомендации</div>
                </div>
            `;
            return;
        }
        
        resultsList.innerHTML = '';
        
        const header = document.createElement('div');
        header.style.cssText = 'font-size:20px;font-weight:800;margin-bottom:16px;color:var(--text-main);';
        header.innerText = 'Рекомендации для тебя';
        resultsList.appendChild(header);
        
        const grid = document.createElement('div');
        grid.className = 'style-row';
        recommendations.forEach(t => createTrackElement(t, { format: 'card' }, grid));
        resultsList.appendChild(grid);
        
    } catch (e) {
        resultsList.innerHTML = `<div class="empty-state" style="color:#ff4757">Ошибка загрузки рекомендаций</div>`;
    }
}
if (searchBtn) searchBtn.addEventListener('click', searchTracks);
if (searchInput) {
    searchInput.addEventListener('keydown', e => { 
        if (e.key === 'Enter') searchTracks(); 
    });
    searchInput.addEventListener('input', () => { 
        if (currentView === 'search') searchTracks(); 
    });
}

// =========================================================================
// ЭКВАЛАЙЗЕР (WEB AUDIO API + ВИЗУАЛИЗАЦИЯ)
// =========================================================================
const EQ_BANDS = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
const EQ_PRESETS = {
    'Flat': [0,0,0,0,0,0,0,0,0,0],
    'Rock': [5,4,3,1,-1,-1,0,2,3,4],
    'Pop': [-1,1,3,4,3,1,-1,-1,1,2],
    'Jazz': [3,2,1,2,-1,-1,0,1,2,3],
    'Classical': [4,3,2,1,-1,-1,0,2,3,4],
    'Bass Boost': [6,5,4,2,0,0,0,0,0,0],
    'Vocal': [-2,-1,0,2,4,4,3,1,0,-1],
    'Electronic': [4,3,1,0,-2,1,2,3,4,4]
};

let currentEqPreset = 'Flat';
let eqValues = [...EQ_PRESETS['Flat']];
let eqEnabled = false;

// Web Audio API переменные
let audioCtx = null;
let sourceNode = null;
let eqFilters = [];
let analyserNode = null;
let eqAnimFrame = null;

function initAudioContext() {
    if (audioCtx) return;
    try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        sourceNode = audioCtx.createMediaElementSource(fallbackAudioPlayer);

        // Создаем 10 фильтров
        eqFilters = EQ_BANDS.map((freq, i) => {
            const filter = audioCtx.createBiquadFilter();
            if (i === 0) filter.type = 'lowshelf';
            else if (i === EQ_BANDS.length - 1) filter.type = 'highshelf';
            else filter.type = 'peaking';
            filter.frequency.value = freq;
            filter.Q.value = 1;
            filter.gain.value = eqValues[i];
            return filter;
        });

        analyserNode = audioCtx.createAnalyser();
        analyserNode.fftSize = 256;

        // Цепочка: Source -> Filters -> Analyser -> Destination
        let currentNode = sourceNode;
        eqFilters.forEach(filter => {
            currentNode.connect(filter);
            currentNode = filter;
        });
        currentNode.connect(analyserNode);
        analyserNode.connect(audioCtx.destination);
    } catch (e) {
        console.error('AudioContext init error:', e);
    }
}

function applyEqToAudio() {
    if (!audioCtx || !eqFilters.length) return;
    eqFilters.forEach((filter, i) => {
        filter.gain.value = eqEnabled ? eqValues[i] : 0;
    });
    drawEqCurve();
}

function drawEqCurve() {
    const canvas = document.getElementById('eqCurveCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.offsetWidth * 2;
    const h = canvas.height = canvas.offsetHeight * 2;
    ctx.clearRect(0, 0, w, h);

    // Рисуем сетку
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
        const y = (h / 4) * i;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Рисуем кривую АЧХ
    ctx.beginPath();
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 4;
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#a855f7';

    const points = [];
    for (let i = 0; i < EQ_BANDS.length; i++) {
        const x = (w / (EQ_BANDS.length - 1)) * i;
        const val = eqEnabled ? eqValues[i] : 0;
        const y = (h / 2) - (val / 12) * (h / 2.5); // 12dB max
        points.push({ x, y });
    }

    // Сглаженная кривая (Квадратичные кривые Безье)
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Точки на слайдерах
    points.forEach(p => {
        ctx.beginPath();
        ctx.fillStyle = '#fff';
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawSpectrum() {
    if (!analyserNode || !eqEnabled) {
        if (eqAnimFrame) cancelAnimationFrame(eqAnimFrame);
        const canvas = document.getElementById('eqSpectrumCanvas');
        if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

    const canvas = document.getElementById('eqSpectrumCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.offsetWidth * 2;
    const h = canvas.height = canvas.offsetHeight * 2;

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
        eqAnimFrame = requestAnimationFrame(draw);
        analyserNode.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, w, h);
        const barWidth = (w / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = (dataArray[i] / 255) * h;
            const gradient = ctx.createLinearGradient(0, h, 0, h - barHeight);
            gradient.addColorStop(0, '#6366f1');
            gradient.addColorStop(1, '#ec4899');
            ctx.fillStyle = gradient;
            ctx.fillRect(x, h - barHeight, barWidth - 2, barHeight);
            x += barWidth;
        }
    }
    draw();
}

function initEqualizerUI() {
    if (!eqPresets || !eqSliders) return;
    eqPresets.innerHTML = '';
    Object.keys(EQ_PRESETS).forEach(name => {
        const btn = document.createElement('button');
        btn.className = 'eq-preset' + (name === currentEqPreset ? ' active' : '');
        btn.innerText = name;
        btn.onclick = () => {
            currentEqPreset = name;
            eqValues = [...EQ_PRESETS[name]];
            eqPresets.querySelectorAll('.eq-preset').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateEqSlidersUI();
            applyEqToAudio();
            saveEqSettings();
        };
        eqPresets.appendChild(btn);
    });

    eqSliders.innerHTML = '';
    EQ_BANDS.forEach((freq, i) => {
        const band = document.createElement('div');
        band.className = 'eq-band';
        band.innerHTML = `
            <div class="eq-band-val">${eqValues[i] > 0 ? '+' : ''}${eqValues[i]}dB</div>
            <input type="range" class="eq-band-slider" min="-12" max="12" value="${eqValues[i]}" orient="vertical" data-index="${i}">
            <div class="eq-band-label">${freq >= 1000 ? (freq/1000) + 'k' : freq}</div>
        `;
        eqSliders.appendChild(band);
        const slider = band.querySelector('.eq-band-slider');
        slider.addEventListener('input', (e) => {
            const idx = parseInt(e.target.dataset.index);
            eqValues[idx] = parseInt(e.target.value);
            band.querySelector('.eq-band-val').innerText = `${eqValues[idx] > 0 ? '+' : ''}${eqValues[idx]}dB`;
            currentEqPreset = 'Custom';
            eqPresets.querySelectorAll('.eq-preset').forEach(b => b.classList.remove('active'));
            applyEqToAudio();
            saveEqSettings();
        });
    });

    drawEqCurve();
}

function updateEqSlidersUI() {
    eqSliders.querySelectorAll('.eq-band-slider').forEach((slider, i) => {
        slider.value = eqValues[i];
        slider.parentElement.querySelector('.eq-band-val').innerText = `${eqValues[i] > 0 ? '+' : ''}${eqValues[i]}dB`;
    });
}

function saveEqSettings() {
    if (!DB.settings) DB.settings = {};
    DB.settings.eq = { enabled: eqEnabled, preset: currentEqPreset, values: eqValues };
    syncSaveDB();
}

function loadEqSettings() {
    const eq = DB.settings?.eq;
    if (eq) {
        eqEnabled = eq.enabled || false;
        currentEqPreset = eq.preset || 'Flat';
        eqValues = eq.values || [...EQ_PRESETS['Flat']];
    }
    if (eqToggle) eqToggle.checked = eqEnabled;
}

// Обработчики UI
if (openEqBtn) openEqBtn.addEventListener('click', () => {
    if (eqModal) eqModal.style.display = 'flex';
    initEqualizerUI();
    initAudioContext(); // Инициализируем аудио контекст при открытии
    if (eqEnabled && isUsingFallback) drawSpectrum();
});

if (closeEqBtn) closeEqBtn.addEventListener('click', () => {
    if (eqModal) eqModal.style.display = 'none';
    if (eqAnimFrame) cancelAnimationFrame(eqAnimFrame);
});

if (eqToggle) eqToggle.addEventListener('change', () => {
    eqEnabled = eqToggle.checked;
    if (eqEnabled) initAudioContext();
    applyEqToAudio();
    if (eqEnabled && isUsingFallback) drawSpectrum();
    else if (eqAnimFrame) cancelAnimationFrame(eqAnimFrame);
    saveEqSettings();
});

if (eqResetBtn) eqResetBtn.addEventListener('click', () => {
    currentEqPreset = 'Flat';
    eqValues = [...EQ_PRESETS['Flat']];
    updateEqSlidersUI();
    eqPresets.querySelectorAll('.eq-preset').forEach(b => b.classList.toggle('active', b.innerText === 'Flat'));
    applyEqToAudio();
    saveEqSettings();
});

// ВАЖНО: Запускаем спектр, когда стартует fallback аудио
const originalPlayFallback = playFallback;
playFallback = async function(track) {
    const result = await originalPlayFallback(track);
    if (result && eqEnabled) {
        initAudioContext();
        drawSpectrum();
    }
    return result;
};

// =========================================================================
// 9. ИГРА "УГАДАЙ ПЕСНЮ" (ЗАЩИЩЕННАЯ ОТ СПАМА)
// =========================================================================
const GAME_TIME_STAGES = [1, 2, 5, 10, 30];
let gameState = { 
    mode: 'solo', active: false, round: 0, maxRounds: 10, 
    players: [{name:'Игрок 1', score:0}, {name:'Игрок 2', score:0}], 
    currentPlayerIndex: 0, currentTrack: null, currentStage: 0, guessed: false, trackPool: [] 
};
let isGameProcessing = false; 
let savedMainState = null;
let currentInviteTarget = null;

function lockGameActions(ms = 800) { isGameProcessing = true; setTimeout(() => isGameProcessing = false, ms); }

// --- НАВИГАЦИЯ ПО МЕНЮ ИГРЫ ---
if (gameSoloBtn) gameSoloBtn.addEventListener('click', () => {
    gameState.mode = 'solo';
    gameModeSelect.style.display = 'none';
    gamePlayArea.style.display = 'block';
    player2ScoreBox.style.display = 'none';
    gameState.players[0].name = currentUser || 'Ты';
    player1Label.innerText = gameState.players[0].name;
    startGame();
});

if (gameDuoBtn) gameDuoBtn.addEventListener('click', () => {
    gameModeSelect.style.display = 'none';
    renderGameFriendsList();
    gameFriendsList.style.display = 'block';
});

if (gfBackBtn) gfBackBtn.addEventListener('click', () => {
    gameFriendsList.style.display = 'none';
    gameModeSelect.style.display = 'block';
});

if (playAgainBtn) playAgainBtn.addEventListener('click', () => {
    gameResults.style.display = 'none';
    gameModeSelect.style.display = 'block';
    gameState.players[0].score = 0; gameState.players[1].score = 0;
});

// --- РЕНДЕР СПИСКА ДРУЗЕЙ ---
function renderGameFriendsList() {
    gfListContainer.innerHTML = '';
    const friends = DB.users[currentUser]?.friends || [];
    
    if (friends.length === 0) {
        gfListContainer.innerHTML = `<div style="color:var(--text-muted);padding:20px;">У тебя пока нет друзей. Добавь их во вкладке "Друзья"!</div>`;
        return;
    }

    friends.forEach(friendName => {
        const friend = DB.users[friendName];
        if (!friend) return;

        const card = document.createElement('div');
        card.className = 'game-friend-card';
        
        const avatarHtml = friend.avatar 
            ? `<img src="${friend.avatar}">` 
            : `<svg viewBox="0 0 24 24" width="24" height="24" fill="#fff"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;

        card.innerHTML = `
            <div class="gf-avatar">
                ${avatarHtml}
                <div class="gf-status"></div>
            </div>
            <div class="gf-info">
                <div class="gf-name">${escapeHtml(friendName)}</div>
                <div class="gf-sub">В сети • Готов к игре</div>
            </div>
            <button class="gf-invite-btn">Пригласить</button>
        `;

        card.querySelector('.gf-invite-btn').onclick = (e) => {
            e.stopPropagation();
            currentInviteTarget = friendName;
            sendGameInvite(friendName, friend.avatar);
        };

        gfListContainer.appendChild(card);
    });
}

// --- СИМУЛЯЦИЯ СЕТЕВОГО ПРИГЛАШЕНИЯ ---
function sendGameInvite(friendName, avatarUrl) {
    gameFriendsList.style.display = 'none';
    
    // 1. Экран ожидания (Отправка)
    gameInviteScreen.style.display = 'flex';
    gameInviteScreen.className = 'game-invite-overlay';
    gameInviteScreen.innerHTML = `
        <div class="invite-pulse">
            ${avatarUrl ? `<img src="${avatarUrl}">` : `<svg viewBox="0 0 24 24" width="50" height="50" fill="#fff"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`}
        </div>
        <div class="invite-text">Отправка приглашения...</div>
        <div class="invite-sub">Ожидание ответа от ${escapeHtml(friendName)}</div>
    `;

    // 2. Через 2 секунды симулируем "Входящий вызов" (Принятие)
    setTimeout(() => {
        gameInviteScreen.innerHTML = `
            <div class="invite-pulse" style="background: linear-gradient(135deg, #2ed573, #1dd1a1);">
                ${avatarUrl ? `<img src="${avatarUrl}">` : `<svg viewBox="0 0 24 24" width="50" height="50" fill="#fff"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`}
            </div>
            <div class="invite-text" style="color: #2ed573;">Входящий вызов!</div>
            <div class="invite-sub">${escapeHtml(friendName)} принимает приглашение...</div>
            <div class="invite-actions">
                <button class="invite-accept" id="confirmInviteBtn">Подключить к игре</button>
            </div>
        `;
        
        document.getElementById('confirmInviteBtn').onclick = () => {
            enterGameLobby(friendName);
        };
    }, 2000);
}

// --- ЛОББИ (ОТЧЕТ ПЕРЕД СТАРТОМ) ---
function enterGameLobby(friendName) {
    gameInviteScreen.style.display = 'none';
    gameLobby.style.display = 'flex';
    
    gameState.mode = 'duo';
    gameState.players[0].name = currentUser || 'Ты';
    gameState.players[1].name = friendName;
    
    lobbyNames.innerText = `${gameState.players[0].name}  VS  ${gameState.players[1].name}`;
    player1Label.innerText = gameState.players[0].name;
    player2Label.innerText = gameState.players[1].name;
    player2ScoreBox.style.display = 'block';

    let count = 3;
    lobbyCountdown.innerText = count;
    
    const countInterval = setInterval(() => {
        count--;
        if (count > 0) {
            lobbyCountdown.innerText = count;
        } else {
            clearInterval(countInterval);
            gameLobby.style.display = 'none';
            gamePlayArea.style.display = 'block';
            startGame();
        }
    }, 1000);
}

// --- ЛОГИКА ИГРЫ (УНИКАЛИЗАЦИЯ И УМНАЯ ПРОВЕРКА) ---
function startGame() {
    gameState.active = true; gameState.round = 0; gameState.currentPlayerIndex = 0; 
    gameState.players[0].score = 0; gameState.players[1].score = 0;
    savedMainState = { track: currentTrack, isPlaying: isPlaying };
    
    const user = DB.users[currentUser]; if (!user) return;
    const allTracks = [...(user.liked || []), ...(user.history || [])];
    
    const uniqueTracks = []; const seen = new Set();
    for (const t of allTracks) {
        const key = `${t.author} - ${t.title}`.toLowerCase().trim();
        if (!seen.has(key)) { seen.add(key); uniqueTracks.push(t); }
    }
    
    if (uniqueTracks.length < 5) {
        gameLyricsBox.innerHTML = '<div style="color:var(--text-muted);">Нужно минимум 5 уникальных треков в истории или лайках!</div>';
        return;
    }
    
    gameState.trackPool = shuffleArray(uniqueTracks).slice(0, gameState.maxRounds);
    updateGameUI(); nextGameRound();
}

async function nextGameRound() {
    if (gameState.round >= gameState.maxRounds) { endGame(); return; }
    gameState.round++; gameState.currentStage = 0; gameState.guessed = false;
    if (gameState.mode === 'duo') gameState.currentPlayerIndex = (gameState.round - 1) % 2;
    gameState.currentTrack = gameState.trackPool[gameState.round - 1];
    updateGameUI(); await playGameSnippet();
}

async function playGameSnippet() {
    if (!gameState.currentTrack || !widget) return;
    const stage = gameState.currentStage, duration = GAME_TIME_STAGES[stage] || 30;
    if (widget) try { widget.pause(); } catch {}
    if (isUsingFallback) fallbackAudioPlayer.pause();
    
    const currentTurnName = gameState.mode === 'duo' ? gameState.players[gameState.currentPlayerIndex].name : 'Твой ход';
    
    gameLyricsBox.innerHTML = `
        <div style="font-size:18px;font-weight:700;margin-bottom:12px;color:var(--accent-color);">${currentTurnName}</div>
        <div style="color:var(--text-muted);font-size:14px;">Фрагмент: ${duration} сек</div>
        <div style="margin-top:20px;">
            <div style="width:60px;height:60px;border-radius:50%;background:var(--accent-gradient);margin:0 auto;display:flex;align-items:center;justify-content:center;animation:pulse 1s ease-in-out infinite;">
                <svg viewBox="0 0 24 24" width="30" height="30" fill="white"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
            </div>
        </div>
    `;
    
    gameAnswerInput.disabled = false; gameSubmitBtn.disabled = false;
    gameSkipBtn.disabled = stage >= GAME_TIME_STAGES.length - 1; gameGiveUpBtn.disabled = false;
    gameReplayBtn.disabled = false;
    gameAnswerInput.value = ''; gameAnswerInput.focus(); gameResult.innerText = ''; gameResult.className = 'game-result';
    
    try {
        if (gameState.currentTrack.isFallbackOnly || (gameState.currentTrack.url && gameState.currentTrack.url.includes('/search?q='))) {
            const query = gameState.currentTrack.fallbackQuery || `${gameState.currentTrack.author} - ${gameState.currentTrack.title}`;
            const audioUrl = await window.vibeAPI.getFallbackStream(query);
            if (!audioUrl) { gameLyricsBox.innerHTML = '<div style="color:var(--text-muted);">Не удалось загрузить аудио</div>'; setTimeout(nextGameRound, 2000); return; }
            isUsingFallback = true; fallbackAudioPlayer.src = audioUrl; fallbackAudioPlayer.currentTime = 0; await fallbackAudioPlayer.play();
            setTimeout(() => { if (fallbackAudioPlayer && gameState.active && !gameState.guessed) { fallbackAudioPlayer.pause(); if (stage < GAME_TIME_STAGES.length - 1) gameLyricsBox.innerHTML += '<div style="color:var(--accent-color);margin-top:16px;font-size:14px;">Время вышло! Нажми "Повторить" или ответь</div>'; } }, duration * 1000);
        } else {
            isUsingFallback = false;
            widget.load(gameState.currentTrack.url, { auto_play: true, callback: () => {
                setTimeout(() => { if (widget && gameState.active && !gameState.guessed) { try { widget.pause(); } catch {} if (stage < GAME_TIME_STAGES.length - 1) gameLyricsBox.innerHTML += '<div style="color:var(--accent-color);margin-top:16px;font-size:14px;">Время вышло! Нажми "Повторить" или ответь</div>'; } }, duration * 1000);
            }});
        }
    } catch (e) { gameLyricsBox.innerHTML = '<div style="color:var(--text-muted);">Ошибка воспроизведения</div>'; setTimeout(nextGameRound, 2000); }
}

function checkAnswer() {
    if (isGameProcessing || !gameState.currentTrack || gameState.guessed) return;
    lockGameActions();
    const userInput = gameAnswerInput.value.trim();
    if (!userInput) { isGameProcessing = false; return; }
    
    const correctTitle = gameState.currentTrack.title;
    const correctAuthor = gameState.currentTrack.author;
    const clean = (str) => str.toLowerCase().replace(/[^\w\sа-яё]/gi, '').replace(/\s+/g, ' ').trim();
    const inputClean = clean(userInput), titleClean = clean(correctTitle), authorClean = clean(correctAuthor);
    
    let isCorrect = false;
    if (inputClean === titleClean || inputClean === authorClean || inputClean === `${authorClean} ${titleClean}` || inputClean === `${titleClean} ${authorClean}`) isCorrect = true;
    if (!isCorrect && inputClean.length > 3 && titleClean.includes(inputClean)) isCorrect = true;
    if (!isCorrect) {
        const inputWords = new Set(inputClean.split(' ').filter(w => w.length > 2));
        const titleWords = new Set(titleClean.split(' ').filter(w => w.length > 2));
        if (inputWords.size > 0 && titleWords.size > 0) {
            let matches = 0; inputWords.forEach(w => { if (titleWords.has(w)) matches++; });
            if (matches > 0 && (matches / inputWords.size) >= 0.5) isCorrect = true;
        }
    }
    if (!isCorrect && inputClean.length > 3 && levenshteinSimilarity(inputClean, titleClean) > 0.7) isCorrect = true;

    if (isCorrect) {
        gameState.guessed = true;
        const points = [100, 75, 50, 25, 10][gameState.currentStage] || 10;
        if (gameState.mode === 'duo') gameState.players[gameState.currentPlayerIndex].score += points;
        else gameState.players[0].score += points;
        if (widget) try { widget.pause(); } catch {}
        if (isUsingFallback) fallbackAudioPlayer.pause();
        gameResult.innerText = `Правильно! +${points} очков`; gameResult.className = 'game-result correct';
        gameAnswerInput.disabled = true; gameSubmitBtn.disabled = true; gameSkipBtn.disabled = true; gameGiveUpBtn.disabled = true; gameReplayBtn.disabled = true;
        updateGameUI(); setTimeout(nextGameRound, 2500);
    } else {
        gameResult.innerText = 'Неправильно, попробуй ещё!'; gameResult.className = 'game-result wrong';
        isGameProcessing = false;
    }
}

function replaySnippet() {
    if (isGameProcessing || !gameState.currentTrack || gameState.guessed) return;
    lockGameActions(500);
    const stage = gameState.currentStage, duration = GAME_TIME_STAGES[stage] || 30;
    if (isUsingFallback) { fallbackAudioPlayer.currentTime = 0; fallbackAudioPlayer.play(); }
    else if (widget) { widget.seekTo(0); widget.play(); }
}

function skipToNextStage() { if (isGameProcessing || gameState.currentStage >= GAME_TIME_STAGES.length - 1) return; lockGameActions(); gameState.currentStage++; if (widget) try { widget.pause(); } catch {} if (isUsingFallback) fallbackAudioPlayer.pause(); playGameSnippet(); }
function giveUp() { if (isGameProcessing || !gameState.currentTrack) return; lockGameActions(); gameState.guessed = true; if (widget) try { widget.pause(); } catch {} if (isUsingFallback) fallbackAudioPlayer.pause(); gameResult.innerText = `Это была: ${gameState.currentTrack.title} - ${gameState.currentTrack.author}`; gameResult.className = 'game-result'; gameAnswerInput.disabled = true; gameSubmitBtn.disabled = true; gameSkipBtn.disabled = true; gameGiveUpBtn.disabled = true; gameReplayBtn.disabled = true; setTimeout(nextGameRound, 3000); }

function endGame() {
    gameState.active = false; if (widget) try { widget.pause(); } catch {} if (isUsingFallback) fallbackAudioPlayer.pause();
    gamePlayArea.style.display = 'none'; gameResults.style.display = 'block'; let html = '';
    if (gameState.mode === 'duo') { 
        const p1 = gameState.players[0], p2 = gameState.players[1]; 
        let winner = p1.score > p2.score ? `Победил: ${p1.name}` : (p2.score > p1.score ? `Победил: ${p2.name}` : 'Ничья!');
        html = `<div style="display:flex;gap:20px;justify-content:center;margin-bottom:20px;"><div style="flex:1;background:rgba(255,255,255,0.03);border:1px solid var(--glass-border);border-radius:16px;padding:20px;text-align:center;"><div style="font-size:14px;color:var(--text-muted);margin-bottom:8px;">${p1.name}</div><div style="font-size:32px;font-weight:800;color:var(--accent-color);">${p1.score}</div></div><div style="flex:1;background:rgba(255,255,255,0.03);border:1px solid var(--glass-border);border-radius:16px;padding:20px;text-align:center;"><div style="font-size:14px;color:var(--text-muted);margin-bottom:8px;">${p2.name}</div><div style="font-size:32px;font-weight:800;color:var(--accent-color);">${p2.score}</div></div></div><div style="text-align:center;font-size:20px;font-weight:700;color:#fff;">${winner}</div>`;
    } else { 
        const p1 = gameState.players[0]; 
        html = `<div style="text-align:center;"><div style="font-size:14px;color:var(--text-muted);margin-bottom:8px;">${p1.name}</div><div style="font-size:48px;font-weight:800;color:var(--accent-color);">${p1.score}</div></div>`; 
    }
    finalResults.innerHTML = html; 
    if (savedMainState && savedMainState.track) setTimeout(() => playTrack(savedMainState.track), 500);
}

function updateGameUI() { if (gameRound) gameRound.innerText = `${gameState.round}/${gameState.maxRounds}`; if (player1Score) player1Score.innerText = gameState.players[0].score; if (player2Score) player2Score.innerText = gameState.players[1].score; }
function levenshteinSimilarity(a, b) { if (a.length === 0) return b.length; if (b.length === 0) return a.length; const matrix = []; for (let i = 0; i <= b.length; i++) matrix[i] = [i]; for (let j = 0; j <= a.length; j++) matrix[0][j] = j; for (let i = 1; i <= b.length; i++) for (let j = 1; j <= a.length; j++) { if (b.charAt(i - 1) === a.charAt(j - 1)) matrix[i][j] = matrix[i - 1][j - 1]; else matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1); } return 1 - (matrix[b.length][a.length] / Math.max(a.length, b.length)); }

// --- ОБРАБОТЧИКИ КНОПОК ---
if (gameSubmitBtn) gameSubmitBtn.addEventListener('click', checkAnswer);
if (gameAnswerInput) gameAnswerInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkAnswer(); });
if (gameSkipBtn) gameSkipBtn.addEventListener('click', skipToNextStage);
if (gameGiveUpBtn) gameGiveUpBtn.addEventListener('click', giveUp);
if (gameReplayBtn) gameReplayBtn.addEventListener('click', replaySnippet);

if (openGameBtn) openGameBtn.addEventListener('click', () => {
    if (gameModal) gameModal.style.display = 'flex';
    gameModeSelect.style.display = 'block'; 
    gameFriendsList.style.display = 'none'; 
    gameInviteScreen.style.display = 'none'; 
    gameLobby.style.display = 'none';
    gamePlayArea.style.display = 'none'; 
    gameResults.style.display = 'none';
});

if (closeGameBtn) closeGameBtn.addEventListener('click', () => {
    if (gameModal) gameModal.style.display = 'none'; 
    if (widget) try { widget.pause(); } catch {} 
    if (isUsingFallback) fallbackAudioPlayer.pause();
    if (savedMainState && savedMainState.track) setTimeout(() => playTrack(savedMainState.track), 300);
});

// =========================================================================
// 10. СТАТИСТИКА И ДРУЗЬЯ
// =========================================================================
function renderStats() {
    if (!currentUser || !DB.users[currentUser]) return; const user = DB.users[currentUser];
    const history = user.history || [], liked = user.liked || [], friends = user.friends || [];
    const totalSeconds = history.length * 210;
    if (statTotalTime) statTotalTime.innerText = `${Math.floor(totalSeconds / 3600)}ч ${Math.floor((totalSeconds % 3600) / 60)}м`;
    if (statTracksCount) statTracksCount.innerText = history.length; if (statLikesCount) statLikesCount.innerText = liked.length; if (statFriendsCount) statFriendsCount.innerText = friends.length;
    const artistCount = {}; history.forEach(track => { const artist = track.author || 'Неизвестный'; artistCount[artist] = (artistCount[artist] || 0) + 1; });
    const topArtists = Object.entries(artistCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
    if (topArtistsList) { topArtistsList.innerHTML = ''; if (!topArtists.length) topArtistsList.innerHTML = '<div style="color:var(--text-muted);padding:20px;text-align:center;">Пока нет данных</div>'; else { const maxCount = topArtists[0][1]; topArtists.forEach(([artist, count], i) => { const item = document.createElement('div'); item.className = 'top-item'; item.innerHTML = `<div class="top-rank">${i + 1}</div><div class="top-art"><svg viewBox="0 0 24 24" width="20" height="20" fill="rgba(255,255,255,0.5)"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div><div class="top-info"><div class="top-name">${escapeHtml(artist)}</div><div class="top-sub">${count} треков</div><div class="top-bar"><div class="top-bar-fill" style="width:${(count / maxCount) * 100}%"></div></div></div>`; topArtistsList.appendChild(item); }); } }
    const trackCount = {}; history.forEach(track => { const key = track.title + ' - ' + track.author; trackCount[key] = (trackCount[key] || 0) + 1; });
    const topTracks = Object.entries(trackCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
    if (topTracksList) { topTracksList.innerHTML = ''; if (!topTracks.length) topTracksList.innerHTML = '<div style="color:var(--text-muted);padding:20px;text-align:center;">Пока нет данных</div>'; else { const maxCount = topTracks[0][1]; topTracks.forEach(([trackName, count], i) => { const item = document.createElement('div'); item.className = 'top-item'; item.innerHTML = `<div class="top-rank">${i + 1}</div><div class="top-art"><svg viewBox="0 0 24 24" width="20" height="20" fill="rgba(255,255,255,0.5)"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg></div><div class="top-info"><div class="top-name">${escapeHtml(trackName)}</div><div class="top-sub">${count} прослушиваний</div><div class="top-bar"><div class="top-bar-fill" style="width:${(count / maxCount) * 100}%"></div></div></div>`; topTracksList.appendChild(item); }); } }
    if (weekChart) { weekChart.innerHTML = ''; const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'], today = new Date(), weekData = []; for (let i = 6; i >= 0; i--) { const date = new Date(today); date.setDate(date.getDate() - i); const dateStr = date.toISOString().split('T')[0]; const dayTracks = history.filter(t => new Date(t.playedAt || Date.now()).toISOString().split('T')[0] === dateStr).length; weekData.push({ day: days[date.getDay() === 0 ? 6 : date.getDay() - 1], count: dayTracks }); } const maxCount = Math.max(...weekData.map(d => d.count), 1); weekData.forEach(d => { const bar = document.createElement('div'); bar.className = 'week-bar'; bar.innerHTML = `<div class="week-bar-fill" style="height:${(d.count / maxCount) * 100}%"></div><div class="week-bar-label">${d.day}</div>`; weekChart.appendChild(bar); }); }
}

function searchUsers(query) { if (!query || query.length < 2) return []; const results = []; Object.keys(DB.users).forEach(username => { if (username !== currentUser && username.toLowerCase().includes(query.toLowerCase())) results.push(username); }); return results.slice(0, 10); }
function renderFriendSearchResults(results) {
    if (!friendSearchResults) return; friendSearchResults.innerHTML = ''; if (!results.length) { friendSearchResults.innerHTML = '<div style="color:var(--text-muted);padding:20px;text-align:center;">Пользователи не найдены</div>'; return; }
    results.forEach(username => { const user = DB.users[username]; const card = document.createElement('div'); card.className = 'friend-card'; const avatarHtml = user.avatar ? `<img src="${user.avatar}">` : `<svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
        card.innerHTML = `<div class="friend-avatar">${avatarHtml}</div><div class="friend-info"><div class="friend-name">${escapeHtml(username)}</div><div class="friend-sub">${user.liked?.length || 0} любимых треков</div></div><div class="friend-actions"><button class="friend-btn accept" title="Добавить"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button></div>`;
        card.querySelector('.friend-btn.accept').onclick = async (e) => { e.stopPropagation(); await sendFriendRequest(username); }; friendSearchResults.appendChild(card);
    });
}
async function sendFriendRequest(toUser) {
    if (!currentUser || !DB.users[currentUser]) return; const user = DB.users[currentUser]; if (!user.friendRequests) user.friendRequests = []; if (!user.friends) user.friends = [];
    if (user.friendRequests.some(r => r.to === toUser)) { alert('Запрос уже отправлен!'); return; } if (user.friends.includes(toUser)) { alert('Вы уже друзья!'); return; }
    user.friendRequests.push({ to: toUser, from: currentUser, timestamp: Date.now() }); if (!DB.users[toUser].incomingRequests) DB.users[toUser].incomingRequests = []; DB.users[toUser].incomingRequests.push({ from: currentUser, timestamp: Date.now() });
    await syncSaveDB(); alert(`Запрос отправлен пользователю ${toUser}`); renderFriends();
}
function renderFriends() {
    if (!currentUser || !DB.users[currentUser]) return; const user = DB.users[currentUser]; const incomingRequests = user.incomingRequests || [], friends = user.friends || [];
    if (friendsBadge) { if (incomingRequests.length > 0) { friendsBadge.innerText = incomingRequests.length; friendsBadge.style.display = 'block'; } else friendsBadge.style.display = 'none'; }
    if (friendRequestsList) { friendRequestsList.innerHTML = ''; if (requestsCount) requestsCount.innerText = incomingRequests.length > 0 ? `(${incomingRequests.length})` : ''; if (!incomingRequests.length) friendRequestsList.innerHTML = '<div style="color:var(--text-muted);padding:20px;text-align:center;">Нет новых запросов</div>';
        else incomingRequests.forEach((req, i) => { const fromUser = DB.users[req.from]; if (!fromUser) return; const card = document.createElement('div'); card.className = 'friend-card'; const avatarHtml = fromUser.avatar ? `<img src="${fromUser.avatar}">` : `<svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
            card.innerHTML = `<div class="friend-avatar">${avatarHtml}</div><div class="friend-info"><div class="friend-name">${escapeHtml(req.from)}</div><div class="friend-sub">Хочет добавить тебя</div></div><div class="friend-actions"><button class="friend-btn accept" title="Принять"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></button><button class="friend-btn reject" title="Отклонить"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button></div>`;
            card.querySelector('.friend-btn.accept').onclick = async (e) => { e.stopPropagation(); await acceptFriendRequest(i); }; card.querySelector('.friend-btn.reject').onclick = async (e) => { e.stopPropagation(); await rejectFriendRequest(i); }; friendRequestsList.appendChild(card);
        });
    }
    if (friendsList) { friendsList.innerHTML = ''; if (!friends.length) friendsList.innerHTML = '<div style="color:var(--text-muted);padding:20px;text-align:center;">У тебя пока нет друзей</div>';
        else friends.forEach(friendName => { const friend = DB.users[friendName]; if (!friend) return; const card = document.createElement('div'); card.className = 'friend-card'; const avatarHtml = friend.avatar ? `<img src="${friend.avatar}">` : `<svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
            card.innerHTML = `<div class="friend-avatar">${avatarHtml}</div><div class="friend-info"><div class="friend-name">${escapeHtml(friendName)}</div><div class="friend-sub">${friend.liked?.length || 0} любимых треков</div></div><div class="friend-actions"><button class="friend-btn" title="Профиль"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></button></div>`;
            card.querySelector('.friend-btn').onclick = (e) => { e.stopPropagation(); showFriendProfile(friendName); }; friendsList.appendChild(card);
        });
    }
}
async function acceptFriendRequest(index) { if (!currentUser || !DB.users[currentUser]) return; const user = DB.users[currentUser], req = user.incomingRequests[index]; if (!req) return; if (!user.friends) user.friends = []; user.friends.push(req.from); if (!DB.users[req.from].friends) DB.users[req.from].friends = []; DB.users[req.from].friends.push(currentUser); user.incomingRequests.splice(index, 1); const friendUser = DB.users[req.from]; if (friendUser.friendRequests) friendUser.friendRequests = friendUser.friendRequests.filter(r => r.to !== currentUser); await syncSaveDB(); renderFriends(); }
async function rejectFriendRequest(index) { if (!currentUser || !DB.users[currentUser]) return; const user = DB.users[currentUser], req = user.incomingRequests[index]; if (!req) return; user.incomingRequests.splice(index, 1); const friendUser = DB.users[req.from]; if (friendUser.friendRequests) friendUser.friendRequests = friendUser.friendRequests.filter(r => r.to !== currentUser); await syncSaveDB(); renderFriends(); }
function showFriendProfile(friendName) {
    const friend = DB.users[friendName]; if (!friend) return; const avatarHtml = friend.avatar ? `<img src="${friend.avatar}">` : `<svg viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
    const liked = friend.liked || [], playlists = friend.playlists || [], history = friend.history || [];
    let html = `<div style="display:flex;align-items:center;gap:20px;margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid var(--glass-border);"><div style="width:80px;height:80px;border-radius:50%;background:var(--accent-gradient);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;">${avatarHtml}</div><div><div style="font-size:26px;font-weight:800;">${escapeHtml(friendName)}</div><div style="font-size:13px;color:var(--text-muted);margin-top:4px;">Участник Vibe Player</div></div></div>`;
    html += `<div style="margin-bottom:20px;"><h4 style="font-size:14px;font-weight:700;margin-bottom:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;">Статистика</h4><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;"><div style="background:rgba(255,255,255,0.03);border:1px solid var(--glass-border);border-radius:14px;padding:14px;text-align:center;"><div style="font-size:22px;font-weight:800;color:var(--accent-color);">${liked.length}</div><div style="font-size:11px;color:var(--text-muted);margin-top:2px;">Любимых</div></div><div style="background:rgba(255,255,255,0.03);border:1px solid var(--glass-border);border-radius:14px;padding:14px;text-align:center;"><div style="font-size:22px;font-weight:800;color:var(--accent-color);">${playlists.length}</div><div style="font-size:11px;color:var(--text-muted);margin-top:2px;">Плейлистов</div></div><div style="background:rgba(255,255,255,0.03);border:1px solid var(--glass-border);border-radius:14px;padding:14px;text-align:center;"><div style="font-size:22px;font-weight:800;color:var(--accent-color);">${history.length}</div><div style="font-size:11px;color:var(--text-muted);margin-top:2px;">В истории</div></div></div></div>`;
    if (liked.length > 0) { html += `<div style="margin-bottom:20px;"><h4 style="font-size:14px;font-weight:700;margin-bottom:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;">Топ любимых треков</h4><div style="display:flex;flex-direction:column;gap:8px;">`; liked.slice(0, 5).forEach(track => { html += `<div class="top-item"><div class="top-art"><svg viewBox="0 0 24 24" width="20" height="20" fill="rgba(255,255,255,0.5)"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg></div><div class="top-info"><div class="top-name">${escapeHtml(track.title)}</div><div class="top-sub">${escapeHtml(track.author)}</div></div></div>`; }); html += `</div></div>`; }
    if (profileModalContent) { profileModalContent.innerHTML = html; if (profileModal) profileModal.style.display = 'flex'; }
}
if (friendSearchBtn) friendSearchBtn.addEventListener('click', () => { const query = friendSearchInput?.value.trim(); if (!query) return; renderFriendSearchResults(searchUsers(query)); });
if (friendSearchInput) friendSearchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { const query = friendSearchInput.value.trim(); if (!query) return; renderFriendSearchResults(searchUsers(query)); } });
if (profileModal) profileModal.addEventListener('click', (e) => { if (e.target === profileModal) profileModal.style.display = 'none'; });

// =========================================================================
// 11. НАВИГАЦИЯ, АВТОРИЗАЦИЯ И ЗАПУСК
// =========================================================================
function showAuth() { if (authScreen) authScreen.classList.add('active'); if (playerScreen) playerScreen.classList.remove('active'); }
async function enterApp(username) {
    currentUser = username; if (authScreen) authScreen.classList.remove('active'); if (playerScreen) playerScreen.classList.add('active');
    if (displayUsername) displayUsername.innerText = username;
    loadBackgrounds(); loadMiniBackgrounds(); loadFilters(); loadParticles(); loadEqSettings();
    updateDashboardStats(); renderPlaylistsGrid(); updateUserAvatar(); switchView('dashboard');
}
function switchView(viewName) {
    currentView = viewName; [dashboardView, tracksView, playlistsView, settingsView, statsView, friendsView].forEach(v => { if (v) v.classList.remove('active'); });
    if (topSearchPanel) topSearchPanel.style.display = 'none'; if (backToPlBtn) backToPlBtn.style.display = 'none';
    [navDashboardBtn, navSearchBtn, navLikedBtn, navPlaylistsBtn, navSettingsBtn, navStatsBtn, navFriendsBtn].forEach(b => { if (b) b.classList.remove('active'); });
    if (viewName === 'dashboard') { if (dashboardView) dashboardView.classList.add('active'); if (navDashboardBtn) navDashboardBtn.classList.add('active'); animateDashboard(); }
    else if (viewName === 'search') { if (tracksView) tracksView.classList.add('active'); if (topSearchPanel) topSearchPanel.style.display = 'flex'; if (navSearchBtn) navSearchBtn.classList.add('active'); if (tracksTitleText) tracksTitleText.innerText = 'Поиск'; }
    else if (viewName === 'playlists') { if (playlistsView) playlistsView.classList.add('active'); if (navPlaylistsBtn) navPlaylistsBtn.classList.add('active'); renderPlaylistsGrid(); }
    else if (viewName === 'liked') { if (tracksView) tracksView.classList.add('active'); if (navLikedBtn) navLikedBtn.classList.add('active'); renderLikedTracks(); }
    else if (viewName === 'settings') { if (settingsView) settingsView.classList.add('active'); if (navSettingsBtn) navSettingsBtn.classList.add('active'); }
    else if (viewName === 'stats') { if (statsView) statsView.classList.add('active'); if (navStatsBtn) navStatsBtn.classList.add('active'); renderStats(); }
    else if (viewName === 'friends') { if (friendsView) friendsView.classList.add('active'); if (navFriendsBtn) navFriendsBtn.classList.add('active'); renderFriends(); }
}
if (navDashboardBtn) navDashboardBtn.addEventListener('click', () => switchView('dashboard')); if (navSearchBtn) navSearchBtn.addEventListener('click', () => switchView('search'));
if (navPlaylistsBtn) navPlaylistsBtn.addEventListener('click', () => switchView('playlists')); if (navLikedBtn) navLikedBtn.addEventListener('click', () => switchView('liked'));
if (navSettingsBtn) navSettingsBtn.addEventListener('click', () => switchView('settings')); if (navStatsBtn) navStatsBtn.addEventListener('click', () => switchView('stats'));
if (navFriendsBtn) navFriendsBtn.addEventListener('click', () => switchView('friends'));
async function logoutCurrentUser() { currentUser = null; DB.currentUser = null; await syncSaveDB(); showAuth(); }
if (logoutBtn) logoutBtn.addEventListener('click', logoutCurrentUser);
if (settingsLogoutBtn) settingsLogoutBtn.addEventListener('click', logoutCurrentUser);
// =========================================================================
// УДАЛЕНИЕ АККАУНТА
// =========================================================================
if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', async () => {
        if (!currentUser) return;
        
        // Системное окно подтверждения
        const isConfirmed = confirm(`Вы уверены, что хотите удалить аккаунт "${currentUser}"?\n\nВсе ваши данные, плейлисты и история будут удалены навсегда.`);
        
        if (isConfirmed) {
            // 1. Удаляем пользователя из глобальной базы
            delete DB.users[currentUser];
            DB.currentUser = null;
            
            // 2. Сохраняем изменения в db_vibe.json
            await syncSaveDB();
            
            // 3. Очищаем локальное состояние плеера
            currentUser = null;
            currentTrack = null;
            isPlaying = false;
            originalQueue = [];
            currentQueue = [];
            
            // 4. Останавливаем воспроизведение
            if (isUsingFallback) fallbackAudioPlayer.pause();
            if (widget) { try { widget.pause(); } catch {} }
            
            // 5. Сбрасываем фоны и возвращаем на экран авторизации
            clearDynamicBackground();
            showAuth();
        }
    });
}
if (searchTypeTracks) searchTypeTracks.addEventListener('click', () => { searchType = 'tracks'; searchTypeTracks.classList.add('active'); if (searchTypePlaylists) searchTypePlaylists.classList.remove('active'); });
if (searchTypePlaylists) searchTypePlaylists.addEventListener('click', () => { searchType = 'playlists'; searchTypePlaylists.classList.add('active'); if (searchTypeTracks) searchTypeTracks.classList.remove('active'); });
function updateUserAvatar() { if (!currentUser || !DB.users[currentUser]) return; const avatarData = DB.users[currentUser].avatar; if (userAvatarImg && userAvatarIcon) { if (avatarData) { userAvatarImg.src = avatarData; userAvatarImg.style.display = 'block'; userAvatarIcon.style.display = 'none'; } else { userAvatarImg.style.display = 'none'; userAvatarIcon.style.display = 'block'; } } }
if (userProfileBtn) userProfileBtn.addEventListener('click', () => { if (avatarInput) avatarInput.click(); });
if (avatarInput) avatarInput.addEventListener('change', async (e) => { const file = e.target.files?.[0]; if (!file || !currentUser || !DB.users[currentUser]) return; const reader = new FileReader(); reader.onload = async (ev) => { DB.users[currentUser].avatar = ev.target.result; await syncSaveDB(); updateUserAvatar(); }; reader.readAsDataURL(file); });

if (tabLoginBtn && tabRegisterBtn && loginForm && registerForm) {
    tabLoginBtn.addEventListener('click', () => { tabLoginBtn.classList.add('active'); tabRegisterBtn.classList.remove('active'); loginForm.style.display = 'flex'; registerForm.style.display = 'none'; if (authError) { authError.innerText = ''; authError.classList.remove('success'); } });
    tabRegisterBtn.addEventListener('click', () => { tabRegisterBtn.classList.add('active'); tabLoginBtn.classList.remove('active'); registerForm.style.display = 'flex'; loginForm.style.display = 'none'; if (authError) { authError.innerText = ''; authError.classList.remove('success'); } });
}
if (actionLoginBtn) actionLoginBtn.addEventListener('click', async () => { const username = loginUsername?.value.trim(), password = loginPassword?.value; if (!username || !password) { if (authError) { authError.innerText = 'Заполните все поля'; authError.classList.remove('success'); } return; } if (DB.users[username] && DB.users[username].password === password) { DB.currentUser = username; await syncSaveDB(); await enterApp(username); } else { if (authError) { authError.innerText = 'Неверное имя пользователя или пароль'; authError.classList.remove('success'); } } });
if (actionRegBtn) actionRegBtn.addEventListener('click', async () => {
    const username = regUsername?.value.trim(), password = regPassword?.value;
    if (!username || !password) { if (authError) { authError.innerText = 'Заполните все поля'; authError.classList.remove('success'); } return; }
    if (username.length < 3) { if (authError) { authError.innerText = 'Имя слишком короткое (мин. 3 символа)'; authError.classList.remove('success'); } return; }
    if (DB.users[username]) { if (authError) { authError.innerText = 'Пользователь уже существует'; authError.classList.remove('success'); } return; }
    DB.users[username] = { password, liked: [], history: [], playlists: [], backgrounds: [], miniBackgrounds: [], activeBg: null, activeMiniBg: null, avatar: null, friends: [], friendRequests: [], incomingRequests: [], stats: { totalSeconds: 0, tracksPlayed: 0, daily: {} } };
    DB.currentUser = username; await syncSaveDB(); if (authError) { authError.innerText = 'Аккаунт успешно создан!'; authError.classList.add('success'); } setTimeout(() => enterApp(username), 800);
});

async function boot() {
    await syncLoadDB(); initVisualizer(); startRenderEngine(); setupCustomSelects(); if (volumeRange) forceSliderUpdate(volumeRange);
    dynamicBgEnabled = DB.settings?.dynamicBg === true;
    if (dynamicBgToggle) { dynamicBgToggle.checked = dynamicBgEnabled; dynamicBgToggle.addEventListener('change', async () => { dynamicBgEnabled = dynamicBgToggle.checked; if (!DB.settings) DB.settings = {}; DB.settings.dynamicBg = dynamicBgEnabled; await syncSaveDB(); if (!dynamicBgEnabled) clearDynamicBackground(); else if (currentTrack?.artwork) setDynamicBackground(currentTrack.artwork); else applyFilters(); }); }
    if (miniPlayerBtn) miniPlayerBtn.addEventListener('click', async () => { try { const o = await window.vibeAPI?.miniToggle?.(); miniPlayerBtn.classList.toggle('active', o); } catch {} });
    if (window.vibeAPI?.onMiniCommand) window.vibeAPI.onMiniCommand(({ action, value }) => { if (action === 'sync-close') { miniPlayerBtn?.classList.remove('active'); return; } if (action === 'toggle') { if (playPauseBtn) playPauseBtn.click(); } else if (action === 'next') playNextTrack(true); else if (action === 'prev') playPrevTrack(); else if (action === 'seek') { const p = Number(value) || 0; if (seekbarRange) { seekbarRange.value = p; forceSliderUpdate(seekbarRange); seekbarRange.dispatchEvent(new Event('input')); } } else if (action === 'volume') { if (volumeRange) { volumeRange.value = value; forceSliderUpdate(volumeRange); applyCurrentVolume(); } } });
    if (window.vibeAPI?.onMediaKey) window.vibeAPI.onMediaKey((a) => { if (a === 'toggle') { if (playPauseBtn) playPauseBtn.click(); } else if (a === 'next') playNextTrack(true); else if (a === 'prev') playPrevTrack(); });
    if (DB.currentUser && DB.users[DB.currentUser]) await enterApp(DB.currentUser); else showAuth();
    setTimeout(loadScWidgetScript, 100);
}
window.addEventListener('keydown', (e) => { const el = document.activeElement; if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) return; if (e.code === 'Space') { e.preventDefault(); e.stopPropagation(); if (playPauseBtn) playPauseBtn.click(); } else if (e.code === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); playNextTrack(true); } else if (e.code === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); playPrevTrack(); } }, true);
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

function sendMiniState(overrides = {}) { if (!window.vibeAPI?.miniSendState) return; const state = { title: currentTrack?.title || 'Нет трека', author: currentTrack?.author || '—', artwork: currentTrack?.artwork || null, playing: isPlaying, progress: 0, current: 0, duration: currentTrackDurationMs / 1000, volume: getCurrentVolume(), miniBg: currentUser && DB.users[currentUser] ? DB.users[currentUser].activeMiniBg : null, ...overrides }; window.vibeAPI.miniSendState(state); }
function sendMiniProgress() { if (!window.vibeAPI?.miniSendState) return; const current = isUsingFallback ? fallbackAudioPlayer.currentTime : (Number(seekbarRange?.value || 0) / 100) * (currentTrackDurationMs / 1000); const duration = currentTrackDurationMs / 1000; sendMiniState({ progress: duration > 0 ? (current / duration) * 100 : 0, current, duration }); }

// =========================================================================
// СИСТЕМА ОБНОВЛЕНИЙ (UI)
// =========================================================================
const updateModal = $('updateModal');
const updateTitle = $('updateTitle');
const updateSub = $('updateSub');
const updateDesc = $('updateDesc');
const updateProgressBar = $('updateProgressBar');
const updateProgressFill = $('updateProgressFill');
const updateActions = $('updateActions');
const updateNowBtn = $('updateNowBtn');
const updateLaterBtn = $('updateLaterBtn');

let isUpdateDownloaded = false;

function showUpdateModal() {
    if (updateModal) updateModal.classList.add('active');
}
function hideUpdateModal() {
    if (updateModal) updateModal.classList.remove('active');
}

if (updateNowBtn) {
    updateNowBtn.addEventListener('click', async () => {
        if (isUpdateDownloaded) {
            // Если уже скачано - устанавливаем и перезапускаем
            await window.vibeAPI.installUpdate();
        } else {
            // Если еще не скачано - начинаем скачивание
            updateNowBtn.innerText = 'Скачивание...';
            updateNowBtn.style.pointerEvents = 'none';
            updateLaterBtn.style.display = 'none';
            updateProgressBar.style.display = 'block';
            await window.vibeAPI.downloadUpdate();
        }
    });
}

if (updateLaterBtn) {
    updateLaterBtn.addEventListener('click', hideUpdateModal);
}

// Слушаем события от главного процесса
if (window.vibeAPI?.onUpdateEvent) {
    window.vibeAPI.onUpdateEvent((data) => {
        if (!data) return;

        if (data.type === 'available') {
            isUpdateDownloaded = false;
            updateTitle.innerText = 'Доступно обновление';
            updateSub.innerText = `Версия ${data.version}`;
            updateDesc.innerText = data.releaseNotes || 'Новые функции и исправления.';
            updateNowBtn.innerText = 'Скачать и установить';
            updateNowBtn.style.pointerEvents = 'auto';
            updateLaterBtn.style.display = 'block';
            updateProgressBar.style.display = 'none';
            showUpdateModal();
        }

        if (data.type === 'downloading') {
            updateProgressFill.style.width = `${data.percent}%`;
            updateNowBtn.innerText = `Скачивание ${data.percent}%`;
        }

        if (data.type === 'downloaded') {
            isUpdateDownloaded = true;
            updateTitle.innerText = 'Готово к установке';
            updateSub.innerText = 'Обновление скачано';
            updateDesc.innerText = 'Нажмите "Перезапустить", чтобы применить обновление. Это займет пару секунд.';
            updateNowBtn.innerText = 'Перезапустить';
            updateNowBtn.style.pointerEvents = 'auto';
            updateLaterBtn.style.display = 'none';
            updateProgressBar.style.display = 'none';
            showUpdateModal();
        }
    });
}