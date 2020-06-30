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


    KMP

  