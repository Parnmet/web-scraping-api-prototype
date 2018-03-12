FROM node:8.10.0-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Download dependencies
RUN apt-get update && apt-get install libfontconfig xfonts-thai -y

# Set path
ENV PATH="/app/node_modules/phantomjs/bin:/app/node_modules/casperjs/bin"

# Set timezone 
ENV TZ=Asia/Bangkok 
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 3000

CMD [ "node" ,"app.js" ]

