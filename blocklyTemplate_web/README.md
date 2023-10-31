# blockly template with unpkg
blockly项目模板，使用unpkg。本项目有如下特点：

1. 轻量。没有使用npm，开发方便，无需打包直接可以双击运行。
2. 添加了我认为重要的js功能，丰富了基本库。
3. 注释详细，方便继续拓展。我集中了blockly colab中、数个案例的配置，并写了详细的解释，便于自定义。
4. 打包使用了lexicalVariable插件，优化了原生变量系统。
5. 打包使用了backpack插件。
6. 添加了对异步函数的支持。

前期的学习过程记录在[learn](./learn.md)中，后期主要跟着[colab案例](https://github.com/google/blockly-samples)学习，所学记录在**注释**中。

## file explaination
- **contextMenu.js**: 右键菜单
- **customCategory.js**: 修改toolbox中，每个类别的样式
- **customToolBoxLable**: toolbox中添加自定义dom。可以不加载
- **darkTheme.js**: 主题
- **extraBlocks.js**: 我认为重要的额外的块
- **main.js**: 启动blockly（其他的是配置blockly）
- **storage.js**: 保存代码
- **toolbox.js**: 工具箱JSON配置
- **zh-hans-extraMsg.js**: 新增块的中文翻译
- **loadProject.js**: 指到下拉菜单的动作，和Blockly无关

## 设计时的权衡
匿名函数：用定义函数+取函数代替<br>
2023/10/23 更新 异步解决方案：<br>
- 之前的解决方法：用正则表达式将所有函数声明全部变为async。而await由块的genetator提供。非常粗暴地全部替换。
- 问题：新增了列表的自定义排序规则块，需要引用函数，但是用async修饰的函数无法用于排序。
- 解决思路；有必要将定义的函数区分对待。
- 尝试1：通过检查Blockly.JavaScript.definitions_（源码里将函数定义缓存到这了），得到函数定义。第二次生成时将含await的函数的名字替换为async函数名。
- 结果：失败。似乎每次生成结束会清空这个变量。
- 尝试2：重载函数定义生成源码。通过查看github提交历史得到了js定义，改为在生成代码时就检查异步，相当于开辟了一个新的Blockly.JavaScript.definitions_来缓存定义。其他同尝试1。
- 结果：经历了许多bug最终成功了。需要注意还重载了controls_do_then_return的生成逻辑。相关细节在blocklyTemplate_web\src\asyncSupport.js中

## 如何继续拓展功能
- 拓展基本库：extraBlocks.js中的extraBlocks添加块的json定义，在定义的“JavaScript”字段添加生成方法
- 自定义功能：理解注释，搭配官方文档，修改对应js文件相关内容
- 添加新的类别：在moreAPI文件夹下，模仿serialBlocks.js编写新的文件，包括如下部分：
    1. 检查环境(如serialBlocks中对LexicalVariables的检测)
    2. 用json定义块
    3. 用js定义块(不能用json定义的块，比如用到了lexicalVariable变量系统，需要仿照"lexicalVariable_plugin_webpack\blocks"编写。需要考虑修改插件源码。)
    4. 新类别加入toolbox
    5. 为新类别配置颜色
    
    最后，在html中引入新的js文件。应该在toolbox和theme定义后、main.js之前引入。

## 使用
example文件夹下的json提供了使用案例，可以直接导入应用查看（左上角-从文件导入-选择example文件夹下的json文件）。