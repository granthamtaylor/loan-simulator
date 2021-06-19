FROM node:14

WORKDIR /app/frontend
COPY package.json ./

EXPOSE 3000

RUN npm install -g npm@6.14
RUN npm install react@16.14
RUN npm install react-scripts
RUN npm install @craco/craco --save
RUN npm run-script build

RUN npm uninstall tailwindcss postcss autoprefixer
RUN npm install tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
RUN npm install @tailwindcss/forms