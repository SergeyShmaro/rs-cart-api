# Build stage: used to generate dist folder
FROM node:14-alpine3.15 AS BUILD
WORKDIR /build
COPY . .
RUN npm isntall-clean
RUN npm run build

# Prod stage: gets dist generated in the previous stage and install prod deps to be able to run the application
FROM node:14-alpine3.15
WORKDIR /app

# Args section to provide env variables related to DB
ARG PGUSER
ARG PGHOST
ARG PGPASSWORD
ARG PGDATABASE
ARG PGPORT

ENV NODE_ENV=production
ENV PGUSER=$PGUSER
ENV PGHOST=$PGHOST
ENV PGPASSWORD=$PGPASSWORD
ENV PGDATABASE=$PGDATABASE
ENV PGPORT=$PGPORT

COPY ["package.json", "package-lock.json*", "./"]
RUN npm isntall-clean --production
# Copies the dist folder to current work directory
COPY --from=BUILD /build/dist ./dist
EXPOSE 4000
CMD ["node", "dist/main.js"]