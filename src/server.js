window.onload = function() {
    const TIMEOUT_DURATION = 30000; // タイムアウト時間（ミリ秒）
    let timeout;
    let successReceived = false;

    function initialize() {
        showTab('list'); // デフォルトでリストタブを表示
        checkServers();

        // タイムアウト処理を設定
        timeout = setTimeout(() => {
            if (!successReceived) {
                showError();
                redirectToIndex();
            }
        }, TIMEOUT_DURATION);
    }

    function checkServers() {
        const serverNotFound = document.getElementById('server-not-found');
        const searchContainer = document.getElementById('search-container');
        const serverList = document.getElementById('server-list');
        const loading = document.getElementById('loading');

        // ロード画面を表示
        loading.style.display = 'block';

        // サーバー情報取得
        fetchServerData().then(serverInfos => {
            if (serverInfos.length > 0) {
                serverNotFound.style.display = 'none';
                searchContainer.style.display = 'block';
                displayServerList(serverInfos);
                sendSuccess();
            } else {
                searchContainer.style.display = 'none';
                serverNotFound.style.display = 'block';
                clearTimeout(timeout); // タイムアウトをクリア
                loading.style.display = 'none'; // ロード画面を非表示
            }
        }).catch(error => {
            console.error('Error fetching server data:', error);
            showError();
            redirectToIndex();
        });
    }

    function fetchServerData() {
        return new Promise((resolve, reject) => {
            // ここで実際のファイルシステム操作やAPIリクエストを行う
            // 以下はデモ用のサーバー情報を返す例
            const serverInfos = [
                // サーバーデータ例
                {"server_name":"${SERVER_NAME}"}
            ];
            resolve(serverInfos);
        });
    }

    function parseConfigFile(data) {
        // データをパースしてサーバー情報を返す
        const serverInfos = [];
        const lines = data.split('\n');
        const info = {};
        lines.forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                const trimmedKey = key.trim();
                const trimmedValue = value.trim().replace(/"/g, '');
                if (trimmedKey === 'config.mcsi.server_name') {
                    info.server_name = trimmedValue;
                } else if (trimmedKey === 'config.mcsi.server_trueorfalse') {
                    info.server_trueorfalse = trimmedValue;
                } else if (trimmedKey === 'config.mcsi.server_icon') {
                    info.server_icon = trimmedValue;
                }
            }
        });
        if (Object.keys(info).length > 0) {
            serverInfos.push(info);
        }
        return serverInfos;
    }

    function displayServerList(serverInfos) {
        const serverList = document.getElementById('server-list');
        serverList.innerHTML = '';

        serverInfos.forEach(info => {
            serverList.innerHTML += `
                <div class="server-item">
                    <img src="${info.server_icon}" alt="${info.server_name} icon" class="server-icon">
                    <div class="server-info">
                        <h3>${info.server_name}</h3>
                        <p>Status: ${info.server_trueorfalse === 'true' ? 'Online' : 'Offline'}</p>
                        <p>ID: ${info.id || 'N/A'}</p>
                        <p>Tags: ${info.tag ? info.tag.join(', ') : 'N/A'}</p>
                    </div>
                </div>
            `;
        });
    }

    // showTab関数をグローバルスコープに移動
    window.showTab = function showTab(tabId) {
        const tabs = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => {
            tab.style.display = 'none'; // 非表示にする
        });

        const selectedTab = document.getElementById(tabId);
        if (selectedTab) {
            selectedTab.style.display = 'block'; // 表示する
        }
    }

    function sendSuccess() {
        successReceived = true;
        clearTimeout(timeout); // タイムアウトをクリア
        document.getElementById('loading').style.display = 'none'; // ロード画面を非表示
    }

    function showError() {
        document.getElementById('error-message').style.display = 'block';
    }

    function redirectToIndex() {
        window.location.href = 'index.html';
    }

    // メニューのクリックイベントを設定
    document.getElementById('menu-dashboard').addEventListener('click', function() {
        showTab('dashboard');
    });
    document.getElementById('menu-setting').addEventListener('click', function() {
        showTab('setting');
    });
    document.getElementById('menu-list').addEventListener('click', function() {
        showTab('list');
        initialize(); // タブ切り替え時にinitializeを呼び出す
    });

    initialize();
};

// createServer関数とloadCreateServerContent関数をグローバルスコープに移動
function createServer() {
    showTab('create-server-content');
    loadCreateServerContent();
}

function loadCreateServerContent() {
    fetch('server_create.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('create-server-content').innerHTML = data;
        })
        .catch(error => console.error('Error loading server-create.html:', error));
}
