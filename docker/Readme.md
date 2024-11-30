# Use docker to compile libpointing

1. Run: ```docker build -t libpointing .```
1. Run the image and connect: ```docker run -i -t libpointing /bin/bash```
1. Clone libpointing etc...

# On macOS

1. docker build --platform linux/amd64 -t libpointing .
1. docker run --platform linux/amd64 -i -t --mount type=bind,source=path_to_libpointing,target=/mnt/libpointing libpointing /bin/bash
