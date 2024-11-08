import requests
from bs4 import BeautifulSoup


def techcrunch(soup):
    # Find all AI articles based on the category 'AI' link
    ai_articles = soup.find_all('a', href="https://techcrunch.com/category/artificial-intelligence/")
    
    

    # Check if there are AI articles
    if len(ai_articles) > 0:
        # Get the first AI article and navigate to the parent div
        first_article = ai_articles[0].find_parent('div', class_='loop-card__content')

        if first_article:
            # Extract the article title and link
            title_tag = first_article.find('a', class_='loop-card__title-link')
            if title_tag:
                title = title_tag.get_text(strip=True)
                link = title_tag['href']

                # Get the description (if any) from the figure or meta tags within the card
                description = first_article.find('div', class_='loop-card__meta')
                if description:
                    description_text = description.get_text(separator=' ', strip=True)
                else:
                    description_text = "No description available."

                # Return the extracted data
                article_data = {
                    'article_url': link,
                    'article_title': title,
                    'content': description_text
                }

                return article_data
            else:
                print("No title link found for the AI article.")
        else:
            print("No parent content found for the AI article.")
    else:
        print("No AI articles found.")

    return None


def aiweekly(soup):
    # Find the specific section
    section = soup.find('section', class_='category cc-ethics')
    
    link = ""
    title = ""
    summary = ""
    # Check if the section was found
    if section:
        # Find all items within the section
        items = section.find_all('div', class_='item item--issue item--link')

        # Check if there are any items
        if items:
            # Get the last item
            last_item = items[-1]

            # Extract the title and URL
            title_tag = last_item.find('h3', class_='item__title').find('a')
            title = title_tag.text
            link = title_tag['href']

            # Extract the summary
            summary = last_item.find('p').text

            # Extract the source
            source_tag = last_item.find('span', class_='item__footer-link').find('a')
            source = source_tag.text
            source_link = source_tag['href']
        else:
            print("No items found.")
    else:
        print("Section not found.")

    article_data = {
        'article_url': link,
        'article_title': title,
        'content': summary
    }

    return article_data


def nature(soup):
    # Find the section by id
    latest_research_section = soup.find('section', {'id': 'latest-research'})

    # Extract the first article details if available
    if latest_research_section:
        # Find the first article
        first_article = latest_research_section.find('li', class_='app-article-list-row__item')

        if first_article:
            # Extract the article title and link
            article_title = first_article.find('h3', class_='c-card__title').get_text(strip=True)
            article_link = first_article.find('a', class_='c-card__link')['href']
            full_link = f"https://www.nature.com{article_link}"

            # Extract the article summary from the first <p> tag inside the div
            article_body_div = first_article.find('div', class_='c-card__body')
            article_summary = article_body_div.find('p').get_text(strip=True) if article_body_div.find(
                'p') else "No summary available"

        else:
            print("No articles found.")
    else:
        print("No 'Latest Research' section found.")

    article_data = {
        'article_url': full_link,
        'article_title': article_title,
        'content': article_summary
    }

    return article_data


def deepmind(soup):
    # Initialize variables
    article_title = None
    article_description = None
    article_link = None

    # Find the section with the "Latest news" heading
    latest_news_section = soup.find('h2', string="Latest news").find_parent('div', class_='section-heading')
 
    if latest_news_section:
        # Locate the first article with the "research" tag
        first_research_article = latest_news_section.find_next('li', {'data-gdm-filter-category': 'research'})

        if first_research_article:
            # Extract the relevant details
            article_title = first_research_article.find('p', class_='glue-headline glue-headline--headline-5')
            article_description = first_research_article.find('p', class_='glue-card__description').get_text(strip=True)
            article_link = first_research_article.find('a', class_='glue-card')['href']
        else:
            print("No research articles found under the Latest news section.")
    else:
        print("Latest news section not found.")

    if article_title and article_description and article_link:
        article_data = {
            'article_url': 'https://deepmind.google' + article_link,
            'article_title': article_title.get_text(strip=True),
            'content': article_description
        }
    else:
        article_data = {
            'article_url': '',
            'article_title': 'No article found',
            'content': ''
        }

    return article_data


def arxiv(soup):
    # Step 2: Extract the first article details
    article = soup.find('dt')  # Get the first paper listed under <dt> tag

    if article:
        # Extract article name
        article_name_tag = article.find('a', title='Abstract')
        if article_name_tag:
            # Get the title from the next sibling <dd> tag
            article_details = article.find_next_sibling('dd')
            article_title = article_details.find('div', class_='list-title').text.strip().replace('Title:', '').strip()

            # Extract article link
            article_link = "https://arxiv.org" + article_name_tag['href']

            # Step 3: Visit the article link to fetch the abstract/summary
            article_page = requests.get(article_link)
            article_soup = BeautifulSoup(article_page.content, 'html.parser')  # Use 'html.parser' here as well

            # Extract summary/abstract from the article page and remove "Abstract:" from the beginning
            abstract = article_soup.find('blockquote', class_='abstract').text.strip()

            # Remove "Abstract:" at the beginning (handle spaces and variations)
            abstract = abstract.replace('Abstract:', '').strip()

            # Output the first article's details
            article_data = {
                'article_url': article_link,
                'article_title': article_title,
                'content': abstract
            }

    return article_data
