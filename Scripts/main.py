import requests
from bs4 import BeautifulSoup
import mail
import content


def get_soup(url):
    response = requests.get(url)
    return BeautifulSoup(response.content, 'html5lib')


news_websites = ["https://techcrunch.com/category/artificial-intelligence/", "https://aiweekly.co/"]
research_websites = ["https://www.nature.com/natmachintell/", "https://deepmind.google/",
                     "https://arxiv.org/list/cs.AI/recent"]

news = []
research = []

for i in news_websites:
    soup = get_soup(i)
    if 'techcrunch' in i:
        news.append(content.techcrunch(soup))
    elif 'aiweekly' in i:
        news.append(content.aiweekly(soup))

research.append(content.nature(get_soup("https://www.nature.com/natmachintell/")))
research.append(content.deepmind(get_soup("https://deepmind.google/")))
research.append(content.arxiv(get_soup('https://arxiv.org/list/cs.AI/recent')))

email_content = mail.make_email(news, research)
# mail.send_email(email_content)

print("hello")

