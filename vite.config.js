
import { defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ command, mode }) => {
    // mode 环境变量名（package文件scripts 参数） dev prod
    // command serve build
    const env = loadEnv(mode, process.cwd()) // 获取 .env里面定义是参数
    return {
        plugins: [vue()],
        build:{
            rollupOptions: {
                output: {
                  chunkFileNames: 'static/js/[name]-[hash].js',
                  entryFileNames: 'static/js/[name]-[hash].js',
                  assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                }
            }
        },
        server: {
            host: 'localhost', // 指定服务器应该监听哪个 IP 地址
            port: 5000, // 指定开发服务器端口
            strictPort: true, // 若端口已被占用则会直接退出
            https: false, // 启用 TLS + HTTP/2
            open: false, // 启动时自动在浏览器中打开应用程序
            proxy: { // 配置自定义代理规则
            '/api': {
                target: 'http://www.ccw001.top:1128',
                // target: 'http://localhost:1128',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
            }
        },
        resolve: {
            alias: {
            '@': path.resolve(__dirname, './src'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '#': path.resolve(__dirname, './src/http'),
            }
        },
        css: {
            preprocessorOptions: {
            // 这里配置 mixin.scss 混合文件的全局引入                    
            scss: {
                additionalData: `@import "@/assets/styles/themeFn.scss";`,
            }
            }
        }
    }
});
console.log("服务启动 http://localhost:5000")