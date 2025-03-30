// DOM Elements
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');
const currentDateEl = document.getElementById('current-date');
const caloriesValue = document.getElementById('calories-value');
const caloriesProgress = document.getElementById('calories-progress');
const timeValue = document.getElementById('time-value');
const timeProgress = document.getElementById('time-progress');
const workoutsValue = document.getElementById('workouts-value');
const workoutHistory = document.getElementById('workout-history');
const workoutContainer = document.getElementById('workout-container');
const workoutModal = document.getElementById('workout-modal');
const closeModalBtn = document.querySelector('.close-modal');
const favoriteBtn = document.getElementById('favorite-workout');
const startWorkoutBtn = document.getElementById('start-workout');
const createWorkoutBtn = document.getElementById('create-workout');
const timerDisplay = document.querySelector('.timer-text');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startTimerBtn = document.getElementById('start-timer');
const pauseTimerBtn = document.getElementById('pause-timer');
const resetTimerBtn = document.getElementById('reset-timer');
const presetBtns = document.querySelectorAll('.preset-btn');
const timerFill = document.querySelector('.timer-fill');
const timerSound = document.getElementById('timer-sound');
const endSoundSelect = document.getElementById('end-sound');
const vibrationToggle = document.getElementById('vibration');
const remedySearch = document.getElementById('remedy-search');
const askAIBtn = document.getElementById('ask-ai');
const aiResponse = document.getElementById('ai-response');
const categoryCards = document.querySelectorAll('.category-card');
const connectSpotifyBtn = document.getElementById('connect-spotify');
const authorizeSpotifyBtn = document.getElementById('authorize-spotify');
const spotifyModal = document.getElementById('spotify-modal');
const musicPlayer = document.getElementById('music-player');
const playPauseBtn = document.getElementById('play-pause');
const prevTrackBtn = document.getElementById('prev-track');
const nextTrackBtn = document.getElementById('next-track');
const currentTrack = document.getElementById('current-track');
const currentArtist = document.getElementById('current-artist');
const currentCover = document.getElementById('current-cover');
const musicProgress = document.getElementById('music-progress');
const currentTime = document.getElementById('current-time');
const totalTime = document.getElementById('total-time');
const volumeSlider = document.getElementById('volume-slider');
const playlistContainer = document.getElementById('playlist-container');
const loadingOverlay = document.getElementById('loading-overlay');
const notificationToast = document.getElementById('notification-toast');
const toastMessage = document.getElementById('toast-message');
const toastClose = document.querySelector('.toast-close');

// App State
let state = {
    activeSection: 'dashboard',
    workouts: [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    workoutHistory: JSON.parse(localStorage.getItem('workoutHistory')) || [],
    stats: {
        calories: 0,
        time: 0,
        workouts: 0
    },
    timer: {
        minutes: 25,
        seconds: 0,
        isRunning: false,
        interval: null,
        totalSeconds: 1500,
        initialSeconds: 1500
    },
    spotify: {
        player: null,
        deviceId: null,
        isConnected: false,
        currentTrack: null,
        isPlaying: false
    },
    aiRemedies: {
        currentCategory: null
    }
};

// Initialize the app
function init() {
    // Set current date
    updateDate();
    
    // Load workouts
    loadWorkouts();
    
    // Load stats from localStorage
    loadStats();
    
    // Initialize event listeners
    setupEventListeners();
    
    // Initialize particles.js
    particlesJS.load('particles-js', 'assets/particles.json', function() {
        console.log('Particles.js loaded');
    });
    
    // Initialize Spotify Web Playback SDK if token exists
    if (localStorage.getItem('spotifyAccessToken')) {
        connectSpotify();
    }
    
    // Show initial AI message
    showInitialAIMessage();
}

// Update current date display
function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateEl.textContent = now.toLocaleDateString('en-US', options);
}

// Load sample workouts
function loadWorkouts() {
    // Sample workout data
    const sampleWorkouts = [
        {
            id: 1,
            title: 'Morning Stretch',
            difficulty: 'beginner',
            duration: 10,
            calories: 80,
            description: 'A gentle routine to wake up your body and improve flexibility.',
            image: 'assets/workouts/morning-stretch.jpg',
            exercises: [
                { name: 'Neck Rolls', duration: '1 min' },
                { name: 'Shoulder Stretch', duration: '1 min' },
                { name: 'Side Stretch', duration: '1 min' },
                { name: 'Forward Fold', duration: '1 min' },
                { name: 'Cat-Cow', duration: '2 min' },
                { name: 'Child\'s Pose', duration: '2 min' },
                { name: 'Seated Twist', duration: '2 min' }
            ]
        },
        {
            id: 2,
            title: 'Full Body Burn',
            difficulty: 'intermediate',
            duration: 30,
            calories: 300,
            description: 'A comprehensive workout targeting all major muscle groups for maximum calorie burn.',
            image: 'assets/workouts/full-body.jpg',
            exercises: [
                { name: 'Jumping Jacks', duration: '1 min' },
                { name: 'Squats', duration: '3 min' },
                { name: 'Push-ups', duration: '3 min' },
                { name: 'Lunges', duration: '3 min' },
                { name: 'Plank', duration: '1 min' },
                { name: 'Burpees', duration: '3 min' },
                { name: 'Mountain Climbers', duration: '3 min' },
                { name: 'Bicycle Crunches', duration: '3 min' },
                { name: 'Superman', duration: '2 min' },
                { name: 'Cool Down Stretch', duration: '5 min' }
            ]
        },
        {
            id: 3,
            title: 'HIIT Challenge',
            difficulty: 'advanced',
            duration: 20,
            calories: 350,
            description: 'High-intensity interval training to boost metabolism and endurance.',
            image: 'assets/workouts/hiit.jpg',
            exercises: [
                { name: 'Warm-up Jog', duration: '2 min' },
                { name: 'Sprint in Place', duration: '30 sec' },
                { name: 'Rest', duration: '30 sec' },
                { name: 'Jump Squats', duration: '30 sec' },
                { name: 'Rest', duration: '30 sec' },
                { name: 'Burpees', duration: '30 sec' },
                { name: 'Rest', duration: '30 sec' },
                { name: 'Mountain Climbers', duration: '30 sec' },
                { name: 'Rest', duration: '30 sec' },
                { name: 'High Knees', duration: '30 sec' },
                { name: 'Rest', duration: '30 sec' },
                { name: 'Plank Jacks', duration: '30 sec' },
                { name: 'Cool Down', duration: '2 min' }
            ]
        },
        {
            id: 4,
            title: 'Yoga Flow',
            difficulty: 'beginner',
            duration: 25,
            calories: 150,
            description: 'A calming yoga sequence to improve flexibility and reduce stress.',
            image: 'assets/workouts/yoga.jpg',
            exercises: [
                { name: 'Mountain Pose', duration: '1 min' },
                { name: 'Forward Fold', duration: '1 min' },
                { name: 'Plank Pose', duration: '1 min' },
                { name: 'Downward Dog', duration: '2 min' },
                { name: 'Warrior I', duration: '2 min each side' },
                { name: 'Warrior II', duration: '2 min each side' },
                { name: 'Tree Pose', duration: '2 min each side' },
                { name: 'Child\'s Pose', duration: '2 min' },
                { name: 'Corpse Pose', duration: '5 min' }
            ]
        },
        {
            id: 5,
            title: 'Core Crusher',
            difficulty: 'intermediate',
            duration: 15,
            calories: 200,
            description: 'Target your abs and obliques with this intense core workout.',
            image: 'assets/workouts/core.jpg',
            exercises: [
                { name: 'Plank', duration: '1 min' },
                { name: 'Bicycle Crunches', duration: '2 min' },
                { name: 'Russian Twists', duration: '2 min' },
                { name: 'Leg Raises', duration: '2 min' },
                { name: 'Flutter Kicks', duration: '2 min' },
                { name: 'Mountain Climbers', duration: '2 min' },
                { name: 'Side Plank', duration: '1 min each side' },
                { name: 'Superman', duration: '1 min' }
            ]
        },
        {
            id: 6,
            title: 'Leg Day',
            difficulty: 'advanced',
            duration: 40,
            calories: 450,
            description: 'Build strength and endurance in your lower body with this challenging routine.',
            image: 'assets/workouts/legs.jpg',
            exercises: [
                { name: 'Warm-up Jog', duration: '5 min' },
                { name: 'Squats', duration: '5 min' },
                { name: 'Lunges', duration: '5 min' },
                { name: 'Wall Sit', duration: '2 min' },
                { name: 'Calf Raises', duration: '3 min' },
                { name: 'Step-ups', duration: '5 min' },
                { name: 'Glute Bridges', duration: '3 min' },
                { name: 'Jump Squats', duration: '3 min' },
                { name: 'Cool Down Stretch', duration: '5 min' }
            ]
        }
    ];

    state.workouts = sampleWorkouts;
    renderWorkouts();
    renderWorkoutHistory();
}

// Render workouts to the grid
function renderWorkouts(filter = 'all') {
    workoutContainer.innerHTML = '';
    
    state.workouts.forEach(workout => {
        // Skip if filter doesn't match
        if (filter !== 'all' && workout.difficulty !== filter && filter !== 'favorites') {
            return;
        }
        
        // Skip if filter is favorites and workout isn't favorited
        if (filter === 'favorites' && !state.favorites.includes(workout.id)) {
            return;
        }
        
        const isFavorite = state.favorites.includes(workout.id);
        
        const workoutCard = document.createElement('div');
        workoutCard.className = 'workout-card pulse-on-hover';
        workoutCard.innerHTML = `
            <div class="workout-image" style="background-image: url(${workout.image})">
                <div class="workout-overlay">
                    <span class="workout-level ${workout.difficulty}">${workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1)}</span>
                </div>
            </div>
            <div class="workout-info">
                <h3 class="workout-title">${workout.title}</h3>
                <div class="workout-meta">
                    <span><i class="far fa-clock"></i> ${workout.duration} min</span>
                    <span><i class="fas fa-fire"></i> ${workout.calories} kcal</span>
                </div>
                <div class="workout-actions">
                    <button class="btn-secondary view-workout" data-id="${workout.id}">View</button>
                    <button class="btn-primary start-workout" data-id="${workout.id}">Start</button>
                </div>
            </div>
            ${isFavorite ? '<div class="workout-badge"><i class="fas fa-heart"></i></div>' : ''}
        `;
        
        workoutContainer.appendChild(workoutCard);
    });
    
    // Add event listeners to the new buttons
    document.querySelectorAll('.view-workout').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            openWorkoutModal(id);
        });
    });
    
    document.querySelectorAll('.start-workout').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            startWorkout(id);
        });
    });
}

// Open workout modal
function openWorkoutModal(id) {
    const workout = state.workouts.find(w => w.id === id);
    if (!workout) return;
    
    // Update modal content
    document.getElementById('modal-workout-title').textContent = workout.title;
    document.getElementById('modal-workout-difficulty').textContent = workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1);
    document.getElementById('modal-workout-difficulty').className = `workout-difficulty ${workout.difficulty}`;
    document.getElementById('modal-workout-duration').innerHTML = `<i class="far fa-clock"></i> ${workout.duration} min`;
    document.getElementById('modal-workout-description').textContent = workout.description;
    
    // Set workout image
    const modalImage = document.getElementById('modal-workout-image');
    modalImage.style.backgroundImage = `url(${workout.image})`;
    
    // Render exercises
    const exercisesList = document.getElementById('modal-workout-exercises');
    exercisesList.innerHTML = '';
    
    workout.exercises.forEach(exercise => {
        const exerciseItem = document.createElement('div');
        exerciseItem.className = 'exercise-item';
        exerciseItem.innerHTML = `
            <div class="exercise-name">${exercise.name}</div>
            <div class="exercise-duration">${exercise.duration}</div>
        `;
        exercisesList.appendChild(exerciseItem);
    });
    
    // Update favorite button
    const isFavorite = state.favorites.includes(workout.id);
    favoriteBtn.innerHTML = isFavorite ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    favoriteBtn.className = isFavorite ? 'favorite-btn favorited' : 'favorite-btn';
    
    // Set data-id on start workout button
    startWorkoutBtn.dataset.id = workout.id;
    
    // Show modal
    workoutModal.classList.add('active');
}

// Close workout modal
function closeWorkoutModal() {
    workoutModal.classList.remove('active');
}

// Toggle workout favorite status
function toggleFavorite(id) {
    const index = state.favorites.indexOf(id);
    
    if (index === -1) {
        // Add to favorites
        state.favorites.push(id);
        showNotification('Added to favorites');
    } else {
        // Remove from favorites
        state.favorites.splice(index, 1);
        showNotification('Removed from favorites');
    }
    
    // Save to localStorage
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
    
    // Update UI
    if (workoutModal.classList.contains('active')) {
        const currentId = parseInt(startWorkoutBtn.dataset.id);
        if (currentId === id) {
            const isFavorite = state.favorites.includes(id);
            favoriteBtn.innerHTML = isFavorite ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
            favoriteBtn.className = isFavorite ? 'favorite-btn favorited' : 'favorite-btn';
        }
    }
    
    // Re-render workouts if on favorites filter
    const activeFilter = document.querySelector('.filter-btn.active');
    if (activeFilter && activeFilter.dataset.filter === 'favorites') {
        renderWorkouts('favorites');
    }
}

// Start a workout
function startWorkout(id) {
    const workout = state.workouts.find(w => w.id === id);
    if (!workout) return;
    
    // Close modal if open
    closeWorkoutModal();
    
    // Set timer to workout duration
    state.timer.minutes = workout.duration;
    state.timer.seconds = 0;
    state.timer.totalSeconds = workout.duration * 60;
    state.timer.initialSeconds = workout.duration * 60;
    updateTimerDisplay();
    
    // Update timer workout info
    document.getElementById('timer-workout-info').innerHTML = `
        <h3>${workout.title}</h3>
        <p>${workout.description}</p>
    `;
    
    // Switch to timer section
    switchSection('timer');
    
    // Show notification
    showNotification(`Starting ${workout.title} workout`);
    
    // Start timer automatically
    startTimer();
}

// Complete a workout
function completeWorkout(workoutId, duration, calories) {
    // Add to history
    const workout = state.workouts.find(w => w.id === workoutId);
    if (!workout) return;
    
    const now = new Date();
    const historyItem = {
        id: Date.now(),
        workoutId: workoutId,
        name: workout.title,
        date: now.toISOString(),
        duration: duration,
        calories: calories
    };
    
    state.workoutHistory.unshift(historyItem);
    localStorage.setItem('workoutHistory', JSON.stringify(state.workoutHistory));
    
    // Update stats
    state.stats.calories += calories;
    state.stats.time += duration;
    state.stats.workouts += 1;
    saveStats();
    updateStatsDisplay();
    
    // Render updated history
    renderWorkoutHistory();
}

// Render workout history
function renderWorkoutHistory() {
    if (state.workoutHistory.length === 0) {
        workoutHistory.innerHTML = `
            <div class="empty-history">
                <i class="fas fa-history"></i>
                <p>No workout history yet</p>
            </div>
        `;
        return;
    }
    
    workoutHistory.innerHTML = '';
    
    // Show only the last 5 workouts
    const recentWorkouts = state.workoutHistory.slice(0, 5);
    
    recentWorkouts.forEach(item => {
        const workout = document.createElement('div');
        workout.className = 'workout-item pulse-on-hover';
        
        const date = new Date(item.date);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        workout.innerHTML = `
            <div class="workout-icon">
                <i class="fas fa-fire"></i>
            </div>
            <div class="workout-details">
                <div class="workout-name">${item.name}</div>
                <div class="workout-meta">
                    <span><i class="far fa-calendar"></i> ${formattedDate}</span>
                    <span><i class="far fa-clock"></i> ${item.duration} min</span>
                    <span class="workout-calories"><i class="fas fa-fire"></i> ${item.calories} kcal</span>
                </div>
            </div>
        `;
        
        workoutHistory.appendChild(workout);
    });
}

// Create custom workout
function createCustomWorkout() {
    const name = document.getElementById('workout-name').value;
    const difficulty = document.getElementById('workout-difficulty').value;
    const duration = parseInt(document.getElementById('workout-duration').value);
    
    if (!name || !duration) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Estimate calories based on duration and difficulty
    let calories;
    if (difficulty === 'beginner') {
        calories = Math.round(duration * 5);
    } else if (difficulty === 'intermediate') {
        calories = Math.round(duration * 8);
    } else {
        calories = Math.round(duration * 12);
    }
    
    // Create new workout
    const newWorkout = {
        id: Date.now(),
        title: name,
        difficulty: difficulty,
        duration: duration,
        calories: calories,
        description: 'Your custom created workout routine.',
        image: 'assets/workouts/custom.jpg',
        exercises: [
            { name: 'Custom Exercise 1', duration: `${Math.floor(duration/3)} min` },
            { name: 'Custom Exercise 2', duration: `${Math.floor(duration/3)} min` },
            { name: 'Custom Exercise 3', duration: `${Math.floor(duration/3)} min` }
        ]
    };
    
    // Add to workouts
    state.workouts.unshift(newWorkout);
    
    // Clear form
    document.getElementById('workout-name').value = '';
    document.getElementById('workout-duration').value = '';
    
    // Render workouts
    renderWorkouts();
    
    // Show notification
    showNotification('Custom workout created!');
}

// Timer functions
function startTimer() {
    if (state.timer.isRunning) return;
    
    state.timer.isRunning = true;
    startTimerBtn.disabled = true;
    pauseTimerBtn.disabled = false;
    
    state.timer.interval = setInterval(() => {
        if (state.timer.seconds === 0) {
            if (state.timer.minutes === 0) {
                // Timer completed
                timerComplete();
                return;
            }
            state.timer.minutes--;
            state.timer.seconds = 59;
        } else {
            state.timer.seconds--;
        }
        
        state.timer.totalSeconds--;
        updateTimerDisplay();
    }, 1000);
}

function pauseTimer() {
    if (!state.timer.isRunning) return;
    
    clearInterval(state.timer.interval);
    state.timer.isRunning = false;
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
}

function resetTimer() {
    pauseTimer();
    state.timer.minutes = Math.floor(state.timer.initialSeconds / 60);
    state.timer.seconds = state.timer.initialSeconds % 60;
    state.timer.totalSeconds = state.timer.initialSeconds;
    updateTimerDisplay();
}

function timerComplete() {
    pauseTimer();
    
    // Play sound
    playTimerSound();
    
    // Vibrate if enabled
    if (vibrationToggle.checked && 'vibrate' in navigator) {
        navigator.vibrate([200, 100, 200, 100, 200]);
    }
    
    // Show notification
    showNotification('Workout completed! Great job!');
    
    // If this was a specific workout, mark it as completed
    const workoutInfo = document.getElementById('timer-workout-info').querySelector('h3');
    if (workoutInfo && workoutInfo.textContent !== 'Custom Timer') {
        const workoutTitle = workoutInfo.textContent;
        const workout = state.workouts.find(w => w.title === workoutTitle);
        if (workout) {
            completeWorkout(workout.id, workout.duration, workout.calories);
        }
    }
}

function updateTimerDisplay() {
    minutesDisplay.textContent = state.timer.minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = state.timer.seconds.toString().padStart(2, '0');
    
    // Update circular progress
    const circumference = 283;
    const offset = circumference - (state.timer.totalSeconds / state.timer.initialSeconds) * circumference;
    timerFill.style.strokeDashoffset = offset;
}

function setTimerPreset(minutes) {
    state.timer.minutes = minutes;
    state.timer.seconds = 0;
    state.timer.totalSeconds = minutes * 60;
    state.timer.initialSeconds = minutes * 60;
    updateTimerDisplay();
    
    // Reset workout info for custom timer
    document.getElementById('timer-workout-info').innerHTML = `
        <h3>Custom Timer</h3>
        <p>Set your own workout duration</p>
    `;
}

function playTimerSound() {
    const sound = endSoundSelect.value;
    timerSound.src = `assets/sounds/${sound}.mp3`;
    timerSound.play();
}

// AI Remedies functions
function showInitialAIMessage() {
    aiResponse.innerHTML = `
        <div class="ai-thinking">
            <i class="fas fa-robot"></i>
            <p>Ask me about home remedies for any health concern</p>
        </div>
    `;
}

function getAIResponse(query, category = null) {
    showLoading('AI is thinking...');
    
    // Simulate API call with timeout
    setTimeout(() => {
        hideLoading();
        
        // Sample responses based on category or query
        let response;
        
        if (category) {
            switch (category) {
                case 'pain-relief':
                    response = `
                        <h4>Natural Pain Relief Remedies</h4>
                        <ul>
                            <li><strong>Turmeric:</strong> Contains curcumin which has strong anti-inflammatory properties. Mix 1 tsp turmeric powder with warm milk.</li>
                            <li><strong>Ginger tea:</strong> Boil fresh ginger slices in water for 10 minutes. Drink 2-3 times daily.</li>
                            <li><strong>Epsom salt bath:</strong> Add 2 cups of Epsom salt to warm bath water and soak for 20 minutes.</li>
                            <li><strong>Peppermint oil:</strong> Dilute with carrier oil and massage onto painful areas.</li>
                        </ul>
                        <p>For chronic pain, consider regular gentle exercise like yoga or swimming.</p>
                    `;
                    break;
                case 'immunity':
                    response = `
                        <h4>Immunity Boosting Remedies</h4>
                        <ul>
                            <li><strong>Vitamin C:</strong> Eat citrus fruits, bell peppers, and leafy greens daily.</li>
                            <li><strong>Garlic:</strong> Contains allicin which has immune-boosting properties. Eat 1-2 raw cloves daily.</li>
                            <li><strong>Turmeric milk:</strong> Warm milk with turmeric and black pepper before bed.</li>
                            <li><strong>Probiotics:</strong> Consume yogurt, kefir, or fermented foods to support gut health.</li>
                        </ul>
                        <p>Also ensure adequate sleep (7-9 hours) and manage stress levels.</p>
                    `;
                    break;
                case 'digestion':
                    response = `
                        <h4>Digestive Health Remedies</h4>
                        <ul>
                            <li><strong>Peppermint tea:</strong> Soothes stomach muscles and improves bile flow.</li>
                            <li><strong>Ginger:</strong> Chew a small piece of fresh ginger before meals to stimulate digestion.</li>
                            <li><strong>Fennel seeds:</strong> Chew 1 tsp after meals to reduce bloating and gas.</li>
                            <li><strong>Probiotic foods:</strong> Include yogurt, kimchi, and sauerkraut in your diet.</li>
                        </ul>
                        <p>Stay hydrated and eat fiber-rich foods for regular bowel movements.</p>
                    `;
                    break;
                case 'stress':
                    response = `
                        <h4>Stress Relief Remedies</h4>
                        <ul>
                            <li><strong>Chamomile tea:</strong> Has calming properties. Drink 1-2 cups daily.</li>
                            <li><strong>Deep breathing:</strong> Practice 4-7-8 breathing (inhale 4s, hold 7s, exhale 8s).</li>
                            <li><strong>Lavender oil:</strong> Add to diffuser or dilute and apply to temples.</li>
                            <li><strong>Meditation:</strong> Even 5-10 minutes daily can significantly reduce stress.</li>
                        </ul>
                        <p>Regular exercise and maintaining a consistent sleep schedule also help.</p>
                    `;
                    break;
                case 'sleep':
                    response = `
                        <h4>Sleep Improvement Remedies</h4>
                        <ul>
                            <li><strong>Warm milk with honey:</strong> Contains tryptophan which promotes sleep.</li>
                            <li><strong>Chamomile tea:</strong> Drink 1 hour before bedtime.</li>
                            <li><strong>Magnesium-rich foods:</strong> Include almonds, spinach, and pumpkin seeds in dinner.</li>
                            <li><strong>Relaxation routine:</strong> Create a calming pre-sleep ritual like reading or light stretching.</li>
                        </ul>
                        <p>Avoid screens 1 hour before bed and keep bedroom cool and dark.</p>
                    `;
                    break;
                default:
                    response = `<p>I don't have specific remedies for that category yet. Try asking about pain relief, immunity, digestion, stress, or sleep.</p>`;
            }
        } else {
            // Generic response for custom queries
            response = `
                <h4>Natural Remedies for "${query}"</h4>
                <p>While I'm a simplified AI and can't provide medical advice, here are some general natural approaches that might help:</p>
                <ul>
                    <li><strong>Hydration:</strong> Drink plenty of water throughout the day.</li>
                    <li><strong>Balanced diet:</strong> Focus on whole foods, fruits, and vegetables.</li>
                    <li><strong>Rest:</strong> Ensure adequate sleep and relaxation.</li>
                    <li><strong>Gentle exercise:</strong> Activities like walking or yoga can help.</li>
                </ul>
                <p>For persistent issues, please consult with a healthcare professional.</p>
            `;
        }
        
        aiResponse.innerHTML = response;
    }, 1500);
}

// Spotify integration
function connectSpotify() {
    // Check if we already have a token
    const token = localStorage.getItem('spotifyAccessToken');
    if (token) {
        initializeSpotifyPlayer(token);
        return;
    }
    
    // Show authorization modal
    spotifyModal.classList.add('active');
}

function authorizeSpotify() {
    // In a real app, you would redirect to Spotify's authorization page
    // For this demo, we'll simulate it
    
    showLoading('Connecting to Spotify...');
    
    // Simulate authorization flow
    setTimeout(() => {
        hideLoading();
        spotifyModal.classList.remove('active');
        
        // Generate a mock access token
        const mockToken = 'mock-spotify-access-token-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('spotifyAccessToken', mockToken);
        
        // Initialize player
        initializeSpotifyPlayer(mockToken);
        
        // Update UI
        document.getElementById('spotify-connect').innerHTML = `
            <div class="connected-status">
                <i class="fab fa-spotify"></i>
                <span>Connected to Spotify</span>
            </div>
        `;
        
        showNotification('Successfully connected to Spotify');
    }, 2000);
}

function initializeSpotifyPlayer(token) {
    // In a real app, you would initialize the Spotify Web Playback SDK here
    // For this demo, we'll mock the player functionality
    
    state.spotify.isConnected = true;
    state.spotify.deviceId = 'mock-device-id-' + Math.random().toString(36).substr(2, 6);
    
    // Mock player controls
    state.spotify.player = {
        play: () => {
            state.spotify.isPlaying = true;
            musicPlayer.classList.add('playing');
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            updateMockPlayback();
        },
        pause: () => {
            state.spotify.isPlaying = false;
            musicPlayer.classList.remove('playing');
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            clearInterval(state.spotify.playbackInterval);
        },
        nextTrack: () => {
            const currentIndex = mockPlaylists.findIndex(p => p.id === state.spotify.currentTrack?.playlistId);
            const currentPlaylist = mockPlaylists[currentIndex];
            const trackIndex = currentPlaylist.tracks.findIndex(t => t.id === state.spotify.currentTrack?.id);
            
            if (trackIndex < currentPlaylist.tracks.length - 1) {
                // Play next track in playlist
                playMockTrack(currentPlaylist.id, trackIndex + 1);
            } else if (currentIndex < mockPlaylists.length - 1) {
                // Move to next playlist
                playMockTrack(mockPlaylists[currentIndex + 1].id, 0);
            }
        },
        previousTrack: () => {
            const currentIndex = mockPlaylists.findIndex(p => p.id === state.spotify.currentTrack?.playlistId);
            const currentPlaylist = mockPlaylists[currentIndex];
            const trackIndex = currentPlaylist.tracks.findIndex(t => t.id === state.spotify.currentTrack?.id);
            
            if (trackIndex > 0) {
                // Play previous track in playlist
                playMockTrack(currentPlaylist.id, trackIndex - 1);
            } else if (currentIndex > 0) {
                // Move to previous playlist
                playMockTrack(mockPlaylists[currentIndex - 1].id, mockPlaylists[currentIndex - 1].tracks.length - 1);
            }
        }
    };
    
    // Update UI
    document.getElementById('spotify-connect').innerHTML = `
        <div class="connected-status">
            <i class="fab fa-spotify"></i>
            <span>Connected to Spotify</span>
        </div>
    `;
    
    // Load mock playlists
    loadMockPlaylists();
}

// Mock Spotify data
const mockPlaylists = [
    {
        id: 'workout-energy',
        name: 'Workout Energy',
        description: 'High-energy tracks to power your workout',
        image: 'assets/playlists/workout.jpg',
        tracks: [
            {
                id: 'track1',
                name: 'Power Up',
                artist: 'Energy Boost',
                duration: 186,
                image: 'assets/playlists/workout.jpg'
            },
            {
                id: 'track2',
                name: 'Run This Town',
                artist: 'Cardio Beats',
                duration: 214,
                image: 'assets/playlists/workout.jpg'
            },
            {
                id: 'track3',
                name: 'Stronger',
                artist: 'Fitness Mix',
                duration: 198,
                image: 'assets/playlists/workout.jpg'
            }
        ]
    },
    {
        id: 'yoga-meditation',
        name: 'Yoga & Meditation',
        description: 'Calming music for yoga and meditation',
        image: 'assets/playlists/yoga.jpg',
        tracks: [
            {
                id: 'track4',
                name: 'Peaceful Mind',
                artist: 'Zen Sounds',
                duration: 326,
                image: 'assets/playlists/yoga.jpg'
            },
            {
                id: 'track5',
                name: 'Morning Sun',
                artist: 'Nature Beats',
                duration: 278,
                image: 'assets/playlists/yoga.jpg'
            }
        ]
    },
    {
        id: 'running-motivation',
        name: 'Running Motivation',
        description: 'Upbeat tracks to keep you moving',
        image: 'assets/playlists/running.jpg',
        tracks: [
            {
                id: 'track6',
                name: 'On The Move',
                artist: 'Run Club',
                duration: 203,
                image: 'assets/playlists/running.jpg'
            },
            {
                id: 'track7',
                name: 'Faster',
                artist: 'Cardio Mix',
                duration: 194,
                image: 'assets/playlists/running.jpg'
            }
        ]
    }
];

function loadMockPlaylists() {
    playlistContainer.innerHTML = '';
    
    mockPlaylists.forEach(playlist => {
        const playlistCard = document.createElement('div');
        playlistCard.className = 'playlist-card pulse-on-hover';
        playlistCard.innerHTML = `
            <div class="playlist-image" style="background-image: url(${playlist.image})">
                <div class="playlist-overlay">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="playlist-info">
                <h3 class="playlist-title">${playlist.name}</h3>
                <p class="playlist-tracks">${playlist.tracks.length} tracks</p>
            </div>
        `;
        
        playlistCard.addEventListener('click', () => {
            playMockTrack(playlist.id, 0);
        });
        
        playlistContainer.appendChild(playlistCard);
    });
}

function playMockTrack(playlistId, trackIndex) {
    const playlist = mockPlaylists.find(p => p.id === playlistId);
    if (!playlist || !playlist.tracks[trackIndex]) return;
    
    const track = playlist.tracks[trackIndex];
    state.spotify.currentTrack = {
        ...track,
        playlistId: playlist.id,
        currentPosition: 0
    };
    
    // Update UI
    currentTrack.textContent = track.name;
    currentArtist.textContent = track.artist;
    currentCover.style.backgroundImage = `url(${track.image})`;
    totalTime.textContent = formatTime(track.duration);
    
    // Start playback
    if (state.spotify.isPlaying) {
        state.spotify.player.pause();
        state.spotify.player.play();
    }
}

function updateMockPlayback() {
    if (!state.spotify.isPlaying || !state.spotify.currentTrack) return;
    
    const track = state.spotify.currentTrack;
    
    // Update progress
    state.spotify.playbackInterval = setInterval(() => {
        track.currentPosition += 1;
        currentTime.textContent = formatTime(track.currentPosition);
        
        // Update progress bar
        const progressPercent = (track.currentPosition / track.duration) * 100;
        musicProgress.style.width = `${progressPercent}%`;
        
        // If track ended, play next
        if (track.currentPosition >= track.duration) {
            state.spotify.player.nextTrack();
        }
    }, 1000);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Stats functions
function loadStats() {
    const savedStats = localStorage.getItem('fitnessStats');
    if (savedStats) {
        state.stats = JSON.parse(savedStats);
    }
    updateStatsDisplay();
}

function saveStats() {
    localStorage.setItem('fitnessStats', JSON.stringify(state.stats));
}

function updateStatsDisplay() {
    // Update calories
    caloriesValue.textContent = state.stats.calories;
    caloriesProgress.style.width = `${Math.min(state.stats.calories / 2000 * 100, 100)}%`;
    
    // Update time
    timeValue.textContent = state.stats.time;
    timeProgress.style.width = `${Math.min(state.stats.time / 300 * 100, 100)}%`;
    
    // Update workouts
    const workoutPercentage = Math.min(state.stats.workouts / 5 * 100, 100);
    workoutsValue.textContent = `${workoutPercentage.toFixed(0)}%`;
    
    // Update circular progress
    const circumference = 219.8;
    const offset = circumference - (workoutPercentage / 100) * circumference;
    document.querySelector('.progress-ring-circle').style.strokeDashoffset = offset;
}

// UI Helpers
function switchSection(sectionId) {
    // Update active nav link
    navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
            link.querySelector('.nav-indicator').style.opacity = '1';
        } else {
            link.classList.remove('active');
            link.querySelector('.nav-indicator').style.opacity = '0';
        }
    });
    
    // Update active section
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
    
    state.activeSection = sectionId;
}

function showNotification(message, type = 'success') {
    const toastIcon = notificationToast.querySelector('.toast-icon i');
    
    if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle';
        toastIcon.style.color = 'var(--danger-color)';
        notificationToast.querySelector('.toast-title').textContent = 'Error';
    } else {
        toastIcon.className = 'fas fa-check-circle';
        toastIcon.style.color = 'var(--success-color)';
        notificationToast.querySelector('.toast-title').textContent = 'Success';
    }
    
    toastMessage.textContent = message;
    notificationToast.classList.add('show');
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        notificationToast.classList.remove('show');
    }, 3000);
}

function showLoading(text = 'Loading...') {
    document.getElementById('loading-text').textContent = text;
    loadingOverlay.classList.add('active');
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

// Event Listeners
function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            switchSection(sectionId);
        });
    });
    
    // Workouts
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderWorkouts(btn.dataset.filter);
        });
    });
    
    // Workout modal
    closeModalBtn.addEventListener('click', closeWorkoutModal);
    workoutModal.addEventListener('click', (e) => {
        if (e.target === workoutModal) {
            closeWorkoutModal();
        }
    });
    
    favoriteBtn.addEventListener('click', () => {
        const workoutId = parseInt(startWorkoutBtn.dataset.id);
        toggleFavorite(workoutId);
    });
    
    startWorkoutBtn.addEventListener('click', () => {
        const workoutId = parseInt(startWorkoutBtn.dataset.id);
        startWorkout(workoutId);
    });
    
    // Create workout
    createWorkoutBtn.addEventListener('click', createCustomWorkout);
    
    // Timer
    startTimerBtn.addEventListener('click', startTimer);
    pauseTimerBtn.addEventListener('click', pauseTimer);
    resetTimerBtn.addEventListener('click', resetTimer);
    
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const minutes = parseInt(btn.dataset.minutes);
            setTimerPreset(minutes);
        });
    });
    
    // Remedies
    askAIBtn.addEventListener('click', () => {
        const query = remedySearch.value.trim();
        if (query) {
            getAIResponse(query);
        } else {
            showNotification('Please enter a health concern', 'error');
        }
    });
    
    remedySearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            askAIBtn.click();
        }
    });
    
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            state.aiRemedies.currentCategory = category;
            getAIResponse('', category);
        });
    });
    
    // Spotify
    connectSpotifyBtn.addEventListener('click', connectSpotify);
    authorizeSpotifyBtn.addEventListener('click', authorizeSpotify);
    spotifyModal.addEventListener('click', (e) => {
        if (e.target === spotifyModal) {
            spotifyModal.classList.remove('active');
        }
    });
    
    // Music player
    playPauseBtn.addEventListener('click', () => {
        if (!state.spotify.isConnected) {
            connectSpotify();
            return;
        }
        
        if (state.spotify.isPlaying) {
            state.spotify.player.pause();
        } else {
            // If no track is selected, play the first playlist
            if (!state.spotify.currentTrack) {
                playMockTrack(mockPlaylists[0].id, 0);
            }
            state.spotify.player.play();
        }
    });
    
    prevTrackBtn.addEventListener('click', () => {
        if (state.spotify.isConnected) {
            state.spotify.player.previousTrack();
        }
    });
    
    nextTrackBtn.addEventListener('click', () => {
        if (state.spotify.isConnected) {
            state.spotify.player.nextTrack();
        }
    });
    
    volumeSlider.addEventListener('input', (e) => {
        // In a real app, you would set the player volume here
        console.log('Volume set to:', e.target.value);
    });
    
    // Close notification
    toastClose.addEventListener('click', () => {
        notificationToast.classList.remove('show');
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
