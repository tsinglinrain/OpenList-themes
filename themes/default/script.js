// OpenList Theme JavaScript

(function() {
    'use strict';

    // 延迟加载自定义内容
    function initCustomContent() {
        let interval = setInterval(() => {
            if (document.querySelector(".footer")) {
                const customizeDiv = document.querySelector("#customize");
                if (customizeDiv) {
                    customizeDiv.style.display = "";
                }
                clearInterval(interval);
            }
        }, 200);

        // 5秒后强制显示，避免无限等待
        setTimeout(() => {
            const customizeDiv = document.querySelector("#customize");
            if (customizeDiv) {
                customizeDiv.style.display = "";
            }
            clearInterval(interval);
        }, 5000);
    }

    // 移除音乐播放器歌词功能
    function removeLyrics() {
        // 检测是否存在歌词按钮
        if (!document.querySelector(".aplayer-icon-lrc")) {
            return;
        } else {
            // 触发以后立刻移除监听
            document.removeEventListener("DOMNodeInserted", removeLyrics);
            // 稍作延时保证触发函数时存在按钮
            setTimeout(function () {
                // 以触发按钮的方式隐藏歌词，防止在点击显示歌词按钮时需要点击两次才能出现的问题
                const lrcButton = document.querySelector(".aplayer-icon-lrc");
                if (lrcButton) {
                    lrcButton.click();
                }
            }, 1);
            console.log("Lyrics hidden successfully");
            return;
        }
    }

    // 加载一言API
    function loadHitokoto() {
        // 创建script元素加载一言API
        const script = document.createElement('script');
        script.src = 'https://v1.hitokoto.cn/?encode=js&select=%23hitokoto';
        script.defer = true;
        document.head.appendChild(script);
    }

    // 初始化主题功能
    function initTheme() {
        // 初始化自定义内容
        initCustomContent();
        
        // 设置音乐播放器事件监听
        document.addEventListener('DOMNodeInserted', removeLyrics);
        
        // 加载一言
        loadHitokoto();
        
        // 添加平滑滚动
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    // 工具函数：检测暗色模式
    function isDarkMode() {
        return document.documentElement.classList.contains('hope-ui-dark') ||
               document.body.classList.contains('hope-ui-dark');
    }

    // 主题切换监听
    function observeThemeChange() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    // 主题切换时的处理逻辑
                    console.log('Theme changed:', isDarkMode() ? 'dark' : 'light');
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    // 添加键盘快捷键支持
    function addKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + K 快速搜索（如果有搜索功能）
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('input[type="search"]');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // ESC 键关闭模态框
            if (e.key === 'Escape') {
                const modals = document.querySelectorAll('.modal, .dialog');
                modals.forEach(modal => {
                    if (modal.style.display !== 'none') {
                        modal.style.display = 'none';
                    }
                });
            }
        });
    }

    // 添加加载动画
    function addLoadingAnimation() {
        const style = document.createElement('style');
        style.textContent = `
            .loading-placeholder {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100px;
                font-size: 14px;
                color: #666;
            }
            
            .loading-placeholder::after {
                content: '';
                width: 20px;
                height: 20px;
                border: 2px solid #409EFF;
                border-top: 2px solid transparent;
                border-radius: 50%;
                margin-left: 10px;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // 错误处理
    function handleErrors() {
        window.addEventListener('error', function(e) {
            console.warn('Theme script error:', e.error);
        });

        window.addEventListener('unhandledrejection', function(e) {
            console.warn('Theme script promise rejection:', e.reason);
        });
    }

    // 主初始化函数
    function init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        try {
            initTheme();
            observeThemeChange();
            addKeyboardShortcuts();
            addLoadingAnimation();
            handleErrors();
            
            console.log('OpenList theme initialized successfully');
        } catch (error) {
            console.error('Failed to initialize OpenList theme:', error);
        }
    }

    // 启动初始化
    init();

    // 导出一些有用的函数到全局（可选）
    window.OpenListTheme = {
        isDarkMode: isDarkMode,
        version: '1.0.0'
    };

})();