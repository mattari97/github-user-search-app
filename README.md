# Frontend Mentor - GitHub user search app solution

This is a solution to the [GitHub user search app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/github-user-search-app-Q09YOgaH6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)
- [Contribution](#contribution)

## Overview

### The challenge

Users should be able to:

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Search for GitHub users by their username
- See relevant user information based on their search
- Switch between light and dark themes
- **Bonus**: Have the correct color scheme chosen for them based on their computer preferences.
- **Bonus**: Store the last searched username and selected theme in localStorage.
- **Bonus**: Copy the twitter username in the clipboard.

### Screenshot

![GitHub User Search App | Desktop version](./fullpage-desktop.png)

![GitHub User Search App | Tablet version](./fullpage-tablet.png)

![GitHub User Search App | Mobile version](./fullpage-mobile.png)

### Links

- Solution URL: [Go to solution](https://www.frontendmentor.io/solutions/rock-paper-scissors-lizard-spock-sveltekit-tailwind-typescript-H9YeK1xThg)
- Live Site URL: [Go to live site](https://github-user-search-app-acdev.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS / SCSS
- Flexbox
- CSS Grid
- Mobile-first workflow
- [LocalStorage](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage) - Save data on the browser
- [Vue3](https://vuejs.org/) - The Progressive JavaScript Framework
- [Typescript](https://www.typescriptlang.org/) - Strongly typed JS

### What I learned

#### Clipboard API

```ts
const copyToClipboard = (text: string) => {
  if (!text) {
    return Promise.reject('The content is empty.');
  }

  if (!(navigator && navigator.clipboard && navigator.clipboard.writeText)) {
    return Promise.reject('The Clipboard API is not available.');
  }

  navigator.clipboard.writeText(text);
  return Promise.resolve('Copied to clipboard');
};
```

#### Handle try/catch errors in TS

```ts
const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  if ('string' === typeof error) {
    return error;
  }

  return String(error);
};
```

Use it in a try/catch:

```ts
try {
  // Do something
} catch (error) {
  console.error(getErrorMessage(error));
}
```

#### Add default values & typed keys in localStorage

```ts
type TLocalStorageKey = 'theme' | 'username';

const getLocalStorageData = <T>(key: TLocalStorageKey, defaultValue: T) => {
  const json = localStorage.getItem(key);
  return null === json ? defaultValue : (JSON.parse(json) as T);
};

const setLocalStorageData = <T>(key: TLocalStorageKey, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};
```

## Author

- Frontend Mentor - [@AntoineC-dev](https://www.frontendmentor.io/profile/AntoineC-dev)

## Contribution

You can use this project for whatever you want. Don't forget to leave a ⭐.

- Fork the project to add it to your githug repositories.
- Clone it on your local machine from you repositories.
- cd into the project in your terminal
- Install all the dependencies by running `npm install` or `yarn install` or `pnpm install`.
- Open the project in your editor and start coding by running `npm run dev` or `yarn dev` or `pnpm dev`.
