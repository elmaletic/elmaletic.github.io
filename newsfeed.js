var newsContainer = document.getElementById('newsdiv');

var xhr = new XMLHttpRequest();		// object that accepts XML and other formats, read more at MDN


// function to read, interpret, and display the news article

xhr.onreadystatechange = function () {
	if ( xhr.readyState == 4 && xhr.status == 200 ) {
		var articles = JSON.parse( xhr.responseText );
		// console.log(articles);  // check console to learn available properties
		if ( articles.status == 'ok' ) {
			// articles were found, items available
			
			// create elements for each news article:
				// 1. separate the articles with a horizontal rule (<hr>)
				// 2. display the article title, add link to full article
				// 3. display the date/time the article was published
				// 4. Brief description of the article
				// 5. include a image, if available
				
			var numberArticles = 3; 	// number of articles to display
			
			for ( let i = 0; i < numberArticles; i++ ) {
				var newsItem = articles.items[i];	// current article to display
				// newsItem is an object (within the items array), which has properties:
					// author (appears to be blank for this feed
					// categories (an array, also empty)
					// content, description - brief summaries of the article
					// enclosure - an object that could be used for formatting
					// link - url to the full article
					// pubDate - date/time string of publication
					// thumbnail - image associated with the article
					// title - headline of article
					
				var separator = document.createElement('hr');
					newsContainer.appendChild(separator);
					
				var title = document.createElement('a');
				var titleText = document.createTextNode( newsItem.title );
					title.appendChild( titleText );
					title.href = newsItem.link;
					title.className = "news-title";		// add styling from CSS
					newsContainer.appendChild(title);
					
				var date = document.createElement('p');
				var dateText = document.createTextNode( newsItem.pubDate );	
					date.className = "news-date";
					date.appendChild(dateText);
					newsContainer.appendChild(date);
					
				var image = document.createElement('img');
					image.src = newsItem.thumbnail;
					image.className = "news-img";
					newsContainer.appendChild(image);
					
				var detail = document.createElement('p');
					var detailText = document.createTextNode( newsItem.content );
					detail.appendChild(detailText);
					newsContainer.appendChild(detail);
			}
			
			
		}
	}
}


xhr.open( 'GET', 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.sciencedaily.com%2Frss%2Fplants_animals%2Ffish.xml', true );
xhr.send();