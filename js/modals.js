/* ============================================
   MODAL SYSTEM FOR USER DASHBOARD
   Beautiful popups like admin panel
   ============================================ */

// Modal utilities
const ModalSystem = {
    create: function(id, content) {
        // Remove existing modal if present
        const existing = document.getElementById(id);
        if (existing) existing.remove();
        
        // Create modal
        const modal = document.createElement('div');
        modal.id = id;
        modal.className = 'modal-overlay';
        modal.innerHTML = content;
        document.body.appendChild(modal);
        
        // Close on overlay click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                ModalSystem.close(id);
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                ModalSystem.close(id);
            }
        });
        
        return modal;
    },
    
    open: function(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },
    
    close: function(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    },
    
    remove: function(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    }
};

// Buy Credits Modal
function showBuyCreditsModal(planName, credits, price) {
    const modalId = 'buyCreditsModal';
    
    const content = `
        <div class="modal-container">
            <div class="modal-header">
                <h2><i class="fas fa-shopping-cart"></i> Purchase Credits</h2>
                <p>Complete your purchase to add credits to your account</p>
                <button class="modal-close" onclick="ModalSystem.close('${modalId}')">×</button>
            </div>
            
            <div class="modal-body">
                <div class="modal-section">
                    <div class="modal-info-grid">
                        <div class="modal-info-item">
                            <div class="modal-info-label">Plan Selected</div>
                            <div class="modal-info-value">${planName}</div>
                        </div>
                        <div class="modal-info-item">
                            <div class="modal-info-label">Credits</div>
                            <div class="modal-info-value success">${credits} Credits</div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <div class="modal-details-box">
                        <div class="modal-detail-row">
                            <div class="modal-detail-label">Subtotal</div>
                            <div class="modal-detail-value">$${price}</div>
                        </div>
                        <div class="modal-detail-row">
                            <div class="modal-detail-label">Tax</div>
                            <div class="modal-detail-value">$0.00</div>
                        </div>
                        <div class="modal-detail-row">
                            <div class="modal-detail-label">Discount</div>
                            <div class="modal-detail-value" style="color: #10B981;">-$0.00</div>
                        </div>
                        <div class="modal-detail-row" style="border-top: 2px solid #667eea; padding-top: 16px; margin-top: 8px;">
                            <div class="modal-detail-label" style="font-size: 16px; font-weight: 700;">Total</div>
                            <div class="modal-detail-value" style="font-size: 24px; font-weight: 700; color: #667eea;">$${price}</div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-alert info">
                    <div class="modal-alert-icon"><i class="fas fa-info-circle"></i></div>
                    <div class="modal-alert-content">
                        <div class="modal-alert-title">Secure Payment</div>
                        <div class="modal-alert-text">Your payment information is encrypted and secure. Credits will be added instantly after payment.</div>
                    </div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" onclick="ModalSystem.close('${modalId}')">
                    <i class="fas fa-times"></i> Cancel
                </button>
                <button class="modal-btn modal-btn-primary" onclick="proceedToCheckout('${planName}', '${credits}', '${price}')">
                    <i class="fas fa-lock"></i> Proceed to Checkout
                </button>
            </div>
        </div>
    `;
    
    ModalSystem.create(modalId, content);
    ModalSystem.open(modalId);
}

function proceedToCheckout(planName, credits, price) {
    alert(`✅ Redirecting to secure checkout...\n\nPlan: ${planName}\nAmount: $${price}\n\nIn production, this would redirect to Stripe/PayPal payment gateway.`);
    ModalSystem.close('buyCreditsModal');
}

// View Task Modal
function showViewTaskModal(taskId) {
    const modalId = 'viewTaskModal';
    
    const content = `
        <div class="modal-container">
            <div class="modal-header">
                <h2><i class="fas fa-tasks"></i> Task Details</h2>
                <p>View extraction task information and results</p>
                <button class="modal-close" onclick="ModalSystem.close('${modalId}')">×</button>
            </div>
            
            <div class="modal-body">
                <div class="modal-section">
                    <div class="modal-info-grid">
                        <div class="modal-info-item">
                            <div class="modal-info-label">Task ID</div>
                            <div class="modal-info-value">#${taskId}</div>
                        </div>
                        <div class="modal-info-item">
                            <div class="modal-info-label">Status</div>
                            <div class="modal-info-value">
                                <span class="modal-status-badge completed">Completed</span>
                            </div>
                        </div>
                        <div class="modal-info-item">
                            <div class="modal-info-label">Domain</div>
                            <div class="modal-info-value">example.com</div>
                        </div>
                        <div class="modal-info-item">
                            <div class="modal-info-label">Type</div>
                            <div class="modal-info-value">Full Extraction</div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <div class="modal-section-title">Extraction Results</div>
                    <div class="modal-details-box">
                        <div class="modal-detail-row">
                            <div class="modal-detail-label"><i class="fas fa-envelope"></i> Emails Extracted</div>
                            <div class="modal-detail-value">89 emails</div>
                        </div>
                        <div class="modal-detail-row">
                            <div class="modal-detail-label"><i class="fas fa-phone"></i> Phone Numbers</div>
                            <div class="modal-detail-value">23 phones</div>
                        </div>
                        <div class="modal-detail-row">
                            <div class="modal-detail-label"><i class="fas fa-clock"></i> Duration</div>
                            <div class="modal-detail-value">2m 34s</div>
                        </div>
                        <div class="modal-detail-row">
                            <div class="modal-detail-label"><i class="fas fa-gem"></i> Credits Used</div>
                            <div class="modal-detail-value">15 credits</div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-alert success">
                    <div class="modal-alert-icon"><i class="fas fa-check-circle"></i></div>
                    <div class="modal-alert-content">
                        <div class="modal-alert-title">Extraction Complete</div>
                        <div class="modal-alert-text">Your data is ready to download. Results are available in CSV, JSON, and Excel formats.</div>
                    </div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" onclick="ModalSystem.close('${modalId}')">
                    <i class="fas fa-times"></i> Close
                </button>
                <button class="modal-btn modal-btn-success" onclick="downloadTaskResults('${taskId}')">
                    <i class="fas fa-download"></i> Download Results
                </button>
            </div>
        </div>
    `;
    
    ModalSystem.create(modalId, content);
    ModalSystem.open(modalId);
}

function downloadTaskResults(taskId) {
    showDownloadOptionsModal(taskId);
}

// Download Options Modal
function showDownloadOptionsModal(taskId) {
    const modalId = 'downloadOptionsModal';
    
    const content = `
        <div class="modal-container">
            <div class="modal-header">
                <h2><i class="fas fa-download"></i> Download Results</h2>
                <p>Choose your preferred format</p>
                <button class="modal-close" onclick="ModalSystem.close('${modalId}')">×</button>
            </div>
            
            <div class="modal-body">
                <div class="modal-section">
                    <ul class="modal-list">
                        <li class="modal-list-item" onclick="downloadInFormat('${taskId}', 'CSV')" style="cursor: pointer;">
                            <div class="modal-list-icon">
                                <i class="fas fa-file-csv"></i>
                            </div>
                            <div class="modal-list-content">
                                <div class="modal-list-title">CSV Format</div>
                                <div class="modal-list-subtitle">Compatible with Excel, Google Sheets</div>
                            </div>
                            <i class="fas fa-chevron-right" style="color: #9CA3AF;"></i>
                        </li>
                        <li class="modal-list-item" onclick="downloadInFormat('${taskId}', 'JSON')" style="cursor: pointer;">
                            <div class="modal-list-icon">
                                <i class="fas fa-file-code"></i>
                            </div>
                            <div class="modal-list-content">
                                <div class="modal-list-title">JSON Format</div>
                                <div class="modal-list-subtitle">For developers and API integration</div>
                            </div>
                            <i class="fas fa-chevron-right" style="color: #9CA3AF;"></i>
                        </li>
                        <li class="modal-list-item" onclick="downloadInFormat('${taskId}', 'Excel')" style="cursor: pointer;">
                            <div class="modal-list-icon">
                                <i class="fas fa-file-excel"></i>
                            </div>
                            <div class="modal-list-content">
                                <div class="modal-list-title">Excel Format (.xlsx)</div>
                                <div class="modal-list-subtitle">Rich formatting, multiple sheets</div>
                            </div>
                            <i class="fas fa-chevron-right" style="color: #9CA3AF;"></i>
                        </li>
                        <li class="modal-list-item" onclick="downloadInFormat('${taskId}', 'TXT')" style="cursor: pointer;">
                            <div class="modal-list-icon">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <div class="modal-list-content">
                                <div class="modal-list-title">Plain Text (.txt)</div>
                                <div class="modal-list-subtitle">Simple text file, one entry per line</div>
                            </div>
                            <i class="fas fa-chevron-right" style="color: #9CA3AF;"></i>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" onclick="ModalSystem.close('${modalId}')">
                    <i class="fas fa-times"></i> Cancel
                </button>
            </div>
        </div>
    `;
    
    ModalSystem.create(modalId, content);
    ModalSystem.open(modalId);
}

function downloadInFormat(taskId, format) {
    ModalSystem.close('downloadOptionsModal');
    alert(`⬇️ Downloading Task #${taskId} in ${format} format...\n\nIn production, the download would start automatically.`);
}

// Generate API Key Modal
function showGenerateAPIKeyModal() {
    const modalId = 'generateAPIKeyModal';
    
    const content = `
        <div class="modal-container">
            <div class="modal-header">
                <h2><i class="fas fa-key"></i> Generate API Key</h2>
                <p>Create a new API key for programmatic access</p>
                <button class="modal-close" onclick="ModalSystem.close('${modalId}')">×</button>
            </div>
            
            <div class="modal-body">
                <div class="modal-section">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #374151;">Key Name</label>
                    <input type="text" id="apiKeyName" placeholder="My API Key" style="width: 100%; padding: 12px; border: 2px solid #E5E7EB; border-radius: 10px; font-size: 14px; outline: none; transition: border 0.2s;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#E5E7EB'">
                </div>
                
                <div class="modal-section">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #374151;">Permissions</label>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <label style="display: flex; align-items: center; gap: 10px; padding: 12px; background: #F9FAFB; border-radius: 8px; cursor: pointer;">
                            <input type="checkbox" checked style="width: 18px; height: 18px;">
                            <span style="font-size: 14px;">Read Access</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 10px; padding: 12px; background: #F9FAFB; border-radius: 8px; cursor: pointer;">
                            <input type="checkbox" checked style="width: 18px; height: 18px;">
                            <span style="font-size: 14px;">Write Access</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 10px; padding: 12px; background: #F9FAFB; border-radius: 8px; cursor: pointer;">
                            <input type="checkbox" style="width: 18px; height: 18px;">
                            <span style="font-size: 14px;">Admin Access</span>
                        </label>
                    </div>
                </div>
                
                <div class="modal-alert warning">
                    <div class="modal-alert-icon"><i class="fas fa-exclamation-triangle"></i></div>
                    <div class="modal-alert-content">
                        <div class="modal-alert-title">Security Warning</div>
                        <div class="modal-alert-text">Keep your API keys secure. Never share them publicly or commit them to version control.</div>
                    </div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" onclick="ModalSystem.close('${modalId}')">
                    <i class="fas fa-times"></i> Cancel
                </button>
                <button class="modal-btn modal-btn-primary" onclick="confirmGenerateAPIKey()">
                    <i class="fas fa-plus"></i> Generate Key
                </button>
            </div>
        </div>
    `;
    
    ModalSystem.create(modalId, content);
    ModalSystem.open(modalId);
}

function confirmGenerateAPIKey() {
    const keyName = document.getElementById('apiKeyName').value || 'Unnamed Key';
    const newKey = 'lb_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    ModalSystem.close('generateAPIKeyModal');
    showAPIKeyGeneratedModal(keyName, newKey);
}

function showAPIKeyGeneratedModal(keyName, apiKey) {
    const modalId = 'apiKeyGeneratedModal';
    
    const content = `
        <div class="modal-container">
            <div class="modal-header" style="background: linear-gradient(135deg, #10B981 0%, #059669 100%);">
                <h2><i class="fas fa-check-circle"></i> API Key Generated!</h2>
                <p>Save this key now - you won't be able to see it again</p>
                <button class="modal-close" onclick="ModalSystem.close('${modalId}')">×</button>
            </div>
            
            <div class="modal-body">
                <div class="modal-section">
                    <div class="modal-info-item">
                        <div class="modal-info-label">Key Name</div>
                        <div class="modal-info-value">${keyName}</div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #374151;">Your API Key</label>
                    <div style="position: relative;">
                        <input type="text" id="generatedAPIKey" value="${apiKey}" readonly style="width: 100%; padding: 12px 50px 12px 12px; border: 2px solid #10B981; border-radius: 10px; font-size: 13px; font-family: monospace; background: #F0FDF4;">
                        <button onclick="copyAPIKeyToClipboard()" style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: #10B981; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </div>
                </div>
                
                <div class="modal-alert danger">
                    <div class="modal-alert-icon"><i class="fas fa-exclamation-circle"></i></div>
                    <div class="modal-alert-content">
                        <div class="modal-alert-title">Important: Save This Key Now!</div>
                        <div class="modal-alert-text">For security reasons, this key will only be shown once. Make sure to copy and save it in a secure location.</div>
                    </div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="modal-btn modal-btn-success" onclick="copyAPIKeyToClipboard(); ModalSystem.close('${modalId}')">
                    <i class="fas fa-copy"></i> Copy and Close
                </button>
            </div>
        </div>
    `;
    
    ModalSystem.create(modalId, content);
    ModalSystem.open(modalId);
}

function copyAPIKeyToClipboard() {
    const keyInput = document.getElementById('generatedAPIKey');
    if (keyInput) {
        keyInput.select();
        document.execCommand('copy');
        alert('✅ API Key copied to clipboard!');
    }
}

// View Transaction Modal
function showViewTransactionModal(txnId) {
    const modalId = 'viewTransactionModal';
    
    const content = `
        <div class="modal-container">
            <div class="modal-header">
                <h2><i class="fas fa-receipt"></i> Transaction Details</h2>
                <p>View complete transaction information</p>
                <button class="modal-close" onclick="ModalSystem.close('${modalId}')">×</button>
            </div>
            
            <div class="modal-body">
                <div class="modal-section">
                    <div class="modal-info-grid">
                        <div class="modal-info-item">
                            <div class="modal-info-label">Transaction ID</div>
                            <div class="modal-info-value">${txnId}</div>
                        </div>
                        <div class="modal-info-item">
                            <div class="modal-info-label">Status</div>
                            <div class="modal-info-value">
                                <span class="modal-status-badge completed">Completed</span>
                            </div>
                        </div>
                        <div class="modal-info-item">
                            <div class="modal-info-label">Amount</div>
                            <div class="modal-info-value large">$49.99</div>
                        </div>
                        <div class="modal-info-item">
                            <div class="modal-info-label">Payment Method</div>
                            <div class="modal-info-value"><i class="fab fa-cc-visa"></i> Visa ••4242</div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <div class="modal-section-title">Payment Details</div>
                    <div class="modal-details-box">
                        <div class="modal-detail-row">
                            <div class="modal-detail-label">Subtotal</div>
                            <div class="modal-detail-value">$49.99</div>
                        </div>
                        <div class="modal-detail-row">
                            <div class="modal-detail-label">Tax</div>
                            <div class="modal-detail-value">$0.00</div>
                        </div>
                        <div class="modal-detail-row">
                            <div class="modal-detail-label">Discount</div>
                            <div class="modal-detail-value" style="color: #10B981;">-$0.00</div>
                        </div>
                        <div class="modal-detail-row" style="border-top: 2px solid #667eea; padding-top: 12px; margin-top: 8px;">
                            <div class="modal-detail-label" style="font-weight: 700;">Total</div>
                            <div class="modal-detail-value" style="font-size: 18px; font-weight: 700; color: #667eea;">$49.99</div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <div class="modal-info-item">
                        <div class="modal-info-label">Date & Time</div>
                        <div class="modal-info-value">Jan 15, 2025, 10:30 AM</div>
                    </div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" onclick="ModalSystem.close('${modalId}')">
                    <i class="fas fa-times"></i> Close
                </button>
                <button class="modal-btn modal-btn-primary" onclick="downloadInvoiceForTransaction('${txnId}')">
                    <i class="fas fa-file-pdf"></i> Download Invoice
                </button>
            </div>
        </div>
    `;
    
    ModalSystem.create(modalId, content);
    ModalSystem.open(modalId);
}

function downloadInvoiceForTransaction(txnId) {
    ModalSystem.close('viewTransactionModal');
    alert(`📄 Downloading invoice for transaction ${txnId}...\n\nIn production, a PDF invoice would be generated and downloaded.`);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ModalSystem, showBuyCreditsModal, showViewTaskModal, showDownloadOptionsModal, showGenerateAPIKeyModal, showViewTransactionModal };
}

