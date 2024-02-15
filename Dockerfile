FROM nginx:latest
ARG BUILD_ENVIRONMENT
ARG IP_ADDRESS

USER root
RUN apt-get update && apt-get install -y ca-certificates curl gnupg software-properties-common npm
# RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
# ENV NODE_MAJOR=18
# RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
# RUN apt-get update && apt-get install nodejs -y
RUN npm install npm@latest -g && \
    npm install n -g && \
    n latest

# Remove the default stuff from the filesystem
RUN rm -rf /usr/share/nginx/html/*

###########
# Angular #
###########

# Copy the packages
COPY src/package.json /tmp/build/angular/package.json
WORKDIR /tmp/build/angular
RUN npm install

# Copy and code and build the software
COPY src /tmp/build/angular
RUN if [[ -z "$BUILD_ENVIRONMENT" ]] ; then npm run build_prod ; else npm run build_$BUILD_ENVIRONMENT ; fi

# Copy the build to the folder the server serves from
RUN cp -Rp dist/nullinside/* /usr/share/nginx/html

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
