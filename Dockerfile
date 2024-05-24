FROM node:18-alpine

# Create application directory and set permissions
RUN mkdir -p /app && chown -R node:node /app

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY --chown=node:node package*.json ./

# Switch to non-root user before installing dependencies
USER node

# Install dependencies
RUN npm install

# Bundle app source with the correct ownership
COPY --chown=node:node . .

# Expose the port the app runs on
EXPOSE 4500

# Command to run the application
CMD [ "node", "app.js" ]
