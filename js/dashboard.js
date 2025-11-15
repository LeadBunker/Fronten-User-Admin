// Dashboard interactivity
document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard JS Loaded');
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
    const userNotificationDropdown = document.getElementById('userNotificationDropdown');
    
    if (!userNotificationBell || !userNotificationDropdown) return;
    
    // Toggle notification dropdown
    userNotificationBell.addEventListener('click', (e) => {
        e.stopPropagation();
        userNotificationDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (userNotificationDropdown && !userNotificationDropdown.contains(e.target) && 
            !userNotificationBell.contains(e.target)) {
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
    alert('✅ All notifications marked as read');
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
    alert('🔍 Search functionality\n\nSearch through your extractions, tasks, and data.\n\nIn production, this would open a search modal where you can:\n• Search email lists\n• Search phone lists\n• Search tasks\n• Search transactions\n• Quick navigation');
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
            alert('✅ Address copied to clipboard!\n\n' + address);
        }).catch(err => {
            alert('Failed to copy address');
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
        alert(`📱 QR Code for ${cryptoName}\n\nAddress: ${address}\n\nIn production, this would display a scannable QR code for easy mobile deposits.`);
    }
}

// ============================================
// CREDITS & BILLING FUNCTIONS
// ============================================

function buyCredits(planName, credits, price) {
    if (confirm(`💎 Purchase Credits?\n\nPlan: ${planName}\nCredits: ${credits}\nPrice: $${price}\n\nProceed to checkout?`)) {
        alert(`✅ Redirecting to checkout...\n\nPlan: ${planName}\nAmount: $${price}\n\nIn production, this would redirect to the payment gateway.`);
        // window.location.href = 'checkout.html?plan=' + planName;
    }
}

function depositCrypto() {
    alert('💰 Deposit via Cryptocurrency\n\nYou can deposit to any of your crypto wallets:\n\n• Bitcoin (BTC)\n• Ethereum (ETH)\n• USDT (TRC20)\n\nYour account will be automatically credited after blockchain confirmation.\n\nIn production, this would show your wallet addresses with QR codes.');
}

// ============================================
// TASK FUNCTIONS
// ============================================

function viewTask(taskId) {
    alert(`📋 Task Details\n\nTask ID: ${taskId}\n\nIn production, this would open a modal with:\n• Full task details\n• Extracted data preview\n• Download options\n• Statistics and analytics`);
}

function downloadResults(taskId, format) {
    alert(`⬇️ Download Results\n\nTask ID: ${taskId}\nFormat: ${format}\n\nIn production, this would start downloading your extracted data in ${format} format.`);
}

function deleteTask(taskId) {
    if (confirm(`🗑️ Delete Task?\n\nTask ID: ${taskId}\n\nThis action cannot be undone. Are you sure?`)) {
        alert(`✅ Task ${taskId} has been deleted.`);
        // In production, this would remove the task from the UI and database
        location.reload();
    }
}

// ============================================
// LIST FUNCTIONS (EMAIL & PHONE)
// ============================================

function viewList(listId, type) {
    alert(`📋 ${type} List Details\n\nList ID: ${listId}\n\nIn production, this would show:\n• List contents\n• Data quality metrics\n• Export options\n• Validation status`);
}

function downloadList(listId, format) {
    alert(`⬇️ Download List\n\nList ID: ${listId}\nFormat: ${format}\n\nDownloading your ${type} list in ${format} format...`);
}

function deleteList(listId, type) {
    if (confirm(`🗑️ Delete ${type} List?\n\nList ID: ${listId}\n\nThis action cannot be undone. Are you sure?`)) {
        alert(`✅ ${type} list has been deleted.`);
        location.reload();
    }
}

function validateEmails(listId) {
    if (confirm(`✅ Validate Email List?\n\nList ID: ${listId}\n\nThis will:\n• Check email syntax\n• Verify domain existence\n• Detect disposable emails\n• Cost: 1 credit per email\n\nProceed?`)) {
        alert(`🔄 Email validation started...\n\nList ID: ${listId}\n\nYou'll be notified when validation is complete.`);
    }
}

// ============================================
// TRANSACTION FUNCTIONS
// ============================================

function viewTransactionDetails(txnId) {
    alert(`📋 Transaction Details\n\nTransaction ID: ${txnId}\n\nIn production, this would show:\n• Complete transaction history\n• Payment method details\n• Invoice download option\n• Refund status (if applicable)`);
}

function downloadInvoice(txnId) {
    alert(`📄 Download Invoice\n\nTransaction ID: ${txnId}\n\nDownloading PDF invoice...\n\nIn production, this would generate and download a professional PDF invoice.`);
}

// ============================================
// API KEY FUNCTIONS
// ============================================

function generateAPIKey() {
    if (confirm(`🔑 Generate New API Key?\n\nThis will create a new API key for programmatic access.\n\nKeep your API keys secure and never share them publicly.\n\nProceed?`)) {
        const newKey = 'lb_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        alert(`✅ New API Key Generated!\n\nKey: ${newKey}\n\n⚠️ Save this key now! You won't be able to see it again for security reasons.`);
        // In production, this would add the key to the UI
        location.reload();
    }
}

function copyAPIKey(key) {
    navigator.clipboard.writeText(key).then(() => {
        alert(`✅ API Key copied to clipboard!\n\n${key}`);
    }).catch(err => {
        alert('Failed to copy API key');
    });
}

function revokeAPIKey(keyId) {
    if (confirm(`🗑️ Revoke API Key?\n\nKey ID: ${keyId}\n\nThis will immediately invalidate the API key. All applications using this key will stop working.\n\nThis action cannot be undone. Are you sure?`)) {
        alert(`✅ API Key has been revoked.\n\nKey ID: ${keyId}\n\nAll access using this key has been terminated.`);
        location.reload();
    }
}

// ============================================
// TEAM FUNCTIONS
// ============================================

function inviteTeamMember() {
    const email = prompt('📧 Invite Team Member\n\nEnter the email address of the person you want to invite:');
    if (email && email.includes('@')) {
        alert(`✅ Invitation sent!\n\nEmail: ${email}\n\nThey will receive an invitation link to join your team.`);
    } else if (email) {
        alert('❌ Invalid email address. Please try again.');
    }
}

function editMember(memberId) {
    alert(`✏️ Edit Team Member\n\nMember ID: ${memberId}\n\nIn production, this would open a modal to:\n• Change member role\n• Update permissions\n• Modify access levels`);
}

function removeMember(memberId) {
    if (confirm(`🗑️ Remove Team Member?\n\nMember ID: ${memberId}\n\nThis will:\n• Remove their access to the account\n• Revoke all permissions\n• Stop access to shared resources\n\nAre you sure?`)) {
        alert(`✅ Team member has been removed.`);
        location.reload();
    }
}

// ============================================
// SETTINGS FUNCTIONS
// ============================================

function saveSettings() {
    alert('✅ Settings Saved!\n\nYour preferences have been updated successfully.');
}

function changePassword() {
    alert('🔐 Change Password\n\nIn production, this would open a secure modal to:\n• Verify current password\n• Set new password\n• Confirm new password\n• Send confirmation email');
}

function enable2FA() {
    alert('🔒 Enable Two-Factor Authentication\n\nIn production, this would:\n• Generate QR code for authenticator app\n• Provide backup codes\n• Verify setup with test code\n• Enhance account security');
}

function deleteAccount() {
    if (confirm('⚠️ DELETE ACCOUNT?\n\nThis will permanently delete:\n• Your account\n• All data and lists\n• Transaction history\n• API keys\n• Team members\n\nThis action CANNOT be undone!\n\nAre you absolutely sure?')) {
        const confirmation = prompt('Type "DELETE" to confirm:');
        if (confirmation === 'DELETE') {
            alert('Account deletion initiated. You will receive a confirmation email.');
        }
    }
}

// ============================================
// SUPPORT FUNCTIONS
// ============================================

function submitTicket() {
    alert('📧 Submit Support Ticket\n\nIn production, this would open a form to:\n• Describe your issue\n• Upload screenshots\n• Select priority level\n• Submit to support team');
}

function viewTicket(ticketId) {
    alert(`🎫 Support Ticket #${ticketId}\n\nIn production, this would show:\n• Full conversation history\n• Attachments\n• Status updates\n• Resolution details`);
}

// ============================================
// EXTRACTION FUNCTIONS
// ============================================

function startExtraction() {
    alert('🚀 Start New Extraction\n\nIn production, this form would:\n• Accept website URLs\n• Configure extraction parameters\n• Set filters and options\n• Start the extraction process\n• Deduct credits from balance');
}

function pauseTask(taskId) {
    alert(`⏸️ Pause Task\n\nTask ID: ${taskId}\n\nTask has been paused. You can resume it anytime from the Tasks page.`);
}

function resumeTask(taskId) {
    alert(`▶️ Resume Task\n\nTask ID: ${taskId}\n\nTask has been resumed and will continue processing.`);
}
