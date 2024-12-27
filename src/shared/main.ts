import jails from 'jails-js'
import * as application from './application'

export const register = jails.register
export const dependencies = {}

jails.register('x-application', application, dependencies)

export const main = () => {
	jails.start()
}