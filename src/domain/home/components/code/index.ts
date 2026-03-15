import { type Component } from 'jails-js'

import hljs  from 'highlight.js/lib/core'
import ts 	 from 'highlight.js/lib/languages/typescript'
import 'highlight.js/styles/atom-one-light.min.css'

hljs.registerLanguage('typescript', ts)

export default async function appCode ({ main, elm }: Component ) {
	
	const code = elm.querySelector('code')

	main(() => {
		hljs.highlightElement(code)
	})
}
