const path = require('path');

module.exports = {
  entry: './src/index.js', // 入口文件路径
  output: {
    filename: 'backpack.js', // 输出文件名
    path: path.resolve(__dirname, 'dist'), // 输出目录路径
    libraryTarget: "umd"
  },
  externals: {
    'blockly/core': 'Blockly',
  },
  module: {
    rules: [
      // 加载器规则
      {
        test: /\.js$/, // 匹配的文件类型
        exclude: /node_modules/, // 排除的文件夹
        use: 'babel-loader', // 使用的加载器
      },
    ],
  },
};