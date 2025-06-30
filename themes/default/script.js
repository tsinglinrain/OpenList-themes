// OpenList Theme JavaScript

(function() {
    'use strict';

    // 延迟加载自定义内容
    function initCustomContent() {
        let interval = setInterval(() => {
            if (document.querySelector(".footer") || document.querySelector("#mount")) {
                const customizeDiv = document.querySelector("#customize");
                if (customizeDiv) {
                    customizeDiv.style.display = "";
                    
                    // 初始化音乐播放器
                    setTimeout(() => {
                        initMusicPlayer();
                    }, 500);
                    
                    // 初始化评论系统
                    setTimeout(() => {
                        initGiscus();
                    }, 1000);
                }
                clearInterval(interval);
            }
        }, 200);

        // 5秒后强制显示，避免无限等待
        setTimeout(() => {
            const customizeDiv = document.querySelector("#customize");
            if (customizeDiv) {
                customizeDiv.style.display = "";
                initMusicPlayer();
                initGiscus();
            }
            clearInterval(interval);
        }, 5000);
    }

    // 初始化音乐播放器
    function initMusicPlayer() {
        const metingJs = document.querySelector('meting-js');
        if (metingJs && typeof MetingJSElement !== 'undefined') {
            // 确保音乐播放器正确渲染
            metingJs.style.display = 'block';
            metingJs.style.position = 'fixed';
            metingJs.style.bottom = '0';
            metingJs.style.left = '0';
            metingJs.style.zIndex = '9999';
            
            // 重新触发MetingJS初始化
            if (metingJs.aplayer) {
                metingJs.aplayer.destroy();
            }
            setTimeout(() => {
                if (window.APlayer && window.MetingJSElement) {
                    new window.MetingJSElement();
                }
            }, 100);
        }
    }

    // 初始化Giscus评论系统
    function initGiscus() {
        const giscusContainer = document.querySelector('#giscus');
        if (giscusContainer && !giscusContainer.querySelector('iframe')) {
            // 检查是否已经有giscus脚本
            const existingScript = document.querySelector('script[src*="giscus.app"]');
            if (existingScript) {
                // 重新配置giscus
                const script = document.createElement('script');
                script.src = 'https://giscus.app/client.js';
                script.setAttribute('data-repo', 'tsinglinrain/notionext_comment');
                script.setAttribute('data-repo-id', 'R_kgDOJHNMGA');
                script.setAttribute('data-category', 'Announcements');
                script.setAttribute('data-category-id', 'DIC_kwDOJHNMGM4CUvzD');
                script.setAttribute('data-mapping', 'pathname');
                script.setAttribute('data-strict', '0');
                script.setAttribute('data-reactions-enabled', '1');
                script.setAttribute('data-emit-metadata', '0');
                script.setAttribute('data-input-position', 'bottom');
                script.setAttribute('data-theme', 'preferred_color_scheme');
                script.setAttribute('data-lang', 'zh-CN');
                script.setAttribute('crossorigin', 'anonymous');
                script.async = true;
                
                giscusContainer.appendChild(script);
            }
        }
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