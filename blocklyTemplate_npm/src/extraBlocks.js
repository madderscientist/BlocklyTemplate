// 自定义块
import * as Blockly from 'blockly/core';
import {javascriptGenerator, Order} from 'blockly/javascript';

/* 模板 最后一项"JavaScript"是我加的
{
    "type": "string_length",                    // 标识符
    "message0": 'length of %1 test %2',         // UI可见的提示，会根据args的顺序决定输入
    "args0": [
        {
            "type": "input_value",              // intput_value是块输入。可以用其他类，比如不是块
            "name": "VALUE",                    // name相同不会报错，但是代码只能获取第一个此名的块
            "check": "String"
        },
        {
            "type": "field_dropdown",
            "name": "VALUE",
            "options": [
                ["C4", "sounds/c4.m4a"],
                ["D4", "sounds/d4.m4a"],
                ["E4", "sounds/e4.m4a"],
                ["F4", "sounds/f4.m4a"],
                ["G4", "sounds/g4.m4a"]
            ]
        }
    ],
    // 可以取message1和arg1，但是必须从0开始递增，即不能只有1而没有0。argsi的意义在于换行显示(比如循环语句，如果不用args1则提示语"do"会出现在上一行而不是内容的左边)
    "output": "Number",                         // 此行与下两行互斥 写了就有，值为类型 null表示所有类型
    "previousStatement": null,
    "nextStatement": null,
    "style": "control_blocks",                  // 和下面的互斥 用此方法可以用theme批量设置
    "colour": 160,
    "inputsInline": true,                       // 一行显示 无定义会自动判断
    "tooltip": function(div, block){return String();},    // 或者直接字符串 用函数可以自定义提示样式
    "helpUrl": "https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks?hl=zh-cn#context_menus",
    "JavaScript": function(block) {
        var FieldValue = block.getFieldValue('X');      // 用于输入不是块的，见：https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/overview
        var dropdown = block.getFieldValue('END') == 'FIRST' ? 'indexOf' : 'lastIndexOf';   // 下拉菜单的返回值是FIRST之类的通用语言 如果像上面C4那样有两项则返回列表第二项
        var variable = javascriptGenerator.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);     // 对于变量下拉列表，为了防止变量名用了关键词，用此方法消除
        var listVar = generator.nameDB_.getDistinctName('可能非法的变量名', Blockly.names.NameType.VARIABLE);      // 可能需要增加过程变量。防止变量名冲突用此方法
        var code = 'var ' + listVar + ' = ' + arg0 + ';\n';
        var InputValue = javascriptGenerator.valueToCode(block, 'Y', Order.ATOMIC) || '0';   // 得到相连的块的值。优先级就这样配置，取值用最高优先级，返回用最低优先级 https://blockly.tortorse.com/guides/create-custom-blocks/operator-precedence.html
        return [`${FieldValue}+${InputValue}`, Order.NONE];      // 为了考虑级联，(must)返回列表，第一项是代码文本，第二项是运算优先级（括号）
        // 如果是语句，因为没有运算优先级，直接返回字符串即可
    }
}*/
// 有些功能只能用js声明，比如setDeletable等

// 注册变形器
// 点开一个Mutator的执行顺序：decompose saveconnectons compose saveconnectons compose
// 连接/断开的执行顺序： compose saveConnections
// 主块指工具箱里那个，而顶层块指主块弹出窗里的大块。子块为弹窗里置于顶层块内的小块
(function(){
    var MutatorTemplate = {
        // JSON初始化方法
        saveExtraState: function () {
            return {
                'itemCount': this.itemCount_
            };
        },
        loadExtraState: function (state) {
            this.itemCount_ = state['itemCount'];
            this.updateShape_();
        },
        // 当创建自定义块时，首先调用decompose方法来创建和连接子块。
        decompose: function (workspace) {
            // This is a special sub-block that only gets created in the mutator UI.
            // It acts as our "top block" 顶层块(连到谁上面)
            const topBlock = workspace.newBlock('lists_create_with_container');
            topBlock.initSvg();
            // Then we add one sub-block for each item in the list.
            var connection = topBlock.getInput('STACK').connection;
            for (var i = 0; i < this.itemCount_; i++) {
                const itemBlock = workspace.newBlock('lists_create_with_item');
                itemBlock.initSvg();
                connection.connect(itemBlock.previousConnection);
                connection = itemBlock.nextConnection;
            }
            return topBlock;
        },
        // 当mutator UI中重新组合自定义块时，首先调用compose方法来断开不再存在的子块的连接，并重新连接现有的子块
        compose: function (topBlock) {  // 输入是顶层块，即弹出窗的那个
            var itemBlock = topBlock.getInputTargetBlock('STACK');    // 得到stack中的第一个块
            // 得到连接到每个输入的块
            var connections = [];
            while (itemBlock && !itemBlock.isInsertionMarker()) {   // Ignore insertion markers!
                connections.push(itemBlock.valueConnection_);       // valueConnection_在saveConnections中设置，为本体连接的块(横向)，如果没连就是null
                itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
            }
            for (var i = 0; i < this.itemCount_; i++) {
                // this.getInput得到主块的输入(json定义里args里的)
                // 个人认为，connection属性相当于“有向图图”里的“箭头”，其targetConnection指向另一端的端口(是connection类型)（sourceBlock_似乎是这一端的块，block类型）
                var connection = this.getInput('ADD' + i).connection.targetConnection;
                // 如果主块连接了，但不在表中就断开，即主块比顶层块多的输入，即本次操作移除的块
                if (connection && connections.indexOf(connection) == -1) connection.disconnect();
            }
            // `this` refers to the main block. 以顶层块所连数目为准，更新主块的UI
            this.itemCount_ = connections.length;
            this.updateShape_();
            // And finally we reconnect any child blocks.   官方的代码有问题！connections[i]可能是null(即输入没有连接任何块)，所以加了判断
            for (var i = 0; i < this.itemCount_; i++) {
                // Reconnects this connection to the input with the given name on the given block.
                // 这个函数是新加的，在2021最后一版（没删编译好的文件）的方法(Mutator.reconnect(connections[i], this, 'ADD' + i))已经没了
                if (connections[i]) connections[i].reconnect(this, 'ADD' + i);   // 在此给输入命名
            }
        },
        saveConnections: function (topBlock) {
            var itemBlock = topBlock.getInputTargetBlock('STACK');
            var i = 0;
            while (itemBlock) {
                // `this` refers to the main block (which is being "mutated").
                var input = this.getInput('ADD' + i);
                // This is the important line of this function!
                // 在顶层块的子块存了主块的输入
                itemBlock.valueConnection_ = input && input.connection.targetConnection;    // js中&&和C++的不一样
                i++;
                itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
            }
        },
        updateShape_: function () {
            for (let i = 0; i < this.itemCount_; i++) {
                if (!this.getInput('ADD' + i)) {
                    this.appendValueInput('ADD' + i);
                }
            }
            // Remove deleted inputs.
            for (let i = this.itemCount_; this.getInput('ADD' + i); i++) {
                this.removeInput('ADD' + i);
            }
        }
    }
    Blockly.Extensions.registerMutator(
        'Arrayitems_mutator', MutatorTemplate, undefined,
        ['lists_create_with_item']  // 备选的小块
    );

    Blockly.Extensions.registerMutator(
        'RenameVar_mutator', {
            saveExtraState: MutatorTemplate.saveExtraState,
            loadExtraState: MutatorTemplate.loadExtraState,
            decompose: function (workspace) {
                const topBlock = workspace.newBlock('text_create_join_container');
                topBlock.initSvg();
                var connection = topBlock.getInput('STACK').connection;
                for (var i = 0; i < this.itemCount_; i++) {
                    const itemBlock = workspace.newBlock('text_create_join_item');
                    itemBlock.initSvg();
                    connection.connect(itemBlock.previousConnection);
                    connection = itemBlock.nextConnection;
                }
                return topBlock;
            },
            compose: MutatorTemplate.compose,
            saveConnections: MutatorTemplate.saveConnections,
            updateShape_: function(){
                for (let i = 0; i < this.itemCount_; i++) {
                    if (!this.getInput('ADD' + i)) {
                        // input代表了连接，而block指整个块，包含前者
                        this.appendValueInput('ADD' + i).setCheck("TEXT").setAlign(Blockly.ALIGN_RIGHT)
                        .appendField("重命名变量")
                        .appendField(new Blockly.FieldTextInput("default"), "NAME")
                        .appendField(new Blockly.FieldDropdown(function(){
                            let ops = Blockly.getMainWorkspace().getAllVariables();
                            return ops.length?ops:[["no variables","null"],["no variable2s","null2"]]
                        }), 'INLINE')
                         .appendField(new Blockly.FieldVariable("item"), "var"+i)
                        this.moveInputBefore('ADD' + i,"js")
                    }
                }
                // Remove deleted inputs.
                for (let i = this.itemCount_; this.getInput('ADD' + i); i++) {
                    this.removeInput('ADD' + i);
                }
            }
        }, undefined,
        ['text_create_join_item']  // 备选的小块
    );
})();

// 初始化自定义块 记得在toolbox中加入位置
(function () {
    const extraBlocks = [
        {
            "type": "controls_print",
            "message0": "%{BKY_CONTROLS_PRINT}%1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "msg"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "console.log(x)",
            "JavaScript": function (block) {
                let msg = javascriptGenerator.valueToCode(block, 'msg', Order.ATOMIC);
                return `console.log(${msg});\n`;
            }
        }, {
            "type": "controls_eval",
            "message0": "%{BKY_CONTROLS_RUNJS}%1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "js"
                }
            ],
            'mutator': "RenameVar_mutator",
            "previousStatement": null,
            "nextStatement": null,
            "style": "control_blocks",
            "tooltip": "eval(x)",
            "JavaScript": function (block) {
                let msg = javascriptGenerator.valueToCode(block, 'js', Order.ATOMIC);
                return msg.slice(1, -1);     // msg是一个字符串，文本内容首尾有引号
            }
        },
        {
            "type": "controls_typeof",
            "message0": "%{BKY_CONTROLS_TYPEOF}",
            "args0": [
                {
                    "type": "input_value",
                    "name": "obj"
                }
            ],
            "output": null,
            "style": "control_blocks",
            "tooltip": "return 'number' or 'object' or 'string'",
            "JavaScript": function (block) {
                let obj = javascriptGenerator.valueToCode(block, 'obj', Order.ATOMIC);
                return [`typeof ${obj}`, Order.NONE];
            }
        },
        {
            "type": "lists_isArray",
            "message0": "%{BKY_LISTS_ISARRAY}%1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "obj"
                }
            ],
            "output": null,
            "style": "list_blocks",
            "tooltip": "Array.isArray(x)",
            "JavaScript": function (block) {
                let obj = javascriptGenerator.valueToCode(block, 'obj', Order.ATOMIC);
                return [`Array.isArray(${obj})`, Order.NONE];
            }
        },
        {
            "type": "lists_push",
            "message0": "%{BKY_LISTS_PUSH}",
            "args0": [
                {
                    "type": "input_value",
                    "name": "list"
                }
            ],
            'mutator': 'Arrayitems_mutator',
            "output": "Array",
            "style": "list_blocks",
            "tooltip": "Array.push()",
            "inputsInline": false,
            "JavaScript": function (block) {
                let l = javascriptGenerator.valueToCode(block, 'list', Order.ATOMIC);
                let pushes = Array.from({ length: block.inputList.length - 2 }, (_, i) =>
                    javascriptGenerator.valueToCode(block, `ADD${i}`, Order.ATOMIC)
                )
                // 说是push，但要返回Array，就用这个方法代替吧
                return [`[...${l},${pushes.join(',')}]`, Order.NONE];
            }
        },
        {
            "type": "lists_splice",
            "message0": "%{BKY_LISTS_SPLICE}",
            "args0": [
                {
                    "type": "input_value",
                    "name": "list",
                    "align": "RIGHT"
                },{
                    "type": "input_value",
                    "name": "at",
                    "align": "RIGHT",
                    "check": "Number"
                },{
                    "type": "input_value",
                    "name": "deleteNum",
                    "check": "Number",
                    "align": "RIGHT"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            'mutator': 'Arrayitems_mutator',
            "style": "list_blocks",
            "tooltip": "Array.splice(); 如果删除0则表示不删除，没有添加项则不添加",
            "inputsInline": false,
            "JavaScript": function (block) {
                let l = javascriptGenerator.valueToCode(block, 'list', Order.ATOMIC);
                let at = javascriptGenerator.valueToCode(block, 'at', Order.ATOMIC);
                let deleteNum = javascriptGenerator.valueToCode(block, 'deleteNum', Order.ATOMIC);
                let adds = Array.from({ length: block.inputList.length - 4 }, (_, i) =>
                    javascriptGenerator.valueToCode(block, `ADD${i}`, Order.ATOMIC)
                )
                return `${l}.splice(${at},${deleteNum}+1,${adds.join(',')});\n`;  // blockly的逻辑是从1开始
            }
        },
        {
            "type": "lists_concat",
            "message0": "%{BKY_LISTS_CONCAT}",
            'mutator': 'Arrayitems_mutator',
            "output": "Array",
            "style": "list_blocks",
            "tooltip": "Array.concat() 合并列表",
            "inputsInline": false,
            "JavaScript": function (block) {
                let lists = Array.from({ length: block.inputList.length - 1 }, (_, i) =>
                    javascriptGenerator.valueToCode(block, `ADD${i}`, Order.ATOMIC)
                )
                // 说是push，但要返回Array，就用这个方法代替吧
                return [`[...${lists.join(', ...')}]`, Order.NONE];
            }
        }
    ]
    // 可以用json注册，也可以用js注册，用其一即可。
    Blockly.defineBlocksWithJsonArray(extraBlocks);
    // 代码生成器
    for (const block of extraBlocks) {
        javascriptGenerator.forBlock[block['type']] = block['JavaScript'];
    }
})();

