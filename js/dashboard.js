// Dashboard interactivity
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Dashboard JS Loaded Successfully!');
    console.log('📋 All functions available: buyCredits, changePassword, generateAPIKey, etc.');
    initializeNotifications();
});

// Toggle sidebar for mobile
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevent body scroll when sidebar is open
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

let currentNotificationTab = 'all';

function initializeNotifications() {
    const userNotificationBell = document.getElementById('userNotificationBell');
    const mobileNotificationBell = document.getElementById('mobileNotificationBell');
    const userNotificationDropdown = document.getElementById('userNotificationDropdown');
    
    console.log('🔔 Initializing notifications...');
    console.log('Desktop bell:', userNotificationBell);
    console.log('Mobile bell:', mobileNotificationBell);
    console.log('Dropdown:', userNotificationDropdown);
    
    if (!userNotificationDropdown) {
        console.warn('⚠️ Notification dropdown not found!');
        return;
    }
    
    // Function to toggle dropdown
    const toggleDropdown = (e) => {
        e.stopPropagation();
        console.log('🔔 Toggling notification dropdown');
        userNotificationDropdown.classList.toggle('active');
        console.log('Dropdown active?', userNotificationDropdown.classList.contains('active'));
    };
    
    // Add click listeners to both desktop and mobile bells
    if (userNotificationBell) {
        userNotificationBell.addEventListener('click', toggleDropdown);
        console.log('✅ Desktop bell listener attached');
    }
    
    if (mobileNotificationBell) {
        mobileNotificationBell.addEventListener('click', toggleDropdown);
        console.log('✅ Mobile bell listener attached');
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInsideDropdown = userNotificationDropdown.contains(e.target);
        const isClickOnDesktopBell = userNotificationBell && userNotificationBell.contains(e.target);
        const isClickOnMobileBell = mobileNotificationBell && mobileNotificationBell.contains(e.target);
        
        if (!isClickInsideDropdown && !isClickOnDesktopBell && !isClickOnMobileBell) {
            userNotificationDropdown.classList.remove('active');
        }
    });
    
    // Prevent dropdown from closing when clicking inside
    userNotificationDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Update badge count
    updateNotificationBadge();
}

// Switch notification tabs
function switchNotificationTab(tab) {
    currentNotificationTab = tab;
    const tabBtns = document.querySelectorAll('.tab-btn');
    const notifications = document.querySelectorAll('.notification-item');
    
    tabBtns.forEach(btn => {
        if (btn.dataset.tab === tab) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    notifications.forEach(notification => {
        if (tab === 'all') {
            notification.style.display = 'flex';
        } else if (tab === 'important') {
            notification.style.display = notification.dataset.priority === 'important' ? 'flex' : 'none';
        } else if (tab === 'unread') {
            notification.style.display = notification.classList.contains('unread') ? 'flex' : 'none';
        }
    });
}

// Mark single notification as read
function markNotificationRead(button) {
    const notificationItem = button.closest('.notification-item');
    notificationItem.classList.remove('unread');
    notificationItem.classList.add('read');
    button.style.display = 'none';
    updateNotificationBadge();
}

// Mark all notifications as read
function markAllNotificationsRead() {
    const unreadNotifications = document.querySelectorAll('.notification-item.unread');
    unreadNotifications.forEach(notification => {
        notification.classList.remove('unread');
        notification.classList.add('read');
        const markReadBtn = notification.querySelector('.notification-mark-read');
        if (markReadBtn) {
            markReadBtn.style.display = 'none';
        }
    });
    updateNotificationBadge();
    showModal('success', 'Notifications Cleared', 'All notifications marked as read');
}

// Update notification badge count
function updateNotificationBadge() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const badge = document.querySelector('.notification-badge');
    const unreadTabCount = document.querySelector('.tab-btn[data-tab="unread"] .tab-count');
    
    if (badge) {
        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
    
    if (unreadTabCount) {
        unreadTabCount.textContent = unreadCount;
    }
    
    const importantCount = document.querySelectorAll('.notification-item[data-priority="important"]').length;
    const importantTabCount = document.querySelector('.tab-btn[data-tab="important"] .tab-count');
    if (importantTabCount) {
        importantTabCount.textContent = importantCount;
    }
    
    const allCount = document.querySelectorAll('.notification-item').length;
    const allTabCount = document.querySelector('.tab-btn[data-tab="all"] .tab-count');
    if (allTabCount) {
        allTabCount.textContent = allCount;
    }
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

function toggleSearch() {
    showModal('info', 'Search Functionality', 'Search through your extractions, tasks, and data.\n\nIn production, this would open a search modal where you can:\n• Search email lists\n• Search phone lists\n• Search tasks\n• Search transactions\n• Quick navigation');
}

// ============================================
// WALLET FUNCTIONS
// ============================================

function copyAddress(type) {
    let address = '';
    if (type === 'btc') {
        address = document.getElementById('btcAddress')?.textContent;
    } else if (type === 'eth') {
        address = document.getElementById('ethAddress')?.textContent;
    } else if (type === 'usdt') {
        address = document.getElementById('usdtAddress')?.textContent;
    }
    
    if (address) {
        navigator.clipboard.writeText(address).then(() => {
            showModal('success', 'Address Copied', 'Address copied to clipboard!\n\n' + address);
        }).catch(err => {
            showModal('error', 'Copy Failed', 'Failed to copy address');
        });
    }
}

function showQR(type) {
    let address = '';
    let cryptoName = '';
    
    if (type === 'btc') {
        address = document.getElementById('btcAddress')?.textContent;
        cryptoName = 'Bitcoin (BTC)';
    } else if (type === 'eth') {
        address = document.getElementById('ethAddress')?.textContent;
        cryptoName = 'Ethereum (ETH)';
    } else if (type === 'usdt') {
        address = document.getElementById('usdtAddress')?.textContent;
        cryptoName = 'USDT (TRC20)';
    }
    
    if (address) {
        showModal('info', `QR Code for ${cryptoName}`, `Address: ${address}\n\nIn production, this would display a scannable QR code for easy mobile deposits.`);
    }
}

// ============================================
// CREDITS & BILLING FUNCTIONS
// ============================================

function buyCredits(planName, credits, price) {
    console.log(`🛒 buyCredits called: ${planName}, ${credits} credits, $${price}`);
    showBuyCreditsModal(planName, credits, price);
}

function depositCrypto() {
    showModal('info', 'Deposit via Cryptocurrency', 'You can deposit to any of your crypto wallets:\n\n• Bitcoin (BTC)\n• Ethereum (ETH)\n• USDT (TRC20)\n\nYour account will be automatically credited after blockchain confirmation.\n\nIn production, this would show your wallet addresses with QR codes.');
}

// ============================================
// TASK FUNCTIONS
// ============================================

function viewTask(taskId) {
    showViewTaskModal(taskId);
}

function downloadResults(taskId, format) {
    showDownloadOptionsModal(taskId);
}

function deleteTask(taskId) {
    showModal('confirmation', 'Delete Task?', `Task ID: ${taskId}\n\nThis action cannot be undone. Are you sure?`, function() {
        showModal('success', 'Task Deleted', `Task ${taskId} has been deleted.`);
        // In production, this would remove the task from the UI and database
        setTimeout(() => location.reload(), 2000);
    });
}

// ============================================
// LIST FUNCTIONS (EMAIL & PHONE)
// ============================================

function viewList(listId, type) {
    showModal('info', `${type} List Details`, `List ID: ${listId}\n\nIn production, this would show:\n• List contents\n• Data quality metrics\n• Export options\n• Validation status`);
}

function downloadList(listId, format) {
    showModal('info', 'Download List', `List ID: ${listId}\nFormat: ${format}\n\nDownloading your list in ${format} format...`);
}

function deleteList(listId, type) {
    showModal('confirmation', `Delete ${type} List?`, `List ID: ${listId}\n\nThis action cannot be undone. Are you sure?`, function() {
        showModal('success', 'List Deleted', `${type} list has been deleted.`);
        setTimeout(() => location.reload(), 2000);
    });
}

function validateEmails(listId) {
    showModal('confirmation', 'Validate Email List?', `List ID: ${listId}\n\nThis will:\n• Check email syntax\n• Verify domain existence\n• Detect disposable emails\n• Cost: 1 credit per email\n\nProceed?`, function() {
        showModal('info', 'Validation Started', `Email validation started...\n\nList ID: ${listId}\n\nYou'll be notified when validation is complete.`);
    });
}

// ============================================
// TRANSACTION FUNCTIONS
// ============================================

function viewTransactionDetails(txnId) {
    showViewTransactionModal(txnId);
}

function downloadInvoice(txnId) {
    showModal('info', 'Download Invoice', `Transaction ID: ${txnId}\n\nDownloading PDF invoice...\n\nIn production, this would generate and download a professional PDF invoice.`);
}

// ============================================
// API KEY FUNCTIONS
// ============================================

function generateAPIKey() {
    showGenerateAPIKeyModal();
}

function copyAPIKey(key) {
    navigator.clipboard.writeText(key).then(() => {
        showModal('success', 'API Key Copied', `API Key copied to clipboard!\n\n${key}`);
    }).catch(err => {
        showModal('error', 'Copy Failed', 'Failed to copy API key');
    });
}

function revokeAPIKey(keyId) {
    showModal('confirmation', 'Revoke API Key?', `Key ID: ${keyId}\n\nThis will immediately invalidate the API key. All applications using this key will stop working.\n\nThis action cannot be undone. Are you sure?`, function() {
        showModal('success', 'API Key Revoked', `API Key has been revoked.\n\nKey ID: ${keyId}\n\nAll access using this key has been terminated.`);
        setTimeout(() => location.reload(), 2000);
    });
}

// ============================================
// TEAM FUNCTIONS
// ============================================

function inviteTeamMember() {
    // In production, this would show a modal with an input field
    const email = prompt('Enter the email address of the person you want to invite:');
    if (email && email.includes('@')) {
        showModal('success', 'Invitation Sent', `Email: ${email}\n\nThey will receive an invitation link to join your team.`);
    } else if (email) {
        showModal('error', 'Invalid Email', 'Invalid email address. Please try again.');
    }
}

function editMember(memberId) {
    showModal('info', 'Edit Team Member', `Member ID: ${memberId}\n\nIn production, this would open a modal to:\n• Change member role\n• Update permissions\n• Modify access levels`);
}

function removeMember(memberId) {
    showModal('confirmation', 'Remove Team Member?', `Member ID: ${memberId}\n\nThis will:\n• Remove their access to the account\n• Revoke all permissions\n• Stop access to shared resources\n\nAre you sure?`, function() {
        showModal('success', 'Member Removed', `Team member has been removed.`);
        setTimeout(() => location.reload(), 2000);
    });
}

// ============================================
// SETTINGS FUNCTIONS
// ============================================

function saveSettings() {
    showModal('success', 'Settings Saved!', 'Your preferences have been updated successfully.');
}

function changePassword() {
    showModal('info', 'Change Password', 'In production, this would open a secure modal to:\n• Verify current password\n• Set new password\n• Confirm new password\n• Send confirmation email');
}

function enable2FA() {
    showModal('info', 'Enable Two-Factor Authentication', 'In production, this would:\n• Generate QR code for authenticator app\n• Provide backup codes\n• Verify setup with test code\n• Enhance account security');
}

function deleteAccount() {
    showModal('warning', 'DELETE ACCOUNT?', 'This will permanently delete:\n• Your account\n• All data and lists\n• Transaction history\n• API keys\n• Team members\n\nThis action CANNOT be undone!\n\nAre you absolutely sure?', function() {
        const confirmation = prompt('Type "DELETE" to confirm:');
        if (confirmation === 'DELETE') {
            showModal('info', 'Account Deletion', 'Account deletion initiated. You will receive a confirmation email.');
        }
    });
}

// ============================================
// SUPPORT FUNCTIONS
// ============================================

function submitTicket() {
    showModal('info', 'Submit Support Ticket', 'In production, this would open a form to:\n• Describe your issue\n• Upload screenshots\n• Select priority level\n• Submit to support team');
}

function viewTicket(ticketId) {
    showModal('info', `Support Ticket #${ticketId}`, `In production, this would show:\n• Full conversation history\n• Attachments\n• Status updates\n• Resolution details`);
}

// ============================================
// EXTRACTION FUNCTIONS
// ============================================

function startExtraction() {
    showModal('info', 'Start New Extraction', 'In production, this form would:\n• Accept website URLs\n• Configure extraction parameters\n• Set filters and options\n• Start the extraction process\n• Deduct credits from balance');
}

function pauseTask(taskId) {
    showModal('info', 'Pause Task', `Task ID: ${taskId}\n\nTask has been paused. You can resume it anytime from the Tasks page.`);
}

function resumeTask(taskId) {
    showModal('info', 'Resume Task', `Task ID: ${taskId}\n\nTask has been resumed and will continue processing.`);
}

function exportAllTasks() {
    showModal('info', 'Exporting All Tasks...', 'Downloading CSV file with all your extraction tasks.\n\nIn production, this would generate and download a comprehensive report of all your tasks.');
}

function retryTask(taskId) {
    showModal('confirmation', 'Retry Failed Task?', `Task ID: ${taskId}\n\nThis will restart the extraction process.\n\nProceed?`, function() {
        showModal('success', 'Task Queued', `Task ${taskId} queued for retry!\n\nYou'll receive a notification when it starts.`);
    });
}

function cancelTask(taskId) {
    showModal('confirmation', 'Cancel Pending Task?', `Task ID: ${taskId}\n\nThis will remove the task from the queue. Credits will be refunded.\n\nProceed?`, function() {
        showModal('success', 'Task Cancelled', `Task ${taskId} cancelled!\n\nCredits have been refunded to your account.`);
    });
}

// ============================================
// ADVANCED FILTER FUNCTION
// ============================================

function showAdvancedFilter() {
    showModal('info', 'Advanced Filter', 'In production, this would open a modal with:\n• Date range filter\n• Status filter\n• Source filter\n• Domain filter\n• Sort options\n• Custom tags filter');
}

// ============================================
// PAGINATION FUNCTION
// ============================================

let currentPageNum = 1;
let totalPagesNum = 12;

function changePage(direction) {
    const currentPageEl = document.getElementById('currentPage');
    const totalPagesEl = document.getElementById('totalPages');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const itemRangeEl = document.getElementById('itemRange');
    
    if (direction === 'next' && currentPageNum < totalPagesNum) {
        currentPageNum++;
    } else if (direction === 'prev' && currentPageNum > 1) {
        currentPageNum--;
    }
    
    // Update display
    if (currentPageEl) {
        currentPageEl.textContent = currentPageNum;
    }
    
    // Update buttons
    if (prevBtn) {
        prevBtn.disabled = currentPageNum === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentPageNum === totalPagesNum;
    }
    
    // Update item range for list pages
    if (itemRangeEl) {
        const itemsPerPage = 20;
        const startItem = (currentPageNum - 1) * itemsPerPage + 1;
        const endItem = Math.min(currentPageNum * itemsPerPage, 12847);
        itemRangeEl.textContent = `${startItem}-${endItem}`;
    }
    
    // Simulate loading
    showModal('info', 'Loading Page', `Loading Page ${currentPageNum}...\n\nIn production, this would load the actual data from the server.`);
}
