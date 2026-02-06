# Location Data Collector

## Objective
The **Location Data Collector** is a web-based application designed to streamline the process of recording and managing field location data. It allows users to capture their current geographical coordinates (Latitude and Longitude) along with specific field details such as Name, Variety, and Area. The data is then timestamped and can be sent to Google Sheets or exported for further analysis. This tool aims to improve accuracy and efficiency in field data collection.

## How it works

1.  **Open the Application**: Launch the `index.html` file in your web browser. A background image will load, and the interface will appear.
2.  **Allow Location Access**: When prompted, allow the browser to access your location. The app will automatically fetch and display your current Latitude and Longitude.
    *   *Note: If location access is denied, you will not be able to record coordinates.*
3.  **Fill in Details**: Enter the required information in the form:
    *   **Name**: Your first name.
    *   **Last Name**: Your surname.
    *   **Variety**: Select the crop or item variety from the dropdown menu (e.g., #51, #55, #SB).
    *   **Area (Rai)**: Enter the field area or number.
4.  **Record Location**: Click the **"Record Location"** button.
    *   The app validates that all fields are filled and location data is available.
    *   If successful, the data is saved locally in the viewing session and sent to the configured Google Sheet.
    *   A success message will appear at the bottom.
5.  **Data Export**:
    *   Data is automatically sent to the connected Google Sheet for real-time tracking.
    *   *(Optional)* Code for exporting to Excel is included but commented out by default.