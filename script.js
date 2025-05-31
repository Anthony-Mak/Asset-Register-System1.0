// Navigation functions
function showSection(event, section) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });

    // Remove active class from nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected section
    document.getElementById(section).classList.add('active');

    // Add active class to clicked nav link
    event.target.classList.add('active');

    // Update page title
    const titles = {
        'dashboard': 'Dashboard Overview',
        'assets': 'Assets Management',
        'licenses': 'Licenses Management',
        'people': 'People Management'
    };
    document.getElementById('pageTitle').textContent = titles[section];
}

// Modal functions
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.getElementById('addForm').reset();
    document.getElementById('dynamicForm').innerHTML = '';
}

// Search function
function searchTable(tableId, searchValue) {
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        let found = Array.from(cells).some(cell => 
            cell.textContent.toLowerCase().includes(searchValue.toLowerCase())
        );
        row.style.display = found ? '' : 'none';
    }
}

// Dynamic form update
function updateForm() {
    const category = document.getElementById('category').value;
    const dynamicForm = document.getElementById('dynamicForm');

    let formHTML = '';

    switch (category) {
        case 'asset':
            formHTML = `
                <div class="form-group">
                    <label class="form-label">Asset Name</label>
                    <input type="text" class="form-input" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Asset Type</label>
                    <select class="form-select" required>
                        <option value="">Select Type</option>
                        <option value="laptop">Laptop</option>
                        <option value="desktop">Desktop</option>
                        <option value="mobile">Mobile</option>
                        <option value="monitor">Monitor</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Assigned To</label>
                    <input type="text" class="form-input">
                </div>
            `;
            break;
        case 'license':
            formHTML = `
                <div class="form-group">
                    <label class="form-label">Software Name</label>
                    <input type="text" class="form-input" required>
                </div>
                <div class="form-group">
                    <label class="form-label">License Type</label>
                    <select class="form-select" required>
                        <option value="">Select Type</option>
                        <option value="subscription">Subscription</option>
                        <option value="perpetual">Perpetual</option>
                        <option value="annual">Annual</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Expiry Date</label>
                    <input type="date" class="form-input">
                </div>
            `;
            break;
        case 'person':
            formHTML = `
                <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input type="text" class="form-input" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Department</label>
                    <select class="form-select" required>
                        <option value="">Select Department</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Operations">Operations</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-input" required>
                </div>
            `;
            break;
    }

    dynamicForm.innerHTML = formHTML;
}

// Form submission
document.getElementById('addForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Item added successfully! (This is a demo)');
    closeModal('addModal');
});

// Export function
function exportData() {
    alert('Export functionality would be implemented here');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    });
};

// Update stats on page load
function updateStats() {
    const stats = {
        assets: document.querySelectorAll('#assetsTableBody tr').length,
        licenses: document.querySelectorAll('#licensesTableBody tr').length,
        people: document.querySelectorAll('#peopleTableBody tr').length,
        expiring: 3 // This would be calculated based on actual data
    };

    document.getElementById('totalAssets').textContent = stats.assets;
    document.getElementById('totalLicenses').textContent = stats.licenses;
    document.getElementById('totalPeople').textContent = stats.people;
    document.getElementById('expiringSoon').textContent = stats.expiring;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
});