import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'app.newton.fisica',
  appName: 'Newton',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
