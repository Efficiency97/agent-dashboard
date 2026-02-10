// Agent Dashboard - Simplified

var appData = {
    todos: [],
    skills: [
        {id: 'file-ops', name: '📁 文件操作'},
        {id: 'exec', name: '💻 命令执行'},
        {id: 'web-search', name: '🔍 Web搜索'},
        {id: 'telegram', name: '📱 Telegram'},
        {id: 'cron', name: '⏰ 定时任务'},
        {id: 'memory', name: '🧠 记忆系统'},
        {id: 'whisper', name: '🎙️ 语音转文字'},
        {id: 'tts', name: '🔊 文字转语音'},
        {id: 'browser', name: '🌐 浏览器控制'},
        {id: 'github', name: '🐙 GitHub'},
        {id: 'wechat', name: '📱 微信总结'},
        {id: 'twitter', name: '🐦 推文总结'}
    ],
    logs: [
        {date: '2026-02-10', time: '14:31', title: '🦞 CLAW Auto Mint', content: '每小时市场汇报'},
        {date: '2026-02-10', time: '10:26', title: '🚀 Dashboard上线', content: '创建个人工作台'},
        {date: '2026-02-10', time: '09:56', title: '📈 美股总结', content: '分析昨晚表现'},
        {date: '2026-02-10', time: '09:30', title: '☕ 咖啡时间', content: '发送提醒'},
        {date: '2026-02-10', time: '09:00', title: '🦞 身份守则', content: '提醒自主AI身份'},
        {date: '2026-02-09', time: '22:00', title: '📝 AI日记', content: '生成每日记录'}
    ],
    outputs: [
        {id: 1, title: '个人网站 Dashboard', status: 'completed'},
        {id: 2, title: '纳斯达克分析', status: 'completed'},
        {id: 3, title: 'CLAW Auto Mint 系统', status: 'active'},
        {id: 4, title: 'Moltbook 自动检查', status: 'pending'}
    ],
    problems: [
        {id: 1, title: 'Moltbook 暂停', status: 'pending', content: '等待自动恢复', solution: '遵守平台规则'},
        {id: 2, title: 'ngrok 认证', status: 'solved', content: '需配置token', solution: '用GitHub Pages替代'}
    ],
    tweets: []
};

// ==================== Navigation ====================
function initNavigation() {
    var navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var navId = this.dataset.nav;
            showSection(navId);
        });
    });
}

function showSection(sectionId) {
    // Update nav
    document.querySelectorAll('.nav-btn').forEach(function(btn) {
        btn.classList.toggle('active', btn.dataset.nav === sectionId);
    });
    // Update section
    document.querySelectorAll('.section').forEach(function(section) {
        section.classList.toggle('active', section.id === sectionId);
    });
}

// ==================== Dashboard ====================
function renderDashboard() {
    // Today summary
    var today = new Date().toISOString().split('T')[0];
    var todayLogs = appData.logs.filter(function(l) { return l.date === today; });
    var container = document.getElementById('today-summary');
    if (todayLogs.length > 0) {
        container.innerHTML = todayLogs.slice(0, 3).map(function(log) {
            return '<div class="activity-item"><span class="activity-time">' + log.time + '</span><span>' + log.title + '</span></div>';
        }).join('');
    } else {
        container.innerHTML = '<div class="activity-item"><span>今日暂无记录</span></div>';
    }
    
    // Skills showcase
    document.getElementById('skills-showcase').innerHTML = appData.skills.map(function(skill) {
        return '<span class="skill-tag">' + skill.name + '</span>';
    }).join('');
    
    // Recent logs
    document.getElementById('recent-logs').innerHTML = appData.logs.slice(0, 4).map(function(log) {
        return '<div class="mini-timeline-item"><span class="date">' + log.date + ' ' + log.time + '</span><span>' + log.title + '</span></div>';
    }).join('');
    
    // Recent outputs
    document.getElementById('recent-outputs').innerHTML = appData.outputs.slice(0, 4).map(function(o) {
        var statusClass = o.status === 'completed' ? 'completed' : 'active';
        var statusText = o.status === 'completed' ? '已完成' : (o.status === 'active' ? '进行中' : '待处理');
        return '<div class="mini-card"><div class="mini-card-title">' + o.title + '</div><div class="mini-card-status ' + statusClass + '">' + statusText + '</div></div>';
    }).join('');
}

// ==================== Todos ====================
function initTodos() {
    var addBtn = document.getElementById('add-todo-btn');
    var input = document.getElementById('new-todo-input');
    if (addBtn && input) {
        addBtn.addEventListener('click', addTodo);
        input.addEventListener('keypress', function(e) { if (e.key === 'Enter') addTodo(); });
    }
}

function addTodo() {
    var input = document.getElementById('new-todo-input');
    var text = input.value.trim();
    if (!text) return;
    appData.todos.unshift({ id: Date.now(), text: text, status: 'pending' });
    input.value = '';
    renderTodos();
    saveTodos();
}

function toggleTodo(id) {
    var todo = appData.todos.find(function(t) { return t.id === id; });
    if (todo) {
        appData.todos = appData.todos.filter(function(t) { return t.id !== id; });
        renderTodos();
        saveTodos();
    }
}

function renderTodos() {
    var container = document.getElementById('todos-list');
    var count = appData.todos.length;
    document.getElementById('todo-count').textContent = count;
    if (count === 0) {
        container.innerHTML = '<div class="todo-item"><span class="todo-text">暂无待办事项 🎉</span></div>';
        return;
    }
    container.innerHTML = appData.todos.map(function(todo) {
        return '<div class="todo-item"><span class="todo-text">' + escapeHtml(todo.text) + '</span><div class="todo-actions"><button class="todo-btn complete" onclick="toggleTodo(' + todo.id + ')">✓</button></div></div>';
    }).join('');
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
    if (searchInput) {
        searchInput.addEventListener('input', renderTweets);
    }
}

function addTweet(tweetData) {
    var tweet = {
        id: Date.now(),
        url: tweetData.url,
        author: tweetData.author || 'Unknown',
        content: tweetData.content || '',
        tags: tweetData.tags || [],
        note: tweetData.note || '',
        created: new Date().toISOString().split('T')[0]
    };
    appData.tweets.unshift(tweet);
    renderTweets();
    saveTweets();
    return tweet;
}

function deleteTweet(id) {
    appData.tweets = appData.tweets.filter(function(t) { return t.id !== id; });
    renderTweets();
    saveTweets();
}

function renderTweets() {
    var container = document.getElementById('tweets-list');
    if (!container) return;
    var searchTerm = document.getElementById('tweet-search').value.toLowerCase();
    var filtered = appData.tweets.filter(function(t) {
        return !searchTerm || t.content.toLowerCase().includes(searchTerm) || 
               t.author.toLowerCase().includes(searchTerm) ||
               t.tags.some(function(tag) { return tag.toLowerCase().includes(searchTerm); });
    });
    if (filtered.length === 0) {
        container.innerHTML = '<div class="tweet-card"><div class="tweet-content">暂无收藏的推文</div></div>';
        return;
    }
    container.innerHTML = filtered.map(function(t) {
        var tagsHtml = t.tags.map(function(tag) { return '<span class="tweet-tag">' + escapeHtml(tag) + '</span>'; }).join('');
        var noteHtml = t.note ? '<div class="tweet-note">📝 ' + escapeHtml(t.note) + '</div>' : '';
        return '<div class="tweet-card"><div class="tweet-header"><span class="tweet-author">@' + escapeHtml(t.author) + '</span><span class="tweet-date">' + t.created + '</span></div><div class="tweet-content">' + escapeHtml(t.content).substring(0, 150) + '</div>' + (tagsHtml ? '<div class="tweet-tags">' + tagsHtml + '</div>' : '') + noteHtml + '<div class="tweet-actions"><a href="' + escapeHtml(t.url) + '" target="_blank" class="tweet-link">🔗 查看原文</a></div></div>';
    }).join('');
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

// ==================== Settings ====================
function renderProblems() {
    var container = document.getElementById('problems-list');
    if (!container) return;
    container.innerHTML = appData.problems.map(function(p) {
        var statusClass = p.status === 'solved' ? 'solved' : 'pending';
        var statusText = p.status === 'solved' ? '已解决' : '处理中';
        return '<div class="problem-item"><div class="problem-title">' + p.title + '</div><span class="problem-status ' + statusClass + '">' + statusText + '</span><div class="problem-content">' + p.content + '</div>' + (p.solution ? '<div class="solution-box">💡 ' + p.solution + '</div>' : '') + '</div>';
    }).join('');
}

// ==================== Utilities ====================
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
    initTodos();
    initTweets();
    renderDashboard();
    renderTodos();
    renderTweets();
    renderProblems();
    showSection('dashboard');
});
