const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, './src/main.js'),
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js'
	},
	// 配置第三方模块加载器
	module: {
		rules: [{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.(jpg|png|gif|bmp|jpeg)$/,
				use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]'
			},
			{
				test: /\.(ttf|eot|svg|woff|woff2)$/,
				use: 'url-loader'
			},
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				use: 'vue-loader'
			}
		]
	},
	// 配置插件
	plugins: [
		new webpack.HotModuleReplacementPlugin(), // new 一个热更新的 模块对象， 这是 启用热更新的第 3 步
		new htmlWebpackPlugin({ // 打包输出HTML
			template: path.join(__dirname, './src/index.html'), // 指定 模板页面，将来会根据指定的页面路径，去生成内存中的 页面
			filename: 'index.html', // 指定生成的页面的名称
			title: 'htmlWebpackPlugin',
			minify: { // 压缩HTML文件
				removeAttributeQuotes: true, // 移除属性的引号
				removeComments: true, // 移除HTML中的注释
				collapseWhitespace: true, // 删除空白符与换行符
				minifyCSS: true // 压缩内联css
			},
			inject: true, // true 或body 默认值，script标签位于html文件的 body 底部; head script 标签位于 head 标签内
			hash: true // 引入 js 文件后面紧跟一个独特的 hash 值
		})
	],
	devServer: { // 这是配置 dev-server 命令参数的第二种形式，相对来说，这种方式麻烦一些
		//  --open --port 3000 --contentBase src --hot
		open: true, // 自动打开浏览器
		port: 3000, // 设置启动时候的运行端口
		// contentBase: 'src', // 指定托管的根目录
		hot: true ,// 启用热更新 的 第1步
	},
	resolve: {
		// 修改vue包引入的文件路径
		alias: {
			"Vue$": "vue/dist/vue.js"
		}
	}
};
