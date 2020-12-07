const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const  Version = new Date().getTime();
module.exports = {
    // devServer: {
    //     overlay: {
    //         warnings: false,
    //         errors: false
    //     },
    //     lintOnSave: false
    // }
    // lintOnSave:true
    publicPath: './',

    // 修改打包后js文件名
    configureWebpack: { // webpack 配置
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.js】
            filename: `js/[name].${Version}.js`,
            // chunkFilename: `js/[name].${conf.version}.js`
        },
        // 修改打包后css文件名
        plugins: [
            new MiniCssExtractPlugin({
                filename: `css/[name].${Version}.css`,
                // chunkFilename: `css/[name].${conf.version}.css`
            })
        ]
    },

    // 修改打包后img文件名
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .tap(options => {
                return {
                    limit: 4096,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: `img/[name].${Version}.[ext]`
                        }
                    }
                };
            })
    }
};