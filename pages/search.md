---
permalink: /search/
layout: page
title: Search
---

<!-- Html Elements for Search -->
<div id="search-container">
    <p>Search for a post or a tag...</p>
    <form class="example">
        <input type="text" id="search-input" placeholder="Search for posts...">
        <i class="fa fa-search" aria-hidden="true"></i>
    </form>
    <div>
    <ul id="results-container"></ul>
    </div>
</div>

<br />

---

<br />
<!-- Script pointing to search-script.js -->
<script src="https://unpkg.com/simple-jekyll-search@latest/dest/simple-jekyll-search.min.js">
</script>

<!-- Configuration -->
<script>
SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  json: '/search.json'
})
</script>

# Complete tag list
Below is a list of all the posts grouped by tags:

{% for tag in site.tags %}
  <h4>{{ tag[0] }}</h4>
  <ul>
    {% for post in tag[1] %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}
