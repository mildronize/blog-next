---
title: ลด Docker Image Size Part 2
---

I've found redit answer

> Awesome blog post!

> I created a docker-slim example for the app too. It has a very basic Dockerfile version using the standard node image without multi-stage and without other optimizations resulting in an image that's 2GB+. The optimized image is 93MB: https://github.com/docker-slim/examples/tree/master/3rdparty/carbon-now-sh

> By the way, the xray command in docker-slim will give you something similar to what you get with Dive (no interactive shell though for now though). by [kylequest](https://www.reddit.com/user/kylequest/)

Slim(toolkit): Don't change anything in your container image and minify it by up to 30x (and for compiled languages even more) making it secure too! (free and open source)
- https://github.com/slimtoolkit/slim

Example for carbon.now.sh

https://github.com/docker-slim/examples/tree/master/3rdparty/carbon-now-sh


```
dslimexamples/carbon.now.sh.slim                   latest              97697a455012        About a minute ago   93.3MB
dslimexamples/carbon.now.sh                        latest              28af7e48e8e7        3 minutes ago        2.06GB
```