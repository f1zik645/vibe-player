const { app, BrowserWindow, ipcMain, Menu, globalShortcut, screen } = require('electron');
const path = require('path');
const fs = require('fs');
const { autoUpdater } = require('electron-updater');

app.commandLine.appendSwitch('disable-http-cache');
app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');

// ПУТЬ К НАДЕЖНОЙ БАЗЕ ДАННЫХ
const dbPath = path.join(app.getPath('userData'), 'db_vibe.json');

ipcMain.handle('db-save', (e, data) => {
    try { fs.writeFileSync(dbPath, JSON.stringify(data)); return true; } 
    catch (err) { return false; }
});
ipcMain.handle('db-load', () => {
    try { if (fs.existsSync(dbPath)) return JSON.parse(fs.readFileSync(dbPath, 'utf8')); } 
    catch (err) {}
    return {};
});

let mainWindow = null;
let miniWindow = null;
let activeClientId = 'a3e059563d7fd3372b49b37f00a00bcf'; 

async function fetchFreshClientId() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);
        const res = await fetch('https://soundcloud.com', { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: controller.signal });
        clearTimeout(timeoutId);
        if (!res.ok) return activeClientId;
        const html = await res.text();
        const scriptMatches = [...html.matchAll(/src="(https:\/\/a-v2\.sndcdn\.com\/assets\/[^\"]+\.js)"/g)].map(m => m[1]);
        for (let i = scriptMatches.length - 1; i >= Math.max(0, scriptMatches.length - 3); i--) {
            try {
                const ctrl = new AbortController(); const tm = setTimeout(() => ctrl.abort(), 1000);
                const jsRes = await fetch(scriptMatches[i], { signal: ctrl.signal });
                clearTimeout(tm);
                const match = (await jsRes.text()).match(/client_id["']?\s*[:=]\s*["']([a-zA-Z0-9]{32})["']/);
                if (match && match[1]) { activeClientId = match[1]; return activeClientId; }
            } catch {}
        }
    } catch {}
    return activeClientId;
}

async function fetchScApi(endpointUrl) {
    const sep = endpointUrl.includes('?') ? '&' : '?';
    let url = `${endpointUrl}${sep}client_id=${activeClientId}`;
    try {
        let res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' } });
        if (res.status === 401 || res.status === 403) {
            await fetchFreshClientId();
            res = await fetch(`${endpointUrl}${sep}client_id=${activeClientId}`, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' } });
        }
        return res.ok ? await res.json() : null;
    } catch { return null; }
}

function formatScItem(item) {
    if (!item) return null;
    
    // Функция очистки названий от мусора
    const cleanTitle = (title) => {
        if (!title) return 'Без названия';
        return title
            .replace(/\s*\(.*?\)\s*/g, ' ') // Убираем скобки с содержимым
            .replace(/\s*\[.*?\]\s*/g, ' ') // Убираем квадратные скобки
            .replace(/\s*-\s*(Original|Remix|Edit|Version|Mix|Radio|Club|Extended|Acoustic|Instrumental|Live|Cover|Remaster|Re-?master|Deluxe|Bonus|Explicit|Clean).*$/i, '') // Убираем суффиксы
            .replace(/\s+/g, ' ') // Множественные пробелы в один
            .trim();
    };
    
    if (item.author_name && item.title && item.thumbnail_url) {
        let title = cleanTitle(item.title);
        let author = item.author_name;
        
        const byPos = title.lastIndexOf(' by ');
        if (byPos > 0) {
            author = title.substring(byPos + 4).trim();
            title = cleanTitle(title.substring(0, byPos));
        }
        
        return {
            id: item.permalink_url,
            title: title,
            author: author || 'SoundCloud',
            url: item.permalink_url,
            artwork: item.thumbnail_url.replace('-large', '-t500x500').replace('-badge', '-t500x500'),
            type: item.permalink_url.includes('/sets/') ? 'playlists' : 'tracks'
        };
    }
    
    if (!item.permalink_url && !item.id) return null;
    
    let artwork = item.artwork_url || item.user?.avatar_url || null;
    if (artwork && typeof artwork === 'string') {
        artwork = artwork.replace('-large', '-t500x500').replace('-badge', '-t500x500').replace('-small', '-t500x500');
    }
    
    const isPlaylist = item.kind === 'playlist' || Array.isArray(item.tracks) || String(item.permalink_url || '').includes('/sets/');
    
    return {
        id: item.id || item.permalink_url,
        title: cleanTitle(item.title || 'Без названия'),
        author: item.user?.username || 'SoundCloud',
        url: item.permalink_url || `https://soundcloud.com/track/${item.id}`,
        artwork,
        type: isPlaylist ? 'playlists' : 'tracks'
    };
}

async function hydrateFullPlaylistTracks(plData) {
    if (!plData || !Array.isArray(plData.tracks)) return [];
    const trackMap = new Map(); const missingIds = [];
    plData.tracks.forEach(t => { if (t.title && t.permalink_url) { const f = formatScItem(t); if (f) trackMap.set(t.id, f); } else if (t.id) { missingIds.push(t.id); } });
    for (let i = 0; i < missingIds.length; i += 50) {
        const chunk = missingIds.slice(i, i + 50);
        const hydratedData = await fetchScApi(`https://api-v2.soundcloud.com/tracks?ids=${chunk.join(',')}`);
        if (Array.isArray(hydratedData)) { hydratedData.forEach(t => { const f = formatScItem(t); if (f) trackMap.set(t.id, f); }); }
    }
    return plData.tracks.map(t => trackMap.get(t.id)).filter(Boolean);
}

function parseSpotifyUrl(url) {
    let match = url.match(/(?:open\.)?spotify\.com\/(?:intl-[a-z]+\/)?(playlist|album|track)\/([a-zA-Z0-9]+)/);
    if (match) return { type: match[1], id: match[2] };
    const uriMatch = url.match(/spotify:(playlist|album|track):([a-zA-Z0-9]+)/);
    if (uriMatch) return { type: uriMatch[1], id: uriMatch[2] };
    return null;
}

// ЗАМЕНИ ЭТУ ФУНКЦИЮ:
async function fetchSpotifyViaEmbed(spType, spId) {
    try {
        const res = await fetch(`https://open.spotify.com/embed/${spType}/${spId}`, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
        if (!res.ok) return null;
        const html = await res.text();
        
        let playlistName = 'Spotify Плейлист';
        const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
        if (titleMatch) playlistName = titleMatch[1].replace(/\s*(?:\||–|—|-)\s*Spotify.*$/i, '').trim();

        const tracks = [];
        const seen = new Set();

        // Надежный парсинг из __NEXT_DATA__ или скрытых скриптов
        const jsonMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
        if (jsonMatch) {
            try {
                const data = JSON.parse(jsonMatch[1]);
                // Пытаемся найти треки в структуре Spotify
                const extractTracks = (obj) => {
                    if (!obj || typeof obj !== 'object') return;
                    if (obj.name && obj.artists && Array.isArray(obj.artists)) {
                        const key = `${obj.artists[0].name} - ${obj.name}`.toLowerCase();
                        if (!seen.has(key)) {
                            seen.add(key);
                            tracks.push({ title: obj.name, artist: obj.artists[0].name, cover: null });
                        }
                    }
                    for (const key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key)) extractTracks(obj[key]);
                    }
                };
                extractTracks(data);
            } catch (e) {}
        }

        // Фоллбэк на старый regex, если JSON не сработал
        if (tracks.length === 0) {
            const matches = [...html.matchAll(/"name"\s*:\s*"([^"]+)"[^}]*?"artists"\s*:\s*\[\s*\{\s*"name"\s*:\s*"([^"]+)"/g)];
            for (const m of matches) {
                const title = m[1].replace(/\\"/g, '"').trim(), artist = m[2].replace(/\\"/g, '"').trim();
                if (title && artist && title !== playlistName) {
                    const key = `${artist} - ${title}`.toLowerCase();
                    if (!seen.has(key)) { seen.add(key); tracks.push({ title, artist, cover: null }); }
                }
            }
        }
        return tracks.length > 0 ? { name: playlistName, tracks } : null;
    } catch { return null; }
}

// ДОБАВЬ ЭТУ ФУНКЦИЮ ДЛЯ ПОИСКА В SPOTIFY (перед ipcMain.handle('soundcloud-search'...):
async function searchSpotify(query) {
    try {
        const res = await fetch(`https://open.spotify.com/search/${encodeURIComponent(query)}`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Accept': 'text/html' }
        });
        if (!res.ok) return [];
        const html = await res.text();
        const tracks = [];
        const seen = new Set();

        const jsonMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
        if (jsonMatch) {
            try {
                const data = JSON.parse(jsonMatch[1]);
                const extractTracks = (obj) => {
                    if (!obj || typeof obj !== 'object') return;
                    if (obj.name && obj.artists && Array.isArray(obj.artists) && obj.uri && obj.uri.includes('track')) {
                        const key = `${obj.artists[0].name} - ${obj.name}`.toLowerCase();
                        if (!seen.has(key)) {
                            seen.add(key);
                            tracks.push({
                                id: 'sp_' + obj.id,
                                title: obj.name,
                                author: obj.artists[0].name,
                                url: `https://soundcloud.com/search?q=${encodeURIComponent(obj.artists[0].name + ' - ' + obj.name)}`,
                                fallbackQuery: `${obj.artists[0].name} - ${obj.name}`,
                                artwork: obj.album?.images?.[0]?.url || null,
                                type: 'tracks',
                                isFallbackOnly: true,
                                source: 'spotify'
                            });
                        }
                    }
                    for (const key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key)) extractTracks(obj[key]);
                    }
                };
                extractTracks(data);
            } catch (e) {}
        }
        return tracks;
    } catch { return []; }
}

async function searchSpotifyPlaylists(query) {
    try {
        const res = await fetch(`https://open.spotify.com/search/${encodeURIComponent(query)}/playlists`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        if (!res.ok) return [];
        const html = await res.text();
        const playlists = [];
        const seen = new Set();
        
        const jsonMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
        if (jsonMatch) {
            try {
                const data = JSON.parse(jsonMatch[1]);
                const extractPlaylists = (obj) => {
                    if (!obj || typeof obj !== 'object') return;
                    if (obj.name && obj.uri && obj.uri.includes('playlist') && obj.images?.[0]?.url) {
                        const key = obj.name.toLowerCase();
                        if (!seen.has(key)) {
                            seen.add(key);
                            playlists.push({
                                id: 'sp_pl_' + obj.id,
                                title: obj.name,
                                author: obj.owner?.display_name || 'Spotify',
                                url: `https://open.spotify.com/playlist/${obj.id}`,
                                artwork: obj.images[0].url,
                                type: 'playlists',
                                source: 'spotify'
                            });
                        }
                    }
                    for (const key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key)) extractPlaylists(obj[key]);
                    }
                };
                extractPlaylists(data);
            } catch (e) {}
        }
        return playlists;
    } catch { return []; }
}

ipcMain.handle('soundcloud-search', async (event, query, type = 'tracks', offset = 0) => {
    const q = String(query || '').trim();
    if (!q) return [];
    
    const off = Math.max(0, Number(offset) || 0);
    
    if (type === 'playlists') {
        const [scPlaylists, spPlaylists] = await Promise.all([
            fetchScApi(`https://api-v2.soundcloud.com/search/playlists?q=${encodeURIComponent(q)}&limit=15&offset=${off}`),
            searchSpotifyPlaylists(q)
        ]);
        
        let results = [];
        
        if (scPlaylists?.collection) {
            results = results.concat(scPlaylists.collection.map(formatScItem).filter(Boolean).map(item => ({ ...item, source: 'soundcloud' })));
        }
        
        if (spPlaylists.length > 0) {
            results = results.concat(spPlaylists);
        }
        
        return results;
    } else {
        const [scTracks, spTracks] = await Promise.all([
            fetchScApi(`https://api-v2.soundcloud.com/search/tracks?q=${encodeURIComponent(q)}&limit=20&offset=${off}`),
            searchSpotify(q)
        ]);
        
        let results = [];
        
        if (scTracks?.collection) {
            results = results.concat(scTracks.collection.map(formatScItem).filter(Boolean).map(item => ({ ...item, source: 'soundcloud' })));
        }
        
        if (spTracks.length > 0) {
            results = results.concat(spTracks);
        }
        
        return results;
    }
});

ipcMain.handle('get-recommendations', async (event, userHistory, userLiked) => {
    if (!userHistory?.length && !userLiked?.length) return [];
    
    const recentTracks = [...(userLiked || []), ...(userHistory || [])].slice(0, 10);
    if (recentTracks.length === 0) return [];
    
    const artists = recentTracks.map(t => t.author).filter(Boolean).slice(0, 3);
    if (artists.length === 0) return [];
    
    const recommendations = [];
    const seen = new Set(recentTracks.map(t => `${t.author} - ${t.title}`.toLowerCase()));
    
    for (const artist of artists) {
        try {
            const data = await fetchScApi(`https://api-v2.soundcloud.com/search/tracks?q=${encodeURIComponent(artist)}&limit=5`);
            if (data?.collection) {
                data.collection.forEach(item => {
                    const formatted = formatScItem(item);
                    if (formatted) {
                        const key = `${formatted.author} - ${formatted.title}`.toLowerCase();
                        if (!seen.has(key)) {
                            seen.add(key);
                            recommendations.push({ ...formatted, source: 'soundcloud' });
                        }
                    }
                });
            }
        } catch (e) {}
    }
    
    return recommendations.slice(0, 10);
});

// СОЗДАНИЕ МИНИ-ПЛЕЕРА
function createMiniPlayer() {
    if (miniWindow && !miniWindow.isDestroyed()) {
        miniWindow.show(); 
        miniWindow.focus(); 
        return miniWindow;
    }

    miniWindow = new BrowserWindow({
        width: 360, 
        height: 140, 
        minWidth: 360, 
        minHeight: 140, 
        maxWidth: 360, 
        maxHeight: 140,
        frame: false, 
        transparent: true, 
        alwaysOnTop: true, 
        skipTaskbar: true,
        resizable: false,
        show: false,
        backgroundColor: '#00000000', 
        hasShadow: false,
        webPreferences: { 
            preload: path.join(__dirname, 'preload.js'), 
            nodeIntegration: false, 
            contextIsolation: true 
        }
    });

    miniWindow.setAlwaysOnTop(true, 'screen-saver');
    miniWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

    miniWindow.on('minimize', (e) => {
        e.preventDefault();
        if (miniWindow && !miniWindow.isDestroyed()) {
            miniWindow.restore();
            miniWindow.show();
        }
    });

    miniWindow.loadFile('mini.html');

    miniWindow.once('ready-to-show', () => {
        const wa = screen.getPrimaryDisplay().workArea;
        const [w, h] = miniWindow.getSize();
        miniWindow.setPosition(wa.x + wa.width - w - 20, wa.y + wa.height - h - 20);
        miniWindow.show();
    });

    miniWindow.on('closed', () => { miniWindow = null; });
    return miniWindow;
}

ipcMain.handle('mini-player-toggle', async () => {
    if (miniWindow && !miniWindow.isDestroyed() && miniWindow.isVisible()) { 
        miniWindow.hide(); 
        return false; 
    }
    createMiniPlayer(); 
    return true;
});

ipcMain.handle('mini-player-close', async () => { 
    if (miniWindow && !miniWindow.isDestroyed()) miniWindow.hide(); 
    return true; 
});

ipcMain.on('mini-player-state', (_e, state) => { 
    if (miniWindow && !miniWindow.isDestroyed()) miniWindow.webContents.send('mini-player-update', state); 
});

ipcMain.on('mini-player-control', (_e, payload) => { 
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('mini-player-command', payload); 
});

// СОЗДАНИЕ ГЛАВНОГО ОКНА
function createMainWindow() {
    Menu.setApplicationMenu(null);
    mainWindow = new BrowserWindow({
        width: 1200, height: 800, minWidth: 800, minHeight: 600,
        autoHideMenuBar: true, backgroundColor: '#060609',
        webPreferences: { preload: path.join(__dirname, 'preload.js'), nodeIntegration: false, contextIsolation: true }
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('minimize', () => mainWindow.webContents.send('window-visibility-changed', false));
    mainWindow.on('restore', () => mainWindow.webContents.send('window-visibility-changed', true));

    mainWindow.on('closed', () => {
        if (miniWindow && !miniWindow.isDestroyed()) {
            miniWindow.destroy();
            miniWindow = null;
        }
        mainWindow = null;
    });
}

// РЕГИСТРАЦИЯ ГЛОБАЛЬНЫХ КЛАВИШ
function registerGlobalShortcuts() {
    const sendKey = (key) => {
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('global-media-key', key);
        }
    };

    // Безопасная регистрация медиа-клавиш
    try { globalShortcut.register('MediaPlayPause', () => sendKey('toggle')); } catch {}
    try { globalShortcut.register('MediaNextTrack', () => sendKey('next')); } catch {}
    try { globalShortcut.register('MediaPreviousTrack', () => sendKey('prev')); } catch {}

    // Дополнительные глобальные хоткеи (Ctrl+Shift+Пробел / Ctrl+Shift+Стрелки)
    try { globalShortcut.register('CommandOrControl+Shift+Space', () => sendKey('toggle')); } catch {}
    try { globalShortcut.register('CommandOrControl+Shift+Right', () => sendKey('next')); } catch {}
    try { globalShortcut.register('CommandOrControl+Shift+Left', () => sendKey('prev')); } catch {}
}

// =========================================================================
// СИСТЕМА АВТООБНОВЛЕНИЙ
// =========================================================================
function initAutoUpdater() {
    autoUpdater.autoDownload = false;
    autoUpdater.autoInstallOnAppQuit = true;

    autoUpdater.on('checking-for-update', () => {
        console.log('Проверка обновлений...');
    });

    autoUpdater.on('update-available', (info) => {
        console.log('Доступно обновление:', info.version);
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('update-event', {
                type: 'available',
                version: info.version,
                releaseNotes: info.releaseNotes || 'Исправления ошибок и улучшения.'
            });
        }
    });

    autoUpdater.on('update-not-available', () => {
        console.log('У вас последняя версия.');
    });

    autoUpdater.on('download-progress', (progress) => {
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('update-event', {
                type: 'downloading',
                percent: Math.round(progress.percent)
            });
        }
    });

    autoUpdater.on('update-downloaded', () => {
        console.log('Обновление скачано.');
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('update-event', { type: 'downloaded' });
        }
    });

    autoUpdater.on('error', (err) => {
        console.error('Ошибка обновления:', err);
    });

    setTimeout(() => {
        autoUpdater.checkForUpdates();
    }, 3000);
}

ipcMain.handle('check-for-updates', () => autoUpdater.checkForUpdates());
ipcMain.handle('download-update', () => autoUpdater.downloadUpdate());
ipcMain.handle('install-update', () => autoUpdater.quitAndInstall());

app.whenReady().then(() => {
    createMainWindow();
    fetchFreshClientId();
    registerGlobalShortcuts();
    initAutoUpdater();

    app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createMainWindow(); });
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

app.on('before-quit', () => {
    if (miniWindow && !miniWindow.isDestroyed()) {
        miniWindow.destroy();
        miniWindow = null;
    }
});

app.on('window-all-closed', () => { 
    if (process.platform !== 'darwin') app.quit(); 
});