FROM node:16.13-alpine

# ENV NODE_OPTIONS=--max_old_space_size=1536 # 75% of total memory

# Install Global Dependencies
RUN npm install pm2 -g

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package.json ./
COPY yarn.lock ./
COPY ./package.json ./
# COPY ./backend/yarn.lock ./backend/

# Install production dependencies.
RUN yarn

# Copy local code to the container image.
COPY ./ ./

WORKDIR /usr/src/app/backend
RUN yarn build

# Run the web service on container startup.
CMD [ "yarn", "start" ]