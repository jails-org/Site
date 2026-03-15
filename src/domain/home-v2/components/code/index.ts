import { type Component } from 'jails-js'

import Prism from 'prismjs'

export default async function appCode ({ main }: Component ) {
	
	await import('prismjs/themes/prism-tomorrow.css')
	await import('prismjs/components/prism-javascript')
	
	main(() => {
		Prism.highlightAll()
	})
}