# blockly template with unpkg
blockly项目模板，使用unpkg。本项目有如下特点：

1. 轻量。没有使用npm，开发方便，无需打包直接可以双击运行。
2. 添加了我认为重要的js功能，丰富了基本库。
3. 注释详细，方便继续拓展。我集中了blockly colab中、数个案例的配置，并写了详细的解释，便于自定义。
4. 打包使用了lexicalVariable插件，优化了原生变量系统。
5. 打包使用了backpack插件。

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

## 设计时的权衡
匿名函数：用定义函数+取函数代替<br>
