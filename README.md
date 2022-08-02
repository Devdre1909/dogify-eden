# Dogify

The application was scaffold with vue-cli and it's a Vue project that include Vue Router, Vuex, SCSS and Axios an major deps.

## Decisions

My solution has 3 pages, the index that lists 100 images at random (the given API can only return 50 images max so the request had to be made twice), with a search to filter the image based on breeds. The screen contains a sidebar that lists out all the available breed by the given API and the list is searchable.

The second screen which can be visited by clicking on any breed (excepts sub-breeds) on the sidebar which list out all images in that breed.

The third screen which can be visited by clicking on any images from the first/second stated screen with also includes an action to visit all breeds page.

Image client side caching was implement with workbox, image lazy loading to was implement, vuex was used for state management.

## Setup

```
yarn install
```

## Start

```
yarn dev
```
