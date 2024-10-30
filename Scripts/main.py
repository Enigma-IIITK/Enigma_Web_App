import requests
from bs4 import BeautifulSoup
import schedule
import time

import mail
import content
import DataFetch

# Define the main function to fetch, generate, and send email content
def fetch_and_send_emails():
    # Helper function to create soup object
    def get_soup(url):
        response = requests.get(url)
        return BeautifulSoup(response.content, 'html5lib')

    # Define websites to fetch content from
    news_websites = [
        "https://techcrunch.com/category/artificial-intelligence/",
        "https://aiweekly.co/"
    ]
    research_websites = [
        "https://www.nature.com/natmachintell/",
        "https://deepmind.google/",
        "https://arxiv.org/list/cs.AI/recent"
    ]

    # Collect news content
    news = []
    for i in news_websites:
        soup = get_soup(i)
        if 'techcrunch' in i:
            news.append(content.techcrunch(soup))
        elif 'aiweekly' in i:
            news.append(content.aiweekly(soup))

    # Collect research content
    research = [
        content.nature(get_soup("https://www.nature.com/natmachintell/")),
        content.deepmind(get_soup("https://deepmind.google/")),
        content.arxiv(get_soup('https://arxiv.org/list/cs.AI/recent'))
    ]

    # Create the email content
    email_content = mail.make_email(news, research)

    # Fetch subscribers and send emails
    emails = DataFetch.fetch_subscribers()
    for email in emails:
        mail.send_email(email, email_content)

# Schedule the function to run every 5 minutes
schedule.every(5).minutes.do(fetch_and_send_emails)

# Keep the script running
while True:
    schedule.run_pending()
    time.sleep(1)
