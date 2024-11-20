const mediumAPI = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@rahulbagul07";

    async function fetchMediumArticles() {
      try {
        const response = await fetch(mediumAPI);
        const data = await response.json();

        const articlesContainer = document.getElementById('articles');
        console.log(data);
        data.items.forEach(article => {
          // Create the column
          const col = document.createElement('div');
          col.classList.add('col');

          // Create the card
          const card = document.createElement('div');
          card.classList.add('card');

          // Add the image
          const img = document.createElement('img');
          img.src = article.thumbnail;
          img.alt = article.title;
          card.appendChild(img);

          // Add card body
          const cardBody = document.createElement('div');
          cardBody.classList.add('card-body');

          // Add the title
          const title = document.createElement('h3');
          title.classList.add('card-title');
          title.textContent = article.title;
          cardBody.appendChild(title);

          // Add the subtitle
          const subtitle = document.createElement('p');
          subtitle.classList.add('card-subtitle');
          subtitle.textContent = new Date(article.pubDate).toLocaleDateString();
          cardBody.appendChild(subtitle);

          // Add the read more link
          const link = document.createElement('a');
          link.href = article.link;
          link.textContent = "Read More";
          link.target = "_blank"; // Open in a new tab
          cardBody.appendChild(link);

          // Append body to the card
          card.appendChild(cardBody);

          // Append card to the column
          col.appendChild(card);

          // Append column to the row
          articlesContainer.appendChild(col);
        });
      } catch (error) {
        console.error('Error fetching Medium articles:', error);
      }
    }


fetchMediumArticles();