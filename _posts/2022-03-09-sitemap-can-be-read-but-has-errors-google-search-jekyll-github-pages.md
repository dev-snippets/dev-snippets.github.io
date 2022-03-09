---
layout: post
title:  "Google Search Console: Sitemap can be read, but has errors (Jekyll & GitHub Pages)"
date:   2022-03-09 23:18:00 +0200
categories: posts
tag: github
---

## Use case

You are trying to index your GitHub Pages site/blog with Google Search Console and you're using Jekyll. 

## Issue: by default, no sitemap.xml

You can generate a sitemap by modifying `_config.yml` with the `jekyll-sitemap` plugin.

You need to add the `jekyll-sitemap` gem into `Gemfile`. 

```
gem 'jekyll-sitemap'
```

## Issue: Sitemap can be read, but has errors

```
ERROR: Invalid URL
This is not a valid URL. Please correct it and resubmit.
```

Google search reports relative URLs (i.e `/posts/2022/03/06/page.html).

### The fix

Modify the `Gemfile` to pull the correct version of the gem by changing

```
gem 'jekyll-sitemap'
```

to

```
gem 'jekyll-sitemap', :git => 'https://github.com/jekyll/jekyll-sitemap.git'
```

Publish the new version and inspect your `/sitemap.xml` file. Absolute URLs should be generated now.