const mouseEffect = document.querySelector('.mouse-effect');
const clickableElements = document.querySelectorAll('.button'); // クリックできる要素

document.addEventListener('mousemove', (event) => {
  mouseEffect.style.left = `${event.clientX - mouseEffect.offsetWidth / 2}px`;
  mouseEffect.style.top = `${event.clientY - mouseEffect.offsetHeight / 2}px`;
});

clickableElements.forEach(element => {
  element.addEventListener('mouseover', () => {
    mouseEffect.style.transform = 'scale(0.3)'; // ボタンにカーソルが重なったときに小さくする
  });

  element.addEventListener('mouseout', () => {
    mouseEffect.style.transform = 'scale(0.5)'; // ボタンからカーソルが離れたときに元のサイズに戻す
  });
});

document.addEventListener('mouseleave', () => {
  mouseEffect.style.transform = 'scale(0.5)'; // ウィンドウからカーソルが離れたときに元のサイズに戻す
});

function navigateToManagement() {
    const button = document.getElementById('join-button');
    const loading = document.getElementById('loading');
    
    button.style.display = 'none'; // ボタンを非表示にする
    loading.style.display = 'block'; // Loadingメッセージを表示
    
    // アニメーションのために少し待ってからページ遷移
    setTimeout(() => {
      window.location.href = 'server.html';
    }, 1500); // 1.5秒後に遷移
  }
  