# vue-raw-pre

A what-you-see-is-what-you-get preformatted code tag for Vue.  
`vue-raw-pre` exposes a single slot that outputs whatever you put into it verbatim.

<!-- prettier-ignore-start -->
| Vue template | Renders in browser |
| :--- | :--- |
| <pre><code>&lt;pre&gt;</code><br><code>&nbsp;&nbsp;&lt;code&gt;</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&lt;button&gt;</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;octocat /&gt;</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/button&gt;</code><br><code>&nbsp;&nbsp;&lt;/code&gt;</code><br><code>&lt;/pre&gt;</code></pre> | <pre><code><button><img src="https://github.com/Etheryte/vue-raw-pre/raw/master/octocat.png" alt="Octocat mark" width="64" height="64" /></button></code></pre> |
| <pre><code>&lt;v-raw-pre&gt;</code><br><code>&nbsp;&nbsp;&lt;button&gt;</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&lt;octocat /&gt;</code><br><code>&nbsp;&nbsp;&lt;/button&gt;</code><br><code>&lt;/v-raw-pre&gt;</code></pre> | <pre><code>&lt;button&gt;</code><br><code>&nbsp;&nbsp;&lt;octocat /&gt;</code><br><code>&lt;/button&gt;</code></pre> |
| <pre><code>&lt;pre&gt;</code><br><code>&nbsp;&nbsp;&lt;code&gt;</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&lt;span&gt;{{ 1 + 2 }}&lt;/span&gt;</code><br><code>&nbsp;&nbsp;&lt;/code&gt;</code><br><code>&lt;/pre&gt;</code></pre> | <pre><code><span>3</span></code></pre> |
| <pre><code>&lt;v-raw-pre&gt;</code><br><code>&nbsp;&nbsp;&lt;span&gt;{{ 1 + 2 }}&lt;/span&gt;</code><br><code>&lt;/v-raw-pre&gt;</code></pre> | <pre><code>&lt;span&gt;{{ 1 + 2 }}&lt;/span&gt;</code></pre> |
<!-- prettier-ignore-end -->

`vue-raw-pre` is great for writing technical documentation and code samples for your projects.

## Installation

In your project folder:

```sh
yarn add vue-raw-pre --dev
```

In `vue.config.js`:

```js
const addVueRawPreLoader = require("vue-raw-pre");

module.exports = {
  chainWebpack: (config) => {
    addVueRawPreLoader(config);
  },
};
```

In your template:

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

Currently only HTML templates in [SFCs](https://vuejs.org/v2/guide/single-file-components.html) are supported.
