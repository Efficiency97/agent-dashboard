// 打工虾 Dashboard

var data = {
    todos: [],
    skills: ['📁 文件', '💻 命令', '🔍 搜索', '📱 Telegram', '⏰ 定时', '🧠 记忆', '🎙️ 语音', '🔊 TTS', '🌐 浏览器', '🐙 GitHub'],
    logs: [
        {t: '14:31', title: '🦞 CLAW Auto Mint'},
        {t: '10:26', title: '🚀 Dashboard上线'},
        {t: '09:56', title: '📈 美股总结'},
        {t: '09:30', title: '☕ 咖啡时间'},
        {t: '09:00', title: '🦞 身份守则'}
    ],
    outputs: [
        {title: '个人网站', status: 'done'},
        {title: '纳斯达克分析', status: 'done'},
        {title: 'CLAW Auto Mint', status: 'active'},
        {title: 'Moltbook 检查', status: 'pending'}
    ],
    problems: [
        {title: 'Moltbook 暂停', desc: '等待自动恢复', solve: '遵守平台规则', status: 'pending'}
    ],
    tweets: []
};

// Load from localStorage
try {
    var saved = localStorage.getItem('xiaodong_todos');
    if (saved) data.todos = JSON.parse(saved);
    saved = localStorage.getItem('xiaodong_tweets');
    if (saved) data.tweets = JSON.parse(saved);
} catch (e) {}

// Render
function render() {
    renderDashboard();
    renderTodos();
    renderTweets();
    renderProblems();
}

function renderDashboard() {
    var today = new Date().toISOString().slice(0, 10);
    var todayLogs = data.logs.filter(function(l) { return l.date === today; }).slice(0, 3);
    
    document.getElementById('today-list').innerHTML = todayLogs.map(function(l) {
        return '<div class="list-item"><span class="time">' + l.t + '</span><span>' + l.title + '</span></div>';
    }).join('') || '<div class="list-item">暂无记录</div>';
    
    document.getElementById('skills-tags').innerHTML = data.skills.map(function(s) {
        return '<span class="tag">' + s + '</span>';
    }).join('');
    
    document.getElementById('logs-list').innerHTML = data.logs.slice(0, 4).map(function(l) {
        return '<div class="list-item"><span class="time">' + l.t + '</span><span>' + l.title + '</span></div>';
    }).join('');
    
    document.getElementById('outputs-cards').innerHTML = data.outputs.map(function(o) {
        var cls = o.status === 'done' ? 'done' : (o.status === 'active' ? 'active' : '');
        var txt = o.status === 'done' ? '已完成' : (o.status === 'active' ? '进行中' : '待处理');
        return '<div class="card"><div class="card-title">' + o.title + '</div><span class="status ' + cls + '">' + txt + '</span></div>';
    }).join('');
}

function renderTodos() {
    var list = document.getElementById('todos-list');
    document.getElementById('todo-count').textContent = data.todos.length;
    list.innerHTML = data.todos.map(function(t) {
        return '<div class="todo-row"><span>' + t.text + '</span><button class="todo-btn" onclick="doneTodo(' + t.id + ')">✓</button></div>';
    }).join('') || '<div class="list-item">暂无待办 🎉</div>';
}

function renderTweets() {
    var list = document.getElementById('tweets-list');
    var term = document.getElementById('search-input').value.toLowerCase();
    var filtered = data.tweets.filter(function(t) {
        return !term || t.c.toLowerCase().includes(term) || t.a.toLowerCase().includes(term);
    });
    list.innerHTML = filtered.map(function(t) {
        return '<div class="card" style="margin-bottom:10px"><div class="card-title">@' + t.a + '</div><p style="font-size:13px;color:#94a3b8;margin:8px 0">' + (t.c || '').slice(0, 100) + '</p><a href="' + t.u + '" target="_blank" style="color:#6366f1;font-size:13px">🔗 原文</a></div>';
    }).join('') || '<div class="list-item">暂无收藏</div>';
}

function renderProblems() {
    document.getElementById('problems-list').innerHTML = data.problems.map(function(p) {
        return '<div class="problem-box"><div class="problem-title">' + p.title + '</div><div class="problem-desc">' + p.desc + '</div><div class="solution">💡 ' + p.solve + '</div></div>';
    }).join('');
}

// Actions
function addTodo() {
    var input = document.getElementById('todo-input');
    if (!input.value.trim()) return;
    data.todos.unshift({ id: Date.now(), text: input.value.trim() });
    input.value = '';
    renderTodos();
    localStorage.setItem('xiaodong_todos', JSON.stringify(data.todos));
}

function doneTodo(id) {
    data.todos = data.todos.filter(function(t) { return t.id !== id; });
    renderTodos();
    localStorage.setItem('xiaodong_todos', JSON.stringify(data.todos));
}

function addTweet(tweet) {
    data.tweets.unshift({ id: Date.now(), u: tweet.url, a: tweet.author, c: tweet.content, n: tweet.note || '' });
    renderTweets();
    localStorage.setItem('xiaodong_tweets', JSON.stringify(data.tweets));
}

// Navigation
function showPage(id) {
    document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(function(n) { n.classList.remove('active'); });
    document.querySelectorAll('[data-section="' + id + '"]').forEach(function(n) { n.classList.add('active'); });
    
    // Close mobile menu
    document.getElementById('sidebar').classList.remove('open');
}

// Init
document.addEventListener('DOMContentLoaded', function() {
    render();
    
    // Sidebar toggle
    document.getElementById('toggle-btn').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('collapsed');
    });
    
    // Mobile menu
    document.getElementById('menu-btn').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('open');
    });
    
    // Nav clicks
    document.querySelectorAll('.nav-item').forEach(function(item) {
        item.addEventListener('click', function() { showPage(this.dataset.section); });
    });
    
    document.querySelectorAll('.mobile-nav-item').forEach(function(item) {
        item.addEventListener('click', function() { showPage(this.dataset.section); });
    });
    
    // Todo
    document.getElementById('add-todo').addEventListener('click', addTodo);
    document.getElementById('todo-input').addEventListener('keypress', function(e) { if (e.key === 'Enter') addTodo(); });
    
    // Search
    document.getElementById('search-input').addEventListener('input', renderTweets);
});
