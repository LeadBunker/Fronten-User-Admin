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
    ModalSystem.close('buyCreditsModal');
    showCryptoPaymentModal(planName, credits, price);
}

// Crypto Payment Modal
function showCryptoPaymentModal(planName, credits, price) {
    const modalId = 'cryptoPaymentModal';
    
    const content = `
        <div class="modal-container">
            <div class="modal-header">
                <h2><i class="fab fa-bitcoin"></i> Pay with Cryptocurrency</h2>
                <p>Select your preferred cryptocurrency and complete payment</p>
                <button class="modal-close" onclick="ModalSystem.close('${modalId}')">×</button>
            </div>
            
            <div class="modal-body">
                <div class="modal-section">
                    <div class="payment-amount-display">
                        <div class="amount-label">Amount to Pay</div>
                        <div class="amount-value">$${price}</div>
                        <div class="amount-crypto" id="cryptoEquivalent">≈ 0.0013 BTC</div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <div class="modal-section-title">Select Cryptocurrency</div>
                    <div class="crypto-payment-options">
                        <div class="crypto-option-card btc selected" onclick="selectCrypto('btc', '${price}')">
                            <div class="crypto-icon">
                                <i class="fab fa-bitcoin"></i>
                            </div>
                            <div class="crypto-name">Bitcoin</div>
                            <div class="crypto-network">BTC Network</div>
                        </div>
                        <div class="crypto-option-card eth" onclick="selectCrypto('eth', '${price}')">
                            <div class="crypto-icon">
                                <i class="fab fa-ethereum"></i>
                            </div>
                            <div class="crypto-name">Ethereum</div>
                            <div class="crypto-network">ERC-20</div>
                        </div>
                        <div class="crypto-option-card usdt" onclick="selectCrypto('usdt', '${price}')">
                            <div class="crypto-icon">
                                ₮
                            </div>
                            <div class="crypto-name">USDT</div>
                            <div class="crypto-network">TRC-20</div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-section" id="paymentDetailsSection">
                    <div class="modal-section-title">Payment Details</div>
                    <div class="payment-details-section">
                        <div class="payment-qr-code">
                            <div class="qr-placeholder" id="qrCodeDisplay">
                                <div style="text-align: center; color: #1F2937;">
                                    <i class="fas fa-qrcode" style="font-size: 48px; margin-bottom: 8px;"></i>
                                    <div style="font-size: 11px; font-weight: 600;">QR CODE</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="wallet-address-box">
                            <label class="wallet-address-label">
                                <i class="fas fa-wallet"></i> Wallet Address
                            </label>
                            <div class="wallet-address-display">
                                <div class="wallet-address-text" id="walletAddressText">
                                    1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
                                </div>
                                <button class="copy-address-btn" onclick="copyWalletAddress()">
                                    <i class="fas fa-copy"></i>
                                    <span id="copyBtnText">Copy</span>
                                </button>
                            </div>
                        </div>
                        
                        <div class="modal-alert warning">
                            <div class="modal-alert-icon"><i class="fas fa-exclamation-triangle"></i></div>
                            <div class="modal-alert-content">
                                <div class="modal-alert-title">Important</div>
                                <div class="modal-alert-text">
                                    • Send exactly $${price} worth of <span id="selectedCryptoName">Bitcoin</span><br>
                                    • Payment will be confirmed after 1 network confirmation<br>
                                    • Credits will be added automatically to your account
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <div class="modal-info-grid">
                        <div class="modal-info-item">
                            <div class="modal-info-label">Plan</div>
                            <div class="modal-info-value">${planName}</div>
                        </div>
                        <div class="modal-info-item">
                            <div class="modal-info-label">Credits</div>
                            <div class="modal-info-value success">${credits} Credits</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" onclick="ModalSystem.close('${modalId}')">
                    <i class="fas fa-times"></i> Cancel Payment
                </button>
                <button class="modal-btn modal-btn-success" onclick="confirmPaymentSent()">
                    <i class="fas fa-check"></i> I've Sent Payment
                </button>
            </div>
        </div>
    `;
    
    ModalSystem.create(modalId, content);
    ModalSystem.open(modalId);
}

// Wallet addresses for different cryptocurrencies
const walletAddresses = {
    btc: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    eth: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    usdt: 'TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9'
};

// Select cryptocurrency
function selectCrypto(cryptoType, price) {
    // Remove selected class from all cards
    document.querySelectorAll('.crypto-option-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selected class to clicked card
    event.currentTarget.classList.add('selected');
    
    // Update wallet address
    const walletAddressText = document.getElementById('walletAddressText');
    if (walletAddressText) {
        walletAddressText.textContent = walletAddresses[cryptoType];
    }
    
    // Update crypto name in alert
    const cryptoNames = {
        btc: 'Bitcoin',
        eth: 'Ethereum',
        usdt: 'USDT (TRC-20)'
    };
    const selectedCryptoName = document.getElementById('selectedCryptoName');
    if (selectedCryptoName) {
        selectedCryptoName.textContent = cryptoNames[cryptoType];
    }
    
    // Update crypto equivalent (simulated conversion)
    const cryptoEquivalent = document.getElementById('cryptoEquivalent');
    if (cryptoEquivalent) {
        const conversions = {
            btc: (price / 45000).toFixed(6),
            eth: (price / 2500).toFixed(4),
            usdt: price
        };
        const symbols = {
            btc: 'BTC',
            eth: 'ETH',
            usdt: 'USDT'
        };
        cryptoEquivalent.textContent = `≈ ${conversions[cryptoType]} ${symbols[cryptoType]}`;
    }
}

// Copy wallet address to clipboard
function copyWalletAddress() {
    const walletAddress = document.getElementById('walletAddressText').textContent;
    const copyBtn = document.querySelector('.copy-address-btn');
    const copyBtnText = document.getElementById('copyBtnText');
    
    navigator.clipboard.writeText(walletAddress).then(() => {
        // Change button appearance
        copyBtn.classList.add('copied');
        copyBtnText.innerHTML = '<i class="fas fa-check"></i> Copied';
        
        // Reset after 2 seconds
        setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtnText.innerHTML = 'Copy';
        }, 2000);
    }).catch(err => {
        alert('Failed to copy address. Please copy manually.');
    });
}

// Confirm payment sent
function confirmPaymentSent() {
    ModalSystem.close('cryptoPaymentModal');
    showPaymentConfirmationModal();
}

// Payment confirmation modal
function showPaymentConfirmationModal() {
    const modalId = 'paymentConfirmationModal';
    
    const content = `
        <div class="modal-container">
            <div class="modal-header" style="background: linear-gradient(135deg, #10B981 0%, #059669 100%);">
                <h2><i class="fas fa-check-circle"></i> Payment Received!</h2>
                <p>We're processing your transaction</p>
                <button class="modal-close" onclick="ModalSystem.close('${modalId}')">×</button>
            </div>
            
            <div class="modal-body">
                <div class="modal-alert success">
                    <div class="modal-alert-icon"><i class="fas fa-check-circle"></i></div>
                    <div class="modal-alert-content">
                        <div class="modal-alert-title">Payment Confirmation Pending</div>
                        <div class="modal-alert-text">
                            We've received your payment notification. Your transaction is being confirmed on the blockchain. 
                            This usually takes 5-30 minutes depending on network congestion.
                        </div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <div class="modal-section-title">What Happens Next?</div>
                    <ul class="modal-list">
                        <li class="modal-list-item">
                            <div class="modal-list-icon" style="background: #10B981;">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="modal-list-content">
                                <div class="modal-list-title">Waiting for Confirmation</div>
                                <div class="modal-list-subtitle">1 blockchain confirmation required</div>
                            </div>
                        </li>
                        <li class="modal-list-item">
                            <div class="modal-list-icon" style="background: #667eea;">
                                <i class="fas fa-coins"></i>
                            </div>
                            <div class="modal-list-content">
                                <div class="modal-list-title">Credits Added Automatically</div>
                                <div class="modal-list-subtitle">No action needed from you</div>
                            </div>
                        </li>
                        <li class="modal-list-item">
                            <div class="modal-list-icon" style="background: #F59E0B;">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div class="modal-list-content">
                                <div class="modal-list-title">Email Notification</div>
                                <div class="modal-list-subtitle">You'll receive a confirmation email</div>
                            </div>
                        </li>
                    </ul>
                </div>
                
                <div class="modal-alert info">
                    <div class="modal-alert-icon"><i class="fas fa-info-circle"></i></div>
                    <div class="modal-alert-content">
                        <div class="modal-alert-title">Having Issues?</div>
                        <div class="modal-alert-text">
                            If you don't see your credits within 1 hour, please contact our support team with your transaction ID.
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="modal-btn modal-btn-success" onclick="ModalSystem.close('${modalId}')">
                    <i class="fas fa-check"></i> Got It
                </button>
            </div>
        </div>
    `;
    
    ModalSystem.create(modalId, content);
    ModalSystem.open(modalId);
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

// Edit API Key Modal
function showEditAPIKeyModal(keyId, keyName) {
    const modalId = 'editAPIKeyModal';
    
    const content = `
        <div class="modal-container">
            <div class="modal-header">
                <h2><i class="fas fa-edit"></i> Edit API Key</h2>
                <p>Update API key settings and permissions</p>
                <button class="modal-close" onclick="ModalSystem.close('${modalId}')">×</button>
            </div>
            
            <div class="modal-body">
                <div class="modal-section">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #374151;">Key Name</label>
                    <input type="text" id="editKeyName" value="${keyName}" style="width: 100%; padding: 12px; border: 2px solid #E5E7EB; border-radius: 10px; font-size: 14px; outline: none; transition: border 0.2s;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#E5E7EB'">
                </div>
                
                <div class="modal-section">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #374151;">Status</label>
                    <select id="editKeyStatus" style="width: 100%; padding: 12px; border: 2px solid #E5E7EB; border-radius: 10px; font-size: 14px; outline: none;">
                        <option value="active" selected>Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
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
                
                <div class="modal-alert info">
                    <div class="modal-alert-icon"><i class="fas fa-info-circle"></i></div>
                    <div class="modal-alert-content">
                        <div class="modal-alert-title">Note</div>
                        <div class="modal-alert-text">Changes will take effect immediately. Your applications using this key may need to be restarted.</div>
                    </div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" onclick="ModalSystem.close('${modalId}')">
                    <i class="fas fa-times"></i> Cancel
                </button>
                <button class="modal-btn modal-btn-primary" onclick="confirmEditAPIKey('${keyId}')">
                    <i class="fas fa-save"></i> Save Changes
                </button>
            </div>
        </div>
    `;
    
    ModalSystem.create(modalId, content);
    ModalSystem.open(modalId);
}

function confirmEditAPIKey(keyId) {
    const keyName = document.getElementById('editKeyName').value;
    ModalSystem.close('editAPIKeyModal');
    alert(`✅ API Key Updated!\n\nKey ID: ${keyId}\nNew Name: ${keyName}\n\nChanges have been saved successfully.`);
}

// Revoke API Key Modal
function showRevokeAPIKeyModal(keyId, keyName) {
    const modalId = 'revokeAPIKeyModal';
    
    const content = `
        <div class="modal-container">
            <div class="modal-header" style="background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);">
                <h2 style="color: white;"><i class="fas fa-exclamation-triangle"></i> Revoke API Key</h2>
                <p style="color: rgba(255,255,255,0.9);">This action cannot be undone</p>
                <button class="modal-close" onclick="ModalSystem.close('${modalId}')" style="color: white;">×</button>
            </div>
            
            <div class="modal-body">
                <div class="modal-alert danger">
                    <div class="modal-alert-icon"><i class="fas fa-ban"></i></div>
                    <div class="modal-alert-content">
                        <div class="modal-alert-title">Warning: Permanent Action</div>
                        <div class="modal-alert-text">Revoking this API key will immediately revoke access for all applications using it. This action is permanent and cannot be reversed.</div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <div class="modal-info-grid">
                        <div class="modal-info-item">
                            <div class="modal-info-label">Key Name</div>
                            <div class="modal-info-value">${keyName}</div>
                        </div>
                        <div class="modal-info-item">
                            <div class="modal-info-label">Key ID</div>
                            <div class="modal-info-value">${keyId}</div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #374151;">
                        Type "REVOKE" to confirm
                    </label>
                    <input type="text" id="revokeConfirmText" placeholder="Type REVOKE to confirm" style="width: 100%; padding: 12px; border: 2px solid #E5E7EB; border-radius: 10px; font-size: 14px; outline: none; transition: border 0.2s;" onfocus="this.style.borderColor='#EF4444'" onblur="this.style.borderColor='#E5E7EB'">
                </div>
                
                <div class="modal-alert warning">
                    <div class="modal-alert-icon"><i class="fas fa-exclamation-circle"></i></div>
                    <div class="modal-alert-content">
                        <div class="modal-alert-title">What happens next?</div>
                        <div class="modal-alert-text">
                            • All API requests using this key will fail immediately<br>
                            • Applications using this key will lose access<br>
                            • The key will be archived in your account history<br>
                            • You can generate a new key at any time
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" onclick="ModalSystem.close('${modalId}')">
                    <i class="fas fa-times"></i> Cancel
                </button>
                <button class="modal-btn modal-btn-danger" onclick="confirmRevokeAPIKey('${keyId}', '${keyName}')">
                    <i class="fas fa-ban"></i> Revoke API Key
                </button>
            </div>
        </div>
    `;
    
    ModalSystem.create(modalId, content);
    ModalSystem.open(modalId);
}

function confirmRevokeAPIKey(keyId, keyName) {
    const confirmText = document.getElementById('revokeConfirmText').value;
    
    if (confirmText !== 'REVOKE') {
        alert('❌ Please type "REVOKE" to confirm this action.');
        return;
    }
    
    ModalSystem.close('revokeAPIKeyModal');
    alert(`✅ API Key Revoked!\n\nKey: ${keyName}\nID: ${keyId}\n\nThe key has been permanently revoked and can no longer be used.`);
    
    // In production, you would refresh the page or update the UI
    setTimeout(() => {
        window.location.reload();
    }, 2000);
}

// Edit Team Member Modal
function showEditMemberModal(memberId, memberName, memberEmail, currentRole) {
    const modalId = 'editMemberModal';
    
    const content = `
        <div class="modal-container">
            <div class="modal-header">
                <h2><i class="fas fa-user-edit"></i> Edit Team Member Role</h2>
                <p>Update permissions for ${memberName}</p>
                <button class="modal-close" onclick="ModalSystem.close('${modalId}')">×</button>
            </div>
            
            <div class="modal-body">
                <div class="modal-section">
                    <div class="modal-info-grid">
                        <div class="modal-info-item">
                            <div class="modal-info-label">Member Name</div>
                            <div class="modal-info-value">${memberName}</div>
                        </div>
                        <div class="modal-info-item">
                            <div class="modal-info-label">Email</div>
                            <div class="modal-info-value">${memberEmail}</div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <label style="display: block; font-weight: 600; margin-bottom: 12px; color: #374151;">
                        <i class="fas fa-shield-alt"></i> Select Role
                    </label>
                    <select id="memberRoleSelect" style="width: 100%; padding: 12px; border: 2px solid #E5E7EB; border-radius: 10px; font-size: 14px; outline: none; transition: border 0.2s;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#E5E7EB'">
                        <option value="admin" ${currentRole === 'admin' ? 'selected' : ''}>Admin - Full access to all features</option>
                        <option value="member" ${currentRole === 'member' ? 'selected' : ''}>Member - Can create and manage tasks</option>
                        <option value="viewer" ${currentRole === 'viewer' ? 'selected' : ''}>Viewer - Read-only access</option>
                    </select>
                </div>
                
                <div class="modal-section">
                    <div style="background: #F9FAFB; border-radius: 12px; padding: 16px; border-left: 4px solid #667eea;">
                        <h4 style="margin: 0 0 12px 0; color: #374151; font-size: 14px; font-weight: 600;">
                            <i class="fas fa-info-circle" style="color: #667eea;"></i> Role Permissions
                        </h4>
                        <div id="rolePermissions" style="font-size: 13px; color: #6B7280; line-height: 1.6;">
                            <!-- Permissions will be updated dynamically -->
                        </div>
                    </div>
                </div>
                
                <div class="modal-alert info">
                    <div class="modal-alert-icon"><i class="fas fa-bell"></i></div>
                    <div class="modal-alert-content">
                        <div class="modal-alert-title">Member Notification</div>
                        <div class="modal-alert-text">The team member will be notified via email about their role change.</div>
                    </div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" onclick="ModalSystem.close('${modalId}')">
                    <i class="fas fa-times"></i> Cancel
                </button>
                <button class="modal-btn modal-btn-primary" onclick="confirmEditMember('${memberId}', '${memberName}')">
                    <i class="fas fa-save"></i> Update Role
                </button>
            </div>
        </div>
    `;
    
    ModalSystem.create(modalId, content);
    ModalSystem.open(modalId);
    
    // Update permissions display when role changes
    const roleSelect = document.getElementById('memberRoleSelect');
    const permissionsDiv = document.getElementById('rolePermissions');
    
    const updatePermissions = () => {
        const role = roleSelect.value;
        let permissions = '';
        
        if (role === 'admin') {
            permissions = `
                ✅ Full access to all features<br>
                ✅ Manage team members<br>
                ✅ View and edit all tasks<br>
                ✅ Access billing and settings<br>
                ✅ Generate API keys
            `;
        } else if (role === 'member') {
            permissions = `
                ✅ Create and manage own tasks<br>
                ✅ View team tasks<br>
                ✅ Export data<br>
                ❌ Cannot manage team members<br>
                ❌ No billing access
            `;
        } else if (role === 'viewer') {
            permissions = `
                ✅ View tasks and results<br>
                ✅ Download exports<br>
                ❌ Cannot create tasks<br>
                ❌ Cannot manage team<br>
                ❌ No billing access
            `;
        }
        
        permissionsDiv.innerHTML = permissions;
    };
    
    roleSelect.addEventListener('change', updatePermissions);
    updatePermissions();
}

function confirmEditMember(memberId, memberName) {
    const newRole = document.getElementById('memberRoleSelect').value;
    const roleLabels = {
        'admin': 'Admin',
        'member': 'Member',
        'viewer': 'Viewer'
    };
    
    ModalSystem.close('editMemberModal');
    alert(`✅ Team Member Updated!\n\nMember: ${memberName}\nNew Role: ${roleLabels[newRole]}\n\n${memberName} has been notified of their new role.`);
    
    // In production, you would refresh or update the UI
    setTimeout(() => {
        window.location.reload();
    }, 2000);
}

// Remove Team Member Modal
function showRemoveMemberModal(memberId, memberName, memberEmail) {
    const modalId = 'removeMemberModal';
    
    const content = `
        <div class="modal-container">
            <div class="modal-header" style="background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);">
                <h2 style="color: white;"><i class="fas fa-user-minus"></i> Remove Team Member</h2>
                <p style="color: rgba(255,255,255,0.9);">This action cannot be undone</p>
                <button class="modal-close" onclick="ModalSystem.close('${modalId}')" style="color: white;">×</button>
            </div>
            
            <div class="modal-body">
                <div class="modal-alert danger">
                    <div class="modal-alert-icon"><i class="fas fa-exclamation-triangle"></i></div>
                    <div class="modal-alert-content">
                        <div class="modal-alert-title">Warning: Permanent Removal</div>
                        <div class="modal-alert-text">Removing this team member will revoke their access immediately. They will no longer be able to access the dashboard or any shared resources.</div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <div class="modal-info-grid">
                        <div class="modal-info-item">
                            <div class="modal-info-label">Member Name</div>
                            <div class="modal-info-value">${memberName}</div>
                        </div>
                        <div class="modal-info-item">
                            <div class="modal-info-label">Email</div>
                            <div class="modal-info-value">${memberEmail}</div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #374151;">
                        Type "REMOVE" to confirm
                    </label>
                    <input type="text" id="removeConfirmText" placeholder="Type REMOVE to confirm" style="width: 100%; padding: 12px; border: 2px solid #E5E7EB; border-radius: 10px; font-size: 14px; outline: none; transition: border 0.2s;" onfocus="this.style.borderColor='#EF4444'" onblur="this.style.borderColor='#E5E7EB'">
                </div>
                
                <div class="modal-alert warning">
                    <div class="modal-alert-icon"><i class="fas fa-exclamation-circle"></i></div>
                    <div class="modal-alert-content">
                        <div class="modal-alert-title">What happens next?</div>
                        <div class="modal-alert-text">
                            • Member loses access immediately<br>
                            • All shared tasks remain intact<br>
                            • Member receives removal notification<br>
                            • You can re-invite them later if needed
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" onclick="ModalSystem.close('${modalId}')">
                    <i class="fas fa-times"></i> Cancel
                </button>
                <button class="modal-btn modal-btn-danger" onclick="confirmRemoveMember('${memberId}', '${memberName}')">
                    <i class="fas fa-user-minus"></i> Remove Member
                </button>
            </div>
        </div>
    `;
    
    ModalSystem.create(modalId, content);
    ModalSystem.open(modalId);
}

function confirmRemoveMember(memberId, memberName) {
    const confirmText = document.getElementById('removeConfirmText').value;
    
    if (confirmText !== 'REMOVE') {
        alert('❌ Please type "REMOVE" to confirm this action.');
        return;
    }
    
    ModalSystem.close('removeMemberModal');
    alert(`✅ Team Member Removed!\n\nMember: ${memberName}\n\n${memberName} has been removed from your team and will receive a notification email.`);
    
    // In production, you would refresh or update the UI
    setTimeout(() => {
        window.location.reload();
    }, 2000);
}

// View Transaction Modal
function showViewTransactionModal(txnId) {
    const modalId = 'viewTransactionModal';
    
    // Sample transaction data - in real app, fetch from backend
    const transactionData = {
        'TXN-4521': {
            id: 'TXN-4521',
            status: 'Completed',
            statusClass: 'completed',
            amount: '$120.00',
            amountColor: '#667eea',
            method: '<i class="fab fa-bitcoin" style="color: #f7931a;"></i> Bitcoin',
            item: '1,000 Credits Pack',
            subtotal: '$120.00',
            tax: '$0.00',
            discount: '-$0.00',
            total: '$120.00',
            totalColor: '#667eea',
            date: 'Nov 14, 2024, 14:23'
        },
        'TXN-4520': {
            id: 'TXN-4520',
            status: 'Completed',
            statusClass: 'completed',
            amount: '$49.00',
            amountColor: '#667eea',
            method: '<i class="fab fa-ethereum" style="color: #627eea;"></i> Ethereum',
            item: 'Pro Plan - Monthly',
            subtotal: '$49.00',
            tax: '$0.00',
            discount: '-$0.00',
            total: '$49.00',
            totalColor: '#667eea',
            date: 'Nov 10, 2024, 09:15'
        },
        'TXN-4518': {
            id: 'TXN-4518',
            status: 'Refunded',
            statusClass: 'refunded',
            amount: '-$10.00',
            amountColor: '#F59E0B',
            method: '<i class="fab fa-bitcoin" style="color: #f7931a;"></i> Bitcoin',
            item: 'Refund - Failed Extraction',
            subtotal: '-$10.00',
            tax: '$0.00',
            discount: '$0.00',
            total: '-$10.00',
            totalColor: '#F59E0B',
            date: 'Oct 28, 2024, 11:30'
        }
    };
    
    const data = transactionData[txnId] || transactionData['TXN-4521'];
    
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
                            <div class="modal-info-value">${data.id}</div>
                        </div>
                        <div class="modal-info-item">
                            <div class="modal-info-label">Status</div>
                            <div class="modal-info-value">
                                <span class="modal-status-badge ${data.statusClass}">${data.status}</span>
                            </div>
                        </div>
                        <div class="modal-info-item">
                            <div class="modal-info-label">Amount</div>
                            <div class="modal-info-value large" style="color: ${data.amountColor};">${data.amount}</div>
                        </div>
                        <div class="modal-info-item">
                            <div class="modal-info-label">Payment Method</div>
                            <div class="modal-info-value">${data.method}</div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <div class="modal-section-title">${data.statusClass === 'refunded' ? 'Refund Details' : 'Payment Details'}</div>
                    <div class="modal-details-box">
                        <div class="modal-detail-row">
                            <div class="modal-detail-label">Item</div>
                            <div class="modal-detail-value">${data.item}</div>
                        </div>
                        <div class="modal-detail-row">
                            <div class="modal-detail-label">Subtotal</div>
                            <div class="modal-detail-value">${data.subtotal}</div>
                        </div>
                        <div class="modal-detail-row">
                            <div class="modal-detail-label">Tax</div>
                            <div class="modal-detail-value">$0.00</div>
                        </div>
                        <div class="modal-detail-row">
                            <div class="modal-detail-label">Discount</div>
                            <div class="modal-detail-value" style="color: #10B981;">${data.discount}</div>
                        </div>
                        <div class="modal-detail-row" style="border-top: 2px solid ${data.statusClass === 'refunded' ? '#F59E0B' : '#667eea'}; padding-top: 12px; margin-top: 8px;">
                            <div class="modal-detail-label" style="font-weight: 700;">Total</div>
                            <div class="modal-detail-value" style="font-size: 18px; font-weight: 700; color: ${data.totalColor};">${data.total}</div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <div class="modal-info-item">
                        <div class="modal-info-label">Date & Time</div>
                        <div class="modal-info-value">${data.date}</div>
                    </div>
                </div>
                
                ${data.statusClass === 'refunded' ? `
                <div class="modal-alert modal-alert-warning">
                    <i class="fas fa-info-circle"></i>
                    <div>
                        <strong>Refund Processed</strong><br>
                        This amount has been refunded to your original payment method. Please allow 5-10 business days for the refund to appear.
                    </div>
                </div>
                ` : ''}
            </div>
            
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" onclick="ModalSystem.close('${modalId}')">
                    <i class="fas fa-times"></i> Close
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

