const { ipcRenderer } = require('electron');

// ウィンドウを閉じる関数
function closeWindow() {
  ipcRenderer.send('close-window');
}

// サーバー管理画面に遷移する関数
function navigateToManagement() {
  // サーバー管理画面に遷移する処理を追加
  document.getElementById('content').innerHTML = `
    <div class="fade-in">
      <h1>サーバー管理画面</h1>
      <!-- ここにサーバー管理画面の内容を追加 -->
    </div>
  `;
}
