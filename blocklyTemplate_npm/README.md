# npm开发blockly
基于npm的blockly project template<br>
因为要用lexical-variable这个插件，所以不得不转向npm开发模式。需要增加的技术栈有：es6模块化js、webpack和各种配置文件。此readme记录了从web版迁移来的要点。模版来自https://github.com/google/blockly-samples/tree/master/examples/sample-app。<br>
**npm没有继续下去。因为我将lexical-variable插件迁移到了web版(详见./lexicalVariable_plugin_webpack/)。目前代码有bug，块的连接会出问题。似乎是blockly库的问题。**

## setup
```bash
npm install
npm run start
npm run build
```

## 定义块
官方案例中用的：<br>
Blockly.common.createBlockDefinitionsFromJsonArray<br>
web用的：Blockly.defineBlocksWithJsonArray<br>
有什么关联？看源码：
```js
/**
 * Define blocks from an array of JSON block definitions, as might be generated
 * by the Blockly Developer Tools.
 *
 * @param jsonArray An array of JSON block definitions.
 * @returns A map of the block
 *     definitions created.
 * @alias Blockly.common.defineBlocksWithJsonArray
 */
export declare function createBlockDefinitionsFromJsonArray(jsonArray: any[]): {
    [key: string]: BlockDefinition;
};

/**
 * Define blocks from an array of JSON block definitions, as might be generated
 * by the Blockly Developer Tools.
 *
 * @param jsonArray An array of JSON block definitions.
 * @alias Blockly.common.defineBlocksWithJsonArray
 */
export declare function defineBlocksWithJsonArray(jsonArray: any[]): void;

/**
 * Define blocks from an array of JSON block definitions, as might be generated
 * by the Blockly Developer Tools.
 *
 * @param jsonArray An array of JSON block definitions.
 * @see Blockly.common.defineBlocksWithJsonArray
 * @alias Blockly.defineBlocksWithJsonArray
 */
export declare const defineBlocksWithJsonArray: typeof common.defineBlocksWithJsonArray;
```
可以发现区别在于返回值。web只用了Blockly.defineBlocksWithJsonArray([])，而npm先const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([addText]); 再Blockly.common.defineBlocks(blocks);用两步完成了一步。目的是在模块里不改变全局变量，所有的改变全在index中做出。这叫做“无副作用”。（side effect指修改全局变量这种，无贬义，但是不是模块化开发的思路）但是我偏爱，因为export的东西不能释放内存，而很多变量只在初始化的时候用了。“副作用”可以不export任何东西。

## import
```js
import "/modules/my-module.js"; // 执行全部，不引入什么东西
// 注意my-module.js访问不了任何引用它文件的变量，因为隔离了。要访问别的文件的只能通过export和import
```
同步加载
```js
(async function() {
  await import('./file1.js');
  await import('./file2.js');
})();
```
（浏览器似乎会等所有都加载完。webpack会怎么做不清楚。但是如果是本地加载就可以不用这样写，因为不存在加载半天不到。）

## 代码生成器
```js
import {javascriptGenerator} from 'blockly/javascript';
```
javascriptGenerator.forBlock[] 和 Blockly.JavaScript[]<br>
前者是官方最新教程(2023/7/12)的，后者是官方老的教程(2023/5/23)的。经历了很大的改动，命名和使用都变了。blockly10已经弃用后者，而blockly11将正式使用forblock。<br>
web改过来只要把Blockly.JavaScript[] 换成 javascriptGenerator.forBlock[]，把其他Blockly.JavaScript开头的换成javascriptGenerator

## 翻译
用npm是这样：
```js
import * as Zh from 'blockly/msg/zh-hans';
Blockly.setLocale(Zh);
```
添加自己的有两个方法：
1. 和web一样，用 Blockly.Msg["CATLOGIC"] = "逻辑"; 这是“副作用”（指模块内修改全局变量）
2. 适应模块化:
```js
// In custom_es.js
export const CustomEs = {
  HELLO: "Hola",
  ...
}

// In your setup code
import * as Es from blockly/msg/Es;
import { CustomEs } from ../custom_es;
Blockly.setLocale(Es);
Blockly.setLocale(CustomEs);
```
setLocale 会将输入对象中的每个键放入 Blockly.Msg，覆盖前面的。

## 引用文件
遇到问题：svg加载不了。web版只要用相对路径就好了。
解决：npm安装file-loader，引入webpack.config.js，js如下更改：
```js
import logoOnlySvg from './style/logo_only.svg';
```

但是！发现toolbox默认用的在线资源，原码的思路大致是：
```js
let basePath = "?";   // 如果inject时指定了就用指定了，默认是一个url
img.src = basePath + '文件名.后缀';
```
源码改不了，第一个方法解决不了这种引用方式！
解决：用webpack插件copy-webpack-plugin，将文件复制到打包后的文件夹下。webpack的工作流程大概是，生成一个新的文件夹，在里面工作。所以打包前的路径都不能用。这个插件能把文件复制到这个新文件夹下，这样就可以用相对路径了。
```js
// webpack.config.js 在plugins中添加
new CopyWebpackPlugin({
  patterns: [
    {
      from: 'node_modules/blockly/media',
      to: 'media',
    },
    {
      from: 'src/style/logo_only.svg',
      to: 'media/logo_only.svg',
      toType: 'file',
    }
  ],
})

// js代码中
let basePath = "media";
img.src = basePath + '文件名.后缀';

// toolbox定义中，Blockly.inject的optinons中加入：
{ media: './media/' }
```
完美解决！


