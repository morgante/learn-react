FROM ubuntu-debootstrap:trusty

RUN apt-get update \
  && apt-get install -y -q curl \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ENV NODE_VERSION 0.10.36

RUN gpg --keyserver pgp.mit.edu --recv-keys 7937DFD2AB06298B2293C3187D33FF9D0246406D

RUN curl -SLO "http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
	&& curl -SLO "http://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
	&& gpg --verify SHASUMS256.txt.asc \
	&& grep " node-v$NODE_VERSION-linux-x64.tar.gz\$" SHASUMS256.txt.asc | sha256sum -c - \
	&& tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
	&& rm "node-v$NODE_VERSION-linux-x64.tar.gz" SHASUMS256.txt.asc

RUN	apt-get update \
   	&& apt-get install -y python-dev openssh-client git \
   	&& apt-get clean \
   	&& rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install npm dependencies
ADD	./package.json /app/package.json
RUN	cd /app && npm install --quiet

# Set ENV defaults
ENV	MODE     dev
ENV	LOGDIR   ./logs
ENV	LOGLEVEL DEBUG
ENV	APP_HOME /app

# Load app dependencies
ADD . /app/src
RUN mkdir -p /app/src/logs
WORKDIR /app/src
RUN chmod 777 start.sh

EXPOSE  3000
