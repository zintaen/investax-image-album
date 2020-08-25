import { toast as toastRaw } from 'react-toastify'

export const toast = {
  success: (message) => toastRaw.success(`🚀 ${message}`, { position: toastRaw.POSITION.TOP_RIGHT }),
  error: (message) => toastRaw.error(message, { position: toastRaw.POSITION.TOP_RIGHT }),
  warning: (message) => toastRaw.warning(message, { position: toastRaw.POSITION.TOP_RIGHT }),
  info: (message) => toastRaw.info(message, { position: toastRaw.POSITION.TOP_RIGHT }),
}
