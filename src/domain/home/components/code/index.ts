import { type Component } from 'jails-js'
import { importJs } from 'jails.stdlib/import-js'
import { importCss } from 'jails.stdlib/import-css'

export default async function appCode ({ main }: Component ) {
	
	importCss('https://cdn.jsdelivr.net/npm/prismjs@1.30.0/themes/prism-tomorrow.min.css')
	await importJs('https://cdn.jsdelivr.net/npm/prismjs/prism.min.js?v=' + Math.random())
	importJs('https://cdn.jsdelivr.net/npm/prismjs/components/prism-javascript.min.js?v=' + Math.random() )

	main(() => {
		window.Prism.highlightAll()
	})
}
