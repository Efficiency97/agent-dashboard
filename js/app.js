// Agent Dashboard - Main Application

// ==================== Data Store ====================
var appData = {
    todos: [],
    skills: [
        {id: 'file-ops', name: '文件操作', icon: '📁', category: 'internal', description: '读取、创建、编辑文件内容', commands: ['read', 'write', 'edit'], learned: '2026-02-09', usageCount: 45},
        {id: 'exec', name: '命令执行', icon: '💻', category: 'internal', description: '执行shell命令', commands: ['exec', 'process'], learned: '2026-02-09', usageCount: 38},
        {id: 'web-search', name: 'Web搜索', icon: '🔍', category: 'external', description: '使用Brave API搜索', commands: ['web_search', 'web_fetch'], learned: '2026-02-09', usageCount: 12},
        {id: 'telegram', name: 'Telegram消息', icon: '📱', category: 'external', description: '发送Telegram消息', commands: ['message'], learned: '2026-02-09', usageCount: 156},
        {id: 'cron', name: '定时任务', icon: '⏰', category: 'automation', description: '管理定时任务', commands: ['cron'], learned: '2026-02-09', usageCount: 8},
        {id: 'memory', name: '记忆系统', icon: '🧠', category: 'internal', description: '语义搜索记忆', commands: ['memory_search', 'memory_get'], learned: '2026-02-09', usageCount: 23},
        {id: 'openai-whisper', name: '语音转文字', icon: '🎙️', category: 'external', description: 'Whisper语音转录', commands: ['whisper --model tiny'], learned: '2026-02-10', usageCount: 0},
        {id: 'tts', name: '文字转语音', icon: '🔊', category: 'external', description: 'TTS语音合成', commands: ['tts'], learned: '2026-02-10', usageCount: 0},
        {id: 'browser', name: '浏览器控制', icon: '🌐', category: 'external', description: '浏览器自动化', commands: ['browser'], learned: '2026-02-10', usageCount: 2},
        {id: 'github', name: 'GitHub操作', icon: '🐙', category: 'external', description: 'GitHub CLI管理', commands: ['gh issue', 'gh pr'], learned: '2026-02-10', usageCount: 1},
        {id: 'dashboard', name: '小虾子网站', icon: '🐉', category: 'automation', description: '工作台网站', commands: ['write', 'exec'], learned: '2026-02-10', usageCount: 1},
        {id: 'wechat-summary', name: '微信文章总结', icon: '📱', category: 'external', description: '抓取并总结微信文章', commands: ['web_fetch'], learned: '2026-02-10', usageCount: 0},
        {id: 'twitter-summary', name: '推文批量总结', icon: '🐦', category: 'external', description: '解析并总结推文', commands: ['fxtwitter-api'], learned: '2026-02-10', usageCount: 0}
    ],
    logs: [
        {date: '2026-02-10', time: '10:26', title: '🚀 Agent Dashboard 上线', content: '创建个人工作台网站'},
        {date: '2026-02-10', time: '09:56', title: '📈 美股总结', content: '汇总昨晚美股表现'},
        {date: '2026-02-10', time: '09:30', title: '☕ 早上咖啡', content: '发送提醒'},
        {date: '2026-02-10', time: '09:00', title: '🦞 身份守则', content: '提醒自主AI身份'},
        {date: '2026-02-09', time: '22:00', title: '📝 AI日记', content: '生成每日记录'}
    ],
    outputs: [
        {id: 1, title: '个人网站 Dashboard', category: 'code', description: '记录技能日志产出问题', date: '2026-02-10', status: 'completed'},
        {id: 2, title: '纳斯达克技术分析', category: 'analysis', description: '分析支撑阻力位', date: '2026-02-10', status: 'completed'},
        {id: 3, title: 'CLAW Auto Mint 系统', category: 'automation', description: '每小时市场汇报', date: '2026-02-09', status: 'active'}
    ],
    problems: [
        {id: 1, title: 'Moltbook 暂停', status: 'pending', content: '等待自动恢复', solution: '遵守平台规则', created: '2026-02-10'},
        {id: 2, title: 'ngrok 认证', status: 'open', content: '需配置token', solution: '用GitHub Pages替代', created: '2026-02-10'}
    ],
    tweets: []
};

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
    var navItems = document.querySelectorAll('.nav-item');
    for (var i = 0; i < navItems.length; i++) {
        navItems[i].classList.toggle('active', navItems[i].dataset.section === sectionId);
    }
    var sections = document.querySelectorAll('.section');
    for (var i = 0; i < sections.length; i++) {
        sections[i].classList.toggle('active', sections[i].id === sectionId);
    }
}

// ==================== Filters ====================
function initFilters() {
    var skillFilters = document.querySelectorAll('#skills .filter-btn');
    for (var i = 0; i < skillFilters.length; i++) {
        skillFilters[i].addEventListener('click', function() {
            for (var j = 0; j < skillFilters.length; j++) skillFilters[j].classList.remove('active');
            this.classList.add('active');
            renderSkills(this.dataset.filter);
        });
    }
    var outputFilter = document.getElementById('output-category-filter');
    if (outputFilter) outputFilter.addEventListener('change', function(e) { renderOutputs(e.target.value); });
    var problemFilter = document.getElementById('problem-status-filter');
    if (problemFilter) problemFilter.addEventListener('change', function(e) { renderProblems(e.target.value); });
}

// ==================== Data Rendering ====================
function loadData() {
    renderSkills('all');
    renderLogs();
    renderOutputs('all');
    renderProblems('all');
    renderTodos();
    renderTweets();
    renderTodaySummary();
    updateStats();
    updateLastUpdate();
}

function renderSkills(filter) {
    filter = filter || 'all';
    var grid = document.getElementById('skills-grid');
    var filtered = filter === 'all' ? appData.skills : appData.skills.filter(function(s) { return s.category === filter; });
    var html = '';
    for (var i = 0; i < filtered.length; i++) {
        var skill = filtered[i];
        html += '<div class="card"><div class="card-header"><span class="card-icon">' + skill.icon + '</span><span class="card-title">' + skill.name + '</span></div><p class="card-description">' + skill.description + '</p><div class="card-tags"><span class="tag ' + skill.category + '">' + getCategoryName(skill.category) + '</span><span class="tag">使用 ' + skill.usageCount + ' 次</span></div></div>';
    }
    grid.innerHTML = html;
}

function renderLogs() {
    var container = document.getElementById('logs-list');
    var html = '';
    for (var i = 0; i < appData.logs.length; i++) {
        var log = appData.logs[i];
        html += '<div class="timeline-item"><div class="timeline-date">' + log.date + ' ' + log.time + '</div><div class="timeline-title">' + log.title + '</div><div class="timeline-content">' + log.content + '</div></div>';
    }
    container.innerHTML = html;
}

function renderOutputs(filter) {
    filter = filter || 'all';
    var container = document.getElementById('outputs-list');
    var filtered = filter === 'all' ? appData.outputs : appData.outputs.filter(function(o) { return o.category === filter; });
    var html = '';
    for (var i = 0; i < filtered.length; i++) {
        var output = filtered[i];
        html += '<div class="card"><div class="card-header"><span class="card-icon">' + getCategoryIcon(output.category) + '</span><span class="card-title">' + output.title + '</span></div><p class="card-description">' + output.description + '</p><div class="card-tags"><span class="tag ' + output.category + '">' + getCategoryName(output.category) + '</span><span class="tag ' + (output.status === 'completed' ? 'solved' : 'pending') + '">' + (output.status === 'completed' ? '已完成' : '进行中') + '</span></div></div>';
    }
    container.innerHTML = html;
}

function renderProblems(filter) {
    filter = filter || 'all';
    var container = document.getElementById('problems-list');
    var filtered = filter === 'all' ? appData.problems : appData.problems.filter(function(p) { return p.status === filter; });
    var html = '';
    for (var i = 0; i < filtered.length; i++) {
        var problem = filtered[i];
        html += '<div class="problem-item"><div class="problem-header"><span class="problem-title">' + problem.title + '</span><span class="problem-status tag ' + problem.status + '">' + getStatusName(problem.status) + '</span></div><div class="problem-content">' + problem.content + '</div><div class="solution-box"><div class="solution-title">解决方案</div><div class="solution_content">' + (problem.solution || '暂无') + '</div></div><div class="card-tags" style="margin-top:12px"><span class="tag">创建: ' + problem.created + '</span></div></div>';
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
        html += '<div class="activity-item"><span class="activity-time">' + todayLogs[i].time + '</span><span class="activity-content">' + todayLogs[i].title + '</span></div>';
    }
    container.innerHTML = html;
}

// ==================== Todos ====================
function initTodos() {
    var addBtn = document.getElementById('add-todo-btn');
    var input = document.getElementById('new-todo-input');
    if (addBtn && input) {
        addBtn.addEventListener('click', function() { addTodo(); });
        input.addEventListener('keypress', function(e) { if (e.key === 'Enter') addTodo(); });
    }
}

function addTodo() {
    var input = document.getElementById('new-todo-input');
    var text = input.value.trim();
    if (!text) return;
    appData.todos.unshift({ id: Date.now(), text: text, status: 'pending', priority: 'medium', created: new Date().toISOString().split('T')[0] });
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
    var pendingTodos = appData.todos.filter(function(t) { return t.status === 'pending'; });
    if (pendingTodos.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 40px;">暂无待办事项</p>';
        return;
    }
    var html = '';
    for (var i = 0; i < pendingTodos.length; i++) {
        var todo = pendingTodos[i];
        html += '<div class="todo-item"><div class="todo-content"><span class="todo-text">' + escapeHtml(todo.text) + '</span></div><div class="todo-actions"><button class="todo-btn complete" onclick="toggleTodo(' + todo.id + ')">✓</button><button class="todo-btn delete" onclick="deleteTodo(' + todo.id + ')">✕</button></div></div>';
    }
    container.innerHTML = html;
}

function updateTodoCount() {
    var count = appData.todos.filter(function(t) { return t.status === 'pending'; }).length;
    var el = document.getElementById('todo-count');
    if (el) el.textContent = count;
}

function saveTodos() {
    try { localStorage.setItem('xiaodong_todos', JSON.stringify(appData.todos)); } catch (e) {}
}

function loadTodos() {
    try {
        var saved = localStorage.getItem('xiaodong_todos');
        if (saved) appData.todos = JSON.parse(saved);
    } catch (e) {}
}

// ==================== Tweets ====================
function initTweets() {
    var searchInput = document.getElementById('tweet-search');
    var tagFilter = document.getElementById('tweet-tag-filter');
    if (searchInput) searchInput.addEventListener('input', function() { renderTweets(); });
    if (tagFilter) tagFilter.addEventListener('change', function() { renderTweets(); });
}

function addTweet(tweetData) {
    var tweet = {
        id: Date.now(),
        url: tweetData.url,
        author: tweetData.author || 'Unknown',
        content: tweetData.content || '',
        tags: tweetData.tags || [],
        note: tweetData.note || '',
        created: tweetData.created || new Date().toISOString().split('T')[0]
    };
    appData.tweets.unshift(tweet);
    renderTweets();
    renderTweetTags();
    saveTweets();
    return tweet;
}

function deleteTweet(id) {
    appData.tweets = appData.tweets.filter(function(t) { return t.id !== id; });
    renderTweets();
    renderTweetTags();
    saveTweets();
}

function renderTweetTags() {
    var tagFilter = document.getElementById('tweet-tag-filter');
    if (!tagFilter) return;
    var allTags = {};
    appData.tweets.forEach(function(t) { t.tags.forEach(function(tag) { allTags[tag] = (allTags[tag] || 0) + 1; }); });
    var options = '<option value="all">全部标签</option>';
    Object.keys(allTags).sort().forEach(function(tag) { options += '<option value="' + tag + '">' + tag + ' (' + allTags[tag] + ')</option>'; });
    tagFilter.innerHTML = options;
}

function renderTweets() {
    var container = document.getElementById('tweets-list');
    if (!container) return;
    var searchTerm = document.getElementById('tweet-search').value.toLowerCase();
    var tagFilter = document.getElementById('tweet-tag-filter').value;
    var filtered = appData.tweets.filter(function(t) {
        var matchesSearch = !searchTerm || t.content.toLowerCase().includes(searchTerm) || t.author.toLowerCase().includes(searchTerm) || t.tags.some(function(tag) { return tag.toLowerCase().includes(searchTerm); });
        var matchesTag = tagFilter === 'all' || t.tags.includes(tagFilter);
        return matchesSearch && matchesTag;
    });
    if (filtered.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 40px;">暂无收藏的推文<br><br>发送链接给我，我来帮你收藏！</p>';
        return;
    }
    var html = '';
    for (var i = 0; i < filtered.length; i++) {
        var tweet = filtered[i];
        html += '<div class="tweet-card"><div class="tweet-header"><span class="tweet-author">@' + escapeHtml(tweet.author) + '</span><span class="tweet-date">' + tweet.created + '</span></div>';
        if (tweet.content) html += '<div class="tweet-content">' + escapeHtml(tweet.content).substring(0, 200) + '</div>';
        if (tweet.tags.length > 0) {
            html += '<div class="tweet-tags">';
            tweet.tags.forEach(function(tag) { html += '<span class="tweet-tag">' + escapeHtml(tag) + '</span>'; });
            html += '</div>';
        }
        if (tweet.note) html += '<div class="tweet-note">📝 ' + escapeHtml(tweet.note) + '</div>';
        html += '<div class="tweet-actions"><a href="' + escapeHtml(tweet.url) + '" target="_blank" class="tweet-link">🔗 查看原文</a><button class="tweet-btn delete" onclick="deleteTweet(' + tweet.id + ')">🗑️</button></div></div>';
    }
    container.innerHTML = html;
}

function saveTweets() {
    try { localStorage.setItem('xiaodong_tweets', JSON.stringify(appData.tweets)); } catch (e) {}
}

function loadTweets() {
    try {
        var saved = localStorage.getItem('xiaodong_tweets');
        if (saved) appData.tweets = JSON.parse(saved);
    } catch (e) {}
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
    var formatted = now.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    var el = document.getElementById('last-update');
    if (el) el.textContent = '最后更新: ' + formatted;
}

// ==================== Utilities ====================
function getCategoryName(category) {
    var names = { 'external': '外部工具', 'internal': '内部能力', 'automation': '自动化', 'code': '代码', 'docs': '文档', 'analysis': '分析' };
    return names[category] || category;
}

function getCategoryIcon(category) {
    var icons = { 'external': '🔧', 'internal': '🧠', 'automation': '⚡', 'code': '💻', 'docs': '📄', 'analysis': '📊' };
    return icons[category] || '📁';
}

function getStatusName(status) {
    var names = { 'solved': '已解决', 'pending': '处理中', 'open': '待处理' };
    return names[status] || status;
}

function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==================== Initialize ====================
loadTodos();
loadTweets();
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initFilters();
    initTodos();
    initTweets();
    loadData();
    showSection('overview');
});
