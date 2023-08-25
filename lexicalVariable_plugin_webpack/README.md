# lexical-variable webpack
把这个支持8.0的[blockly插件](https://github.com/mit-cml/blockly-plugins/tree/main/block-lexical-variables)打包，使之能和unpkg的blockly库一同使用。
blockly版本：unpkg.com_blockly@10.0.2_blockly.min.js

## set up
```bash
npm install
npx webpack  --mode production
```
将生成的js文件放入blocklyTemplate_web/core文件夹下。

## why
原版blockly的变量很奇怪，没有显式的声明，从toolbox中拉出某个块都可能顺便声明一个变量，对项目不友好。很想实现appinventor里的变量，即代码块声明全局变量，引入局部变量。于是找到了这个插件。<br>
插件用了es6，所以我将原来的web版项目迁移到npm版。迁移完毕，准备引入插件时才发现，插件支持blockly8.0，而在迁移过程中我清楚blockly的api发生了很大的变化，unpkg和npm的使用方法有些不一样。而看插件的代码，风格更像web版。于是我选择将其打包供web版使用，而不是迁移项目去适应它。

## how
以下提供打包源项目的基本操作。关于适配和修bug，参见[modify](#modify改bug)
### 1. 修改源码
首先需要把源码改为基于unpkg版本的blockly。观察源码，只有两种import和blockly库有关：

1. blockly核
```js
import * as Blockly from 'blockly/core';
```
而unpkg版本刚好暴露了Blockly这个变量。

2. JavaScript代码生成
```js
import pkg from 'blockly/javascript';
if (pkg) {
// We might be loaded into an environment that doesn't have Blockly's JavaScript generator.
  const {javascriptGenerator} = pkg;
  ...
}
```
出现于generators文件夹。观察变量javascriptGenerator的使用，和unpkg中的Blockly.Javascript一样。这样只要引入Blockly就好了。于是改成了这样：
```js
import * as Blockly from 'blockly/core';
;(function(){
  const javascriptGenerator = Blockly.JavaScript;
  ...
})();
```

### 2. webpack配置
遗憾的是，unpkg版本的blockly不能用es6 import。意味着我不能在打包前运行代码。但是我猜，打包一部分必然不会检查整个项目能否运行。果不其然。所以我只要在webpack配置中明确输入和输出就好了。<br>
输入是blockly库，用external将其排除在打包范围外，同时命名和unpkg版本一致：
```js
externals: {
    'blockly/core': 'Blockly',
}
```
输出是一个库，观察github提供的demo，插件的使用最主要的有这两句：
```js
import * as LexicalVariables from '@mit-app-inventor/blockly-block-lexical-variables';
LexicalVariables.init(workspace);
```
想要在打包后的js中这样用，需要这样配置webpack：
```js
output: {
  // 其他选项...
  library: 'LexicalVariables',
},
```
这将告诉Webpack在打包后将@mit-app-inventor/blockly-block-lexical-variables模块绑定到一个名为LexicalVariables的全局变量上。这样就可以用LexicalVariables.xxx调用库的所有功能啦。<br>
对于后来导出的其他功能，此法也将其置于LexicalVariables之下，根据export的形式调用即可。详见blocklyTemplate_web文件夹下的实际使用代码。

### 3. webpack，启动！
```bash
npx webpack  --mode production
```
一次成功！（太顺利了吧啊啊啊啊啊啊！！！）
将dist文件夹下生成的js用普通的\<script\>引入html即可。

## modify（改bug）
提供此文件夹供修改源码并重新打包，因为源码有很多毛病。

1. 修改control_for的输入名称
插件提供的control_for和原版的不兼容（输入字段上），导致使用插件后需要修改toolbox。我决定修改源码（即修改了name属性）。

2. 修改语言
我用中文的，翻译了一部分内容。

3. 补上controls_do_then_return的代码生成
```js
javascriptGenerator.forBlock['controls_do_then_return'] = function(block) {
  const doWhat = javascriptGenerator.statementToCode(block, 'STM') || '';
  const returnWhat = javascriptGenerator.valueToCode(block, 'VALUE',
      javascriptGenerator.ORDER_NONE) || '';
  const code = `(()=>{\n${doWhat}\treturn ${returnWhat};\n})()`
  return [code, javascriptGenerator.ORDER_ATOMIC];
};
```

4. 为procedure改bug
块“procedures_callreturn”生成代码会报错，说没有toLowerCase这个属性。我猜是getName的时候返回了null，说明没有找到这个。全部注释了这个块的代码生成逻辑，但是依旧报错。于是我**把procedure中所有叫“PROCNAME”的全部换成了“NAME”**，问题解决。<br>
这个procedure块问题很多，还有：定义必须在所有调用之后删除，不然报错。改成“NAME”后这个问题也被解决了。<br>
【后记】发现要覆盖原来的generator**必须用Blockly.JavaScript.forBlock['']**，所以插件中重新定义的generator全部没有生效。所以最正确的做法是加上forBlock，而不是改为“NAME”去迁就默认的generator。这样修改解决了另一个bug：无法传参。2023 8 24全面修改。

5. 暴露更多属性
在我添加的eval块中，我想使用FieldLexicalVariable的变量选择框，但是需要代码生成，所以在index.js中添加了：
```js
export {getVariableName} from './generators/lexical-variables.js';
export * as WarningHandler from './warningHandler.js';
```
在[extraBlocks.js](blocklyTemplate_web\src\blocklyConfig\extraBlocks.js)的RenameVar_mutator定义中使用了这两个属性，使用方法见注释。<br>
在Serial块中，想使用局部变量，所以导出了：
```js
export * as Shared from './shared.js';
export {Substitution} from './substitution.js'
```

6. 修改filed的fromJson属性
将Blockly.utils.replaceMessageReferences改为Blockly.utils.parsing.replaceMessageReferences
同时，源码设计有问题，用JSON创建时，显示的文本和块共用了"name"字段（导致显示的值就是VAR）。所以我把field_parameter_flydown.js的fromJson所用的字段“name”改为了“text”，然后json中这样写：
```js
{
  "type": "field_parameter_flydown",  // 查lexicalVariable插件的filed定义的fromJson函数可知传参
  "name": "VAR",
  "text": "data",
  "is_editable": true
}
```
相关的使用在[serialBlocks.js](blocklyTemplate_web\src\moreAPI\serialBlocks.js)的serial_connect块定义中。