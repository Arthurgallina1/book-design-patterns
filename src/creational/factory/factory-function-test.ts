import { createLogger } from './factory-functions'

const logger = createLogger()

logger.debug('Debug message')
logger.warn('warn message')
logger.info('info message')
logger.error('error message')
