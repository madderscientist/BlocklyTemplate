import * as Blockly from 'blockly/core';
;(function(){
    const javascriptGenerator = Blockly.JavaScript;
  /**
   * @param {Blockly.Block} block The block to generate code for.
   * @return {string} The generated code.
   */
  javascriptGenerator.forBlock['procedures_callreturn'] = function (block) {
    // Call a procedure with a return value.
    const funcName = javascriptGenerator.nameDB_.getName(
        block.getFieldValue('NAME'), Blockly.PROCEDURE_CATEGORY_NAME);
    const args = [];
    const variables = block.arguments_;
    for (let i = 0; i < variables.length; i++) {
      args[i] = javascriptGenerator.valueToCode(block, 'ARG' + i,
          javascriptGenerator.ORDER_NONE) || 'null';
    }
    const code = funcName + '(' + args.join(', ') + ')';
    return [code, javascriptGenerator.ORDER_FUNCTION_CALL];
  };
})();
