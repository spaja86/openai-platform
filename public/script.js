// Tab Navigation
document.querySelectorAll('[data-tab]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = e.target.getAttribute('data-tab');
        
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Show selected tab
        document.getElementById(`${tab}-section`).classList.add('active');
        
        // Update active nav link
        document.querySelectorAll('[data-tab]').forEach(l => {
            l.style.backgroundColor = '';
        });
        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });
});

// Tool Tabs in Business Section
document.querySelectorAll('.tool-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        const tool = e.target.getAttribute('data-tool');
        
        // Update active tab
        document.querySelectorAll('.tool-tab').forEach(t => {
            t.classList.remove('active');
        });
        e.target.classList.add('active');
        
        // Show selected tool
        document.querySelectorAll('.tool-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tool}-tool`).classList.add('active');
    });
});

// Loading Indicator
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

// Chat Functionality
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat');

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'assistant'}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <strong>${isUser ? 'Vi' : 'AI Asistent'}:</strong> ${content}
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    addMessage(message, true);
    chatInput.value = '';
    
    showLoading();
    
    try {
        const response = await fetch('/api/chat/question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: message })
        });
        
        const data = await response.json();
        
        if (data.success) {
            addMessage(data.message);
        } else {
            addMessage('Greška: ' + (data.error || 'Došlo je do greške'));
        }
    } catch (error) {
        addMessage('Greška u komunikaciji sa serverom');
        console.error('Chat greška:', error);
    } finally {
        hideLoading();
    }
}

sendChatBtn.addEventListener('click', sendChatMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendChatMessage();
    }
});

// Image Generation
const imagePrompt = document.getElementById('image-prompt');
const imageSize = document.getElementById('image-size');
const imageQuality = document.getElementById('image-quality');
const generateImageBtn = document.getElementById('generate-image');
const imageResult = document.getElementById('image-result');

generateImageBtn.addEventListener('click', async () => {
    const prompt = imagePrompt.value.trim();
    if (!prompt) {
        alert('Molimo unesite opis slike');
        return;
    }
    
    showLoading();
    imageResult.innerHTML = '';
    
    try {
        const response = await fetch('/api/image/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt,
                size: imageSize.value,
                quality: imageQuality.value
            })
        });
        
        const data = await response.json();
        
        if (data.success && data.images && data.images.length > 0) {
            data.images.forEach(image => {
                const imgContainer = document.createElement('div');
                imgContainer.innerHTML = `
                    <img src="${image.url}" alt="${prompt}">
                    <p style="margin-top: 1rem; color: #718096;">
                        <strong>Prompt:</strong> ${prompt}
                    </p>
                `;
                imageResult.appendChild(imgContainer);
            });
        } else {
            imageResult.innerHTML = `<p style="color: red;">Greška: ${data.error || 'Došlo je do greške'}</p>`;
        }
    } catch (error) {
        imageResult.innerHTML = '<p style="color: red;">Greška u komunikaciji sa serverom</p>';
        console.error('Image generation greška:', error);
    } finally {
        hideLoading();
    }
});

// Business Content Generation
const contentType = document.getElementById('content-type');
const contentDescription = document.getElementById('content-description');
const generateContentBtn = document.getElementById('generate-content');
const generatedContent = document.getElementById('generated-content');

generateContentBtn.addEventListener('click', async () => {
    const description = contentDescription.value.trim();
    if (!description) {
        alert('Molimo unesite opis');
        return;
    }
    
    showLoading();
    generatedContent.innerHTML = '';
    
    try {
        const response = await fetch('/api/business/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: contentType.value,
                description: description
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            generatedContent.innerHTML = data.message;
        } else {
            generatedContent.innerHTML = `<p style="color: red;">Greška: ${data.error || 'Došlo je do greške'}</p>`;
        }
    } catch (error) {
        generatedContent.innerHTML = '<p style="color: red;">Greška u komunikaciji sa serverom</p>';
        console.error('Content generation greška:', error);
    } finally {
        hideLoading();
    }
});

// Text Analysis
const analysisType = document.getElementById('analysis-type');
const analysisText = document.getElementById('analysis-text');
const analyzeTextBtn = document.getElementById('analyze-text');
const analysisResult = document.getElementById('analysis-result');

analyzeTextBtn.addEventListener('click', async () => {
    const text = analysisText.value.trim();
    if (!text) {
        alert('Molimo unesite tekst za analizu');
        return;
    }
    
    showLoading();
    analysisResult.innerHTML = '';
    
    try {
        const response = await fetch('/api/business/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                analysisType: analysisType.value
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            analysisResult.innerHTML = data.message;
        } else {
            analysisResult.innerHTML = `<p style="color: red;">Greška: ${data.error || 'Došlo je do greške'}</p>`;
        }
    } catch (error) {
        analysisResult.innerHTML = '<p style="color: red;">Greška u komunikaciji sa serverom</p>';
        console.error('Text analysis greška:', error);
    } finally {
        hideLoading();
    }
});

// Check server health on load
window.addEventListener('load', async () => {
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        console.log('Server status:', data);
    } catch (error) {
        console.error('Server nije dostupan:', error);
    }
});
