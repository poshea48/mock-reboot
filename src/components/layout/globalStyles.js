import { css } from '@emotion/core';

const globalStyles = () => css`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  html {
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
    font-family: sans-serif;
    box-sizing: border-box;
    line-height: 1.15;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }
  html,
  body {
    width: 100vw;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    margin: 0;
    padding: 0;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  }
  #page-container {
    padding: 0 1em;
    min-height: calc(var(--vh, 1vh) * 100);
    @media screen and (max-width: 600px) {
      padding: 0 0.5em;
    }
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  main,
  menu,
  nav,
  section,
  summary {
    display: block;
  }
  audio,
  canvas,
  progress,
  video {
    display: inline-block;
  }
  audio:not([controls]) {
    display: none;
    height: 0;
  }
  progress {
    vertical-align: baseline;
  }
  [hidden],
  template {
    display: none;
  }
  a {
    transition: color 0.5s;
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
  hgroup,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  select,
  input {
    font-size: 16px;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  button {
    cursor: pointer;
  }
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  table {
    margin: 0;
    padding: 0;
    border: none;
    td {
      border-top: 1px solid hsla(0, 0%, 0%, 0.12);
    }
  }
  b,
  strong {
    font-weight: bolder;
  }
  small {
    font-size: 80%;
  }
  hr {
    height: 0;
  }
  /** From modern-normalize.css
    1. Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)
    2. Correct the odd 'em' font sizing in all browsers.
  */
  code,
  kbd,
  samp,
  pre {
    font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }
  /* copied from https://github.com/sindresorhus/modern-normalize */
  /*
Forms
=====
*/

  /**
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
*/

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
  }

  /**
Remove the inheritance of text transform in Edge and Firefox.
1. Remove the inheritance of text transform in Firefox.
*/

  button,
  select {
    /* 1 */
    text-transform: none;
  }

  /**Correct the inability to style clickable types in iOS and Safari.*/

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }

  /** Remove the inner border and padding in Firefox.*/

  button::-moz-focus-inner,
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  /**Restore the focus styles unset by the previous rule.*/

  button:-moz-focusring,
  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  /**Correct the padding in Firefox.*/

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  /**Remove the padding so developers are not caught out when they zero out 'fieldset' elements in all browsers.
  */

  legend {
    padding: 0;
  }

  /**Add the correct vertical alignment in Chrome and Firefox.*/

  progress {
    vertical-align: baseline;
  }

  /**Correct the cursor style of increment and decrement buttons in Safari.*/

  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  /**
  1. Correct the odd appearance in Chrome and Safari.
  2. Correct the outline style in Safari.
*/

  [type='search'] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }

  /**Remove the inner padding in Chrome and Safari on macOS.*/

  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  /**
  1. Correct the inability to style clickable types in iOS and Safari.
  2. Change font properties to 'inherit' in Safari.
  */

  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }
`;

export default globalStyles;
