const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin') 
//导入  在内存中自动生成  index 页面的 插件

// 创建一个插件实例对象
const htmlPlugin = new HtmlWebPackPlugin({
    template: path.join(__dirname, '/src/index.html'), //源文件    
    // "__dirname": 当前文件所处目录，因为 webpack.config.js 文件
    //   就在根目录下，所以其表示的是  根目录
    filename: 'index.html' 		// 生成内存中首页的名称
    // 根据源文件中的 文件， 生成 内存中的一个  html 首页
})

	// webpack 配置文件
	//  下列是配置文件, 向外暴露一个打包的配置对象
module.exports = {
        mode: 'development', //  development  production
    	// entry:  './src/main.js'   打包的入口文件，
    	// 也可不用写，因为默认打包的入口文件是  src  -> index.js 文件
        plugins: [
            htmlPlugin
        ],
        module:{
            rules:[
                { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/},
                {
                   test: /\.css$/,
                     use:['style-loader' ,'css-loader'],
                  },
           //打包处理  字体文件  的 loader
            {test: /\.ttf|woff|woff2|eot|svg$/,use:'url-loader'},  
          {   	   //  打包  处理  scss 文件的  loader
           test: /\.scss$/,
                use:[
                       'style-loader',
                          {
                           loader:  'css-loader',
                            options: {
                                modules: {
                                mode: 'local',
                              localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                 },
                                     }
                                       },
                       'sass-loader'
                  ],        
          },
              
            ]
        }
    } 
// html  页面存入了内存
// htmlPlugin  会自动把打包好的  main.js（即之前存入内存中的  main.js） 追加到页面中去