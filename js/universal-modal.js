/**
 * Universal Modal System
 * Replaces native alert() and confirm() with custom styled modals
 */

// Initialize modal on page load
document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('universal-modal-container')) {
        initializeModal();
    }
});

// Initialize modal HTML structure
function initializeModal() {
    const modalHTML = `
        <div class="universal-modal-overlay" id="universalModalOverlay"></div>
        <div class="universal-modal" id="universalModal">
            <div class="universal-modal-icon" id="universalModalIcon">
                <i id="universalModalIconSymbol"></i>
            </div>
            <h2 class="universal-modal-title" id="universalModalTitle"></h2>
            <p class="universal-modal-message" id="universalModalMessage"></p>
            <div class="universal-modal-buttons" id="universalModalButtons"></div>
        </div>
    `;
    
    const container = document.createElement('div');
    container.id = 'universal-modal-container';
    container.innerHTML = modalHTML;
    document.body.appendChild(container);
    
    // Add event listener to overlay for closing
    document.getElementById('universalModalOverlay').addEventListener('click', function() {
        const modal = document.getElementById('universalModal');
        if (!modal.classList.contains('modal-confirmation')) {
            closeModal();
        }
    });
}

// Main function to show modal
function showModal(type, title, message, onConfirm = null) {
    // Ensure modal is initialized
    if (!document.getElementById('universal-modal-container')) {
        initializeModal();
    }
    
    const modal = document.getElementById('universalModal');
    const overlay = document.getElementById('universalModalOverlay');
    const icon = document.getElementById('universalModalIcon');
    const iconSymbol = document.getElementById('universalModalIconSymbol');
    const titleEl = document.getElementById('universalModalTitle');
    const messageEl = document.getElementById('universalModalMessage');
    const buttonsEl = document.getElementById('universalModalButtons');
    
    // Reset classes
    modal.className = 'universal-modal';
    icon.className = 'universal-modal-icon';
    
    // Set content
    titleEl.textContent = title;
    messageEl.textContent = message;
    
    // Configure based on type
    switch(type) {
        case 'success':
            icon.classList.add('icon-success');
            iconSymbol.className = 'fas fa-check';
            buttonsEl.innerHTML = '<button class="modal-btn modal-btn-primary" onclick="closeModal()">OK</button>';
            break;
            
        case 'error':
            icon.classList.add('icon-error');
            iconSymbol.className = 'fas fa-times';
            buttonsEl.innerHTML = '<button class="modal-btn modal-btn-danger" onclick="closeModal()">OK</button>';
            break;
            
        case 'warning':
            icon.classList.add('icon-warning');
            iconSymbol.className = 'fas fa-exclamation-triangle';
            
            if (onConfirm) {
                // Store callback globally for button access
                window._modalConfirmCallback = onConfirm;
                buttonsEl.innerHTML = '<button class="modal-btn modal-btn-warning" onclick="confirmModal()">OK</button>';
            } else {
                buttonsEl.innerHTML = '<button class="modal-btn modal-btn-warning" onclick="closeModal()">OK</button>';
            }
            break;
            
        case 'info':
            icon.classList.add('icon-info');
            iconSymbol.className = 'fas fa-info-circle';
            buttonsEl.innerHTML = '<button class="modal-btn modal-btn-info" onclick="closeModal()">OK</button>';
            break;
            
        case 'confirmation':
            modal.classList.add('modal-confirmation');
            icon.classList.add('icon-confirmation');
            iconSymbol.className = 'fas fa-question-circle';
            
            // Store callback globally for button access
            window._modalConfirmCallback = onConfirm;
            
            buttonsEl.innerHTML = `
                <button class="modal-btn modal-btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="modal-btn modal-btn-primary" onclick="confirmModal()">OK</button>
            `;
            break;
    }
    
    // Show modal with animation
    overlay.classList.add('show');
    modal.classList.add('show');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('universalModal');
    const overlay = document.getElementById('universalModalOverlay');
    
    if (modal && overlay) {
        modal.classList.remove('show');
        overlay.classList.remove('show');
        
        // Re-enable body scroll
        document.body.style.overflow = '';
        
        // Clean up callback
        if (window._modalConfirmCallback) {
            delete window._modalConfirmCallback;
        }
    }
}

// Confirm and execute callback
function confirmModal() {
    const callback = window._modalConfirmCallback;
    closeModal();
    
    // Execute callback after modal is closed to allow nested modals
    if (callback && typeof callback === 'function') {
        setTimeout(() => {
            callback();
        }, 300); // Wait for close animation
    }
}

// Keyboard support (ESC to close)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('universalModal');
        if (modal && modal.classList.contains('show') && !modal.classList.contains('modal-confirmation')) {
            closeModal();
        }
    }
});

