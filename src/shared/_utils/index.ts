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
	return bounding.top <= (window.scrollY + viewport - offsetTop)
}
