export const throttle = (fn, wait) => {
	let time = Date.now()
	return () => {
		if ((time + wait - Date.now()) < 0) {
			fn()
			time = Date.now()
		}
	}
}

export const isVisible = (elem, offsetTop = 0) => {
	const bounding = elem.getBoundingClientRect()
	const viewport = (window.innerHeight || document.documentElement.clientHeight)
	return bounding.top <= viewport - offsetTop
}

export const thirdParty = (name, timeout = 100) => {

	return new Promise((resolve, reject) => {
		const script = document.querySelector(`script[data-name=${name}]`)
		if (!script) {
			reject(`[ThirdParty] -> script for data-name="${name}" not found.`)
		} else {
			if( script.src ) {
				const newscript = document.createElement('script')
				newscript.addEventListener('load', () => {
					eval( script.text )
					resolve( newscript )
				})
				newscript.src = script.src
				document.head.appendChild(newscript)
			}else {
				eval(script.text)
				resolve(script)
			}
		}
	})
}
