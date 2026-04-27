let locations = [];
let currentLat = null;
let currentLon = null;

function showCurrentLocation() {
    const currentLocation = document.getElementById('current-location').querySelector('span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLat = position.coords.latitude;
                currentLon = position.coords.longitude;
                currentLocation.textContent = `Lat: ${currentLat.toFixed(6)}, Lon: ${currentLon.toFixed(6)}`;
            },
            (error) => {
                currentLocation.textContent = 'Error: ไม่สามารถเข้าถึงตำแหน่งได้ กรุณาอนุญาตการใช้งาน';
                console.error(error);
            },
            { enableHighAccuracy: true }
        );
    } else {
        currentLocation.textContent = 'เบราว์เซอร์นี้ไม่รองรับ Geolocation';
    }
}

function showStatus(message, isError = false) {
    const status = document.getElementById('status');
    status.classList.remove('hidden');
    status.classList.toggle('error', isError);
    status.innerHTML = `<i class="fas ${isError ? 'fa-circle-exclamation' : 'fa-circle-check'}"></i><span>${message}</span>`;
}

function recordLocation() {
    const name = document.getElementById('name').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const no = document.getElementById('no').value;
    const location = document.getElementById('location').value.trim();
    const fieldNo = document.getElementById('fieldNo').value.trim();

    if (!name) return showStatus('กรุณากรอกชื่อ (Name)', true);
    if (!lastName) return showStatus('กรุณากรอกนามสกุล (Last Name)', true);
    if (!no) return showStatus('กรุณาเลือก Variety', true);
    if (!location) return showStatus('กรุณากรอก Location', true);
    if (!fieldNo) return showStatus('กรุณากรอก Area (Rai)', true);
    if (currentLat === null || currentLon === null)
        return showStatus('ยังไม่ได้รับตำแหน่ง กรุณารอหรือเช็คสิทธิ์การเข้าถึง', true);

    const timestamp = new Date().toLocaleString();
    const locationData = {
        'Name': name,
        'Last Name': lastName,
        'No.': no,
        'Location': location,
        'Field No.': fieldNo,
        'Timestamp': timestamp,
        'Latitude': currentLat,
        'Longitude': currentLon
    };

    locations.push(locationData);
    showStatus(`บันทึกสำเร็จ! ${name} ${lastName} (${currentLat.toFixed(4)}, ${currentLon.toFixed(4)})`);

    document.getElementById('name').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('no').value = '';
    document.getElementById('location').value = '';
    document.getElementById('fieldNo').value = '';

    sendToGoogleSheets(locationData);
}

function exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(locations);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Locations');
    XLSX.writeFile(workbook, `locations_${new Date().toISOString().split('T')[0]}.xlsx`);
}

function sendToGoogleSheets(data) {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzr6RFaoUu-TqgFBLaPMaBmTPmLpF5XB4Wad9O06u_o8v2yGAw88o38jrJEcM8rD3HZ3Q/exec';
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(() => console.log('Data sent:', data))
    .catch((error) => console.error('Error:', error));
}
