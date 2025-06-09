FROM nginx:latest
ARG BUILD_ENVIRONMENT
ARG IP_ADDRESS

# Switch to root to do installs and such
USER root

# Use the bash shell, this is required to get a good install of nvm
SHELL ["/bin/bash", "--login", "-c"]

# Update the software
RUN apt-get update && apt-get install -y ca-certificates curl gnupg software-properties-common

# Setup the NVM variables
ENV NVM_DIR=/usr/local/nvm
ENV NODE_VERSION=22.16.0
ENV NODE_PATH=$NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH=$NVM_DIR/v$NODE_VERSION/bin:$PATH

# Create the install directory for NVM
RUN mkdir /usr/local/nvm

# Download and install NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm use $NODE_VERSION \
	&& npm install -g npm@latest

# Remove the default stuff from the filesystem
RUN rm -rf /usr/share/nginx/html/*

###########
# Angular #
###########

# Copy the packages
COPY src/package.json /tmp/build/angular/package.json
WORKDIR /tmp/build/angular
RUN npm install

# Copy the code and build the software
COPY src /tmp/build/angular
RUN if [[ -z "$BUILD_ENVIRONMENT" ]] ; then npm run build_prod ; else npm run build_$BUILD_ENVIRONMENT ; fi

# Copy the build to the folder the server serves from
RUN cp -Rp dist/nullinside-ui/browser/* /usr/share/nginx/html

###############
# Common HTML #
###############

# Update the filesystem with our stuff
COPY nginx/filesystem /

# Update the nginx config with our IP address
RUN sed -i 's/${IP_ADDRESS}/'"$IP_ADDRESS"'/g' /etc/nginx/conf.d/nginx.conf

# Copy the 404 pages
COPY nginx/404.html /usr/share/nginx/html/404.html

# Set the permissions
RUN chmod -R g+w /usr/share/nginx/html

# Clean up
WORKDIR /usr/share/nginx/html
# RUN rm -rf /tmp/build

# Run it
CMD ["nginx", "-g", "daemon off;"]
