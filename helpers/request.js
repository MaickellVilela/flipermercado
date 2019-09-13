import axios from 'axios'

import config from '../config'

export const post = async ({ action, payload }) =>
  await axios.post(`${config.googleScriptURL}?action=${action}`)
