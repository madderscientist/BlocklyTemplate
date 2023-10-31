import * as Blockly from 'blockly/core';
import * as Shared from '../shared.js';

/**
 * Generate variable name
 * @param {string} name
 * @return {string}
 */
function getVariableName(name) {
  // 有bug：name需要有前缀，下面这个函数是把前缀拆出来的，但传参没有前缀，因为getFieldValue得到的就没有前缀。而这源于下拉框没有前缀
  // 2023/10/31解决：使用Blockly.JavaScript.nameDB_.getName，放弃前缀系统
  const pair = Shared.unprefixName(name);
  const prefix = pair[0];
  const unprefixedName = pair[1];
  if (prefix === Blockly.Msg.LANG_VARIABLES_GLOBAL_PREFIX ||
      prefix === Shared.GLOBAL_KEYWORD) {
    return Blockly.JavaScript.nameDB_.getName(
      unprefixedName,
      Blockly.Names.NameType.VARIABLE);
  } else {
    return Blockly.JavaScript.nameDB_.getName(
      (Shared.possiblyPrefixGeneratedVarName(prefix))(unprefixedName),
      Blockly.Names.NameType.VARIABLE);
  }
}

;(function(){
  const javascriptGenerator = Blockly.JavaScript;
  javascriptGenerator.forBlock['lexical_variable_get'] = function (block) {
    const code = getVariableName(block.getFieldValue('VAR'));
    return [code, javascriptGenerator.ORDER_ATOMIC];
  };

  /**
   * Generate basic variable setting code.
   * @param {Blockly.Block} block
   * @param {string} varFieldName
   * @return {string} The code.
   */
  function genBasicSetterCode(block, varFieldName) {
    const argument0 = javascriptGenerator.valueToCode(block, 'VALUE',
        javascriptGenerator.ORDER_ASSIGNMENT) || '0';
    const varName = getVariableName(block.getFieldValue(varFieldName));
    return varName + ' = ' + argument0 + ';\n';
  }

  javascriptGenerator.forBlock['lexical_variable_set'] = function (block) {
    // Variable setter.
    return genBasicSetterCode(block, 'VAR');
  };

  javascriptGenerator.forBlock['global_declaration'] = function (block) {
    // Global variable declaration
    return 'var ' + genBasicSetterCode(block, 'NAME');
  };

  function generateDeclarations(block) {
    let code = '{\n  let ';
    for (let i = 0; block.getFieldValue('VAR' + i); i++) {
      code += Blockly.JavaScript.nameDB_.getName((Shared.usePrefixInCode ? 'local_' : '') +
          block.getFieldValue('VAR' + i), 'VARIABLE');
      code += ' = ' + (javascriptGenerator.valueToCode(block,
          'DECL' + i, javascriptGenerator.ORDER_NONE) || '0');
      code += ', ';
    }
    // Get rid of the last comma
    code = code.slice(0, -2);
    code += ';\n';
    return code;
  }

  javascriptGenerator.forBlock['local_declaration_statement'] = function () {
    let code = generateDeclarations(this);
    code += javascriptGenerator.statementToCode(this, 'STACK',
        javascriptGenerator.ORDER_NONE);
    code += '}\n';
    return code;
  };

  javascriptGenerator.forBlock['local_declaration_expression'] = function () {
    // TODO: This can probably be redone to use the variables as parameters to the generated function
    // and then call the function with the generated variable values.
    let code = '(function() {\n'
    code += generateDeclarations(this);
    code += 'return ' + (javascriptGenerator.valueToCode(this,
        'RETURN', javascriptGenerator.ORDER_NONE) || 'null');
    code += '}})()\n';
    return [code, javascriptGenerator.ORDER_NONE];
  };
})();

export {getVariableName};