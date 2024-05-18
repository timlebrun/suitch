FROM node:20-alpine

WORKDIR /var/www

COPY . .

RUN yarn install --non-interactive && \
	yarn build && \
	yarn install --production --ignore-scripts --prefer-offline --force --non-interactive

EXPOSE 3000

CMD yarn start:prod