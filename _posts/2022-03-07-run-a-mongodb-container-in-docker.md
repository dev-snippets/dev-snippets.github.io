---
layout: post
title:  "Run a MongoDB container in Docker"
date:   2022-03-07 21:50:00 +0200
categories: posts
tags: [docker, mongodb]
---

The following command should quickly fire up a development (no authentication) MongoDB container in Docker

{% include copy-code-header.html %}
```docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

* `-d` Run container in background and print container ID
* `-p` Publish the container internal 27017 port to the host 27017 port
* `--name` Name of the container