import { useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'

export function PostHogLogCapture() {
  const posthog = usePostHog()

  useEffect(() => {
    posthog.logger.info('application_loaded', {
      runtime: 'browser',
    })
  }, [posthog])

  return null
}
