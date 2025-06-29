# OpenList 主题模板
,
一个用于 OpenList 的美化主题模板，支持音乐播放器、评论系统、统计功能等。

## 功能特性

- 🎵 **音乐播放器** - 基于 MetingJS 的网易云音乐播放器
- 💬 **评论系统** - 集成 Giscus 评论系统
- 📊 **访问统计** - 支持不蒜子、百度统计、Google Analytics
- 🌙 **主题切换** - 支持白天/夜间模式背景
- 📱 **响应式设计** - 适配各种设备屏幕
- 🎨 **透明美化** - 各组件透明化效果

## 快速使用

### 方法1：直接复制使用

1. 复制 `themes/header.html` 的内容到 OpenList 后台的"自定义头部"
2. 复制 `themes/content.html` 的内容到 OpenList 后台的"自定义内容"
3. 根据需要修改其中的个人信息（邮箱、博客链接等）

### 方法2：使用 CDN 链接（推荐）

将本项目上传到 GitHub 后，可以通过 CDN 直接引用：

**自定义头部：**
```html
<script>
// 配置参数
const config = {
    DOMAIN: 'your-domain.com',
    DAY_BG: 'https://your-image-url/day-bg.jpg',
    NIGHT_BG: 'https://your-image-url/night-bg.jpg',
    GA_ID: 'G-XXXXXXXXXX',
    BAIDU_ANALYTICS: 'your-baidu-code',
    EMAIL: 'your-email@example.com',
    BLOG_URL: 'https://your-blog.com',
    // ... 其他配置
};

// 动态加载主题头部
fetch('https://cdn.jsdelivr.net/gh/your-username/OpenList-themes@main/themes/header.html')
  .then(response => response.text())
  .then(content => {
    // 替换变量
    for (const [key, value] of Object.entries(config)) {
      content = content.replaceAll(`{{${key}}}`, value);
    }
    document.head.insertAdjacentHTML('beforeend', content);
  });
</script>
```

**自定义内容：**
```html
<div id="theme-content"></div>
<script>
// 动态加载主题内容
fetch('https://cdn.jsdelivr.net/gh/your-username/OpenList-themes@main/themes/content.html')
  .then(response => response.text())
  .then(content => {
    // 替换变量（使用相同的 config）
    for (const [key, value] of Object.entries(config)) {
      content = content.replaceAll(`{{${key}}}`, value);
    }
    document.getElementById('theme-content').innerHTML = content;
  });
</script>
```

## 配置参数说明

| 参数 | 说明 | 示例 |
|------|------|------|
| `DOMAIN` | 你的域名（防反代） | `your-domain.com` |
| `DAY_BG` | 白天模式背景图 | `https://example.com/day.jpg` |
| `NIGHT_BG` | 夜间模式背景图 | `https://example.com/night.jpg` |
| `GA_ID` | Google Analytics ID | `G-XXXXXXXXXX` |
| `BAIDU_ANALYTICS` | 百度统计代码 | `your-baidu-code` |
| `BING_VERIFY` | Bing 站长验证 | `your-bing-verify-code` |
| `GISCUS_REPO` | Giscus 评论仓库 | `username/repo-name` |
| `GISCUS_REPO_ID` | Giscus 仓库 ID | `R_kgDOxxxxxxx` |
| `GISCUS_CATEGORY` | Giscus 分类名称 | `Announcements` |
| `GISCUS_CATEGORY_ID` | Giscus 分类 ID | `DIC_kwDOxxxxxxx` |
| `MUSIC_SERVER` | 音乐服务商 | `netease`/`qq`/`kugou` |
| `PLAYLIST_ID` | 播放列表 ID | `697173945` |
| `EMAIL` | 联系邮箱 | `your-email@example.com` |
| `BLOG_URL` | 博客链接 | `https://your-blog.com` |
| `CLOUD_URL` | 云盘链接 | `https://your-cloud.com` |
| `DEFAULT_QUOTE` | 默认一言 | `我等的人他在多远的未来.` |
| `QUOTE_AUTHOR` | 一言作者 | `遇见` |
| `ICP_RECORD` | 备案信息 | `萌 ICP备201902522023号` |

## 自定义修改

### 修改音乐播放器

修改 `MUSIC_SERVER` 和 `PLAYLIST_ID` 参数：

```javascript
MUSIC_SERVER: 'netease',  // 网易云音乐
PLAYLIST_ID: '697173945'  // 你的播放列表 ID
```

### 修改评论系统

在 `header.html` 中找到 Giscus 配置，修改为你的仓库信息：

```javascript
GISCUS_REPO: "your-username/your-repo",
GISCUS_REPO_ID: "your-repo-id", 
GISCUS_CATEGORY: "Announcements",
GISCUS_CATEGORY_ID: "your-category-id"
```

**获取 Giscus 配置的步骤：**

1. 在 GitHub 创建一个**公开仓库**用于存储评论
2. 启用该仓库的 Discussions 功能：
   - 进入仓库设置（Settings）
   - 勾选 "Discussions" 选项
3. 访问 [Giscus 官网](https://giscus.app/zh-CN)
4. 输入你的仓库名（格式：`username/repo-name`）
5. 选择页面 ↔️ discussion 映射关系（推荐选择 "pathname"）
6. 选择 Discussion 分类（推荐 "Announcements"）
7. 复制生成的配置信息中的相关 ID

### 修改背景图片

替换 `DAY_BG` 和 `NIGHT_BG` 为你的图片链接。

## 目录结构

```
├── draft/           # 草稿文件夹
│   ├── header.html  # 原始头部代码
│   └── content.html # 原始内容代码
├── themes/          # 主题模板文件夹
│   ├── header.html  # 模板化的头部代码
│   ├── content.html # 模板化的内容代码
│   ├── script.js    # 辅助脚本
│   └── style.css    # 额外样式
└── README.md        # 说明文档
```

## 注意事项

1. **Giscus 评论系统**需要你在 GitHub 创建一个公开仓库用于存储评论
2. **音乐播放器**需要有效的播放列表 ID
3. **统计代码**需要先在对应平台注册获取
4. **背景图片**建议使用 CDN 加速的链接

## 更新日志

- **v1.0.0** - 初始版本，支持基础美化功能
- **v1.1.0** - 添加变量模板化支持
- **v1.2.0** - 优化 CDN 使用方式

## 常见问题与调试

### Q: 背景图片显示正常，但音乐播放器、评论等内容不显示？

**可能原因和解决方案：**

1. **使用测试版本调试**：
   ```html
   <!-- 先使用测试版本确认问题 -->
   fetch('https://cdn.jsdelivr.net/gh/your-username/OpenList-themes@main/themes/content-test.html')
   ```
   
   **测试完成后切换回正式版本**：
   ```html
   <!-- 确认功能正常后，改回正式版本 -->
   fetch('https://cdn.jsdelivr.net/gh/your-username/OpenList-themes@main/themes/content.html')
   ```

2. **检查浏览器控制台**：
   - 按 F12 打开开发者工具
   - 查看 Console 选项卡中的错误信息
   - 查找 "OpenList主题内容已显示" 的日志

3. **检查变量替换**：
   确保所有 `{{变量名}}` 都被正确替换，没有遗漏的大括号

4. **检查依赖资源**：
   - APlayer 和 MetingJS 是否正确加载
   - 网络是否能访问 CDN 资源

**调试用配置示例：**
```javascript
const debugConfig = {
    DOMAIN: 'your-domain.com',
    MUSIC_SERVER: 'netease',
    PLAYLIST_ID: '697173945',
    EMAIL: 'test@example.com',
    BLOG_URL: 'https://example.com',
    CLOUD_URL: 'https://example.com',
    DEFAULT_QUOTE: '测试一言',
    QUOTE_AUTHOR: '测试',
    ICP_RECORD: '测试备案号',
    // Giscus 配置
    GISCUS_REPO: 'your-username/your-repo',
    GISCUS_REPO_ID: 'R_kgDOxxxxxxx',
    GISCUS_CATEGORY: 'General',
    GISCUS_CATEGORY_ID: 'DIC_kwDOxxxxxxx'
};
```

### Q: 音乐播放器不显示？
A: 检查 `MUSIC_SERVER` 和 `PLAYLIST_ID` 是否正确，确认播放列表为公开状态。

### Q: 评论系统不显示？
A: 检查 Giscus 配置是否正确，仓库是否为公开状态并启用了 Discussions。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

Apache License 2.0