// import type { Config } from 'tailwindcss'

// const config: Config = {
//   content: [
//     './pages/**/*.{js,ts,tsx}',
//     './components/**/*.{js,ts,jsx,tsx}',
//     './hooks/**/*.{js,ts,jsx,tsx}'
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
//       }
//     }
//   },
//   plugins: []
// }

const venia = require('@ranger-theme/tailwind-config')

/**
 * Matches declarations that contain tailwind classnames.
 * Only classnames matched by this expression will be included in the build.
 *
 * @example
 * .foo {
 *   composes: mx-auto from global;
 * }
 */
const matcher = /(?<=composes:.*)(\S+)(?=.*from global;)/g

const config = {
  mode: 'jit',
  // Include your custom theme here.
  presets: [venia],
  // Configure how Tailwind statically analyzes your code here.
  // Note that the Tailwind's `jit` mode doesn't actually use PurgeCSS.
  content: {
    files: [
      './pages/**/*.{js,ts,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './hooks/**/*.{js,ts,jsx,tsx}'
    ],
    // Extract Tailwind classnames from source files.
    // Our default matcher only matches targets of CSS Modules' `composes`,
    // not classnames included directly in HTML or JS!
    extract: {
      css: (content) => content.match(matcher) || []
    }
  },
  // Set the character Tailwind uses when prefixing classnames with variants.
  // CSS Modules doesn't like Tailwind's default `:`, so we use `_`.
  separator: '_',
  theme: {
    extend: {}
  }
}

module.exports = config
