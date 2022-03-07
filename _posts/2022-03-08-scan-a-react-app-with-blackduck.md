---
layout: post
title:  "Scan a React App with BlackDuck"
date:   2022-03-08 00:15:00 +0200
categories: posts
tags: [react, blackduck]
---

## Setup
This setup includes three files
* Dockerfile -> the scan will happen inside a docker container
* blackduck.sh -> the script called by the docker container to execute the scan
* ci.sh -> the main script that you should run from your CI system

### File: Dockerfile
Because we don't want to pollute our CI system, we'll do the scan from inside a Docker container. The image should look like this:

```dockerfile
FROM node:latest

RUN apt update
RUN apt install default-jre nodejs npm -y

ENV token=""
ENV version=""

WORKDIR /app
COPY . .

CMD ["sh", "-c", "blackduck.sh $token $version"]
```

### File: blackduck.sh
This scripts gets called inside the Docker container (see the `CMD` command in the Dockerfile above). It will download (using `curl`) the detection script provided by BlackDuck and then execute it with some configuration properties. You can find more about them [here](https://blackducksoftware.github.io/synopsys-detect/6.0.0/properties/basic-properties/){:target="_blank"}.

```console
#!/bin/bash

bash <(curl -s -L https://detect.synopsys.com/detect7.sh) \
    --blackduck.url=https://opswat.blackducksoftware.com \
    --blackduck.api.token=$1 \
    --detect.project.name="My\ Project" \
    --detect.project.version.name=$2 \
    --logging.level.com.synopsys.integration=DEBUG \
    --detect.detector.search.depth=99 \
    --blackduck.trust.cert=true \
    --detect.wait.for.results=true \
    --detect.policy.check.fail.on.severities=ALL
```

:warning: Don't forget to replace _My Project_ with your BlackDuck project name. Notice the `\` escape character that needs to be used if your project name contains spaces or special characters (like `(` or `)`).

### File: ci.sh

The script that should be executed after each build from your continuos integration system.

```console
#!/bin/bash

VERSION=$1
TOKEN=$2

if [[ -f Dockerfile ]]; 
then
    docker build --no-cache -t my-project -f Dockerfile .
    docker run -e token=$TOKEN -e version=$VERSION --name my-project my-project 

    SAVED_EXIT_CODE=$?
    echo "Exit code: $?"

    # Cleanup after run
    echo "Stopping container..."
    docker stop $(docker ps -all -q --filter "name=my-project")
    
    echo "Removing container..."
    docker rm -fv $(docker ps -all -q --filter "name=my-project")

    echo "Removing the image..."
    docker rmi my-project 2> /dev/null || true

    echo "Removing any dangling image..."
    docker rmi $(docker images -f "dangling=true" -q) 2> /dev/null || true

    if [ $SAVED_EXIT_CODE -ne 0 ]
    then
        echo "BlackDuck scanning returned a non-zero code: $SAVED_EXIT_CODE"
        exit 1
    fi
else
    >&2 echo "Error: unable to find Dockerfile"
    exit 100
fi
```

The caveats:
* A lot of the code above is necessary for proper cleanup. You can skip it if your system can handle a `docker system prune -a` after the build or if you have some automatic cleanup in place.
* The `SAVED_EXIT_CODE` logic ensures that the script exists with exit code __1__ when the underlying `docker run` command fails. We're saving the last exit code using `$?` but only check it after the cleanup because we don't want to exit before the cleanup. :grin: 