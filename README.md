# Blockly Template
[Google Blockly](https://github.com/google/blockly) project template | 谷歌Blockly项目模板<br>
→→[demo | 示例](https://madderscientist.github.io/BlocklyTemplate/blocklyTemplate_web/)←←

## folder explanation
- **blocklyTemplate_web**: blockly project using unpkg. Compared with offical samples, I enriched its functionality and add detailed guidance which helps developers quickly customize their own blockly project. I also packed an useful plugin called ["lexicalVariable"](https://github.com/mit-cml/blockly-plugins/tree/main/block-lexical-variables), which makes my template powerful and more userfriendly.
- **blocklyTemplate_npm**: unfinished and won't be updated. It's the by-product of my scratching to use plugin "lexicalVariable", but I hate the develop pattern so I packed the plugin instead of adjusting to npm. As a result, I abandoned continuing development with npm. It only provides basic native blockly experience.
- **lexicalVariable_plugin_webpack**: project to pack the plugin, in order to avoid using npm.

It's recommended using the project in folder **blocklyTemplate_web**. For more information, read README.md in each folder.

## 起因
做项目需要开发一个亲民易用的上位机，所以我想到了Blockly。开发向AppInventor靠拢。学习BlocklyGuidence和Colab案例，整合了常用配置代码，配上详细注释，增加实用js函数。<br>
一开始用unpkg版本开发，发现自带的变量系统不好，于是找到AppInventor同款变量插件：lexicalVariable，但是用的是es6。于是迁移到npm开发。迁移过程中学会了webpack，但是我不喜欢这种开发模式，因为不够轻量、不够简洁，而且还有bug。做到一半，我决定把lexicalVariable打包为es5，一试竟然成功（详见lexicalVariable_plugin_webpack文件夹的README）。于是开开心心抛弃npm版，回归web版开发。<br>
所以，blocklyTemplate_web是完全体，blocklyTemplate_npm是半成品。


