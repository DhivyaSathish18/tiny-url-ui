# Tiny URL UI

A responsive frontend application for generating and managing Tiny URLs.

Built using Angular 18 and Bootstrap.

---

## Features

- Generate Tiny URLs
- Redirect using short code
- View all URLs
- Update URL details
- Delete URLs
- Copy Tiny URL to clipboard
- Responsive UI

---

## Tech Stack

- Angular 18
- TypeScript
- Bootstrap 5
- RxJS

---

## Prerequisites

Install:

- Node.js
- Angular CLI

```bash
npm install -g @angular/cli
```

---

## Run Project Locally

Install dependencies:

```bash
npm install
```

Run application:

```bash
ng serve
```

Application runs on:

```txt
http://localhost:4200
```

---

## Production Build

```bash
ng build --configuration production
```

Build files will be generated inside:

```txt
dist/tiny-url-ui/browser
```

---

## Environment Configuration

### Development

`src/environments/environment.ts`

```ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7125/api'
};
```

### Production

`src/environments/environment.prod.ts`

```ts
export const environment = {
  production: true,
  apiUrl: 'https://tinyurl-api-f7d6avd9b7dtana3.centralindia-01.azurewebsites.net/'
};
```

---

## Project Structure

```txt
src/
 ├── app/
 │    ├── components/
 │    ├── services/
 │    ├── models/
 │    └── app.routes.ts
 ├── environments/
 └── styles.css
```

---

## Deployment

Frontend deployed using:

- Azure Static Web Apps
- GitHub Actions

---

## Live Demo

Frontend URL:

```txt
https://proud-desert-0a1d6b900.7.azurestaticapps.net/
```
