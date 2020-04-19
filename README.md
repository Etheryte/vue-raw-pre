# vue-raw-pre

## Installation

In your project folder:

```sh
yarn add vue-raw-pre --dev
```

In `vue.config.js`:

```js
const addRawPreLoader = require("vue-raw-pre");

module.exports = {
  chainWebpack: (config) => {
    addRawPreLoader(config);
  },
};
```

In your component:

```html
<v-raw-pre>
  ...
</v-raw-pre>
```

## Props

By default, `vue-raw-pre` trims leading and trailing empty lines and dedents your code to the smallest common alignment.

To disable newline trimming, set `no-trim` on the tag.

```html
<v-raw-pre no-trim>
  ...
</v-raw-pre>
```

To disable automatic code dedenting, set `no-dedent` on the tag.

```html
<v-raw-pre no-dedent>
  ...
</v-raw-pre>
```

Setting both is naturally valid as well.

## Technical details

Internally, `vue-raw-pre` works as a [Webpack loader](https://webpack.js.org/loaders/). This allows it to escape tag contents before they're bundled by Vue's loaders.

This means that no component registration in required, the tag doesn't exist in your final bundle.

### Breaking mustaches
