# Google Fonts `src` getter

A getter of the `src` attribute when querying the [Google Fonts API](https://developers.google.com/fonts/docs/getting_started).

## The problem

Nowadays, Google Fonts API provides the `@font-face` code needed to import fonts to any website. It is good because
you don't need to download the font file and include it in your project: it's enough to add a `<link>` tag to your HTML
and point it to the desired API URL built for your needs.

Example:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Tangerine"
/>
```

There are several libraries out there where they help to build such URLs to get the `@font-face` code.

With careful attention, every `@font-face` code has an attribute `src`, where this is the actual URL that has the font
to be downloaded.

```css
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  src: url(https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLEj6V1s.ttf)
    format('truetype');
}
```

Whenever I'd need this `src` attribute dynamically in my JS code, I found myself calling the Google Fonts API by hand,
copying, and pasting the URL in the configurations file I've worked on. It was a pain in the ass.

In this way, it comes `google-fonts-src-getter`: by defining the fonts you want to get the `src` attribute, it builds
the API URL to get the `@font-face` code, parses it, and returns the `src` that relies in it. Simples as that!

## How to use

Install it with:

```bash
npm i google-fonts-src-getter
```

You can easily call the library by importing the function `getGoogleFontData` with your desired fonts:

```ts
import { getGoogleFontData } from 'google-fonts-src-getter'

const data = await getGoogleFontData({
  fonts: [
    {
      family: 'Poppins',
      style: 'italic',
      weight: 600,
    },
  ],
})

console.log(data)
```

How you'd get from the raw API response:

```css
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 600;
  src: url(https://fonts.gstatic.com/s/poppins/v21/pxiDyp8kv8JHgFVrJJLmr19lEA.ttf)
    format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  src: url(https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLEj6V1s.ttf)
    format('truetype');
}
```

How you'll get in `data`:

```js
{
  fonts: [
    {
      fontFamily: 'Poppins',
      fontStyle: 'italic',
      fontWeight: 600,
      fontDisplay: undefined,
      subset: 'latin',
      src: 'https://fonts.gstatic.com/s/poppins/v21/pxiDyp8kv8JHgFVrJJLmr19lEA.ttf',
      format: 'truetype'
    },
    {
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 600,
      fontDisplay: undefined,
      subset: 'latin',
      src: 'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLEj6V1s.ttf',
      format: 'truetype'
    }
  ],
  url: 'https://fonts.googleapis.com/css2?family=Poppins%3Aital%2Cwght%400%2C600%3B1%2C600'
}
```

## Limitations

Currently, there are no support for [font effects](https://developers.google.com/fonts/docs/getting_started#enabling_font_effects_beta).
They will come in a future version of the package.
