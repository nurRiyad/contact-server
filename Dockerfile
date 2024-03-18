FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose port 3000
EXPOSE 5173

# Run app
CMD [ "node", "main.js" ]