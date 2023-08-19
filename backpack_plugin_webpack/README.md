# plugin-workspace-backpack webpack version
将[背包插件](https://www.npmjs.com/package/@blockly/workspace-backpack)用webpack打包，以供web版blockly项目使用。

## 修改代码
看[官方案例](https://github.com/google/blockly-samples/tree/master/plugins/workspace-backpack)，观察到其实options.js中的BackpackContextMenuOptions和BackpackOptions只起到了提示格式的作用，所以删掉了index中的export; 同理，删掉了index中options.js的export。<br>
然后翻译了英文。

## webpack config
大部分同 lexicalVariable文件夹下的README.md。但是这里只有一个Backpack，不需要设置统一的模块名，所以output没有library属性，而是：
```js
// in output
libraryTarget: "umd",
// 还可以加下面的 设置要导出哪些模块 我没加
libraryExport: ['Backpack'],
```
当你在 Webpack 的配置中设置了 output.library 属性时，Webpack 会将你的库打包为一个全局变量，并在 UMD 格式中暴露出来，以便在不同的环境中使用。所以如果不设置library，就要写libraryTarget，以使用umd。

## usage
```js
// after blockly injection
const backpack = new Backpack(workspace);
backpack.init();
```
有个bug: 删除背包中的东西后，需要触发workspace.addChangeListener所表示的事件，才能保存住状态。不然刷新之后还在。

## set up
```bash
npm install
npx webpack  --mode production
```