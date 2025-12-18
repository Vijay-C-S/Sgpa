// ===== SGPA Calculator - Shared JavaScript =====

// Grade point conversion function
function getGradePoint(marks) {
    if (marks >= 90) return 10;
    if (marks >= 80) return 9;
    if (marks >= 70) return 8;
    if (marks >= 60) return 7;
    if (marks >= 50) return 6;
    if (marks >= 45) return 5;
    if (marks >= 40) return 4;
    return 0;
}

// Toggle menu function
function toggleMenu() {
    const menu = document.querySelector('.menu-container');
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.menu-overlay');
    
    menu.classList.toggle('open');
    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Close menu when clicking overlay
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.querySelector('.menu-overlay');
    if (overlay) {
        overlay.addEventListener('click', toggleMenu);
    }
    
    // Mark current page as active in menu
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Add input validation
    const inputs = document.querySelectorAll('.form-group input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const value = parseInt(this.value);
            if (value < 0 || value > 100) {
                this.classList.add('invalid');
            } else {
                this.classList.remove('invalid');
            }
        });
        
        // Allow Enter key to calculate
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculate();
            }
        });
    });
});

// Show toast notification
function showToast(message, duration = 3000) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Get grade category and message
function getGradeInfo(sgpa) {
    if (sgpa >= 9) {
        return { 
            class: 'excellent', 
            badge: 'Outstanding! 🏆',
            message: 'Exceptional performance! Keep it up!' 
        };
    } else if (sgpa >= 8) {
        return { 
            class: 'good', 
            badge: 'Excellent! ⭐',
            message: 'Great job! You\'re doing amazing!' 
        };
    } else if (sgpa >= 7) {
        return { 
            class: 'good', 
            badge: 'Very Good 👍',
            message: 'Well done! Keep pushing forward!' 
        };
    } else if (sgpa >= 6) {
        return { 
            class: 'average', 
            badge: 'Good 📚',
            message: 'Good effort! Aim higher next time!' 
        };
    } else if (sgpa >= 5) {
        return { 
            class: 'average', 
            badge: 'Average 📖',
            message: 'You passed! Work on improving.' 
        };
    } else {
        return { 
            class: 'poor', 
            badge: 'Needs Improvement 💪',
            message: 'Don\'t give up! You can do better!' 
        };
    }
}

// Calculate SGPA with validation
function calculateSGPA(subjects, totalCredits) {
    let totalPoints = 0;
    let allValid = true;
    
    for (const subject of subjects) {
        const input = document.getElementById(subject.id);
        const value = parseInt(input.value);
        
        if (isNaN(value) || value < 0 || value > 100) {
            input.classList.add('invalid');
            allValid = false;
        } else {
            input.classList.remove('invalid');
            totalPoints += subject.credits * getGradePoint(value);
        }
    }
    
    if (!allValid) {
        showToast('Please enter valid marks (0-100) for all subjects');
        return null;
    }
    
    // SGPA = Total Grade Points / Total Credits (result is between 0-10)
    return (totalPoints / totalCredits).toFixed(2);
}

// Display result
function displayResult(sgpa) {
    const resultDisplay = document.querySelector('.result-display');
    const gradeBadge = document.querySelector('.grade-badge');
    
    if (sgpa === null) {
        resultDisplay.textContent = '--';
        resultDisplay.className = 'result-display';
        if (gradeBadge) gradeBadge.style.display = 'none';
        return;
    }
    
    const gradeInfo = getGradeInfo(parseFloat(sgpa));
    
    resultDisplay.textContent = sgpa;
    resultDisplay.className = `result-display ${gradeInfo.class}`;
    
    if (gradeBadge) {
        gradeBadge.textContent = gradeInfo.badge;
        gradeBadge.className = `grade-badge ${gradeInfo.class}`;
        gradeBadge.style.display = 'inline-block';
    }
    
    showToast(gradeInfo.message);
}
