import axios from 'axios'

import config from '../config'

export const post = async ({ action, payload }) => {
  const response = await axios
    .post(`${config.googleScriptURL}?action=${action}`, payload)

  return response
}

export default { post }
