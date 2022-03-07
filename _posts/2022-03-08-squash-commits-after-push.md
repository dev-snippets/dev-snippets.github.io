---
layout: post
title:  "Squash commits after git push"
date:   2022-03-08 01:05:00 +0200
categories: posts
tag: git
---
__Disclaimer:__ I'm writing this post because that's the 3rd time I had to fix typos in previous posts using this technique so it makes sense to have it around. :expressionless:

---
<br />
First, you need to squash them locally using the following command:

```console
git rebase -i origin/main~1 main
```

* the branch name here is `main` but you can obviously replace that
* with `~1` we're only squashing the last commit, but that can be changed as well

After you're done with the __interactive__ (`-i`) rebase you need to force push:

```console
git push origin +main
```

`+main` ensures that only this ref is forcefully pushed

<div style="text-align: right">
    <a href="https://stackoverflow.com/questions/5667884/how-to-squash-commits-in-git-after-they-have-been-pushed" 
    target="_blank">Source</a>
</div>