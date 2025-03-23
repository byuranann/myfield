// Array to store location data
let locations = [];
let currentLat = null;
let currentLon = null;

// Show current location when the page loads
function showCurrentLocation() {
    const currentLocation = document.getElementById('current-location');
    const status = document.getElementById('status');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLat = position.coords.latitude;
                currentLon = position.coords.longitude;
                currentLocation.textContent = `Current Location: Latitude: ${currentLat}, Longitude: ${currentLon}`;
            },
            (error) => {
                currentLocation.textContent = 'Error: Unable to retrieve location. Please allow location access.';
                console.error(error);
            }
        );
    } else {
        currentLocation.textContent = 'Geolocation is not supported by this browser.';
    }
}

// Record the current location when the button is pressed
function recordLocation() {
    const status = document.getElementById('status');
    const fieldNo = document.getElementById('fieldNo').value.trim();

    if (!fieldNo) {
        status.textContent = 'Please enter a Field No.';
        return;
    }

    if (currentLat === null || currentLon === null) {
        status.textContent = 'Location not yet available. Please wait or check permissions.';
        return;
    }

    const timestamp = new Date().toLocaleString();
    const locationData = {
        'Field No.': fieldNo,
        Timestamp: timestamp,
        Latitude: currentLat,
        Longitude: currentLon
    };

    // Add to array
    locations.push(locationData);
    status.textContent = `Location recorded: (${currentLat}, ${currentLon})`;

    // Export to Excel
    // exportToExcel();

    // Send to Google Sheets
    sendToGoogleSheets(locationData);
}

// Function to export data to Excel
function exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(locations);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Locations');
    XLSX.writeFile(workbook, `locations_${new Date().toISOString().split('T')[0]}.xlsx`);
}

// Function to send data to Google Sheets
function sendToGoogleSheets(data) {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyxcLevlSbzRcMGJ6G51Y2ZVD6dxamfzDMD8wjDSXDwbQSKFBx5mTi17SjHOybzTiK8/exec'; // Replace with your script URL
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(() => {
        console.log('Data sent to Google Sheets successfully');
    })
    .catch((error) => {
        console.error('Error sending to Google Sheets:', error);
    });
}