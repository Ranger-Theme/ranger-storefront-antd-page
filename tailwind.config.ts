import { tailwindConfig } from '@ranger-theme/tailwind-config'
import type { Config } from 'tailwindcss'

const matcher = /(?<=composes:.*)(\S+)(?=.*from global;)/g

const config: Config = {
  mode: 'jit',
  presets: [tailwindConfig as any],
  content: {
    files: ['./pages/**/*.{js,ts,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    // Extract Tailwind classnames from source files.
    // Our default matcher only matches targets of CSS Modules' `composes`,
    // not classnames included directly in HTML or JS!
    extract: {
      css: (content: string) => content.match(matcher) || []
    }
  },
  // Set the character Tailwind uses when prefixing classnames with variants.
  // CSS Modules doesn't like Tailwind's default `:`, so we use `_`.
  separator: '_',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: []
}

export default config
