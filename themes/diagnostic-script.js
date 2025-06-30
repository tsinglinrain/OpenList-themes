// OpenList 主题快速诊断脚本
// 在浏览器控制台中运行此脚本来快速检查主题状态

(function() {
  'use strict';
  
  console.clear();
  console.log('%c🔧 OpenList 主题快速诊断', 'font-size: 18px; font-weight: bold; color: #4169e1;');
  console.log('='.repeat(50));
  
  const results = {
    environment: {},
    dependencies: {},
    elements: {},
    errors: []
  };
  
  // 检查环境信息
  function checkEnvironment() {
    console.log('%c📊 环境检查', 'font-size: 14px; font-weight: bold; color: #28a745;');
    
    results.environment = {
      userAgent: navigator.userAgent,
      url: window.location.href,
      domain: window.location.hostname,
      protocol: window.location.protocol,
      readyState: document.readyState,
      loadTime: performance.now()
    };
    
    Object.entries(results.environment).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });
    console.log('');
  }
  
  // 检查依赖库
  function checkDependencies() {
    console.log('%c📦 依赖检查', 'font-size: 14px; font-weight: bold; color: #17a2b8;');
    
    const deps = [
      {name: 'jQuery', check: () => window.jQuery || window.$},
      {name: 'APlayer', check: () => window.APlayer},
      {name: 'MetingJS', check: () => window.MetingJSPlugin || window.meting},
      {name: 'Giscus', check: () => document.querySelector('.giscus') || document.querySelector('[data-giscus]')}
    ];
    
    deps.forEach(({name, check}) => {
      const available = check();
      results.dependencies[name] = !!available;
      const status = available ? '✅' : '❌';
      const color = available ? 'color: #28a745' : 'color: #dc3545';
      console.log(`%c  ${status} ${name}`, color);
      
      if (available && typeof available === 'object') {
        console.log(`    类型: ${typeof available}`, available);
      }
    });
    console.log('');
  }
  
  // 检查关键元素
  function checkElements() {
    console.log('%c🎯 元素检查', 'font-size: 14px; font-weight: bold; color: #fd7e14;');
    
    const elements = [
      'openlist-theme-container',
      'enhanced-status-display',
      'debug-log-container',
      'test-results',
      'meting-player-container',
      'giscus-container'
    ];
    
    elements.forEach(id => {
      const element = document.getElementById(id);
      results.elements[id] = !!element;
      const status = element ? '✅' : '❌';
      const color = element ? 'color: #28a745' : 'color: #dc3545';
      console.log(`%c  ${status} #${id}`, color);
      
      if (element) {
        console.log(`    内容: ${element.textContent ? element.textContent.substring(0, 50) + '...' : '(空)'}`);
      }
    });
    console.log('');
  }
  
  // 检查网络请求
  function checkNetworkResources() {
    console.log('%c🌐 网络资源检查', 'font-size: 14px; font-weight: bold; color: #6f42c1;');
    
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const links = Array.from(document.querySelectorAll('link[href]'));
    
    console.log(`  脚本文件: ${scripts.length} 个`);
    scripts.forEach(script => {
      console.log(`    📜 ${script.src}`);
    });
    
    console.log(`  样式文件: ${links.length} 个`);
    links.forEach(link => {
      if (link.rel === 'stylesheet') {
        console.log(`    🎨 ${link.href}`);
      }
    });
    console.log('');
  }
  
  // 检查变量替换
  function checkVariableReplacement() {
    console.log('%c🔧 变量替换检查', 'font-size: 14px; font-weight: bold; color: #e83e8c;');
    
    const pageContent = document.body.innerHTML;
    const unreplacedVars = pageContent.match(/\{\{[A-Z_]+\}\}/g) || [];
    
    if (unreplacedVars.length > 0) {
      console.log('%c  ❌ 发现未替换的变量:', 'color: #dc3545');
      const uniqueVars = [...new Set(unreplacedVars)];
      uniqueVars.forEach(v => console.log(`    ${v}`));
    } else {
      console.log('%c  ✅ 所有变量已正确替换', 'color: #28a745');
    }
    console.log('');
  }
  
  // 测试关键功能
  function testFunctionality() {
    console.log('%c⚡ 功能测试', 'font-size: 14px; font-weight: bold; color: #20c997;');
    
    // 测试音乐播放器
    const metingElements = document.querySelectorAll('meting-js, .aplayer');
    console.log(`  音乐播放器元素: ${metingElements.length} 个`);
    
    // 测试评论系统
    const giscusElements = document.querySelectorAll('.giscus, [data-giscus]');
    console.log(`  评论系统元素: ${giscusElements.length} 个`);
    
    console.log('');
  }
  
  // 生成诊断报告
  function generateReport() {
    console.log('%c📋 诊断报告', 'font-size: 16px; font-weight: bold; color: #6c757d;');
    console.log('='.repeat(50));
    
    const totalDeps = Object.keys(results.dependencies).length;
    const loadedDeps = Object.values(results.dependencies).filter(Boolean).length;
    
    const totalElements = Object.keys(results.elements).length;
    const foundElements = Object.values(results.elements).filter(Boolean).length;
    
    console.log(`依赖加载: ${loadedDeps}/${totalDeps} (${Math.round(loadedDeps/totalDeps*100)}%)`);
    console.log(`元素检测: ${foundElements}/${totalElements} (${Math.round(foundElements/totalElements*100)}%)`);
    console.log(`页面状态: ${results.environment.readyState}`);
    console.log(`加载时间: ${Math.round(results.environment.loadTime)}ms`);
    
    if (loadedDeps === totalDeps && foundElements > totalElements * 0.5) {
      console.log('%c✅ 主题状态良好', 'color: #28a745; font-weight: bold;');
    } else if (loadedDeps > 0 || foundElements > 0) {
      console.log('%c⚠️ 主题部分功能异常', 'color: #ffc107; font-weight: bold;');
    } else {
      console.log('%c❌ 主题严重异常', 'color: #dc3545; font-weight: bold;');
    }
    
    console.log('\n复制以下信息以获取技术支持:');
    console.log(JSON.stringify(results, null, 2));
  }
  
  // 执行所有检查
  checkEnvironment();
  checkDependencies();
  checkElements();
  checkNetworkResources();
  checkVariableReplacement();
  testFunctionality();
  generateReport();
  
  // 导出到全局变量
  window.openlistDiagnostics = results;
  console.log('\n诊断结果已保存到 window.openlistDiagnostics');
  
})();

// 额外的手动测试函数
window.testOpenListTheme = function() {
  console.log('🧪 手动测试主题功能...');
  
  // 尝试手动加载依赖
  const deps = [
    'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js',
    'https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js'
  ];
  
  deps.forEach(url => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => console.log(`✅ 成功加载: ${url}`);
    script.onerror = () => console.log(`❌ 加载失败: ${url}`);
    document.head.appendChild(script);
  });
  
  console.log('依赖加载测试已启动，请查看上方结果');
};

console.log('\n💡 提示: 运行 testOpenListTheme() 进行手动依赖测试');
