export const throttle = (fn, wait) => {
	let time = Date.now()
	return () => {
		if ((time + wait - Date.now()) < 0) {
			fn()
			time = Date.now()
		}
	}
}

export const isInViewport = (elem) => {
	const bounding = elem.getBoundingClientRect()
	return (
		bounding.top >= 0 &&
		bounding.left >= 0 &&
		bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
	)
}
