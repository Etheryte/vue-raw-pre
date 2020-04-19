# vue-raw-pre

A what-you-see-is-what-you-get preformatted code tag for Vue.  
`vue-raw-pre` exposes a single slot that outputs whatever you put into it verbatim.

<!-- prettier-ignore -->
| Code | Result |
| --- | --- |
| <pre><code>&lt;pre&gt;<br>&nbsp;&nbsp;&lt;code&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;octocat-button /&gt;<br>&nbsp;&nbsp;&lt;/code&gt;<br>&lt;/pre&gt;</code></pre> | // Image of Octocat |
| <pre><code>&lt;v-raw-pre&gt;<br>&nbsp;&nbsp;&lt;octocat-button /&gt;<br>&lt;/v-raw-pre&gt;</code></pre> | // Image of code output |

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
