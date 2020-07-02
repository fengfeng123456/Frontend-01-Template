# 第一课 解析一个四则运算的表达式

  按照以下，构建AST

  <Expression> ::=
    <AdditiveExpression><EOF>

  <AdditiveExpression> ::=
    <MultiplicativeExpression>
    |<AdditiveExpression><+><MultiplicativeExpression>
    |<AdditiveExpression><-><MultiplicativeExpression>

  <MultiplicativeExpression> ::=
    <Number>
    |<MultiplicativeExpression><*><Number>
    |<MultiplicativeExpression></><Number>

  
  1.字典树Trie--------较使用
  a-z
  每个节点都有26个分支

  空间换时间，充分利用了空间

  可以用来排序的

  2.括号匹配
  本质，是一个语法

  3.
    abcdabce 
    abcdabcdabce


    相似性分析：
    abcdabce
    bcdabce
    cdabce
    dabce
    abce
    bce
    ce
    e

    KMP

  
