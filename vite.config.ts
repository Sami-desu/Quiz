import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // QUAN TRỌNG: Để deploy lên GitHub Pages, bạn cần thay đổi giá trị này.
  // Ví dụ, nếu URL repository của bạn là https://github.com/username/quiz-app,
  // bạn cần đặt base: '/quiz-app/'
  base: '/Quiz/',
})
