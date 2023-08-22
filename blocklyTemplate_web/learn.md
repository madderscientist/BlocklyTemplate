# Blockly学习笔记
[官方文档](https://blockly.tortorse.com/guides/overview.html)
[知乎文章](https://zhuanlan.zhihu.com/p/114052097)
从github下载库。
官方教程都是基于以前的版本的。现在的版本没有了那些编译好的文件（比如blocks_compressed.js，还有中文包），所以教程看起来很迷。所以去翻commit记录下载老版本的blockly，最终发现2022年11月1号的commit删除了哪些文件。于是用了删除前的“最新”版本。<br>
**注意！可以看index.html引入js的地方，引入一个unpkg抵得过三个文件**<br>
引入库
```html
<script src="blockly_compressed.js"></script>
<script src="blocks_compressed.js"></script>
<script src="msg/js/zh-hans.js"></script>
```
第三个是本地化语言包。之后看到"%{BKY_...}"开头的，会用第三个包里的内容提换。<br>
如果用npm的话引入库可以用
```html
<script src="./node_modules/blockly/blockly_compressed.js"></script>
<script src="./node_modules/blockly/blocks_compressed.js"></script>
<script src="./node_modules/blockly/msg/en.js"></script>
```

## 创建工作区
[官方教程，有例子](https://developers.google.com/blockly/guides/configure/web/resizable?hl=zh-cn)
先创建固定尺寸的工作区。新建一个html，在正确的地方加入以下内容：
```js
// html:
<div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
// js:
var toolbox = {
  "kind": "flyoutToolbox",
  "contents": [
    {
      "kind": "block",
      "type": "controls_if"
    },
    {
      "kind": "block",
      "type": "controls_repeat_ext"
    },
    {
      "kind": "block",
      "type": "logic_compare"
    },
    {
      "kind": "block",
      "type": "math_number"
    },
    {
      "kind": "block",
      "type": "math_arithmetic"
    },
    {
      "kind": "block",
      "type": "text"
    },
    {
      "kind": "block",
      "type": "text_print"
    },
  ]
}
// 最后，调用以下代码，将 Blockly 注入空的 div。此脚本应位于页面底部，或者由 onload 事件调用。
var workspace = Blockly.inject('blocklyDiv', {toolbox: toolbox});
```

其中，toolbox是左边的“工具箱”，以后细说。
现在的工作区大小是固定的。现在改成动态调整大小的。原理是用一个自适应大小变化的东西，然后用resize事件把工作区变成和这个东西一样（大小和位置）。
```js
// html加入一个id为blocklyArea的东西，用css设置它自适应大小。可以用表格。注意把blocklyDiv的style改了。
<div id="blocklyArea"></div>
<div id="blocklyDiv" style="position: absolute"></div>
// CSS
html, body {
    height: 100%;
    margin: 0;
}
#blocklyArea {
    width: 100%;
    height: 100%;
    background-color: #74f490;
}


// js代码在后面追加
const blocklyArea = document.getElementById('blocklyArea');
const blocklyDiv = document.getElementById('blocklyDiv');
const onresize = function (e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    let element = blocklyArea;
    let x = 0;
    let y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    Blockly.svgResize(workspace);
};
window.addEventListener('resize', onresize, false);
onresize();
```
注意，只设置blocklyArea的height为100%的时候实际高度是0，因为百分比是按父元素设置的，[而html和body的高度是缺省的auto，浏览器不计算内容的高度](https://blog.csdn.net/yanchenxi313761/article/details/79437541)。所以要设置body和html的height（缺一不可）

解释一下js：[参考](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent)
- offsetParent: 返回一个指向最近的（指包含层级上的最近）包含该元素的定位元素或者最近的 table, td, th, body 元素。当元素的 style.display 设置为 "none" 时，offsetParent 返回 null。
- offsetTop: 当前元素左上角相对于其 offsetParent 的左边界偏移的像素值。
- offsetLeft: 相对于其 offsetParent 元素的顶部内边距的距离。
- offsetWidth和offsetHeight: 元素的布局宽度/高度。
![offsetWidth和offsetHeight的范围](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth/dimensions-offset.png)

body的display是none。所以经过迭代最终求得(x,y)是blocklyArea左上角在body中的位置（绝对位置）。

## 注入
解释“Blockly.inject(location, options)”这个函数。作用是创建并配置一个工作区。
location填一个div的id，工作区创建后会挂载在这下面，options填一个字典，比如上面的代码用了“toolbox”这个选项。
下面给出options应该长什么样：（更多请查看：[官方文档的详情](https://developers.google.com/blockly/guides/configure/web/configuration_struct?hl=zh-cn)）

```js
options = {
    collapse: true, // 允许折叠
    comments: true, // 允许注释
    scrollbars: {
        horizontal: true,   // 工作区启用水平滚动条
        vertical: true      // 工作区启用垂直滚动条
    },              // 两个一样可以只写true/false
    grid: 后面讲,
    move: 后面讲,
    theme: 后面讲,
    zoom: 后面讲,
    plugins: 后面讲,
    toolbox: 字符串、xml、json。后面讲
}
```
直观感受[workspace的各种属性](https://google.github.io/blockly-samples/plugins/block-plus-minus/test/index)

## 块的定义
### 用预设的
### 自定义
有两种定义方式。第一是JSON，第二是Js。前者结构更清晰更推荐，但后者功能强大。所以采用前者提供基本功能，后者打补丁升级的方式。
#### step1. 外观
用blockly做的blockly[编辑器](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html?hl=zh-cn)
本地版在\demos\blockfactory\index.html，最新的库里面的不知道为什么用不了，可能是因为那些被删的文件。
先在BlockFactory里面定义好块，后去BlockExporter导出文件。
（还可以可视化定义workspace。包括如何默认加载块。
如何写入html？
仅用json定义的例子：
```js
Blockly.defineBlocksWithJsonArray([{
    "type": "string_length",
    "message0": 'length of %1',
    "args0": [
        {
            "type": "input_value",
            "name": "VALUE",
            "check": "String"
        }
    ],
    "output": "Number",
    "colour": 160,
    "tooltip": "Returns number of letters in the provided text.",
    "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
}]);
```
典型的js和json配合定义例子：
```js
var mathChangeJson = {
  "message0": "change %1 by %2",
  "args0": [
    {"type": "field_variable", "name": "VAR", "variable": "item", "variableTypes": [""]},
    {"type": "input_value", "name": "DELTA", "check": "Number"}
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230
};

Blockly.Blocks['math_change'] = {   // math_change就是type
  init: function() {
    this.jsonInit(mathChangeJson);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return 'Add a number to variable "%1".'.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });
  }
};
```
#### step2. 代码
导出的js代码一份是块定义，一份是怎么变成代码，后者还需要填充具体代码。
给出一个填充的例子：
```js
Blockly.JavaScript['text_indexOf'] = function(block) {
  // Search the text for a substring.
  var operator = block.getFieldValue('END') == 'FIRST' ? 'indexOf' : 'lastIndexOf';
  var subString = Blockly.JavaScript.valueToCode(block, 'FIND',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var text = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
  var code = text + '.' + operator + '(' + subString + ')';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};
```

如何使用？
导入库：
```html
<script src="blockly_compressed.js"></script>   // js必须在blockly后面引入
<script src="javascript_compressed.js"></script>
```

实时生成代码：
```js
function myUpdateFunction(event) {
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  document.getElementById('textarea').value = code;
}
workspace.addChangeListener(myUpdateFunction);
```

这里要区分

## 工具箱toolBox
是侧边栏，用于选择代码块。有两种定义方式：XML和JSON。
用xml定义。把以下代码加入js获取它前的任何位置
```xml
<xml id="toolbox" style="display: none">
  <category name="Control" toolboxitemid="categoryId">  // 以支持js用var category = toolbox.getToolboxItemById('categoryId');获取类
    <block type="controls_if"></block> 
    <block type="controls_whileUntil"></block>
    <block type="controls_for">
  </category>
  <category name="Logic" colour="210"(如果用主题就categorystyle="logic_category")>
    <block type="logic_compare"></block>
    <block type="logic_operation"></block>
    <block type="logic_boolean"></block>
  </category>
</xml>
```
再注入
```html
<script>
var workspace = Blockly.inject('blocklyDiv',
    {toolbox: document.getElementById('toolbox')});
</script>
```
其实也可以把xml的内容写入字符串x，然后{toolbox: x}
category还有很多可定义的方法，比如css、禁用、显示隐藏、嵌套、放html元素
工具箱内实现块组合，可以先拖到工作区再获取。比如用[BlocklyDemosCode](https://blockly-demo.appspot.com/static/demos/code/index.html)
```js
console.log(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
```

JSON定义感觉太长了，但是谷歌推荐用。其中，kind属性有两个值：flyoutToolbox和categoryToolbox，前者用于没有category的时候，后者用于有category的时候。
如果要改变toolbox的颜色，先注释掉"categorystyle": "logic_category"，再加上"colour":"#ff0000"


https://blocklycodelabs.dev/codelabs/getting-started/index.html?index=..%2F..index#6
学怎么保存

如果要新建变量，用
```js
var listVar = generator.nameDB_.getDistinctName('temp_list', Blockly.names.NameType.VARIABLE);
var code = 'var ' + listVar + ' = ' + arg0 + ';\n';
```
自己取的变量名为“temp_list”，但可能前面取过了，用这个函数取到的变量名不会冲突。

如果自己定义的变量名与所用语言冲突，用
```js
generator.nameDB_.getName(block.getFieldValue('可能非法的变量名'), Blockly.Names.NameType.VARIABLE);
```

## 关于动态类别
因为需要向动态类别：PROCEDURE中添加自己的块，所以有必要看看源码怎么做的：
```js
function a(workspace) {
    function b(f, Type) {
        for (let k = 0; k < f.length; k++) {
            var h = f[k][0];
            const l = f[k][1];
            const n = $.createElement$$module$build$src$core$utils$xml("block");
            n.setAttribute("type", Type);
            n.setAttribute("gap", "16");
            const m = $.createElement$$module$build$src$core$utils$xml("mutation");
            m.setAttribute("name", h);
            n.appendChild(m);
            for (h = 0; h < l.length; h++) {
                const p = $.createElement$$module$build$src$core$utils$xml("arg");
                p.setAttribute("name", l[h]);
                m.appendChild(p)
            }
            c.push(n)
        }
    }
    const c = [];
    if (Blocks$$module$build$src$core$blocks.procedures_defnoreturn) {
        var d = $.createElement$$module$build$src$core$utils$xml("block");
        d.setAttribute("type", "procedures_defnoreturn");
        d.setAttribute("gap", "16");
        var e = $.createElement$$module$build$src$core$utils$xml("field");
        e.setAttribute("name", "NAME");
        e.appendChild($.createTextNode$$module$build$src$core$utils$xml($.Msg$$module$build$src$core$msg.PROCEDURES_DEFNORETURN_PROCEDURE));
        d.appendChild(e);
        c.push(d)
    }
    Blocks$$module$build$src$core$blocks.procedures_defreturn && (
        d = $.createElement$$module$build$src$core$utils$xml("block"),
        d.setAttribute("type", "procedures_defreturn"),
        d.setAttribute("gap", "16"),
        e = $.createElement$$module$build$src$core$utils$xml("field"),
        e.setAttribute("name", "NAME"),
        e.appendChild($.createTextNode$$module$build$src$core$utils$xml($.Msg$$module$build$src$core$msg.PROCEDURES_DEFRETURN_PROCEDURE)),
        d.appendChild(e),
        c.push(d)
    );
    Blocks$$module$build$src$core$blocks.procedures_ifreturn && (
        d = $.createElement$$module$build$src$core$utils$xml("block"),
        d.setAttribute("type", "procedures_ifreturn"),
        d.setAttribute("gap", "16"),
        c.push(d)
    );
    c.length && c[c.length - 1].setAttribute("gap", "24");
    workspace = allProcedures$$module$build$src$core$procedures(workspace);
    b(workspace[0], "procedures_callnoreturn");
    b(workspace[1], "procedures_callreturn");
    return c
}
```
源码获取方法：console.log(workspace.toolboxCategoryCallbacks.get("PROCEDURE").toString())
压缩后：Blocks$$module$build$src$core$blocks对应压缩前Blockly.Blocks，$.createElement$$module$build$src$core$utils$xml("block")就是document.createElement("block")
