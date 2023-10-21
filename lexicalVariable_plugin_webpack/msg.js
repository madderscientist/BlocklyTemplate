/**
 * @license
 * Copyright 2021 Mark Friedman
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Translatable messages used in lexical variable code.
 * @author mark.friedman@gmail.com (Mark Friedman)
 * Based on code from MIT App Inventor
 */

import * as Blockly from 'blockly/core';

Blockly.Msg['LANG_VARIABLES_GLOBAL_DECLARATION_TITLE_INIT'] =
    '初始化全局变量';
Blockly.Msg['LANG_VARIABLES_GLOBAL_DECLARATION_NAME'] = '变量名';
Blockly.Msg['LANG_VARIABLES_GLOBAL_DECLARATION_TO'] = '为';
Blockly.Msg['LANG_VARIABLES_GLOBAL_DECLARATION_COLLAPSED_TEXT'] = '全局变量';
Blockly.Msg['LANG_VARIABLES_GLOBAL_DECLARATION_TOOLTIP'] = '创建全局变量，并通过挂接的代码块赋值。';
Blockly.Msg['LANG_VARIABLES_GLOBAL_PREFIX'] = 'global';
Blockly.Msg['LANG_VARIABLES_GET_TITLE_GET'] = '取';
Blockly.Msg['LANG_VARIABLES_GET_COLLAPSED_TEXT'] = '取';
Blockly.Msg['LANG_VARIABLES_GET_TOOLTIP'] = '返回变量的值。';
Blockly.Msg['LANG_VARIABLES_SET_TITLE_SET'] = '设置';
Blockly.Msg['LANG_VARIABLES_SET_TITLE_TO'] = '为';
Blockly.Msg['LANG_VARIABLES_SET_COLLAPSED_TEXT'] = '设置';
Blockly.Msg['LANG_VARIABLES_SET_TOOLTIP'] = '设置变量的值为输入的值';
Blockly.Msg['LANG_VARIABLES_VARIABLE'] = ' 变量';
Blockly.Msg['LANG_VARIABLES_LOCAL_DECLARATION_TITLE_INIT'] = '初始化局部变量';
Blockly.Msg['LANG_VARIABLES_LOCAL_DECLARATION_DEFAULT_NAME'] = '变量名';
Blockly.Msg['LANG_VARIABLES_LOCAL_DECLARATION_INPUT_TO'] = '为';
Blockly.Msg['LANG_VARIABLES_LOCAL_DECLARATION_IN_DO'] = '作用范围';
Blockly.Msg['LANG_VARIABLES_LOCAL_DECLARATION_COLLAPSED_TEXT'] = '局部变量';
Blockly.Msg['LANG_VARIABLES_LOCAL_DECLARATION_TOOLTIP'] = '创建只在执行块的执行部分有效的变量。';
Blockly.Msg['LANG_VARIABLES_LOCAL_DECLARATION_TRANSLATED_NAME'] =
    'initialize local in do';
Blockly.Msg['LANG_VARIABLES_LOCAL_DECLARATION_EXPRESSION_IN_RETURN'] = '作用范围';
Blockly.Msg['LANG_VARIABLES_LOCAL_DECLARATION_EXPRESSION_COLLAPSED_TEXT'] =
    'local';
Blockly.Msg['LANG_VARIABLES_LOCAL_DECLARATION_EXPRESSION_TOOLTIP'] =
    '创建只在指定块内的返回部分有效的变量。';
Blockly.Msg['LANG_VARIABLES_LOCAL_DECLARATION_EXPRESSION_TRANSLATED_NAME'] =
    'initialize local in return';
Blockly.Msg['LANG_VARIABLES_LOCAL_MUTATOR_CONTAINER_TITLE_LOCAL_NAMES'] =
    '局部变量名称';
Blockly.Msg['LANG_VARIABLES_LOCAL_MUTATOR_CONTAINER_TOOLTIP'] = '';
Blockly.Msg['LANG_VARIABLES_LOCAL_MUTATOR_ARG_TITLE_NAME'] = '变量名';
Blockly.Msg['LANG_VARIABLES_LOCAL_MUTATOR_ARG_DEFAULT_VARIABLE'] = 'x';
Blockly.Msg['LANG_PROCEDURES_DEFNORETURN_DEFINE'] = '定义过程';
Blockly.Msg['LANG_PROCEDURES_DEFNORETURN_PROCEDURE'] = '过程名';
Blockly.Msg['LANG_PROCEDURES_DEFNORETURN_DO'] = '执行语句';
Blockly.Msg['LANG_PROCEDURES_DEFNORETURN_COLLAPSED_PREFIX'] = '定义过程 ';
Blockly.Msg['LANG_PROCEDURES_DEFNORETURN_TOOLTIP'] =
    '语句执行完后，不返回结果';
Blockly.Msg['LANG_PROCEDURES_DOTHENRETURN_THEN_RETURN'] = '返回结果';
Blockly.Msg['LANG_PROCEDURES_DOTHENRETURN_DO'] = '执行语句';
Blockly.Msg['LANG_PROCEDURES_DOTHENRETURN_RETURN'] = '返回结果';
Blockly.Msg['LANG_PROCEDURES_DOTHENRETURN_TOOLTIP'] =
    '在“do”中运行块并返回一条语句。如果您需要在向变量返回值之前运行过程，则此功能非常有用。';
Blockly.Msg['LANG_PROCEDURES_DOTHENRETURN_COLLAPSED_TEXT'] = '执行并返回';
Blockly.Msg['LANG_PROCEDURES_DEFRETURN_DEFINE'] = '定义过程';
Blockly.Msg['LANG_PROCEDURES_DEFRETURN_PROCEDURE'] = '过程名';
Blockly.Msg['LANG_PROCEDURES_DEFRETURN_RETURN'] = '返回结果';
Blockly.Msg['LANG_PROCEDURES_DEFRETURN_COLLAPSED_PREFIX'] = '定义过程 ';
Blockly.Msg['LANG_PROCEDURES_DEFRETURN_TOOLTIP'] = '执行语句后返回结果。';
Blockly.Msg['LANG_PROCEDURES_DEF_DUPLICATE_WARNING'] =
    'Warning:\nThis procedure has\nduplicate inputs.';
Blockly.Msg['LANG_PROCEDURES_CALLNORETURN_CALL'] = '调用 ';
Blockly.Msg['LANG_PROCEDURES_CALLNORETURN_PROCEDURE'] = '过程名';
Blockly.Msg['LANG_PROCEDURES_CALLNORETURN_COLLAPSED_PREFIX'] = '调用 ';
Blockly.Msg['LANG_PROCEDURES_CALLNORETURN_TOOLTIP'] =
    '调用一个没有返回值的过程。';
Blockly.Msg['LANG_PROCEDURES_CALLNORETURN_TRANSLATED_NAME'] = '调用无返回过程';
Blockly.Msg['LANG_PROCEDURES_CALLRETURN_CALL'] = '调用 ';
Blockly.Msg['LANG_PROCEDURES_CALLRETURN_PROCEDURE'] = '过程名';
Blockly.Msg['LANG_PROCEDURES_CALLRETURN_COLLAPSED_PREFIX'] = '调用 ';
Blockly.Msg['LANG_PROCEDURES_CALLRETURN_TOOLTIP'] =
    '调用一个有返回值的过程。';
Blockly.Msg['LANG_PROCEDURES_CALLRETURN_TRANSLATED_NAME'] = '调用有返回过程';
Blockly.Msg['LANG_PROCEDURES_MUTATORCONTAINER_TITLE'] = '输入:';
Blockly.Msg['LANG_PROCEDURES_MUTATORARG_TITLE'] = '输入:';
Blockly.Msg['LANG_PROCEDURES_HIGHLIGHT_DEF'] = 'Highlight Procedure';
Blockly.Msg['LANG_PROCEDURES_MUTATORCONTAINER_TOOLTIP'] = '';
Blockly.Msg['LANG_PROCEDURES_MUTATORARG_TOOLTIP'] = '';
Blockly.Msg['LANG_CONTROLS_FOR_INPUT_WITH'] = 'count with';
Blockly.Msg['LANG_CONTROLS_FOR_INPUT_VAR'] = 'x';
Blockly.Msg['LANG_CONTROLS_FOR_INPUT_FROM'] = 'from';
Blockly.Msg['LANG_CONTROLS_FOR_INPUT_TO'] = 'to';
Blockly.Msg['LANG_CONTROLS_FOR_INPUT_DO'] = 'do';
Blockly.Msg['LANG_CONTROLS_FOR_TOOLTIP'] =
    'Count from a start number to an end number.\nFor each count, set the current count number to\nvariable \'%1\', and then do some statements.';
Blockly.Msg['LANG_CONTROLS_FORRANGE_INPUT_ITEM'] = '对任意';
Blockly.Msg['LANG_CONTROLS_FORRANGE_INPUT_VAR'] = 'variable';
Blockly.Msg['LANG_CONTROLS_FORRANGE_INPUT_START'] = '范围从';
Blockly.Msg['LANG_CONTROLS_FORRANGE_INPUT_END'] = '到';
Blockly.Msg['LANG_CONTROLS_FORRANGE_INPUT_STEP'] = '每次增加';
Blockly.Msg['LANG_CONTROLS_FORRANGE_INPUT_DO'] = '执行';
Blockly.Msg['LANG_CONTROLS_FORRANGE_INPUT_COLLAPSED_TEXT'] = '对范围内的每个数';
Blockly.Msg['LANG_CONTROLS_FORRANGE_INPUT_COLLAPSED_PREFIX'] = 'for';
Blockly.Msg['LANG_CONTROLS_FORRANGE_INPUT_COLLAPSED_SUFFIX'] = ' in range';
Blockly.Msg['LANG_CONTROLS_FORRANGE_TOOLTIP'] =
    '按指定范围和增量循环取值，每次循环均将数值赋予指定变量，并运行“执行”区域所包含的代码块。\n注意，变量名用英文！';
Blockly.Msg['LANG_CONTROLS_FOREACH_INPUT_ITEM'] = '对于每一个';
Blockly.Msg['LANG_CONTROLS_FOREACH_INPUT_VAR'] = 'item';
Blockly.Msg['LANG_CONTROLS_FOREACH_INPUT_INLIST'] = '来自列表';
Blockly.Msg['LANG_CONTROLS_FOREACH_INPUT_DO'] = '执行';
Blockly.Msg['LANG_CONTROLS_FOREACH_INPUT_COLLAPSED_TEXT'] = '对列表中的每一项';
Blockly.Msg['LANG_CONTROLS_FOREACH_INPUT_COLLAPSED_PREFIX'] = 'for ';
Blockly.Msg['LANG_CONTROLS_FOREACH_INPUT_COLLAPSED_SUFFIX'] = ' in list';
Blockly.Msg['LANG_CONTROLS_FOREACH_TOOLTIP'] =
    'Runs the blocks in the \'do\'  section for each item in the list.  Use' +
    ' the given variable name to refer to the current list item.';
Blockly.Msg['LANG_CONTROLS_FOREACH_DICT_INPUT'] = '对于每一个键值对(%1, %2)来自字典%3';
Blockly.Msg['LANG_CONTROLS_FOREACH_DICT_INPUT_DO'] = '执行';
Blockly.Msg['LANG_CONTROLS_FOREACH_DICT_INPUT_KEY'] = 'key';
Blockly.Msg['LANG_CONTROLS_FOREACH_DICT_INPUT_VALUE'] = 'value';
Blockly.Msg['LANG_CONTROLS_FOREACH_DICT_TITLE'] = '对字典的每一项';
Blockly.Msg['LANG_CONTROLS_FOREACH_DICT_TOOLTIP'] =
    '为字典中的每个键值条目运行“do”部分中的块。使用给定的变量名引用当前字典项的键/值。';
Blockly.Msg['ERROR_SELECT_VALID_ITEM_FROM_DROPDOWN'] =
    '请从下拉列表中选择合适项';
Blockly.Msg['ERROR_BLOCK_CANNOT_BE_IN_DEFINITION'] =
    '这个块不能作为定义';
Blockly.Msg['HORIZONTAL_PARAMETERS'] = 'Arrange Parameters Horizontally';
Blockly.Msg['VERTICAL_PARAMETERS'] = 'Arrange Parameters Vertically';
Blockly.Msg['LANG_CONTROLS_DO_THEN_RETURN_INPUT_DO'] = '执行';
Blockly.Msg['LANG_CONTROLS_DO_THEN_RETURN_INPUT_RETURN'] = '返回';
Blockly.Msg['LANG_CONTROLS_DO_THEN_RETURN_TOOLTIP'] =
    '在“do”中运行块并返回结果。如果您需要在向变量返回值之前运行过程，则此功能非常有用。';
Blockly.Msg['LANG_CONTROLS_DO_THEN_RETURN_COLLAPSED_TEXT'] = '执行并返回';
Blockly.Msg['LANG_CONTROLS_DO_THEN_RETURN_TITLE'] = 'do result';
Blockly.Msg['PROCEDURES_DEFNORETURN_PROCEDURE'] = Blockly.Msg['LANG_PROCEDURES_DEFNORETURN_PROCEDURE'];
Blockly.Msg['PROCEDURES_DEFRETURN_PROCEDURE'] = Blockly.Msg['LANG_PROCEDURES_DEFRETURN_PROCEDURE'];

Blockly.Msg['LANG_CONTROLS_FOREACH_DICT_INPUT_ITEM'] = '对于每一对';
Blockly.Msg['LANG_CONTROLS_FOREACH_DICT_INPUT_KEY'] = 'key';
Blockly.Msg['LANG_CONTROLS_FOREACH_DICT_INPUT_VALUE'] = 'value';
Blockly.Msg['LANG_CONTROLS_FOREACH_DICT_INPUT_INDICT'] = '来自字典';
Blockly.Msg['LANG_CONTROLS_FOREACH_DICT_INPUT_DO'] = Blockly.Msg['LANG_CONTROLS_FOREACH_INPUT_DO'];