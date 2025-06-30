# OpenList 主题安装指南

这是一个美观的 OpenList 自定义主题，提供了背景图片、透明效果、音乐播放器、评论系统等功能。

## 🎨 主题特性

- 🌅 **背景图片**：支持日夜模式自动切换背景
- 💫 **透明效果**：各个组件支持透明度设置
- 🎵 **音乐播放器**：集成网易云音乐播放器
- 💬 **评论系统**：基于 Giscus 的评论功能  
- 📊 **访问统计**：不蒜子访问量统计
- 📱 **响应式设计**：支持移动端和桌面端
- ⌨️ **快捷键支持**：提供便捷的键盘操作

## 🚀 快速安装

### 方法一：一键安装（推荐）

在 OpenList 管理后台的**自定义头部**区域添加以下代码：

```html
<!-- OpenList主题一键安装 -->
<script>
(function() {
    const THEME_BASE = 'https://cdn.jsdelivr.net/gh/tsinglinrain/openlist-themes@main/themes/default';
    
    // 加载CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = THEME_BASE + '/style.css';
    document.head.appendChild(link);
    
    // 加载JS
    const script = document.createElement('script');
    script.src = THEME_BASE + '/script.js';
    document.head.appendChild(script);
    
    // 加载头部内容
    fetch(THEME_BASE + '/header.html')
        .then(response => response.text())
        .then(html => document.head.insertAdjacentHTML('beforeend', html));
        
    // 加载自定义内容
    document.addEventListener('DOMContentLoaded', function() {
        fetch(THEME_BASE + '/content.html')
            .then(response => response.text())
            .then(html => {
                const container = document.createElement('div');
                container.innerHTML = html;
                document.body.appendChild(container);
                
                // 确保自定义内容正确显示
                setTimeout(() => {
                    const customizeDiv = document.querySelector('#customize');
                    if (customizeDiv) {
                        customizeDiv.style.display = 'block';
                    }
                }, 1000);
            });
    });
})();
            });
    });
})();
</script>
```

在**自定义内容**区域添加：

```html
<!-- 主题内容将自动加载 -->
<div id="openlist-theme-content"></div>
```

### 方法二：分步安装

#### 1. 头部区域

将 `header.html` 的内容复制到 OpenList 管理后台的**自定义头部**区域。

#### 2. 样式文件

将 `style.css` 的内容包装在 `<style>` 标签中，添加到头部区域：

```html
<style>
/* 这里粘贴 style.css 的内容 */
</style>
```

#### 3. 脚本文件

将 `script.js` 的内容包装在 `<script>` 标签中，添加到头部区域：

```html
<script>
/* 这里粘贴 script.js 的内容 */
</script>
```

#### 4. 内容区域

将 `content.html` 的内容复制到**自定义内容**区域。

## ⚙️ 个性化配置

### 修改背景图片

在 `style.css` 中找到以下代码并替换图片链接：

```css
.hope-ui-light {
    background-image: url("你的图片链接") !important;
}

.hope-ui-dark {
    background-image: url("你的夜间图片链接") !important;
}
```

### 修改音乐播放列表

在 `content.html` 中找到音乐播放器配置：

```html
<meting-js 
    server="netease"     <!-- 音乐平台：netease/qq/xiami/kugou -->
    type="playlist"      <!-- 类型：song/playlist/album/artist -->
    id="你的播放列表ID"   <!-- 对应的ID -->
    fixed="true">
</meting-js>
```

### 修改评论系统

在 `header.html` 中找到 Giscus 配置并修改为你的仓库信息：