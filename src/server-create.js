document.addEventListener('DOMContentLoaded', () => {
    const createNewBtn = document.getElementById('create-new');
    const importServerBtn = document.getElementById('import-server');
    const copyServerBtn = document.getElementById('copy-server');

    const createNewContent = document.getElementById('create-new-content');
    const importServerContent = document.getElementById('import-server-content');
    const copyServerContent = document.getElementById('copy-server-content');

    function showTab(tabId) {
        createNewContent.style.display = 'none';
        importServerContent.style.display = 'none';
        copyServerContent.style.display = 'none';

        if (tabId === 'create-new') {
            createNewContent.style.display = 'block';
        } else if (tabId === 'import-server') {
            importServerContent.style.display = 'block';
        } else if (tabId === 'copy-server') {
            copyServerContent.style.display = 'block';
        }

        createNewBtn.classList.remove('active');
        importServerBtn.classList.remove('active');
        copyServerBtn.classList.remove('active');

        if (tabId === 'create-new') {
            createNewBtn.classList.add('active');
        } else if (tabId === 'import-server') {
            importServerBtn.classList.add('active');
        } else if (tabId === 'copy-server') {
            copyServerBtn.classList.add('active');
        }
    }

    createNewBtn.addEventListener('click', () => showTab('create-new'));
    importServerBtn.addEventListener('click', () => showTab('import-server'));
    copyServerBtn.addEventListener('click', () => showTab('copy-server'));

    showTab('create-new'); // Default to 'Create New'
});
