
import { kf5_domain as domain } from '../env'
import Kf5 from '@2haohr/front-kf5'

export default (app, option) => {
    Kf5.install(app, { domain })
}
