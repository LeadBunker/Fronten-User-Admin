// Admin Functions for all admin pages

// Transaction Functions
function viewTransaction(id) {
    showModal('info', 'Transaction Details', `Transaction ID: TXN-00${id}\n\nIn production, this would show:\n• Full transaction details\n• User information\n• Payment method\n• Transaction history\n• Related data`);
}

function deleteTransaction(id) {
    showModal('confirmation', 'Delete Transaction?', `⚠️ WARNING: Delete transaction TXN-00${id}?\n\nThis action cannot be undone!`, function() {
        showModal('success', 'Transaction Deleted', `Transaction TXN-00${id} has been deleted.`);
        setTimeout(() => location.reload(), 2000);
    });
}

function approveTransaction(id) {
    showModal('confirmation', 'Approve Transaction?', `Approve transaction TXN-00${id}?\n\nThis will mark the transaction as completed and credit the user's account.`, function() {
        showModal('success', 'Transaction Approved', `Transaction TXN-00${id} has been approved!`);
        setTimeout(() => location.reload(), 2000);
    });
}

function rejectTransaction(id) {
    showModal('confirmation', 'Reject Transaction?', `Reject transaction TXN-00${id}?\n\nThis will cancel the transaction and notify the user.`, function() {
        showModal('success', 'Transaction Rejected', `Transaction TXN-00${id} has been rejected.`);
        setTimeout(() => location.reload(), 2000);
    });
}

function retryTransaction(id) {
    showModal('confirmation', 'Retry Failed Transaction?', `Retry transaction TXN-00${id}?\n\nThis will attempt to process the payment again.`, function() {
        showModal('info', 'Retrying Transaction', `Retrying transaction TXN-00${id}...\n\nYou will be notified when complete.`);
    });
}

// Credit Pack Functions
function viewPack(id) {
    showModal('info', 'Credit Pack Details', `Pack ID: ${id}\n\nIn production, this would show:\n• Full pack details\n• Sales history\n• Revenue data\n• Purchase analytics`);
}

function editPack(id) {
    showModal('info', 'Edit Credit Pack', `Edit Pack: ${id}\n\nIn production, this would open a form to:\n• Update credits amount\n• Modify pricing\n• Change discount\n• Update description`);
}

function deletePack(id) {
    showModal('confirmation', 'Delete Credit Pack?', `⚠️ WARNING: Delete credit pack ${id}?\n\nThis action cannot be undone!`, function() {
        showModal('success', 'Pack Deleted', `Credit pack ${id} has been deleted.`);
        setTimeout(() => location.reload(), 2000);
    });
}

function viewPackStats(id) {
    showModal('info', 'Pack Statistics', `Pack ID: ${id}\n\nIn production, this would show:\n• Sales trends over time\n• Revenue analytics\n• Conversion rates\n• User demographics`);
}

function togglePackStatus(id) {
    showModal('confirmation', 'Toggle Pack Status?', `Toggle status for pack ${id}?\n\nThis will activate or deactivate the pack.`, function() {
        showModal('success', 'Pack Status Updated', `Pack ${id} status has been updated.`);
        setTimeout(() => location.reload(), 2000);
    });
}

// Coupon Functions
function viewCoupon(code) {
    showModal('info', 'Coupon Details', `Coupon Code: ${code}\n\nIn production, this would show:\n• Usage history\n• Redemption count\n• Discount details\n• Expiration date`);
}

function editCoupon(code) {
    showModal('info', 'Edit Coupon', `Edit Coupon: ${code}\n\nIn production, this would open a form to:\n• Update discount\n• Modify expiration\n• Change usage limits\n• Update description`);
}

function toggleCoupon(code) {
    showModal('confirmation', 'Toggle Coupon Status?', `Activate/deactivate coupon ${code}?`, function() {
        showModal('success', 'Coupon Updated', `Coupon ${code} status has been updated.`);
        setTimeout(() => location.reload(), 2000);
    });
}

function deleteCoupon(code) {
    showModal('confirmation', 'Delete Coupon?', `⚠️ WARNING: Delete coupon ${code}?\n\nThis action cannot be undone!`, function() {
        showModal('success', 'Coupon Deleted', `Coupon ${code} has been deleted.`);
        setTimeout(() => location.reload(), 2000);
    });
}

console.log('✅ Admin Functions Loaded Successfully!');

