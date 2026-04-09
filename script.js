
const books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        mood: "'Reflective",
        image: "great.jpg",
        description: "Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
        pages: 180,
        year: 1925
    },
    {
        id: 2,
        title: "Dune",
        author: "Frank Herbert",
        genre: "Sci-Fi",
        mood: "Epic",
        image: "dune.jpg",
        description: "Set in the distant future amidst a feudal interstellar society, Dune tells the story of young Paul Atreides, whose family accepts the stewardship of the planet Arrakis.",
        pages: 412,
        year: 1965
    },
    {
        id: 3,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Classic",
        mood: "Romantic",
        image: "pride.jpeg",
        description: "The story follows the main character, Elizabeth Bennet, as she deals with issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry of the British Regency.",
        pages: 432,
        year: 1813
    },
    {
        id: 4,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        mood: "Deep Thinking",
        image: "19841.jpg",
        description: "Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real.",
        pages: 328,
        year: 1949
    },
    {
        id: 5,
        title: "The Name of the Wind",
        author: "Patrick Rothfuss",
        genre: "Fantasy",
        mood: "Epic",
        image: "wind.jpg",
        description: "Told in Kvothe's own voice, this is the tale of the magically gifted young man who grows to be the most notorious wizard his world has ever seen.",
        pages: 662,
        year: 2007
    },
    {
        id: 6,
        title: "Wuthering Heights",
        author: "Emily Brontë",
        genre: "Literary",
        mood: "Dark",
        image: "wuthering.jpeg",
        description: "Wuthering Heights is a wild, passionate story of the intense and almost demonic love between Catherine Earnshaw and Heathcliff, a foundling adopted by Catherine's father.",
        pages: 342,
        year: 1847
    },
    {
        id: 7,
        title: "Norwegian Wood",
        author: "Haruki Murakami",
        genre: "Literary",
        mood: "Rainy",
        image: "wood.jpg",
        description: "A magnificent coming-of-age story steeped in nostalgia, Norwegian Wood blends the music, the mood, and the ethos of the sixties with a young man's hopeless and heroic first love.",
        pages: 296,
        year: 1987
    },
    {
        id: 8,
        title: "The Road",
        author: "Cormac McCarthy",
        genre: "Dystopian",
        mood: "Dark",
        image: "road.jpg",
        description: "The searing, post-apocalyptic novel about a father and son's fight to survive, this tale of survival and the miracle of goodness only adds to McCarthy's stature as a living master.",
        pages: 287,
        year: 2006
    }
];


const app = {
    state: {
        username: null,
        favorites: new Set(),
        completed: new Set(),
        ratings: {},
        points: 0,
        yearlyGoal: 50,
        currentSection: 'all', 
        moodFilter: 'all',
        genreFilter: 'all',
        searchQuery: '',
        isDarkMode: false
    },

    
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.loadStorage();
        this.renderGrid();
        this.initChart();
    },

    cacheDOM() {
        this.dom = {
            bookGrid: document.getElementById('bookGrid'),
            emptyState: document.getElementById('emptyState'),
            catalogSection: document.getElementById('catalogSection'),
            goalsPage: document.getElementById('goalsPage'),
            catalogHeader: document.getElementById('catalogHeader'),
            pageTitle: document.getElementById('pageTitle'),
            searchInput: document.getElementById('searchInput'),
            favCount: document.getElementById('favCount'),
            moodBtns: document.querySelectorAll('.mood-btn'),
            genreBtns: document.querySelectorAll('.genre-btn'),
            navBtns: document.querySelectorAll('.nav-btn'),
            // Modal
            modal: document.getElementById('bookModal'),
            modalImg: document.getElementById('modalImg'),
            modalTitle: document.getElementById('modalTitle'),
            modalAuthor: document.getElementById('modalAuthor'),
            modalDesc: document.getElementById('modalDesc'),
            modalMood: document.getElementById('modalMood'),
            modalGenre: document.getElementById('modalGenre'),
            modalPages: document.getElementById('modalPages'),
            modalYear: document.getElementById('modalYear'),
            modalFavBtn: document.getElementById('modalFavBtn'),
            modalCompleteBtn: document.getElementById('modalCompleteBtn'),
            ratingWidget: document.getElementById('ratingWidget'),
            stars: document.querySelectorAll('.star'),
            shelfDropzone: document.getElementById('shelfDropzone'),

            
            statBooksRead: document.getElementById('statBooksRead'),
            statYearlyGoal: document.getElementById('statYearlyGoal'),
            statPagesTurned: document.getElementById('statPagesTurned'),
            statStreak: document.getElementById('statStreak'),
            
            
            authScreen: document.getElementById('authScreen'),
            appContainer: document.getElementById('appContainer'),
            loginForm: document.getElementById('loginForm'),
            usernameInput: document.getElementById('usernameInput'),
            passwordInput: document.getElementById('passwordInput'),
            logoutBtn: document.getElementById('logoutBtn'),
            favLink: document.getElementById('favLink'),
            goalsLink: document.getElementById('goalsLink'),
            quizLink: document.getElementById('quizLink'),
            quizPage: document.getElementById('quizPage'),
            quizContainer: document.getElementById('quizContainer'),
            pointsDisplay: document.getElementById('pointsDisplay'),
            pointsValue: document.getElementById('pointsValue'),

            
            iconSun: document.querySelector('.icon-sun'),
            iconMoon: document.querySelector('.icon-moon'),
            iconSunAuth: document.querySelector('.icon-sun-auth'),
            iconMoonAuth: document.querySelector('.icon-moon-auth')
        };
    },

    bindEvents() {
       
        this.dom.searchInput.addEventListener('input', (e) => {
            this.state.searchQuery = e.target.value.toLowerCase();
            this.renderGrid();
        });

        
        this.dom.moodBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.dom.moodBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.state.moodFilter = e.target.dataset.mood;
                this.renderGrid();
            });
        });

        this.dom.genreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.dom.genreBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.state.genreFilter = e.target.dataset.filter;
                this.renderGrid();
            });
        });
        
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape') {
                if(this.dom.modal.classList.contains('show')) this.closeModal(e);
            }
        });

      
        this.dom.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = this.dom.usernameInput.value.trim();
            if (user) {
                this.login(user);
            }
        });

       
        if (this.dom.shelfDropzone) {
            this.dom.shelfDropzone.addEventListener('dragover', (e) => {
                e.preventDefault(); 
                this.dom.shelfDropzone.classList.add('drag-over');
            });
            
            this.dom.shelfDropzone.addEventListener('dragleave', () => {
                this.dom.shelfDropzone.classList.remove('drag-over');
            });
            
            this.dom.shelfDropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                this.dom.shelfDropzone.classList.remove('drag-over');
                this.dom.shelfDropzone.classList.remove('show');
                
                if (!this.state.username) return;

                const bookId = parseInt(e.dataTransfer.getData('text/plain'), 10);
                if (bookId && !this.state.favorites.has(bookId)) {
                    this.state.favorites.add(bookId);
                    this.updateFavCount();
                    this.saveStorage();
                    
                    
                    this.renderGrid();
                    const droppedCard = [...this.dom.bookGrid.children].find(c => parseInt(c.dataset.id, 10) === bookId);
                    if (droppedCard) {
                        droppedCard.classList.add('dropped');
                        setTimeout(() => droppedCard.classList.remove('dropped'), 500);
                    }
                }
            });
        }
    },

    loadStorage() {
        const savedTheme = localStorage.getItem('archive_theme');
        if (savedTheme === 'dark') {
            this.toggleDarkMode(true);
        }
        
        const savedUser = localStorage.getItem('archive_currentUser');
        if (savedUser) {
            this.login(savedUser);
        } else {
            this.dom.authScreen.style.display = 'flex';
            this.dom.appContainer.style.display = 'none';
        }
    },

    saveStorage() {
        if (!this.state.username) return;
        localStorage.setItem(`archive_favorites_${this.state.username}`, JSON.stringify([...this.state.favorites]));
        localStorage.setItem(`archive_completed_${this.state.username}`, JSON.stringify([...this.state.completed]));
        localStorage.setItem(`archive_ratings_${this.state.username}`, JSON.stringify(this.state.ratings));
        localStorage.setItem(`archive_points_${this.state.username}`, this.state.points.toString());
        localStorage.setItem(`archive_goal_${this.state.username}`, this.state.yearlyGoal.toString());
    },

    loadUserData() {
        if (!this.state.username) {
            this.state.favorites = new Set();
            this.state.completed = new Set();
            this.state.ratings = {};
            this.state.points = 0;
            this.state.yearlyGoal = 50;
            this.updateFavCount();
            this.updateStats();
            this.updateChartData();
            this.dom.pointsDisplay.style.display = 'none';
            return;
        }

        const savedFavs = localStorage.getItem(`archive_favorites_${this.state.username}`);
        if (savedFavs) {
            this.state.favorites = new Set(JSON.parse(savedFavs));
        } else {
            this.state.favorites = new Set();
        }
        this.updateFavCount();

        const savedCompleted = localStorage.getItem(`archive_completed_${this.state.username}`);
        if (savedCompleted) {
            this.state.completed = new Set(JSON.parse(savedCompleted));
        } else {
            this.state.completed = new Set();
        }
        
        const savedRatings = localStorage.getItem(`archive_ratings_${this.state.username}`);
        if (savedRatings) {
            this.state.ratings = JSON.parse(savedRatings);
        } else {
            this.state.ratings = {};
        }
        
        const savedPoints = localStorage.getItem(`archive_points_${this.state.username}`);
        if (savedPoints) {
            this.state.points = parseInt(savedPoints, 10);
        } else {
            this.state.points = 0;
        }
        this.dom.pointsValue.textContent = this.state.points;
        this.dom.pointsDisplay.style.display = 'block';

        const savedGoal = localStorage.getItem(`archive_goal_${this.state.username}`);
        if(savedGoal) {
            this.state.yearlyGoal = parseInt(savedGoal, 10);
        } else {
            this.state.yearlyGoal = 50;
        }

        this.updateStats();
        this.updateChartData();
        this.renderGrid();
    },

    login(username) {
        this.state.username = username;
        localStorage.setItem('archive_currentUser', username);
        
        // UI Switch
        this.dom.authScreen.style.display = 'none';
        this.dom.appContainer.style.display = 'block';
        
        this.dom.favLink.style.display = 'block';
        this.dom.goalsLink.style.display = 'block';
        this.loadUserData();
    },

    logout() {
        this.state.username = null;
        localStorage.removeItem('archive_currentUser');
        
       
        this.dom.authScreen.style.display = 'flex';
        this.dom.appContainer.style.display = 'none';
        this.dom.usernameInput.value = '';
        if(this.dom.passwordInput) this.dom.passwordInput.value = '';
        
        if (this.state.currentSection !== 'all') {
            this.showSection('all');
        }
        this.loadUserData();
    },

    
    getFilteredBooks() {
        let filtered = books;
        
        
        if (this.state.currentSection === 'favs') {
            filtered = filtered.filter(b => this.state.favorites.has(b.id));
        }

       
        if (this.state.searchQuery) {
            filtered = filtered.filter(b => 
                b.title.toLowerCase().includes(this.state.searchQuery) || 
                b.author.toLowerCase().includes(this.state.searchQuery)
            );
        }

       
        if (this.state.moodFilter !== 'all') {
            filtered = filtered.filter(b => b.mood === this.state.moodFilter);
        }

       
        if (this.state.genreFilter !== 'all') {
            filtered = filtered.filter(b => b.genre === this.state.genreFilter);
        }

        return filtered;
    },

    renderGrid() {
        const booksToRender = this.getFilteredBooks();
        this.dom.bookGrid.innerHTML = '';
        
        if (booksToRender.length === 0) {
            this.dom.bookGrid.style.display = 'none';
            this.dom.emptyState.style.display = 'block';
            return;
        }

        this.dom.bookGrid.style.display = 'grid';
        this.dom.emptyState.style.display = 'none';

        booksToRender.forEach(book => {
            const isFav = this.state.favorites.has(book.id);
            const card = document.createElement('article');
            card.className = 'book-card';
            card.onclick = () => this.openModal(book.id);
            
            const isCompleted = this.state.completed.has(book.id);
            
            const favIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
            const checkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

            const rating = this.state.ratings[book.id] || 0;
            const starsStr = rating > 0 ? '★'.repeat(rating) + '☆'.repeat(5 - rating) : '';

            card.draggable = true;
            card.dataset.id = book.id;
            
            card.addEventListener('dragstart', (e) => {
                card.classList.add('dragging');
                e.dataTransfer.setData('text/plain', book.id);
                
                if(this.state.currentSection === 'all') {
                    this.dom.shelfDropzone.classList.add('show');
                }
            });
            
            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
                if (this.dom.shelfDropzone) {
                    this.dom.shelfDropzone.classList.remove('show');
                }
            });

            card.innerHTML = `
                ${isFav ? '<div class="fav-badge">' + favIcon + '</div>' : ''}
                ${isCompleted ? '<div class="fav-badge" style="left: 10px; right: auto; background: rgba(46, 204, 113, 0.9); color: white;">' + checkIcon + '</div>' : ''}
                <div class="book-cover-container">
                    <img src="${book.image}" alt="Cover of ${book.title}" class="book-cover" loading="lazy">
                </div>
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    ${rating > 0 ? `<div class="book-rating">${starsStr}</div>` : ''}
                    <div class="book-tags">
                        <span class="tag mood-tag">${book.mood}</span>
                        <span class="tag genre-tag">${book.genre}</span>
                    </div>
                </div>
            `;
            this.dom.bookGrid.appendChild(card);
        });
    },

    showSection(section) {
        this.state.currentSection = section;
        
        
        this.dom.navBtns.forEach(btn => btn.classList.remove('active'));
        if(section === 'all') document.getElementById('allLink').classList.add('active');
        if(section === 'favs') document.getElementById('favLink').classList.add('active');
        if(section === 'goals') document.getElementById('goalsLink').classList.add('active');
        if(section === 'quiz') document.getElementById('quizLink').classList.add('active');

        this.dom.catalogSection.style.display = 'none';
        this.dom.catalogHeader.style.display = 'none';
        this.dom.goalsPage.style.display = 'none';
        this.dom.quizPage.style.display = 'none';

       
        if (section === 'goals') {
            this.dom.goalsPage.style.display = 'block';
            if(this.chart) this.chart.resize();
        } else if (section === 'quiz') {
            this.dom.quizPage.style.display = 'block';
            this.startQuiz();
        } else {
            this.dom.catalogSection.style.display = 'block';
            this.dom.catalogHeader.style.display = 'block';
            
            if (section === 'favs') {
                this.dom.pageTitle.textContent = "My Reading List";
                this.dom.pageTitle.nextElementSibling.textContent = "Your personal collection of curated literature.";
            } else {
                this.dom.pageTitle.textContent = "Browse the Collection";
                this.dom.pageTitle.nextElementSibling.textContent = "Discover literature curated perfectly for your current mood.";
            }
            
            this.renderGrid();
        }
    },

    
    startQuiz() {
        this.quizData = [
            {
                q: "How do you prefer your pacing?",
                answers: [
                    { text: "Fast and action-packed", mood: "Epic" },
                    { text: "Slow and contemplative", mood: "Deep Thinking" },
                    { text: "Atmospheric and brooding", mood: "Dark" }
                ]
            },
            {
                q: "What setting calls to you?",
                answers: [
                    { text: "A bustling, futuristic metropolis", genre: "Sci-Fi" },
                    { text: "A quiet, rainy town", mood: "Rainy" },
                    { text: "A grand, magical realm", genre: "Fantasy" }
                ]
            },
            {
                q: "What kind of protagonist do you enjoy?",
                answers: [
                    { text: "A rebellious outsider against the system", genre: "Dystopian" },
                    { text: "A passionate and hopeful dreamer", mood: "Romantic" },
                    { text: "A deeply complex, flawed individual", genre: "Literary" }
                ]
            },
            {
                q: "If you could time travel, where would you go?",
                answers: [
                    { text: "To a bygone era of elegance and manners", genre: "Classic" },
                    { text: "Back to a nostalgic and melancholic memory", mood: "Reflective" },
                    { text: "Into a grim, uncertain future", genre: "Dystopian" }
                ]
            }
        ];
        this.currentQuizStep = 0;
        this.quizScores = { moods: {}, genres: {} };
        this.renderQuizStep();
    },

    renderQuizStep() {
        if (this.currentQuizStep >= this.quizData.length) {
            this.finishQuiz();
            return;
        }

        const step = this.quizData[this.currentQuizStep];
        let html = `<h3 class="quiz-question">${step.q}</h3><div class="quiz-answers">`;
        
        step.answers.forEach((ans, idx) => {
            html += `<button class="quiz-btn" onclick="app.handleQuizAnswer(${idx})">${ans.text}</button>`;
        });
        
        html += `</div>`;
        this.dom.quizContainer.innerHTML = html;
    },

    handleQuizAnswer(idx) {
        const step = this.quizData[this.currentQuizStep];
        const ans = step.answers[idx];
        
        if (ans.mood) {
            this.quizScores.moods[ans.mood] = (this.quizScores.moods[ans.mood] || 0) + 1;
        }
        if (ans.genre) {
            this.quizScores.genres[ans.genre] = (this.quizScores.genres[ans.genre] || 0) + 1;
        }
        
        this.currentQuizStep++;
        this.renderQuizStep();
    },

    finishQuiz() {
   
        let bestMatch = books[0];
        let maxScore = -1;

        books.forEach(b => {
            let score = 0;
            if (this.quizScores.moods[b.mood]) score += 2;
            if (this.quizScores.genres[b.genre]) score += 1;
            
            if (score > maxScore) {
                maxScore = score;
                bestMatch = b;
            }
        });

        // Award points if logged in
        let rewardHtml = '';
        if (this.state.username) {
            this.state.points += 10;
            this.dom.pointsValue.textContent = this.state.points;
            this.saveStorage();
            rewardHtml = `<div class="quiz-reward-badge">+10 Points Earned!</div>`;
        } else {
            rewardHtml = `<p style="font-size:0.9rem; color:var(--text-secondary);">Log in to earn points next time!</p>`;
        }

        this.dom.quizContainer.innerHTML = `
            <div class="quiz-result">
                <h3>Your Recommended Read:</h3>
                <div style="max-width: 200px; margin: 1rem auto; cursor: pointer;" onclick="app.openModal(${bestMatch.id})">
                    <img src="${bestMatch.image}" style="width:100%; border-radius: 8px; box-shadow: var(--shadow-sm);">
                </div>
                <h2>${bestMatch.title}</h2>
                <p>by ${bestMatch.author}</p>
                ${rewardHtml}
                <button class="fav-action-btn" style="margin-top:1rem;" onclick="app.showSection('all')">Back to Catalog</button>
            </div>
        `;
    },

    
    openModal(id) {
        const book = books.find(b => b.id === id);
        if (!book) return;

        this.dom.modalImg.src = book.image;
        this.dom.modalTitle.textContent = book.title;
        this.dom.modalAuthor.textContent = `by ${book.author}`;
        this.dom.modalDesc.textContent = book.description;
        this.dom.modalMood.textContent = book.mood;
        this.dom.modalGenre.textContent = book.genre;
        this.dom.modalPages.textContent = book.pages;
        this.dom.modalYear.textContent = book.year;

       
        this.setupModalFavBtn(book.id);

        
        this.setupModalCompleteBtn(book.id);

        
        this.setupModalRatingBtn(book.id);

        this.dom.modal.classList.add('show');
        document.body.style.overflow = 'hidden'; 
    },

    closeModal(e) {
        if(e) e.preventDefault();
        this.dom.modal.classList.remove('show');
        document.body.style.overflow = '';
    },

    setupModalFavBtn(bookId) {
        let isFav = this.state.favorites.has(bookId);
        
        const updateBtnUI = () => {
            if (isFav) {
                this.dom.modalFavBtn.textContent = 'Remove from Reading List';
                this.dom.modalFavBtn.classList.add('is-fav');
            } else {
                this.dom.modalFavBtn.textContent = 'Add to Reading List';
                this.dom.modalFavBtn.classList.remove('is-fav');
            }
        };

        updateBtnUI();

       
        const newBtn = this.dom.modalFavBtn.cloneNode(true);
        this.dom.modalFavBtn.parentNode.replaceChild(newBtn, this.dom.modalFavBtn);
        this.dom.modalFavBtn = newBtn;

        this.dom.modalFavBtn.addEventListener('click', () => {
            if (!this.state.username) return;
            if (isFav) {
                this.state.favorites.delete(bookId);
            } else {
                this.state.favorites.add(bookId);
            }
            isFav = !isFav;
            
            this.updateFavCount();
            this.saveStorage();
            updateBtnUI();
            this.renderGrid(); 
        });
    },

    setupModalRatingBtn(bookId) {
        const currentRating = this.state.ratings[bookId] || 0;
        
        const renderStars = (rating) => {
            this.dom.stars.forEach((star, idx) => {
                if (idx < rating) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });
        };
        
        renderStars(currentRating);

      
        const newWidget = this.dom.ratingWidget.cloneNode(true);
        this.dom.ratingWidget.parentNode.replaceChild(newWidget, this.dom.ratingWidget);
        this.dom.ratingWidget = newWidget;
        this.dom.stars = newWidget.querySelectorAll('.star');

       
        this.dom.stars.forEach((star, idx) => {
            star.addEventListener('mouseover', () => renderStars(idx + 1));
            star.addEventListener('mouseout', () => renderStars(this.state.ratings[bookId] || 0));
            
            star.addEventListener('click', () => {
                if (!this.state.username) return;
                const newRating = idx + 1;
                this.state.ratings[bookId] = newRating;
                renderStars(newRating);
                this.saveStorage();
                this.renderGrid();
            });
        });
    },

    updateFavCount() {
        this.dom.favCount.textContent = this.state.favorites.size;
    },

    setupModalCompleteBtn(bookId) {
        let isCompleted = this.state.completed.has(bookId);
        
        const updateBtnUI = () => {
            if (isCompleted) {
                this.dom.modalCompleteBtn.textContent = 'Remove from Completed';
                this.dom.modalCompleteBtn.classList.add('is-fav');
            } else {
                this.dom.modalCompleteBtn.textContent = 'Mark as Completed';
                this.dom.modalCompleteBtn.classList.remove('is-fav');
            }
        };

        updateBtnUI();

       
        const newBtn = this.dom.modalCompleteBtn.cloneNode(true);
        this.dom.modalCompleteBtn.parentNode.replaceChild(newBtn, this.dom.modalCompleteBtn);
        this.dom.modalCompleteBtn = newBtn;

        this.dom.modalCompleteBtn.addEventListener('click', () => {
            if (!this.state.username) return;
            if (isCompleted) {
                this.state.completed.delete(bookId);
            } else {
                this.state.completed.add(bookId);
            }
            isCompleted = !isCompleted;
            
            this.updateStats();
            this.saveStorage();
            updateBtnUI();
            this.renderGrid(); 
            this.updateChartData();
        });
    },

    updateStats() {
        if (!this.dom.statBooksRead) return;
        
        let totalPages = 0;
        this.state.completed.forEach(id => {
            const book = books.find(b => b.id === id);
            if (book) totalPages += book.pages;
        });

        this.dom.statBooksRead.textContent = this.state.completed.size;
        if(this.dom.statYearlyGoal) {
            this.dom.statYearlyGoal.textContent = this.state.yearlyGoal;
        }
        
        this.dom.statPagesTurned.textContent = totalPages.toLocaleString();
        
       
        this.dom.statStreak.textContent = this.state.completed.size > 0 ? "1 Day" : "0 Days";
    },

    updateChartData() {
        if (!this.chart) return;
        
        const completedCount = this.state.completed.size;
        const baseData = [0, 0, 0, 0, 0, 0];
        
        const julyData = completedCount;
        
        this.chart.data.datasets[0].data = [...baseData, julyData];
        this.chart.update();
    },

    editGoal() {
        const currentGoal = this.state.yearlyGoal;
        const newGoalStr = prompt(`Set your yearly reading goal:`, currentGoal);
        if (newGoalStr !== null && newGoalStr.trim() !== '') {
            const parsed = parseInt(newGoalStr, 10);
            if (!isNaN(parsed) && parsed > 0) {
                this.state.yearlyGoal = parsed;
                this.saveStorage();
                this.updateStats();
            } else {
                alert("Please enter a valid positive number.");
            }
        }
    },

    
    toggleDarkMode(forceDark = null) {
        const isDark = forceDark !== null ? forceDark : !document.body.classList.contains('dark-mode');
        
        if (isDark) {
            document.body.classList.add('dark-mode');
            this.dom.iconSun.style.display = 'block';
            this.dom.iconMoon.style.display = 'none';
            if(this.dom.iconSunAuth) {
                this.dom.iconSunAuth.style.display = 'block';
                this.dom.iconMoonAuth.style.display = 'none';
            }
            localStorage.setItem('archive_theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            this.dom.iconSun.style.display = 'none';
            this.dom.iconMoon.style.display = 'block';
            if(this.dom.iconSunAuth) {
                this.dom.iconSunAuth.style.display = 'none';
                this.dom.iconMoonAuth.style.display = 'block';
            }
            localStorage.setItem('archive_theme', 'light');
        }

       
        if (this.chart) {
            this.updateChartTheme();
        }
    },

    
    initChart() {
        const ctx = document.getElementById('goalsChart').getContext('2d');
        
        
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        const data = [0, 0, 0, 0, 0, 0, this.state.completed.size];
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Books Read',
                    data: data,
                    borderColor: document.body.classList.contains('dark-mode') ? '#FCA311' : '#E63946',
                    backgroundColor: document.body.classList.contains('dark-mode') ? 'rgba(252, 163, 17, 0.1)' : 'rgba(230, 57, 70, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: document.body.classList.contains('dark-mode') ? '#FCA311' : '#E63946',
                    pointBorderColor: document.body.classList.contains('dark-mode') ? '#1E1E1E' : '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#2C313A',
                        titleFont: { family: "'Source Sans Pro', sans-serif" },
                        bodyFont: { family: "'Source Sans Pro', sans-serif" },
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)', drawBorder: false },
                        ticks: { stepSize: 2 }
                    },
                    x: {
                        grid: { display: false, drawBorder: false }
                    }
                }
            }
        });

        this.updateChartTheme();
    },

    updateChartTheme() {
        if (!this.chart) return;
        const isDark = document.body.classList.contains('dark-mode');
        const accent = isDark ? '#FCA311' : '#E63946';
        const bg = isDark ? 'rgba(252, 163, 17, 0.1)' : 'rgba(230, 57, 70, 0.1)';
        const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
        const textColor = isDark ? '#A0A0A0' : '#5C626F';
        const tooltipBg = isDark ? '#1E1E1E' : '#2C313A';
        const tooltipBorder = isDark ? '#333' : 'transparent';

        this.chart.data.datasets[0].borderColor = accent;
        this.chart.data.datasets[0].backgroundColor = bg;
        this.chart.data.datasets[0].pointBackgroundColor = accent;
        this.chart.data.datasets[0].pointBorderColor = isDark ? '#1E1E1E' : '#fff';
        
        this.chart.options.scales.x.ticks.color = textColor;
        this.chart.options.scales.y.ticks.color = textColor;
        this.chart.options.scales.y.grid.color = gridColor;

        this.chart.options.plugins.tooltip.backgroundColor = tooltipBg;
        this.chart.options.plugins.tooltip.borderColor = tooltipBorder;
        this.chart.options.plugins.tooltip.borderWidth = isDark ? 1 : 0;

        this.chart.update();
    }
};


document.addEventListener('DOMContentLoaded', () => app.init());
