const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('vibeAPI', {
    searchSoundCloud: (query, type = 'tracks', offset = 0) => ipcRenderer.invoke('soundcloud-search', query, type, offset),
    searchAll: (query, type = 'tracks', offset = 0) => ipcRenderer.invoke('soundcloud-search', query, type, offset),
    getRecommendations: (userHistory, userLiked) => ipcRenderer.invoke('get-recommendations', userHistory, userLiked),
    getPlaylistTracks: (url) => ipcRenderer.invoke('soundcloud-get-playlist', url),
    importPlaylistUrl: (url) => ipcRenderer.invoke('import-playlist-url', url),
    getFallbackStream: (query) => ipcRenderer.invoke('soundcloud-get-fallback-stream', query),
    onWindowVisibilityChange: (callback) => ipcRenderer.on('window-visibility-changed', (event, isVisible) => callback(isVisible)),

    // Постоянная БД
    dbSave: (data) => ipcRenderer.invoke('db-save', data),
    dbLoad: () => ipcRenderer.invoke('db-load'),

    // Глобальные Медиа-Клавиши
    onMediaKey: (callback) => ipcRenderer.on('global-media-key', (_e, action) => callback(action)),

    // Mini Player
    miniToggle: () => ipcRenderer.invoke('mini-player-toggle'),
    miniClose: () => ipcRenderer.invoke('mini-player-close'),
    miniSendState: (state) => ipcRenderer.send('mini-player-state', state),
    miniControl: (action, value) => ipcRenderer.send('mini-player-control', { action, value }),
    onMiniUpdate: (callback) => ipcRenderer.on('mini-player-update', (_e, data) => callback(data)),
    onMiniCommand: (callback) => ipcRenderer.on('mini-player-command', (_e, data) => callback(data)),

    // СИСТЕМА ОБНОВЛЕНИЙ
    checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
    downloadUpdate: () => ipcRenderer.invoke('download-update'),
    installUpdate: () => ipcRenderer.invoke('install-update'),
    onUpdateEvent: (callback) => ipcRenderer.on('update-event', (_e, data) => callback(data))
});