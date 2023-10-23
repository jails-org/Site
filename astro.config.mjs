import { defineConfig } from 'astro/config'
import compress from 'astro-compress'
import critters from 'astro-critters'

import rupture from 'rupture'

// https://astro.build/config
export default defineConfig({
  integrations: [compress(), critters()],
  vite: {
    ssr: {
      external: ['svgo']
    },
    css: {
      preprocessorOptions: {
        styl: {
          use: rupture(),
          paths: ['src', 'node_modules'],
		  resolveURL : true,
		  includeCSS : true,
		  additionalData: `
		  	@require 'ui-system/variables.styl'
		  `
        }
      }
    }
  }
})
