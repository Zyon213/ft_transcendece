# Use Node.js v16 as the base image
FROM node:19

# Set the working directory
WORKDIR /app/backend

# Copy package.json and package-lock.json before other files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Create a non-root user
RUN useradd -m appuser

# Change ownership of the working directory
RUN chown -R appuser:appuser /app/backend

# Switch to the non-root user
USER appuser

# Expose the port the app will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:dev"]