/* ==========================================================
   MAOO Crystal — Client-side Authentication
   ----------------------------------------------------------
   ⚠️  Static-site auth is a UX convenience, not true
       security.  For production, use server-side auth.
   ========================================================== */
(function () {
    'use strict';

    /* ---- obfuscated credentials (base-64) ---- */
    var _u = atob('TWFvb0FkbWlu');     // runtime decode
    var _p = atob('OTM5NDk0MTM=');     // runtime decode

    /* ---- DOM refs ---- */
    var form       = document.getElementById('loginForm');
    var userInput  = document.getElementById('username');
    var passInput  = document.getElementById('password');
    var toggleBtn  = document.getElementById('togglePassword');
    var eyeIcon    = document.getElementById('eyeIcon');
    var submitBtn  = document.getElementById('loginBtn');
    var btnLabel   = document.getElementById('btnLabel');
    var errorBox   = document.getElementById('errorBox');
    var errorText  = document.getElementById('errorText');

    /* ---- if already authed, redirect immediately ---- */
    if (sessionStorage.getItem('maoo_auth') === 'active') {
        window.location.replace('system/Maoo%20sys.html');
        return;
    }

    /* ---- password show / hide ---- */
    if (toggleBtn && passInput) {
        toggleBtn.addEventListener('click', function () {
            var show = passInput.type === 'password';
            passInput.type = show ? 'text' : 'password';
            // swap icon: open-eye ↔ slashed-eye
            eyeIcon.innerHTML = show
                ? '<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>'
                : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
        });
    }

    /* ---- form submit ---- */
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            hideError();

            var u = (userInput.value || '').trim();
            var p = passInput.value || '';

            if (!u || !p) { showError('請填寫所有欄位 Please fill in all fields'); return; }

            setLoading(true);

            // small delay for UX feedback
            setTimeout(function () {
                if (u === _u && p === _p) {
                    sessionStorage.setItem('maoo_auth', 'active');
                    sessionStorage.setItem('maoo_ts', Date.now().toString());
                    window.location.href = 'system/Maoo%20sys.html';
                } else {
                    setLoading(false);
                    showError('帳號或密碼錯誤 Invalid username or password');
                    passInput.value = '';
                    passInput.focus();
                }
            }, 550);
        });
    }

    /* ---- helpers ---- */
    function showError(msg) {
        errorText.textContent = msg;
        errorBox.classList.add('visible');
    }
    function hideError() {
        errorBox.classList.remove('visible');
    }
    function setLoading(on) {
        submitBtn.disabled = on;
        btnLabel.innerHTML = on
            ? '<span class="spinner"></span>'
            : '登入 Login';
    }

})();
