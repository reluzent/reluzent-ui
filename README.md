# teamwork-v2-front

Frontend Application TeamWork.

## Project setup

Install dependencies

```sh
npm install
```

Remember to configure .env properlly

```sh
echo "NODE_ENV=production" > .env.production
```

Configure Themes

- Edit ```src/themes.json```

Configure the app logo

- Save the logo files in ```public/img/```
- Add ```cover.jpg``` size: 1400xAuto (for desktop cover photo in home)
- Add ```logo-white.png``` size: 512x512 (for dark backgrounds)
- Add ```logo.png``` size: 512x512 (the dark logo)
- Run ```npm run logo``` to generate all sizes and compress

### Compiles and hot-reloads for development

```sh
npm run dev
```

### Compiles and run Production

Requires change ip on `scripts/serve.sh`

```sh
npm run prod
```

### Lints and fixes vue files

```sh
npm run lint-vue
```

### Lint all files

```sh
npm run lint
```

### Tools for the front-end

- Optimize your images
  - https://www.npmjs.com/package/tinypng-cli
- Generate favicons and manifest icons by a Logo.png
