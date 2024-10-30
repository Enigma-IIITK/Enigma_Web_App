import firebase_admin
from firebase_admin import credentials, firestore

# Initialize the Firebase app
cred = credentials.Certificate("web-enigma-firebase-adminsdk-0p2qg-7c56207092.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

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
