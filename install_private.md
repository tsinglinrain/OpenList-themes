# OpenList 主题安装指南

## 安装方式

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
    DOMAIN: 'soyet.icu',
    DAY_BG: 'https://tsinglin.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5eda9ae8-c691-4271-8f88-0c57fcfb9dc2%2FF84B435A-C598-4A1E-A337-59AC124F9B14.jpeg?table=block&id=e35ff004-a6ba-4905-b73e-86991c7d35ca&spaceId=adc8bfab-c051-446a-957c-9cd49088f87e&width=1440&userId=&cache=v2',
    NIGHT_BG: 'https://tsinglin.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5eda9ae8-c691-4271-8f88-0c57fcfb9dc2%2FF84B435A-C598-4A1E-A337-59AC124F9B14.jpeg?table=block&id=e35ff004-a6ba-4905-b73e-86991c7d35ca&spaceId=adc8bfab-c051-446a-957c-9cd49088f87e&width=1440&userId=&cache=v2',
    GA_ID: 'G-XXXXXXXXXX',
    EMAIL: 'yesterdayhanqiong@outlook.com',
    BLOG_URL: 'https://baihe.zone.id',
    CLOUD_URL: 'https://soyet.icu',
    MUSIC_SERVER: 'netease',
    PLAYLIST_ID: '697173945',
    GISCUS_REPO: 'tsinglinrain/notionext_comment',
    GISCUS_REPO_ID: 'R_kgDOJHNMGA',
    GISCUS_CATEGORY: 'Announcements',
    GISCUS_CATEGORY_ID: 'DIC_kwDOJHNMGM4CUvzD',
    DEFAULT_QUOTE: '一言',
    QUOTE_AUTHOR: 'Tsing',
    ICP_RECORD: '萌 ICP备201902522023号'
};

// 加载主题头部
fetch('https://cdn.jsdelivr.net/gh/tsinglinrain/OpenList-themes@main/themes/header.html')
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
fetch('https://cdn.jsdelivr.net/gh/tsinglinrain/OpenList-themes@main/themes/content.html')
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
A: 检查 Giscus 配置是否正确，仓库是否为公开状态。

### Q: 统计代码不生效？
A: 确认统计代码 ID 正确，部分统计服务需要等待一段时间才能看到数据。

## 支持

如有问题，请在 GitHub 上提交 Issue。
