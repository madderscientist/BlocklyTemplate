<div align="center">

# Blockly Template

Out-of-the-box Google Blockly project template<br>

[English](./README.en.md) | [简体中文](./README.md)<br>
<a href="https://github.com/google/blockly"><img src="https://tinyurl.com/built-on-blockly" alt="Built on Blockly"></a><br>
<a href="https://madderscientist.github.io/BlocklyTemplate/blocklyTemplate_web/">→→ Demo ←←</a>
</div>

## Abstract
A feature-rich and comprehensive Blockly project template. The project provides configuration examples and explanations for important features, making it easy to expand and learn.<br>
Learn more? Read: [Blockly_web](./blocklyTemplate_web/README.md)

## folder explanation
- **blocklyTemplate_web**(main!): blockly project using unpkg. Compared with offical samples, I enriched its functionality and wrote detailed guidance which helps developers quickly customize their own blockly project. I also packed two useful plugins called ["lexicalVariable"](https://github.com/mit-cml/blockly-plugins/tree/main/block-lexical-variables) and ["backpack"](https://www.npmjs.com/package/@blockly/workspace-backpack), making my template powerful and more userfriendly.
- **blocklyTemplate_npm**(unfinished and won't be updated!): blockly project using npm. It's the by-product of my scratching to use plugin "lexicalVariable" as it is based on ES6 module. But I hate the develop pattern so I packed the plugin instead of adjusting to npm. As a result, I abandoned continuing development with npm. It only provides basic basic basic native blockly experience.
- **lexicalVariable_plugin_webpack**: project to pack the plugin with webpack, in order to avoid using npm. As the plugin was written for Blockly 8.0, I fixed some bugs to adjust it to Blockly 10, as well as modified many unreasonable aspects. Details were shown in [README](./lexicalVariable_plugin_webpack/README.md).
- **backpack_plugin_webpack**: project to pack the plugin with webpack.

!! It's recommended using the project in folder **blocklyTemplate_web**.  Just double-click index.html to run it. For more information, read README.md in each folder, which also provides my learning journey, development experience and usage instructions.(but in Chinese)

## origin
To develop a user-friendly and accessible frontend for the project, I considered using Blockly, drawing inspiration from AppInventor. By studying BlocklyGuidance and Colab examples, I integrated commonly used configuration code with detailed comments and added useful js functions.<br>
Initially, I started developing using the unpkg version but found the built-in variable system to be inadequate. I then discovered the lexicalVariable plugin, the one used in AppInventor, but it was built with ES6. Consequently, I migrated to npm for development. During the migration process, I learned webpack, but I wasn't fond of this development approach as it lacked lightweight and simplicity, and also had some bugs. However, halfway through, I successfully managed to package the lexicalVariable plugin into ES5 (see README in the lexicalVariable_plugin_webpack folder). Ecstatically, I abandoned the npm version and return to web-based development.<br>
With the previous experience in hand, I successfully packaged the backpack plugin too.<br>
Therefore, blocklyTemplate_web is the complete version, while blocklyTemplate_npm is a work in progress. The GitHub Page provides the web version of the Blockly project.