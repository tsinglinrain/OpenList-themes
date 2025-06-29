// OpenList Theme Auto Configuration Script
// 用于简化自定义头部和内容的配置

// 默认配置参数
const themeConfig = {
    // 域名设置
    DOMAIN: 'your-domain.com',
    
    // 背景图片
    DAY_BG: 'https://your-image-url/day-bg.jpg',
    NIGHT_BG: 'https://your-image-url/night-bg.jpg',
    
    // 统计代码
    GA_ID: 'G-XXXXXXXXXX',
    BAIDU_ANALYTICS: 'your-baidu-code',
    BING_VERIFY: 'your-bing-verify-code',
    
    // Giscus 评论系统配置
    GISCUS_REPO: 'your-username/your-comments-repo',
    GISCUS_REPO_ID: 'R_kgDOxxxxxxx',
    GISCUS_CATEGORY: 'Announcements',
    GISCUS_CATEGORY_ID: 'DIC_kwDOxxxxxxx',
    
    // 音乐播放器
    MUSIC_SERVER: 'netease',
    PLAYLIST_ID: '697173945',
    
    // 个人信息
    EMAIL: 'your-email@example.com',
    BLOG_URL: 'https://your-blog.com',
    CLOUD_URL: 'https://your-cloud.com',
    
    // 引用设置
    DEFAULT_QUOTE: '我等的人他在多远的未来.',
    QUOTE_AUTHOR: '遇见',
    
    // 备案信息
    ICP_RECORD: '萌 ICP备201902522023号'
};

// 获取主题文件并替换变量的函数
function getThemeContent(url, config = themeConfig) {
    return fetch(url)
        .then(response => response.text())
        .then(content => {
            // 替换所有变量
            let processedContent = content;
            for (const [key, value] of Object.entries(config)) {
                const placeholder = `{{${key}}}`;
                processedContent = processedContent.replaceAll(placeholder, value);
            }
            return processedContent;
        });
}

// 使用示例
// const headerContent = await getThemeContent('https://raw.githubusercontent.com/your-username/OpenList-themes/main/themes/header.html');
// const contentHtml = await getThemeContent('https://raw.githubusercontent.com/your-username/OpenList-themes/main/themes/content.html');
