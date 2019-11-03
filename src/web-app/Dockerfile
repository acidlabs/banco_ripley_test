FROM node:11-alpine

WORKDIR /webapp
COPY . .

ENV NODE_ENV=production
# ENV NODE_ENV=development

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]





# FROM node:11-alpine as builder
# WORKDIR /webapp
# COPY ./package.json ./
# RUN yarn install
# COPY . .
# # RUN yarn build

# FROM nginx
# EXPOSE 3000
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /webapp/build /usr/share/nginx/html

# CMD ["yarn", "start"]