import * as Blockly from 'blockly';

import {javascriptGenerator} from 'blockly/javascript';
import {save, load, getDateStr} from './serialization';
import {toolbox} from './toolbox';
// 翻译
import * as Zh from 'blockly/msg/zh-hans';
Blockly.setLocale(Zh);
import {zh_hans_extraMsg} from'./zh-hans-extraMsg';
Blockly.setLocale(zh_hans_extraMsg);

import './contextMenu';
import './customToolBoxLabel';
import './customCategory';
import './extraBlocks';
import './customTheme';

import './style/style.css';
import './style/toolBox.css';

var workspace = null;
// 默认打开的是untitled。保存则清空untitled的保存内容，更新codeTitle。新建则清空untitled。
var codeTitle = "untitled";

// 初始化
(function () {
  workspace = Blockly.inject('blocklyDiv', {
    toolbox: toolbox,
    media: './media/',    // webpack后的路径
    theme: Blockly.Themes.Custom,
    grid: {
      spacing: 25,
      length: 3,
      colour: '#666',
      snap: true
    },
    zoom: {
      controls: true,
      wheel: true
    }
  });
  bindClick('runButton', run);
  bindClick('clearButton', discard);
  bindClick('saveButton', saveCode);
  bindClick('exportButton', exportCode);
  bindClick('loadButton', loadCode);
})();

function bindClick(el, func) {  // 意义在于处理按钮的touch和click事件，防止触发两次
  if (typeof el === 'string') {
    el = document.getElementById(el);
  }
  el.addEventListener('click', func, true);
  function touchFunc(e) {
    // Prevent code from being executed twice on touchscreens.
    e.preventDefault();
    func(e);
  }
  el.addEventListener('touchend', touchFunc, true);
};

function discard() {  // 删除全部
  var count = workspace.getAllBlocks(false).length;
  if (count < 2 || window.confirm(Blockly.Msg['DELETE_ALL_BLOCKS'].replace('%1', count))) {
    workspace.clear();
    if (window.location.hash) {
      window.location.hash = '';
    }
  }
}

function run(event) {
  // Prevent code from being executed twice on touchscreens.
  if (event.type === 'touchend') {
    event.preventDefault();
  }
  javascriptGenerator.INFINITE_LOOP_TRAP = 'checkTimeout();\n';

  var timeouts = 0;
  var checkTimeout = function () {
    if (timeouts++ > 1000000) {
      throw MSG['timeout'];
    }
  };
  var code = javascriptGenerator.workspaceToCode(workspace);  // 上面老版 下面新版 试试可行否

  javascriptGenerator.INFINITE_LOOP_TRAP = null;

  try {
    console.log(code)
    eval(code);
  } catch (e) {
    alert(e);
  }
}

// to be done...

function saveCode(){
  while(codeTitle == "untitled" || codeTitle in window.localStorage){
    var userInput = prompt("项目名称：", "");
    if(!(userInput in window.localStorage)){
      codeTitle = userInput;
      break;
    }
  }
  save(workspace, codeTitle);
}

function loadCode(){
}

function exportCode() {
  if (codeTitle == "") {
    codeTitle = getDateStr(); // e.g. "2023-07-30"
  }
}