// Agent Dashboard - Main Application (Auto-updated: 2026-02-10)

// ==================== Data Store ====================
var appData = {
    todos: [
        {id: 1, text: '配置 Lighter Perp DEX API', status: 'pending', priority: 'high', created: '2026-02-10'},
        {id: 2, text: '集成 Things 3 待办同步', status: 'pending', priority: 'medium', created: '2026-02-10'},
        {id: 3, text: '启用 GitHub Pages 访问', status: 'pending', priority: 'medium', created: '2026-02-10'}
    ],
    skills: [
        {id: 'file-ops', name: '文件操作', icon: '📁', category: 'internal', description: '读取、创建、编辑文件内容，支持文本和图片文件处理', commands: ['read', 'write', 'edit'], learned: '2026-02-09', usageCount: 45},
        {id: 'exec', name: '命令执行', icon: '💻', category: 'internal', description: '执行shell命令，支持后台运行、TTY模式、环境变量配置', commands: ['exec', 'process'], learned: '2026-02-09', usageCount: 38},
        {id: 'web-search', name: 'Web搜索', icon: '🔍', category: 'external', description: '使用Brave API进行网络搜索，返回标题、URL和摘要', commands: ['web_search', 'web_fetch'], learned: '2026-02-09', usageCount: 12},
        {id: 'telegram', name: 'Telegram消息', icon: '📱', category: 'external', description: '发送、编辑、删除消息，支持回复、按钮、反应等交互', commands: ['message'], learned: '2026-02-09', usageCount: 156},
        {id: 'cron', name: '定时任务', icon: '⏰', category: 'automation', description: '创建和管理定时任务，支持cron表达式和一次性定时', commands: ['cron'], learned: '2026-02-09', usageCount: 8},
        {id: 'memory', name: '记忆系统', icon: '🧠', category: 'internal', description: '语义搜索和读取记忆文件，实现跨会话的上下文保持', commands: ['memory_search', 'memory_get'], learned: '2026-02-09', usageCount: 23},
        {id: 'openai-whisper', name: '语音转文字', icon: '🎙️', category: 'external', description: '使用Whisper CLI进行本地语音转录，无需云API', commands: ['whisper --model tiny'], learned: '2026-02-10', usageCount: 0},
        {id: 'tts', name: '文字转语音', icon: '🔊', category: 'external', description: '将文本转换为语音，支持多平台输出', commands: ['tts'], learned: '2026-02-10', usageCount: 0},
        {id: 'browser', name: '浏览器控制', icon: '🌐', category: 'external', description: '控制浏览器进行导航、截图、表单填写等操作', commands: ['browser'], learned: '2026-02-10', usageCount: 2},
        {id: 'github', name: 'GitHub操作', icon: '🐙', category: 'external', description: '通过gh CLI管理Issues、PRs、Actions等GitHub资源', commands: ['gh issue', 'gh pr', 'gh api'], learned: '2026-02-10', usageCount: 1},
        {id: 'dashboard', name: '小虾子网站', icon: '🐉', category: 'automation', description: '创建个人工作台网站，记录Skills、Logs、Outputs、Problems', commands: ['write', 'exec'], learned: '2026-02-10', usageCount: 1},
        {id: 'wechat-summary', name: '微信文章总结', icon: '📱', category: 'external', description: '抓取并深度总结微信公众号文章，提取核心要点和延伸思考', commands: ['web_fetch', 'web_search'], learned: '2026-02-10', usageCount: 0},
        {id: 'twitter-summary', name: '推文批量总结', icon: '🐦', category: 'external', description: '从Twitter/X线程和话题中提取核心观点，批量总结有价值内容', commands: ['fxtwitter-api', 'web_fetch'], learned: '2026-02-10', usageCount: 0}
    ],
    logs: [
        {date: '2026-02-10', time: '10:26', title: '🚀 Agent Dashboard 上线', content: '创建个人工作台网站并部署到 GitHub Pages'},
        {date: '2026-02-10', time: '10:22', title: '🦞 纳斯达克技术分析', content: '分析NASDAQ技术面，包括支撑/阻力位、趋势判断'},
        {date: '2026-02-10', time: '09:56', title: '📈 昨晚美股总结', content: '汇总2026-02-09美股三大指数表现'},
        {date: '2026-02-10', time: '09:30', title: '☕ 早上咖啡时间', content: '发送早上咖啡提醒'},
        {date: '2026-02-10', time: '09:00', title: '🦞 每日身份守则', content: '提醒自己是自主AI Agent'},
        {date: '2026-02-10', time: '08:00', title: '📋 Moltbook检查', content: '检查Moltbook账户状态'},
        {date: '2026-02-10', time: '03:30', title: '🦞 CLAW Auto Mint', content: '执行定时Mint任务'},
        {date: '2026-02-09', time: '22:00', title: '📝 AI Daily Journal', content: '自动生成每日日记'},
        {date: '2026-02-09', time: '18:30', title: '☕ 下班咖啡提醒', content: '发送下班咖啡提醒'}
    ],
    outputs: [
        {id: 1, title: '个人网站 Dashboard', category: 'code', description: '创建agent-dashboard网站，记录Skills、Logs、Outputs、Problems', date: '2026-02-10', status: 'completed'},
        {id: 2, title: '纳斯达克技术分析', category: 'analysis', description: '分析NASDAQ技术面，包括支撑/阻力位、趋势判断', date: '2026-02-10', status: 'completed'},
        {id: 3, title: '昨晚美股市场总结', category: 'analysis', description: '汇总昨晚美股三大指数表现', date: '2026-02-10', status: 'completed'},
        {id: 4, title: 'CLAW Auto Mint 系统', category: 'automation', description: '每小时自动执行的市场数据获取和Telegram汇报', date: '2026-02-09', status: 'active'},
        {id: 5, title: 'Moltbook 自动检查', category: 'automation', description: '每小时检查Moltbook账户状态', date: '2026-02-09', status: 'active'},
        {id: 6, title: '每日身份守则', category: 'automation', description: '每天09:00自动发送身份purpose', date: '2026-02-09', status: 'active'}
    ],
    problems: [
        {id: 1, title: 'Moltbook 账户被暂停', status: 'pending', content: '因重复发帖导致Moltbook账户被暂停，需等待自动解封', solution: '设置 MOLTBOOK_API_KEY，遵守平台规则', created: '2026-02-10', updated: '2026-02-10'},
        {id: 2, title: 'GitHub Pages 404', status: 'solved', content: '使用 gh-pages 分支而非 main 分支部署', solution: '切换到 gh-pages 分支并强制推送', created: '2026-02-10', updated: '2026-02-10'},
        {id: 3, title: 'ngrok 认证问题', status: 'open', content: 'ngrok 需要认证才能使用', solution: '启用 GitHub Pages 作为替代方案', created: '2026-02-10', updated: '2026-02-10'}
    ]
};

// ==================== App Initialization ====================
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initFilters();
    initTodos();
    loadData();
    updateStats();
    showSection('overview');
});

// ==================== Navigation ====================
function initNavigation() {
    var navItems = document.querySelectorAll('.nav-item');
    for (var i = 0; i < navItems.length; i++) {
        navItems[i].addEventListener('click', function() {
            var section = this.dataset.section;
            showSection(section);
        });
    }
}

function showSection(sectionId) {
    // Update nav active state
    var navItems = document.querySelectorAll('.nav-item');
    for (var i = 0; i < navItems.length; i++) {
        var isActive = navItems[i].dataset.section === sectionId;
        navItems[i].classList.toggle('active', isActive);
    }

    // Show section
    var sections = document.querySelectorAll('.section');
    for (var i = 0; i < sections.length; i++) {
        var isActive = sections[i].id === sectionId;
        sections[i].classList.toggle('active', isActive);
    }
}

// ==================== Filters ====================
function initFilters() {
    // Skills filter
    var skillFilters = document.querySelectorAll('#skills .filter-btn');
    for (var i = 0; i < skillFilters.length; i++) {
        skillFilters[i].addEventListener('click', function() {
            for (var j = 0; j < skillFilters.length; j++) {
                skillFilters[j].classList.remove('active');
            }
            this.classList.add('active');
            renderSkills(this.dataset.filter);
        });
    }

    // Output category filter
    var outputFilter = document.getElementById('output-category-filter');
    if (outputFilter) {
        outputFilter.addEventListener('change', function(e) {
            renderOutputs(e.target.value);
        });
    }

    // Problem status filter
    var problemFilter = document.getElementById('problem-status-filter');
    if (problemFilter) {
        problemFilter.addEventListener('change', function(e) {
            renderProblems(e.target.value);
        });
    }

    // Log date filter
    var logFilterBtn = document.getElementById('filter-logs-btn');
    if (logFilterBtn) {
        logFilterBtn.addEventListener('click', function() {
            var dateInput = document.getElementById('log-date-filter');
            filterLogs(dateInput.value);
        });
    }
}

// ==================== Data Rendering ====================
function loadData() {
    renderSkills('all');
    renderLogs();
    renderOutputs('all');
    renderProblems('all');
    renderTodos();
    renderTodaySummary();
    updateLastUpdate();
}

function renderSkills(filter) {
    filter = filter || 'all';
    var grid = document.getElementById('skills-grid');
    var filtered = filter === 'all' 
        ? appData.skills 
        : appData.skills.filter(function(s) { return s.category === filter; });
    
    var html = '';
    for (var i = 0; i < filtered.length; i++) {
        var skill = filtered[i];
        html += '<div class="card" data-category="' + skill.category + '">';
        html += '<div class="card-header">';
        html += '<span class="card-icon">' + skill.icon + '</span>';
        html += '<span class="card-title">' + skill.name + '</span>';
        html += '</div>';
        html += '<p class="card-description">' + skill.description + '</p>';
        html += '<div class="card-tags">';
        html += '<span class="tag ' + skill.category + '">' + getCategoryName(skill.category) + '</span>';
        html += '<span class="tag">使用 ' + skill.usageCount + ' 次</span>';
        html += '<span class="tag">学习于 ' + skill.learned + '</span>';
        html += '</div></div>';
    }
    grid.innerHTML = html;
}

function renderLogs(dateFilter) {
    var container = document.getElementById('logs-list');
    var filtered = dateFilter 
        ? appData.logs.filter(function(l) { return l.date === dateFilter; })
        : appData.logs;
    
    var html = '';
    for (var i = 0; i < filtered.length; i++) {
        var log = filtered[i];
        html += '<div class="timeline-item" data-date="' + log.date + '">';
        html += '<div class="timeline-date">' + log.date + ' ' + log.time + '</div>';
        html += '<div class="timeline-title">' + log.title + '</div>';
        html += '<div class="timeline-content">' + log.content + '</div>';
        html += '</div>';
    }
    container.innerHTML = html;
}

function filterLogs(date) {
    renderLogs(date || null);
}

function renderOutputs(filter) {
    filter = filter || 'all';
    var container = document.getElementById('outputs-list');
    var filtered = filter === 'all'
        ? appData.outputs
        : appData.outputs.filter(function(o) { return o.category === filter; });
    
    var html = '';
    for (var i = 0; i < filtered.length; i++) {
        var output = filtered[i];
        html += '<div class="card">';
        html += '<div class="card-header">';
        html += '<span class="card-icon">' + getCategoryIcon(output.category) + '</span>';
        html += '<span class="card-title">' + output.title + '</span>';
        html += '</div>';
        html += '<p class="card-description">' + output.description + '</p>';
        html += '<div class="card-tags">';
        html += '<span class="tag ' + output.category + '">' + getCategoryName(output.category) + '</span>';
        html += '<span class="tag">' + output.date + '</span>';
        html += '<span class="tag ' + (output.status === 'completed' ? 'solved' : 'pending') + '">' + (output.status === 'completed' ? '已完成' : '进行中') + '</span>';
        html += '</div></div>';
    }
    container.innerHTML = html;
}

function renderProblems(filter) {
    filter = filter || 'all';
    var container = document.getElementById('problems-list');
    var filtered = filter === 'all'
        ? appData.problems
        : appData.problems.filter(function(p) { return p.status === filter; });
    
    var html = '';
    for (var i = 0; i < filtered.length; i++) {
        var problem = filtered[i];
        html += '<div class="problem-item">';
        html += '<div class="problem-header">';
        html += '<span class="problem-title">' + problem.title + '</span>';
        html += '<span class="problem-status tag ' + problem.status + '">' + getStatusName(problem.status) + '</span>';
        html += '</div>';
        html += '<div class="problem-content">' + problem.content + '</div>';
        if (problem.solution) {
            html += '<div class="solution-box">';
            html += '<div class="solution-title">💡 解决方案</div>';
            html += '<div class="solution-content">' + problem.solution + '</div>';
            html += '</div>';
        }
        html += '<div class="card-tags" style="margin-top: 12px;">';
        html += '<span class="tag">创建: ' + problem.created + '</span>';
        html += '<span class="tag">更新: ' + problem.updated + '</span>';
        html += '</div></div>';
    }
    container.innerHTML = html;
}

function renderTodaySummary() {
    var container = document.getElementById('today-summary');
    var today = new Date().toISOString().split('T')[0];
    var todayLogs = appData.logs.filter(function(l) { return l.date === today; });
    
    if (todayLogs.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary);">今日暂无记录</p>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < Math.min(todayLogs.length, 5); i++) {
        var log = todayLogs[i];
        html += '<div class="activity-item">';
        html += '<span class="activity-time">' + log.time + '</span>';
        html += '<span class="activity-content">' + log.title + '</span>';
        html += '</div>';
    }
    container.innerHTML = html;
}

// ==================== Stats ====================
function updateStats() {
    var solvedCount = appData.problems.filter(function(p) { return p.status === 'solved'; }).length;
    document.getElementById('skill-count').textContent = appData.skills.length;
    document.getElementById('log-count').textContent = appData.logs.length;
    document.getElementById('output-count').textContent = appData.outputs.length;
    document.getElementById('problem-count').textContent = solvedCount + '/' + appData.problems.length;
}

function updateLastUpdate() {
    var now = new Date();
    var formatted = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    var el = document.getElementById('last-update');
    if (el) el.textContent = '最后更新: ' + formatted;
}

// ==================== Utilities ====================
function getCategoryName(category) {
    var names = {
        'external': '外部工具',
        'internal': '内部能力',
        'automation': '自动化',
        'code': '代码',
        'docs': '文档',
        'analysis': '分析'
    };
    return names[category] || category;
}

function getCategoryIcon(category) {
    var icons = {
        'external': '🔧',
        'internal': '🧠',
        'automation': '⚡',
        'code': '💻',
        'docs': '📄',
        'analysis': '📊'
    };
    return icons[category] || '📁';
}

function getStatusName(status) {
    var names = {
        'solved': '已解决',
        'pending': '处理中',
        'open': '待处理'
    };
    return names[status] || status;
}

// ==================== Todos ====================
function initTodos() {
    var addBtn = document.getElementById('add-todo-btn');
    var input = document.getElementById('new-todo-input');
    
    if (addBtn && input) {
        addBtn.addEventListener('click', function() {
            addTodo();
        });
        
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
    }
}

function addTodo() {
    var input = document.getElementById('new-todo-input');
    var text = input.value.trim();
    
    if (!text) return;
    
    var newTodo = {
        id: Date.now(),
        text: text,
        status: 'pending',
        priority: 'medium',
        created: new Date().toISOString().split('T')[0]
    };
    
    appData.todos.unshift(newTodo);
    input.value = '';
    renderTodos();
    updateTodoCount();
    saveTodos();
}

function toggleTodo(id) {
    var todo = appData.todos.find(function(t) { return t.id === id; });
    if (todo) {
        todo.status = todo.status === 'pending' ? 'completed' : 'pending';
        if (todo.status === 'completed') {
            appData.todos.push(appData.todos.splice(appData.todos.findIndex(function(t) { return t.id === id; }), 1)[0]);
        }
        renderTodos();
        updateTodoCount();
        saveTodos();
    }
}

function deleteTodo(id) {
    appData.todos = appData.todos.filter(function(t) { return t.id !== id; });
    renderTodos();
    updateTodoCount();
    saveTodos();
}

function renderTodos() {
    var container = document.getElementById('todos-list');
    if (!container) return;
    
    var pendingTodos = appData.todos.filter(function(t) { return t.status === 'pending'; });
    
    if (pendingTodos.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 40px;">暂无待办事项 🎉</p>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < pendingTodos.length; i++) {
        var todo = pendingTodos[i];
        var priorityClass = todo.priority === 'high' ? 'high' : (todo.priority === 'medium' ? 'medium' : 'low');
        var priorityIcon = todo.priority === 'high' ? '🔴' : (todo.priority === 'medium' ? '🟡' : '🟢');
        
        html += '<div class="todo-item" data-id="' + todo.id + '">';
        html += '<div class="todo-content">';
        html += '<span class="todo-priority ' + priorityClass + '">' + priorityIcon + '</span>';
        html += '<span class="todo-text">' + escapeHtml(todo.text) + '</span>';
        html += '</div>';
        html += '<div class="todo-actions">';
        html += '<button class="todo-btn complete" onclick="toggleTodo(' + todo.id + ')">✓</button>';
        html += '<button class="todo-btn delete" onclick="deleteTodo(' + todo.id + ')">✕</button>';
        html += '</div>';
        html += '</div>';
    }
    container.innerHTML = html;
}

function updateTodoCount() {
    var count = appData.todos.filter(function(t) { return t.status === 'pending'; }).length;
    var el = document.getElementById('todo-count');
    if (el) el.textContent = count;
}

function saveTodos() {
    try {
        localStorage.setItem('xiaodong_todos', JSON.stringify(appData.todos));
    } catch (e) {
        console.log('无法保存待办事项');
    }
}

function loadTodos() {
    try {
        var saved = localStorage.getItem('xiaodong_todos');
        if (saved) {
            appData.todos = JSON.parse(saved);
        }
    } catch (e) {
        console.log('无法加载待办事项');
    }
}

// 加载已保存的待办
loadTodos();

function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
