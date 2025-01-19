import firebase_admin
from firebase_admin import credentials, firestore

# Initialize the Firebase app
cred = credentials.Certificate("web-enigma-firebase-adminsdk-0p2qg-7c56207092.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

def fetch_enigma_news():
    try:
        # Reference to the 'Enigma_News' collection
        news_collection = db.collection('Enigma_News')
        
        # Fetch all documents in the collection
        docs = news_collection.stream()
        
        # Extract news details from each document
        news_list = []
        for doc in docs:
            news_data = doc.to_dict()
            news_item = {
                'id': doc.id,
                'news': news_data.get('news'),
                'body': news_data.get('body'),
                'date': news_data.get('date'),
                'header': news_data.get('header'),
                'links': news_data.get('links')
            }
            news_list.append(news_item)

        return news_list
    except Exception as error:
        print("Error fetching Enigma news:", error)
        return []

def fetch_subscribers():
    try:
        # Reference to the 'subscribers' collection
        subscriber_collection = db.collection('subscribers')
        
        # Fetch all documents in the collection
        docs = subscriber_collection.stream()
        
        # Extract emails from each document
        emails = [doc.to_dict().get('email') for doc in docs if doc.to_dict().get('email')]

        return emails
    except Exception as error:
        print("Error fetching subscribers:", error)
        return []


# # Example usage
# emails = fetch_subscribers()
# print("Subscriber Emails:", emails)
