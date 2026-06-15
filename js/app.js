// 刷题网站核心逻辑
class QuizApp {
    constructor() {
        this.currentModule = 'dm';
        this.currentQuestions = [];
        this.currentIndex = 0;
        this.answers = {};
        this.wrongQuestions = this.loadFromStorage('wrongQuestions') || {};
        this.favoriteQuestions = this.loadFromStorage('favoriteQuestions') || {};
        this.stats = this.loadFromStorage('quizStats') || { total: 0, correct: 0, wrong: 0 };
        this.todayCount = this.loadFromStorage('todayCount') || 0;
        this.lastStudyDate = this.loadFromStorage('lastStudyDate') || null;
        this.streak = this.loadFromStorage('streak') || 0;
        this.heatmapData = this.loadFromStorage('heatmapData') || {};
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadTheme();
        this.updateChapterSelect();
        this.updateStats();
        this.updateHeatmap();
        this.updateBadges();
        this.checkStreak();
    }

    saveToStorage(key, value) {
        localStorage.setItem(`quiz_${key}`, JSON.stringify(value));
    }

    loadFromStorage(key) {
        const data = localStorage.getItem(`quiz_${key}`);
        return data ? JSON.parse(data) : null;
    }

    loadTheme() {
        const theme = localStorage.getItem('quiz_theme') || 'light';
        const customColor = localStorage.getItem('quiz_custom_color') || '#667eea';
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.style.setProperty('--accent-color', customColor);
        document.querySelectorAll('.theme-option').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.theme === theme);
        });
        document.getElementById('custom-color').value = customColor;
        document.getElementById('custom-color-hex').value = customColor;
    }

    bindEvents() {
        document.querySelectorAll('.module-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchModule(btn.dataset.module));
        });

        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        document.getElementById('theme-btn').addEventListener('click', () => {
            document.getElementById('theme-panel').classList.toggle('show');
        });

        document.querySelectorAll('.theme-option').forEach(opt => {
            opt.addEventListener('click', () => {
                const theme = opt.dataset.theme;
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('quiz_theme', theme);
                document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
            });
        });

        document.getElementById('custom-color').addEventListener('input', (e) => {
            const color = e.target.value;
            document.documentElement.style.setProperty('--accent-color', color);
            localStorage.setItem('quiz_custom_color', color);
            document.getElementById('custom-color-hex').value = color;
        });

        document.getElementById('chapter-select').addEventListener('change', (e) => {
            this.updateChapterInfo(e.target.value);
        });

        document.getElementById('start-btn').addEventListener('click', () => this.startPractice());
        document.getElementById('start-random-btn').addEventListener('click', () => this.startRandom());

        document.getElementById('prev-btn').addEventListener('click', () => this.prevQuestion());
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('submit-btn').addEventListener('click', () => this.submitQuiz());

        document.getElementById('favorite-question-btn').addEventListener('click', () => this.toggleFavorite());

        document.getElementById('home-btn').addEventListener('click', () => this.goHome());
        document.getElementById('home-btn2').addEventListener('click', () => this.goHome());

        document.getElementById('retry-btn').addEventListener('click', () => this.retry());

        document.getElementById('review-wrong-btn').addEventListener('click', () => this.reviewWrong());
        document.getElementById('clear-wrong-btn').addEventListener('click', () => this.clearWrong());

        document.getElementById('practice-favorite-btn').addEventListener('click', () => this.practiceFavorite());
        document.getElementById('clear-favorite-btn').addEventListener('click', () => this.clearFavorite());

        document.getElementById('export-btn').addEventListener('click', () => this.exportData());
        document.getElementById('import-btn').addEventListener('click', () => document.getElementById('import-file').click());
        document.getElementById('import-file').addEventListener('change', (e) => this.importData(e));
        document.getElementById('clear-btn').addEventListener('click', () => this.clearAllData());

        document.querySelectorAll('.count-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    switchModule(module) {
        this.currentModule = module;
        document.querySelectorAll('.module-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.module === module);
        });
        this.updateChapterSelect();
        this.goHome();
    }

    switchTab(tab) {
        document.querySelectorAll('.tab').forEach(t => {
            t.classList.toggle('active', t.dataset.tab === tab);
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `tab-${tab}`);
        });
        if (tab === 'wrong') this.renderWrongList();
        if (tab === 'favorite') this.renderFavoriteList();
    }

    updateChapterSelect() {
        const select = document.getElementById('chapter-select');
        const questions = this.currentModule === 'dm' ? dmQuestions : javaQuestions;
        select.innerHTML = '<option value="">-- 请选择章节 --</option>';
        for (const [key, chapter] of Object.entries(questions)) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = `${chapter.name} (${chapter.questions.length}题)`;
            select.appendChild(option);
        }
    }

    updateChapterInfo(chapter) {
        const info = document.getElementById('chapter-info');
        if (!chapter) { info.textContent = ''; return; }
        const questions = this.currentModule === 'dm' ? dmQuestions : javaQuestions;
        const chapterData = questions[chapter];
        info.textContent = `${chapterData.name} - 共${chapterData.questions.length}题`;
    }

    startPractice() {
        const chapter = document.getElementById('chapter-select').value;
        if (!chapter) { alert('请选择章节'); return; }
        const questions = this.currentModule === 'dm' ? dmQuestions : javaQuestions;
        this.currentQuestions = questions[chapter].questions;
        this.currentIndex = 0;
        this.answers = {};
        this.showPage('quiz');
        this.renderQuestion();
    }

    startRandom() {
        const activeBtn = document.querySelector('.count-btn.active');
        const count = parseInt(activeBtn.dataset.count);
        const questions = this.currentModule === 'dm' ? dmQuestions : javaQuestions;
        let allQuestions = [];
        for (const chapter of Object.values(questions)) {
            allQuestions = allQuestions.concat(chapter.questions);
        }
        allQuestions = allQuestions.sort(() => Math.random() - 0.5).slice(0, count);
        this.currentQuestions = allQuestions;
        this.currentIndex = 0;
        this.answers = {};
        this.showPage('quiz');
        this.renderQuestion();
    }

    renderQuestion() {
        const question = this.currentQuestions[this.currentIndex];
        const container = document.getElementById('question-container');
        document.getElementById('progress').textContent = `${this.currentIndex + 1} / ${this.currentQuestions.length}`;
        document.getElementById('progress-bar').style.width = `${((this.currentIndex + 1) / this.currentQuestions.length) * 100}%`;

        const favBtn = document.getElementById('favorite-question-btn');
        const questionKey = this.getQuestionKey(question);
        favBtn.classList.toggle('active', this.isFavorite(questionKey));

        let html = `
            <div class="question-number">第 ${this.currentIndex + 1} 题</div>
            <div class="question-type">${this.getTypeName(question.type)}</div>
            <div class="question-text">${question.question}</div>
        `;

        if (question.type === 'single') {
            html += '<div class="options">';
            const labels = ['A', 'B', 'C', 'D'];
            question.options.forEach((opt, i) => {
                const selected = this.answers[this.currentIndex] === i ? 'selected' : '';
                html += `
                    <div class="option ${selected}" data-index="${i}">
                        <div class="option-label">${labels[i]}</div>
                        <div class="option-text">${opt}</div>
                    </div>
                `;
            });
            html += '</div>';
        } else if (question.type === 'fill') {
            html += '<div class="fill-blank-container">';
            question.answer.forEach((_, i) => {
                const value = this.answers[this.currentIndex]?.[i] || '';
                html += `<input type="text" class="fill-blank-input" data-index="${i}" value="${value}" placeholder="答案${i + 1}">`;
            });
            html += '</div>';
        }

        container.innerHTML = html;

        if (question.type === 'single') {
            container.querySelectorAll('.option').forEach(opt => {
                opt.addEventListener('click', () => {
                    container.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
                    opt.classList.add('selected');
                    this.answers[this.currentIndex] = parseInt(opt.dataset.index);
                });
            });
        }

        if (question.type === 'fill') {
            container.querySelectorAll('.fill-blank-input').forEach(input => {
                input.addEventListener('input', (e) => {
                    if (!this.answers[this.currentIndex]) {
                        this.answers[this.currentIndex] = {};
                    }
                    this.answers[this.currentIndex][parseInt(e.target.dataset.index)] = e.target.value;
                });
            });
        }

        this.renderLatex();

        document.getElementById('prev-btn').disabled = this.currentIndex === 0;
        document.getElementById('next-btn').style.display = this.currentIndex === this.currentQuestions.length - 1 ? 'none' : 'block';
        document.getElementById('submit-btn').style.display = this.currentIndex === this.currentQuestions.length - 1 ? 'block' : 'none';
    }

    renderLatex() {
        const container = document.getElementById('question-container');
        renderMathInElement(container, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false}
            ],
            throwOnError: false
        });
    }

    getTypeName(type) {
        const names = { single: '单选题', multi: '多选题', fill: '填空题' };
        return names[type] || type;
    }

    getQuestionKey(question) {
        return `${this.currentModule}_${question.question.substring(0, 20)}`;
    }

    prevQuestion() {
        if (this.currentIndex > 0) { this.currentIndex--; this.renderQuestion(); }
    }

    nextQuestion() {
        if (this.currentIndex < this.currentQuestions.length - 1) { this.currentIndex++; this.renderQuestion(); }
    }

    submitQuiz() {
        let correctCount = 0;
        const wrongList = [];
        this.currentQuestions.forEach((question, i) => {
            const isCorrect = this.checkAnswer(question, this.answers[i]);
            if (isCorrect) { correctCount++; } else {
                wrongList.push({ question, userAnswer: this.answers[i] });
                this.addToWrong(question);
            }
        });
        this.stats.total += this.currentQuestions.length;
        this.stats.correct += correctCount;
        this.stats.wrong += wrongList.length;
        this.saveToStorage('quizStats', this.stats);
        this.todayCount += this.currentQuestions.length;
        this.saveToStorage('todayCount', this.todayCount);
        this.updateTodayCount();
        this.updateHeatmapData();
        this.showResult(correctCount, wrongList);
    }

    checkAnswer(question, userAnswer) {
        if (question.type === 'single') { return userAnswer === question.answer; }
        else if (question.type === 'fill') {
            if (!userAnswer) return false;
            return question.answer.every((ans, i) => userAnswer[i]?.toLowerCase() === ans.toLowerCase());
        }
        return false;
    }

    addToWrong(question) {
        const key = this.getQuestionKey(question);
        if (!this.wrongQuestions[key]) {
            this.wrongQuestions[key] = { question, module: this.currentModule, count: 0, lastWrong: Date.now() };
        }
        this.wrongQuestions[key].count++;
        this.saveToStorage('wrongQuestions', this.wrongQuestions);
        this.updateBadges();
    }

    showResult(correctCount, wrongList) {
        this.showPage('result');
        const percentage = Math.round((correctCount / this.currentQuestions.length) * 100);
        document.getElementById('score').textContent = `${correctCount} / ${this.currentQuestions.length}`;
        document.getElementById('percentage').textContent = `正确率: ${percentage}%`;

        const wrongSection = document.getElementById('wrong-section');
        const wrongListEl = document.getElementById('wrong-list-result');
        if (wrongList.length > 0) {
            wrongSection.style.display = 'block';
            wrongListEl.innerHTML = wrongList.map(({ question, userAnswer }) => `
                <div class="question-item">
                    <div class="question-text">${question.question}</div>
                    <div class="question-type">${this.getTypeName(question.type)}</div>
                    ${question.type === 'single' ? `
                        <div>你的答案: ${question.options[userAnswer] || '未作答'}</div>
                        <div>正确答案: ${question.options[question.answer]}</div>
                    ` : `
                        <div>你的答案: ${userAnswer ? Object.values(userAnswer).join(', ') : '未作答'}</div>
                        <div>正确答案: ${question.answer.join(', ')}</div>
                    `}
                    <div>解析: ${question.explanation}</div>
                </div>
            `).join('');
        } else {
            wrongSection.style.display = 'none';
        }
    }

    toggleFavorite() {
        const question = this.currentQuestions[this.currentIndex];
        const key = this.getQuestionKey(question);
        if (this.isFavorite(key)) { delete this.favoriteQuestions[key]; }
        else { this.favoriteQuestions[key] = { question, module: this.currentModule }; }
        this.saveToStorage('favoriteQuestions', this.favoriteQuestions);
        this.updateBadges();
        this.renderQuestion();
    }

    isFavorite(key) { return !!this.favoriteQuestions[key]; }

    renderWrongList() {
        const container = document.getElementById('wrong-list');
        const wrongEntries = Object.entries(this.wrongQuestions);
        if (wrongEntries.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-tertiary);">暂无错题</p>';
            return;
        }
        container.innerHTML = wrongEntries.map(([key, data]) => `
            <div class="question-item" data-key="${key}">
                <div class="question-type">${data.module === 'dm' ? '离散数学' : 'Java'} - ${this.getTypeName(data.question.type)}</div>
                <div class="question-text">${data.question.question.substring(0, 50)}...</div>
                <div>错误次数: ${data.count}</div>
            </div>
        `).join('');
    }

    renderFavoriteList() {
        const container = document.getElementById('favorite-list');
        const favEntries = Object.entries(this.favoriteQuestions);
        if (favEntries.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-tertiary);">暂无收藏</p>';
            return;
        }
        container.innerHTML = favEntries.map(([key, data]) => `
            <div class="question-item" data-key="${key}">
                <div class="question-type">${data.module === 'dm' ? '离散数学' : 'Java'} - ${this.getTypeName(data.question.type)}</div>
                <div class="question-text">${data.question.question.substring(0, 50)}...</div>
            </div>
        `).join('');
    }

    reviewWrong() {
        const wrongEntries = Object.values(this.wrongQuestions);
        if (wrongEntries.length === 0) { alert('暂无错题'); return; }
        this.currentQuestions = wrongEntries.map(e => e.question);
        this.currentIndex = 0;
        this.answers = {};
        this.showPage('quiz');
        this.renderQuestion();
    }

    clearWrong() {
        if (confirm('确定要清空错题本吗？')) {
            this.wrongQuestions = {};
            this.saveToStorage('wrongQuestions', this.wrongQuestions);
            this.updateBadges();
            this.renderWrongList();
        }
    }

    practiceFavorite() {
        const favEntries = Object.values(this.favoriteQuestions);
        if (favEntries.length === 0) { alert('暂无收藏'); return; }
        this.currentQuestions = favEntries.map(e => e.question);
        this.currentIndex = 0;
        this.answers = {};
        this.showPage('quiz');
        this.renderQuestion();
    }

    clearFavorite() {
        if (confirm('确定要清空收藏夹吗？')) {
            this.favoriteQuestions = {};
            this.saveToStorage('favoriteQuestions', this.favoriteQuestions);
            this.updateBadges();
            this.renderFavoriteList();
        }
    }

    updateStats() {
        document.getElementById('stat-total').textContent = this.stats.total;
        document.getElementById('stat-correct').textContent = this.stats.correct;
        document.getElementById('stat-wrong').textContent = this.stats.wrong;
        document.getElementById('stat-rate').textContent = this.stats.total > 0
            ? `${Math.round((this.stats.correct / this.stats.total) * 100)}%` : '0%';
    }

    updateBadges() {
        const wrongCount = Object.keys(this.wrongQuestions).length;
        const favCount = Object.keys(this.favoriteQuestions).length;
        const wrongBadge = document.getElementById('wrong-badge');
        const favBadge = document.getElementById('favorite-badge');
        wrongBadge.style.display = wrongCount > 0 ? 'inline' : 'none';
        wrongBadge.textContent = wrongCount;
        favBadge.style.display = favCount > 0 ? 'inline' : 'none';
        favBadge.textContent = favCount;
    }

    updateTodayCount() {
        document.getElementById('today-count').textContent = this.todayCount;
    }

    checkStreak() {
        const today = new Date().toDateString();
        if (this.lastStudyDate === today) {
        } else if (this.lastStudyDate === new Date(Date.now() - 86400000).toDateString()) {
            this.streak++;
            this.saveToStorage('streak', this.streak);
        } else if (this.lastStudyDate !== today) {
            this.streak = 1;
            this.saveToStorage('streak', this.streak);
        }
        document.getElementById('streak-count').textContent = this.streak;
        this.updateTodayCount();
    }

    updateHeatmapData() {
        const today = new Date().toDateString();
        this.lastStudyDate = today;
        this.saveToStorage('lastStudyDate', this.lastStudyDate);
        if (!this.heatmapData[today]) { this.heatmapData[today] = 0; }
        this.heatmapData[today] += this.currentQuestions.length;
        this.saveToStorage('heatmapData', this.heatmapData);
        this.updateHeatmap();
    }

    updateHeatmap() {
        const container = document.getElementById('heatmap');
        container.innerHTML = '';
        const today = new Date();
        for (let i = 364; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toDateString();
            const count = this.heatmapData[dateStr] || 0;
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';
            if (count > 0) {
                if (count >= 20) cell.classList.add('level-4');
                else if (count >= 10) cell.classList.add('level-3');
                else if (count >= 5) cell.classList.add('level-2');
                else cell.classList.add('level-1');
            }
            cell.title = `${dateStr}: ${count}题`;
            container.appendChild(cell);
        }
    }

    showPage(page) {
        document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
        document.getElementById(`${page}-page`).style.display = 'block';
    }

    goHome() {
        this.showPage('home');
        this.updateStats();
        this.switchTab('practice');
    }

    retry() {
        this.currentIndex = 0;
        this.answers = {};
        this.showPage('quiz');
        this.renderQuestion();
    }

    handleKeyboard(e) {
        if (!document.getElementById('quiz-page').style.display ||
            document.getElementById('quiz-page').style.display === 'none') { return; }
        switch(e.key) {
            case 'Enter':
                if (this.currentIndex === this.currentQuestions.length - 1) { this.submitQuiz(); }
                else { this.nextQuestion(); }
                break;
            case 'ArrowLeft': this.prevQuestion(); break;
            case 'ArrowRight': this.nextQuestion(); break;
            case 'Escape': this.clearCurrentAnswer(); break;
            case ' ':
                e.preventDefault();
                this.randomQuestion();
                break;
        }
    }

    clearCurrentAnswer() {
        delete this.answers[this.currentIndex];
        this.renderQuestion();
    }

    randomQuestion() {
        this.currentIndex = Math.floor(Math.random() * this.currentQuestions.length);
        this.renderQuestion();
    }

    exportData() {
        const data = {
            stats: this.stats,
            wrongQuestions: this.wrongQuestions,
            favoriteQuestions: this.favoriteQuestions,
            heatmapData: this.heatmapData,
            streak: this.streak,
            todayCount: this.todayCount,
            lastStudyDate: this.lastStudyDate
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quiz-data-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    importData(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                this.stats = data.stats || this.stats;
                this.wrongQuestions = data.wrongQuestions || this.wrongQuestions;
                this.favoriteQuestions = data.favoriteQuestions || this.favoriteQuestions;
                this.heatmapData = data.heatmapData || this.heatmapData;
                this.streak = data.streak || this.streak;
                this.todayCount = data.todayCount || this.todayCount;
                this.lastStudyDate = data.lastStudyDate || this.lastStudyDate;
                this.saveToStorage('quizStats', this.stats);
                this.saveToStorage('wrongQuestions', this.wrongQuestions);
                this.saveToStorage('favoriteQuestions', this.favoriteQuestions);
                this.saveToStorage('heatmapData', this.heatmapData);
                this.saveToStorage('streak', this.streak);
                this.saveToStorage('todayCount', this.todayCount);
                this.saveToStorage('lastStudyDate', this.lastStudyDate);
                this.updateStats();
                this.updateBadges();
                this.updateHeatmap();
                this.updateTodayCount();
                alert('导入成功！');
            } catch (err) {
                alert('导入失败：文件格式错误');
            }
        };
        reader.readAsText(file);
    }

    clearAllData() {
        if (confirm('确定要清除所有数据吗？此操作不可恢复！')) {
            localStorage.clear();
            this.stats = { total: 0, correct: 0, wrong: 0 };
            this.wrongQuestions = {};
            this.favoriteQuestions = {};
            this.heatmapData = {};
            this.streak = 0;
            this.todayCount = 0;
            this.lastStudyDate = null;
            this.updateStats();
            this.updateBadges();
            this.updateHeatmap();
            this.updateTodayCount();
            alert('数据已清除');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.quizApp = new QuizApp();
});
