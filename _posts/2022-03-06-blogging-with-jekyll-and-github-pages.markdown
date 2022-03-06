---
layout: post
title:  "Blogging with Jekyll and GitHub Pages"
date:   2022-03-06 15:57:21 +0200
categories: posts
---

It does make sense that for first snippet to be about __GitHub Pages__. The [official documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages) is well structured so I will not be covering the setup process step-by-step. There are plenty of tutorials out there if you need that. 

Instead, I plan to expand on some of the challenges I've encountered with the setup process. 

---
<br/>

## Jekyll Exception: uninitialized constant Kramdown::Utils::OrderedHash in feed.xml

I've received this right from the start after attempting to execute `bundle exec jekyll serve`. Extremely disappointing, I know. :disappointed:

```
Liquid Exception: uninitialized constant Kramdown::Utils::OrderedHash in feed.xml
bundler: failed to load command: jekyll (/home/user/gems/bin/jekyll)
NameError: uninitialized constant Kramdown::Utils::OrderedHash
```

My setup consisted of a brand new repository running under a brand new Ubuntu 20.04 under WSL 2 in Windows 11 so it's weird that this would happen. And no, even though I'm what you may call a _windows developer_, I did not run `sudo bundle install`. 

### The fix
`sudo rm -rf /usr/lib/ruby/vendor_ruby` and then retry `bundle install`. No idea why this works, this was my first experience with `Ruby`. 

---
<br/>

## Question: Can you have a private GitHub repository with a public blog (GitHub Page)?

Annoying as it may be, the answer is __NO__, it is not possible (anymore). Your whole code will be public unless you go for a paid account so be careful about what you store there. 

### Hint 
I've been running a lot of `git rebase -i` commands to rewrite Git history after accidentally pushing some sensitive data. 

---
<br/>

## Useful tips

Here are some of the things you may want to consider after deploying your blog:

- Add a __Contact me__ page with a contact form. I've used [Formspree](https://formspree.io/guides/jekyll/) to do this since 50 emails/month is enough right now and it was super easy to configure it.
- Don't forget about Google Analytics & Google Search (and `jekyll-sitemap`) if you're interested in analytics data
