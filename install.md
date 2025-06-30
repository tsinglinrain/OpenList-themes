# OpenList 主题安装指南

## 安装方式

### 📋 可用文件说明

| 文件名 | 用途 | 推荐使用场景 |
|--------|------|-------------|
| `content.html` | 主要内容文件，包含延迟加载机制 | 正常使用，功能完整 |
| `content-simple.html` | 简化版本，无延迟加载 | 调试时使用，排除延迟加载问题 |
| `content-debug.html` | 诊断版本，包含详细日志 | 故障排查，查看详细执行过程 |
| `content-enhanced-debug.html` | 增强诊断版本，实时日志 | 深度故障排查，实时监控组件状态 |
| `content-test-locator.html` | 问题定位器，超简化测试 | 基础环境检测，定位根本问题 |

### 方式一：手动复制（简单）

1. 打开 OpenList 后台管理界面
2. 进入"设置" -> "全局设置"
3. 找到"自定义头部"和"自定义内容"选项
4. 将对应的代码复制粘贴进去

**自定义头部：** 复制 `themes/header.html` 的内容  
**自定义内容：** 复制 `themes/content.html` 的内容

### 方式二：CDN 引用（推荐）

#### 1. 准备工作
- 将此项目 Fork 到你的 GitHub 账户
- 修改配置参数

#### 2. 在 OpenList 后台添加以下代码

**自定义头部添加：**
```html
<script>
// 你的配置参数
const themeConfig = {
    DOMAIN: 'your-domain.com',
    DAY_BG: 'https://your-bg-image-day.jpg',
    NIGHT_BG: 'https://your-bg-image-night.jpg',
    GA_ID: 'G-XXXXXXXXXX',
    EMAIL: 'your-email@example.com',
    BLOG_URL: 'https://your-blog.com',
    CLOUD_URL: 'https://your-cloud.com',
    MUSIC_SERVER: 'netease',
    PLAYLIST_ID: '697173945',
    GISCUS_REPO: 'your-username/your-comments-repo',
    GISCUS_REPO_ID: 'R_kgDOxxxxxxx',
    GISCUS_CATEGORY: 'Announcements',
    GISCUS_CATEGORY_ID: 'DIC_kwDOxxxxxxx',
    DEFAULT_QUOTE: '你的默认一言',
    QUOTE_AUTHOR: '作者名',
    ICP_RECORD: '你的备案号'
};

// 加载主题头部
fetch('https://cdn.jsdelivr.net/gh/your-username/OpenList-themes@main/themes/header.html')
  .then(r => r.text())
  .then(content => {
    Object.entries(themeConfig).forEach(([k, v]) => {
      content = content.replaceAll(`{{${k}}}`, v);
    });
    document.head.insertAdjacentHTML('beforeend', content);
  });
</script>
```

**自定义内容添加：**
```html
<div id="openlist-theme"></div>
<script>
// 使用相同的配置加载内容
fetch('https://cdn.jsdelivr.net/gh/your-username/OpenList-themes@main/themes/content.html')
  .then(r => r.text())
  .then(content => {
    Object.entries(themeConfig).forEach(([k, v]) => {
      content = content.replaceAll(`{{${k}}}`, v);
    });
    document.getElementById('openlist-theme').innerHTML = content;
  });
</script>
```

## 配置说明

### 基础配置
- **DOMAIN**: 你的网站域名，用于防止被反代
- **EMAIL**: 联系邮箱
- **BLOG_URL**: 博客链接
- **CLOUD_URL**: 网盘链接

### 背景图片
- **DAY_BG**: 白天模式背景图片 URL
- **NIGHT_BG**: 夜间模式背景图片 URL

### 统计分析
- **GA_ID**: Google Analytics 追踪 ID
- **BAIDU_ANALYTICS**: 百度统计代码
- **BING_VERIFY**: Bing 站长工具验证码

### 评论系统配置
- **GISCUS_REPO**: Giscus 评论仓库名（格式：username/repo-name）
- **GISCUS_REPO_ID**: Giscus 仓库 ID
- **GISCUS_CATEGORY**: Giscus 讨论分类名称
- **GISCUS_CATEGORY_ID**: Giscus 分类 ID

### 音乐播放器
- **MUSIC_SERVER**: 音乐服务提供商（netease/qq/kugou）
- **PLAYLIST_ID**: 播放列表 ID

### 其他
- **DEFAULT_QUOTE**: 默认显示的一言
- **QUOTE_AUTHOR**: 一言作者
- **ICP_RECORD**: 网站备案信息

## 获取配置参数

### 1. Google Analytics
1. 访问 [Google Analytics](https://analytics.google.com/)
2. 创建账户和属性
3. 获取测量 ID（格式：G-XXXXXXXXXX）

### 2. 百度统计
1. 访问 [百度统计](https://tongji.baidu.com/)
2. 注册并添加网站
3. 获取统计代码中的 ID

### 3. 音乐播放列表 ID
**网易云音乐：**
1. 打开网易云音乐网页版
2. 找到你要的歌单
3. URL 中的数字就是歌单 ID
   如：`https://music.163.com/#/playlist?id=697173945`

### 4. Giscus 评论系统
1. **创建评论仓库**：
   - 在 GitHub 创建一个**公开仓库**用于存储评论
   - 进入仓库设置（Settings），启用 "Discussions" 功能

2. **获取配置信息**：
   - 访问 [Giscus 官网](https://giscus.app/zh-CN)
   - 输入仓库名（格式：`username/repo-name`）
   - 选择页面映射方式（推荐 "pathname"）
   - 选择讨论分类（推荐 "Announcements"）

3. **复制配置参数**：
   - `data-repo` → `GISCUS_REPO`
   - `data-repo-id` → `GISCUS_REPO_ID`
   - `data-category` → `GISCUS_CATEGORY`
   - `data-category-id` → `GISCUS_CATEGORY_ID`

## 常见问题

### Q: 背景图片不显示？
A: 检查图片 URL 是否有效，建议使用 HTTPS 协议的图片链接。

### Q: 音乐播放器无法播放？
A: 确认播放列表 ID 正确，且播放列表为公开状态。

### Q: 评论系统不显示？
A: 检查 Giscus 配置参数是否正确，仓库是否开启了 Discussions 功能。

## 🔧 故障排查指南

### 1. 问题定位步骤

如果主题不能正常显示，请按以下顺序进行排查：

1. **使用问题定位器**：
   - 将 `content-test-locator.html` 的内容复制到 OpenList 后台
   - 查看问题定位器显示的基础环境检测结果
   - 检查是否有 JavaScript 错误

2. **检查浏览器控制台**：
   - 按 F12 打开开发者工具
   - 查看 Console 标签页是否有错误信息
   - 查看 Network 标签页资源加载情况

3. **使用诊断版本**：
   - 使用 `content-debug.html` 或 `content-enhanced-debug.html`
   - 查看详细的加载日志和状态信息

### 2. 常见问题及解决方案

**问题：页面显示"🔄 检查..."一直不变**
- 原因：JavaScript 脚本未能正常执行
- 解决：
  1. 检查浏览器控制台是否有错误
  2. 尝试使用 `content-simple.html`（无延迟加载）
  3. 确认 OpenList 平台是否有 CSP 限制

**问题：依赖资源加载失败**
- 原因：CDN 链接不可访问或被拦截
- 解决：
  1. 检查网络连接
  2. 尝试更换 CDN 源
  3. 检查防火墙/广告拦截器设置

**问题：变量未替换显示为 {{VAR}}**
- 原因：配置脚本未正确执行变量替换
- 解决：
  1. 检查 themeConfig 配置是否正确
  2. 确认加载脚本的顺序
  3. 使用浏览器控制台手动测试变量替换

**问题：音乐播放器不显示**
- 原因：APlayer 或 MetingJS 依赖未加载
- 解决：
  1. 检查 CDN 链接是否可访问
  2. 确认播放列表 ID 和服务器配置正确
  3. 查看控制台是否有 CORS 错误

**问题：评论系统不显示**
- 原因：Giscus 配置错误或仓库权限问题
- 解决：
  1. 验证 Giscus 配置参数
  2. 确认 GitHub 仓库开启了 Discussions
  3. 检查仓库权限设置

### 3. 获取技术支持

如果按照上述步骤仍无法解决问题，请提供以下信息：

1. **浏览器信息**：浏览器类型和版本
2. **错误截图**：包含浏览器控制台错误信息
3. **配置信息**：使用的配置参数（隐藏敏感信息）
4. **问题定位器结果**：`content-test-locator.html` 的显示结果
5. **网站链接**：便于直接检查问题

## 📱 移动端适配

主题已经针对移动端进行了优化：
- 响应式布局设计
- 触摸友好的交互元素
- 优化的加载性能
- 移动端专用的音乐播放器控制
