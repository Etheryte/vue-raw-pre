# vue-raw-pre

A what-you-see-is-what-you-get preformatted code tag for Vue.  
`vue-raw-pre` exposes a single slot that outputs whatever you put into it verbatim.

<!-- prettier-ignore-start -->
| Code | Result in browser |
| --- | --- |
| <pre><code>&lt;pre&gt;</code><br><code>&nbsp;&nbsp;&lt;code&gt;</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&lt;octocat-button /&gt;</code><br><code>&nbsp;&nbsp;&lt;/code&gt;</code><br><code>&lt;/pre&gt;</code></pre> | ![Sample image](https://github.com/Etheryte/vue-raw-pre/raw/master/mark.png) |
| <pre><code>&lt;v-raw-pre&gt;</code><br><code>&nbsp;&nbsp;&lt;octocat-button /&gt;</code><br><code>&lt;/v-raw-pre&gt;</code></pre> | &lt;octocat-button /&gt; |
<!-- prettier-ignore-end -->

`vue-raw-pre` is great for writing technical documentation and code samples for your projects.

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

Internally, `vue-raw-pre` works as a [Webpack loader](https://webpack.js.org/loaders/) for `.vue` files. This allows it to escape tag contents before they're bundled by Vue's loaders.

This means that no component registration in required, the tag doesn't exist in your final bundle.

### Breaking mustaches

Vue uses [mustache syntax](https://vuejs.org/v2/guide/syntax.html) for templating: `{{ 1 + 2 }}` in your source becomes `3` in the output.  
To escape these, `vue-raw-pre` injects empty template tags to break them up.
