import { type Component } from 'jails-js'
import { importCss } from 'jails.stdlib/import-css'
import { importJs }  from 'jails.stdlib/import-js'
import { isVisible } from 'jails.stdlib/is-visible'

const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0'

export default async function appCode ({ main, elm }: Component ) {
	
	await isVisible( elm )	

	importCss(`${CDN}/styles/atom-one-light.min.css`)

	await importJs(`${CDN}/highlight.min.js`)
	await importJs(`${CDN}/languages/javascript.min.js`)

	main(() => {
		const code = elm.querySelector('code')
		//@ts-ignore
		window.hljs.highlightElement( code )
	})
}
