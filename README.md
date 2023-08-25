<div align="center">

# Blockly Template

开箱即用的 谷歌Blockly项目模板<br>

[English](./README.en.md) | [简体中文](./README.md)<br>
<a href="https://github.com/google/blockly"><img src="https://tinyurl.com/built-on-blockly" alt="Built on Blockly"></a><br>
<a href="https://madderscientist.github.io/BlocklyTemplate/blocklyTemplate_web/">→→ 在线使用 ←←</a>
</div>

## 概述
功能丰富完整的Blockly项目模板。项目提供了重要功能的配置样例与说明，易于拓展和学习。<br>
深入了解？读读这篇：[Blockly_web](./blocklyTemplate_web/README.md)

## 文件夹说明
- **blocklyTemplate_web**(重要！): 使用unpkg版本的Blockly项目。和官方样例相比，我整合并新增了许多功能，同时写了详细的注释，以便入门blockly的开发者可以轻松上手、继续拓展。我打包了两个实用的插件，一是["lexicalVariable"](https://github.com/mit-cml/blockly-plugins/tree/main/block-lexical-variables)，二是["backpack"](https://www.npmjs.com/package/@blockly/workspace-backpack)，使这个模板更实用强大。
- **blocklyTemplate_npm**(半成品且不会继续更新！): 使用npm的Blockly项目。这是我在探索使用"lexicalVariable"插件时的副产品。因为"lexicalVariable"插件基于ES6的module，所以我尝试将项目从unpkg版本迁移到npm上。但是我不喜欢这样的开发模式，所以我用webpack打包了插件用在web版，而不是我去适应npm。故npm开发终止。它只有最最最基本的功能，但是使用的是此时最新的Blockly版本，可以通过文件夹内的README文件了解项目迁移的注意点。
- **lexicalVariable_plugin_webpack**: 用webpack打包lexicalVariable插件。此插件基于Blockly 8.0，我对其进行了Blockly 10的适配，修复了许多不合理的地方。修改细节见此文件夹下的[README](./lexicalVariable_plugin_webpack/README.md)。
- **backpack_plugin_webpack**: 用webpack打包官方backpack插件。

！！建议用**blocklyTemplate_web**文件夹中的项目，双击index.html即可运行。每个项目的文件夹下都有README文件，提供了更多信息和细节(包括我的学习历程、开发经验、使用说明)。

## 起因
做项目需要开发一个亲民易用的上位机，所以我想到了Blockly。开发向AppInventor靠拢。学习BlocklyGuidence和Colab案例，整合了常用配置代码，配上详细注释，增加实用js函数。<br>
一开始用unpkg版本开发，发现自带的变量系统不好，于是找到AppInventor同款变量插件：lexicalVariable，但是用的是es6。于是迁移到npm开发。迁移过程中学会了webpack，但是我不喜欢这种开发模式，因为不够轻量、不够简洁，而且还有bug。做到一半，我决定把lexicalVariable打包为es5，一试竟然成功（详见lexicalVariable_plugin_webpack文件夹的README）。于是开开心心抛弃npm版，回归web版开发。<br>
于是将目光转向其他插件，同样顺利地打包了backpack插件。<br>
所以，blocklyTemplate_web是完全体，blocklyTemplate_npm是半成品。Github Page提供的正是web版的Blockly项目。