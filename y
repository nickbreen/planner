#!/bin/bash

docker run -it --user $UID --net host --rm --volume $PWD:$PWD:rw --workdir $PWD node yarn "$@"
