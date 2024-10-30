# Enigma Email Newsletter

This project fetches the latest news on Artificial Intelligence from various websites every 5 minutes and sends an email with the collected information to all subscribed users.

## Features

- Scrapes news and research content from AI-related websites.
- Automatically compiles the content into a structured email.
- Sends the email to all subscribers from Firebase Firestore.
- Runs the task every 5 minutes.

## Prerequisites

1. **Python** - Make sure you have Python 3.7+ installed.
2. **Firebase Project** - Set up a Firebase project and enable Firestore for storing subscriber emails.

## Setup

### 1. Install Dependencies

Use `pip` to install the required packages:

```bash
cd Scripts
pip install -r requirements.txt
```

### 2. Firebase Configuration (`config.json`)

To access your Firebase Firestore database, you’ll need a `config.json` file containing your Firebase service account credentials. Follow these steps to generate and add this file to the project:

1. Go to your [Firebase Console](https://console.firebase.google.com/).
2. Select your project.
3. Navigate to **Project Settings** > **Service accounts**.
4. Click **Generate new private key**. A `config.json` file will be downloaded.
5. Save `config.json` in the **Scripts directory** of this project.

The `config.json` file should look something like this:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "unique-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com",
  "client_id": "client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project-id.iam.gserviceaccount.com"
}
```

### 3. Run the Application

This project uses the `schedule` library to execute the email notification function every 5 minutes. To start the process:

```bash
python main.py
```

## How It Works

1. The script fetches the latest AI news from defined sources using BeautifulSoup.
2. It compiles the content into an email format.
3. Subscriber emails are retrieved from Firebase Firestore.
4. Each subscriber receives an email with the latest news and research articles.

## Customization

- **Adding More Sources**: You can add more websites by extending the `news_websites` and `research_websites` lists in the code.
- **Changing Frequency**: Adjust the `schedule.every(5).minutes.do(fetch_and_send_emails)` line to change the interval.

## Dependencies

- **`requests`**: For sending HTTP requests to fetch website content.
- **`beautifulsoup4`**: For parsing HTML content.
- **`firebase-admin`**: For accessing Firebase Firestore.
- **`schedule`**: For scheduling the task to run periodically.

## License

This project is open-source and available under the MIT License.

---

Let me know if you'd like further adjustments!