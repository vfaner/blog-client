import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import inject from '@rollup/plugin-inject'

export default defineConfig({
    plugins: [
        vue(),
        inject({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    server: {
        host: '0.0.0.0',
        port: 8080,
        open: true
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
})
