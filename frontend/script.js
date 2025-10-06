// ===== NAVIGATION FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navAuth = document.querySelector('.nav-auth');
    
    hamburger?.addEventListener('click', function() {
        navMenu?.classList.toggle('active');
        navAuth?.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Navbar Background on Scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });
});

// ===== PRONUNCIATION PRACTICE FUNCTIONALITY =====
class PronunciationPractice {
    constructor() {
        this.isRecording = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.currentWord = 'Hello';
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.recordButton = document.querySelector('.btn-record');
        this.playButton = document.querySelector('.play-audio');
        this.targetWord = document.querySelector('.target-word');
        this.visualizerBars = document.querySelectorAll('.audio-visualizer .bar');
        this.scoreCircle = document.querySelector('.score');
        this.feedbackText = document.querySelector('.feedback-text p');
    }

    bindEvents() {
        // Record button events
        this.recordButton?.addEventListener('mousedown', () => this.startRecording());
        this.recordButton?.addEventListener('mouseup', () => this.stopRecording());
        this.recordButton?.addEventListener('mouseleave', () => this.stopRecording());
        
        // Touch events for mobile
        this.recordButton?.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startRecording();
        });
        this.recordButton?.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.stopRecording();
        });

        // Play audio button
        this.playButton?.addEventListener('click', () => this.playTargetAudio());
    }

    async startRecording() {
        if (this.isRecording) return;
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];
            
            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };
            
            this.mediaRecorder.onstop = () => {
                this.processRecording();
            };
            
            this.mediaRecorder.start();
            this.isRecording = true;
            
            // Update UI
            this.recordButton.innerHTML = '<i class="fas fa-stop"></i><span>Recording...</span>';
            this.recordButton.style.background = '#dc2626';
            this.startVisualizer();
            
        } catch (error) {
            console.error('Error accessing microphone:', error);
            this.showFeedback('Please allow microphone access to practice pronunciation.', 0);
        }
    }

    stopRecording() {
        if (!this.isRecording) return;
        
        this.mediaRecorder?.stop();
        this.mediaRecorder?.stream.getTracks().forEach(track => track.stop());
        this.isRecording = false;
        
        // Reset UI
        this.recordButton.innerHTML = '<i class="fas fa-microphone"></i><span>Hold to Record</span>';
        this.recordButton.style.background = '#ef4444';
        this.stopVisualizer();
    }

    processRecording() {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        
        // Simulate AI processing
        setTimeout(() => {
            const score = Math.floor(Math.random() * 30) + 70; // Random score 70-100
            const feedback = this.generateFeedback(score);
            this.showResults(score, feedback);
        }, 2000);
    }

    generateFeedback(score) {
        const feedbacks = {
            excellent: [
                "Excellent pronunciation! You sound like a native speaker.",
                "Perfect! Your pronunciation is crystal clear.",
                "Outstanding work! Keep up the great pronunciation."
            ],
            good: [
                "Great job! Your pronunciation is very clear with minor areas for improvement.",
                "Well done! You're pronouncing most sounds correctly.",
                "Good work! Just focus on a few specific sounds."
            ],
            average: [
                "Good effort! Try to emphasize the stressed syllables more clearly.",
                "Not bad! Work on the vowel sounds for better clarity.",
                "Keep practicing! Focus on the rhythm and stress patterns."
            ],
            needsWork: [
                "Keep practicing! Pay attention to the individual sounds.",
                "Good try! Focus on pronouncing each syllable clearly.",
                "Don't give up! Practice makes perfect."
            ]
        };

        let category;
        if (score >= 90) category = 'excellent';
        else if (score >= 80) category = 'good';
        else if (score >= 70) category = 'average';
        else category = 'needsWork';

        const feedbackArray = feedbacks[category];
        return feedbackArray[Math.floor(Math.random() * feedbackArray.length)];
    }

    showResults(score, feedback) {
        // Animate score
        this.animateScore(score);
        
        // Update feedback
        if (this.feedbackText) {
            this.feedbackText.textContent = feedback;
        }
        
        // Update score circle gradient
        const scoreCircle = document.querySelector('.score-circle');
        if (scoreCircle) {
            const percentage = score;
            const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';
            scoreCircle.style.background = `conic-gradient(${color} ${percentage}%, var(--bg-tertiary) ${percentage}%)`;
        }
    }

    animateScore(targetScore) {
        let currentScore = 0;
        const increment = targetScore / 30; // Animate over 30 frames
        
        const animateStep = () => {
            currentScore += increment;
            if (currentScore < targetScore) {
                if (this.scoreCircle) {
                    this.scoreCircle.textContent = Math.floor(currentScore);
                }
                requestAnimationFrame(animateStep);
            } else {
                if (this.scoreCircle) {
                    this.scoreCircle.textContent = targetScore;
                }
            }
        };
        
        requestAnimationFrame(animateStep);
    }

    playTargetAudio() {
        // Simulate playing target pronunciation
        this.playButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Playing';
        this.playButton.disabled = true;
        
        setTimeout(() => {
            this.playButton.innerHTML = '<i class="fas fa-volume-up"></i> Listen';
            this.playButton.disabled = false;
        }, 2000);
    }

    startVisualizer() {
        this.visualizerBars.forEach((bar, index) => {
            bar.style.animationDelay = `${index * 0.1}s`;
            bar.style.animationPlayState = 'running';
        });
    }

    stopVisualizer() {
        this.visualizerBars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
    }

    showFeedback(message, score) {
        if (this.feedbackText) {
            this.feedbackText.textContent = message;
        }
        if (this.scoreCircle) {
            this.scoreCircle.textContent = score;
        }
    }
}

// ===== LESSON FUNCTIONALITY =====
class LessonManager {
    constructor() {
        this.currentCategory = 'Beginner';
        this.initializeElements();
        this.bindEvents();
        this.loadLessons();
    }

    initializeElements() {
        this.categoryTabs = document.querySelectorAll('.tab-button');
        this.lessonsGrid = document.querySelector('.lessons-grid');
    }

    bindEvents() {
        this.categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchCategory(tab.textContent);
                
                // Update active tab
                this.categoryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });
    }

    switchCategory(category) {
        this.currentCategory = category;
        this.loadLessons();
    }

    loadLessons() {
        const lessons = this.getLessonsByCategory(this.currentCategory);
        this.renderLessons(lessons);
    }

    getLessonsByCategory(category) {
        const allLessons = {
            'Beginner': [
                {
                    id: 1,
                    title: 'Basic Greetings',
                    description: 'Learn essential greeting phrases for daily conversations',
                    level: 'A1',
                    duration: '15 min',
                    progress: 75,
                    status: 'in-progress'
                },
                {
                    id: 2,
                    title: 'Numbers & Time',
                    description: 'Master numbers, time expressions, and scheduling',
                    level: 'A1',
                    duration: '20 min',
                    progress: 0,
                    status: 'not-started'
                },
                {
                    id: 3,
                    title: 'Family & Friends',
                    description: 'Vocabulary and phrases about relationships',
                    level: 'A1',
                    duration: '25 min',
                    progress: 100,
                    status: 'completed'
                }
            ],
            'Intermediate': [
                {
                    id: 4,
                    title: 'Travel Conversations',
                    description: 'Essential phrases for traveling and tourism',
                    level: 'B1',
                    duration: '30 min',
                    progress: 45,
                    status: 'in-progress'
                },
                {
                    id: 5,
                    title: 'Job Interviews',
                    description: 'Professional vocabulary and interview skills',
                    level: 'B1',
                    duration: '35 min',
                    progress: 0,
                    status: 'not-started'
                }
            ],
            'Advanced': [
                {
                    id: 6,
                    title: 'Academic Writing',
                    description: 'Advanced writing techniques for academic purposes',
                    level: 'C1',
                    duration: '45 min',
                    progress: 20,
                    status: 'in-progress'
                }
            ],
            'Business': [
                {
                    id: 7,
                    title: 'Business Presentations',
                    description: 'Professional presentation skills and vocabulary',
                    level: 'B2',
                    duration: '40 min',
                    progress: 0,
                    status: 'not-started'
                }
            ]
        };

        return allLessons[category] || [];
    }

    renderLessons(lessons) {
        if (!this.lessonsGrid) return;

        this.lessonsGrid.innerHTML = lessons.map(lesson => `
            <div class="lesson-card" data-lesson-id="${lesson.id}">
                <div class="lesson-header">
                    <div class="lesson-level">${lesson.level}</div>
                    <div class="lesson-duration">
                        <i class="fas fa-clock"></i>
                        ${lesson.duration}
                    </div>
                </div>
                <h3>${lesson.title}</h3>
                <p>${lesson.description}</p>
                <div class="lesson-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${lesson.progress}%"></div>
                    </div>
                    <span>${this.getStatusText(lesson.status, lesson.progress)}</span>
                </div>
                <button class="btn-lesson ${lesson.status}" onclick="lessonManager.startLesson(${lesson.id})">
                    ${this.getButtonText(lesson.status)}
                </button>
            </div>
        `).join('');
    }

    getStatusText(status, progress) {
        switch(status) {
            case 'completed': return 'Completed';
            case 'in-progress': return `${progress}% Complete`;
            case 'not-started': return 'Not Started';
            default: return 'Available';
        }
    }

    getButtonText(status) {
        switch(status) {
            case 'completed': return '<i class="fas fa-check"></i> Completed';
            case 'in-progress': return 'Continue';
            case 'not-started': return 'Start';
            default: return 'Start';
        }
    }

    startLesson(lessonId) {
        console.log(`Starting lesson ${lessonId}`);
        // Here you would typically navigate to the lesson page
        alert(`Starting lesson ${lessonId}. This would navigate to the lesson interface.`);
    }
}

// ===== PROGRESS ANIMATIONS =====
class ProgressAnimations {
    constructor() {
        this.initializeIntersectionObserver();
    }

    initializeIntersectionObserver() {
        const options = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateProgressBars(entry.target);
                    this.animateSkillBars(entry.target);
                    this.animateCounters(entry.target);
                }
            });
        }, options);

        // Observe progress section
        const progressSection = document.querySelector('.progress-section');
        if (progressSection) {
            observer.observe(progressSection);
        }

        // Observe hero stats
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            observer.observe(heroStats);
        }
    }

    animateProgressBars(section) {
        const progressBars = section.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }

    animateSkillBars(section) {
        const skillBars = section.querySelectorAll('.skill-fill');
        skillBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 500 + (index * 200));
        });
    }

    animateCounters(section) {
        const counters = section.querySelectorAll('.stat-number, .score');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            let current = 0;
            const increment = target / 60; // 60 frames for smooth animation
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
}

// ===== THEME TOGGLE =====
class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.initializeTheme();
    }

    initializeTheme() {
        // Set default dark theme
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    const pronunciationPractice = new PronunciationPractice();
    const lessonManager = new LessonManager();
    const progressAnimations = new ProgressAnimations();
    const themeManager = new ThemeManager();
    
    // Make lessonManager globally accessible
    window.lessonManager = lessonManager;
    
    // Add some interactive enhancements
    addHoverEffects();
    addClickEffects();
    initializeTooltips();
});

// ===== ADDITIONAL ENHANCEMENTS =====
function addHoverEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .lesson-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function addClickEffects() {
    // Add click ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-lesson');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

function initializeTooltips() {
    // Simple tooltip functionality
    const elements = document.querySelectorAll('[data-tooltip]');
    elements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 + 'px';
            tooltip.style.top = rect.top - 40 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}