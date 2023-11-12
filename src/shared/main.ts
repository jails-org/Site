import jails from 'jails-js'
import { thirdParty } from './_utils'

export const register = jails.register
export const dependencies = {}

export default function main (){

    document.addEventListener('DOMContentLoaded', () => {
		jails.start()
		thirdParty('analytics')
    })
}
