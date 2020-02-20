From node:alpine as build

WORKDIR /timetables

COPY ./timetables/package.json .
RUN npm install
COPY ./timetables .

RUN npm run build

FROM nginx
COPY --from=build /timetables/build /usr/share/nginx/html
