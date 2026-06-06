import { defineConfig } from 'vite'
import { resolve } from 'path'


export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'src/pages/about.html'),
                profile: resolve(__dirname, 'src/pages/profile.html'),
            }
        },
        outDir: 'docs'
    },
    base: "/portail_portfolio_v2_front_office/"
})