##  2-1 重学前端-编程语言通识与js语言设计

### 2-1-1 产生式(BNF)
> 是一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言。即表示形式语言的语言

      eg.   [js文档中]

      NumericLiteral :: 
        DecimalLiteral 
        BinaryIntegerLiteral 
        OctalIntegerLiteral
        HexIntegerLiteral

      // 定义了NumericLiteral的语法实现
      // 由DecimalLiteral等这四种形式组成
      // 文档中还有对于DecimalLiteral的定义
      // 通过这样一层层语法构成的分析，就能了解一个Number 直接量的构成

### 2-1-2 图灵完备性
  
  *  命令式-图灵机

      goto

      if和while

  * 声明式-lambda
    
    递归

> CSS/HTML不是图灵完备的，因为它不能编程，只能写表达式，没有语句

### 2-1-3 类型系统

  * 静态类型系统与动态类型系统

  * 强类型与弱类型

  * 复合类型

    结构体

    函数签名

  * 子类型（有了继承）

    逆变/协变

> 弱类型和静态类型并没有关系；有隐式转换就是弱类型

### 2-1-4 一般命令式编程语言构成
  * Atom    //原子

    Identifier

    Literal

  * Expression    //表达式

    Atom

    Operator

    Punctuator

  * Statement    // 语句，一般是一个递归的

    Expression

    Keyword

    Punctuator

  * Structure    // 结构化

    Function
    
    Class

    Process

    Namespace

  * Program // 程序

    Program

    Module

    Package
    
    Library

## 2-2 重学 JavaScript | 词法，类型

### 2-2-1 Literal Grammar

    WhiteSpace ::
      <TAB>
      <VT>
      <FF>
      <SP>
      <NBSP>
      <ZWNBSP>
      <USP>

|Code Poit | Name | Abbreviation|
|----|----|----|
U+0009|character tabulation \t|`<TAB>`|
U+000B|line tabulation \v|`<VF>`|
U+000C|form feed \f|`<FF>`|
U+0020|space \s|`<SP>`|
U+00A0|no-break space|`<NBSP>`|
U+FEFF|zero width no-break space|`<ZWNBSP>`|
Other category "Zs"|any other Unicode "Space_Separator" code point|`<USP>`|
|||

    LineTerminator:: 
      <LF> 
      <CR> 
      <LS> 
      <PS>

|Code Poit | Name | Abbreviation|
|----|----|----|
U+0009|line feed \n|`<LF>`|
U+000B|carriage return \r|`<CR>`|
U+000C|line separator|`<LS>`|
U+0020|paragraph separator|`<PS>`|
|||

    Comment:: 
      MultiLineComment 
      SingleLineComment


    Tokens
    CommonToken ::
      IdentifierName 
      Punctuator 
      NumericLiteral 
      StringLiteral 
      Template

### 2-2-1 基本类型

    Number String Boolean Null Undefined Symbol

> Number浮点数比较: Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON

> String支持码点: U+0000 ~ U+10FFFF， 但推荐使用 U+0000 ~ U+FFFF (BMP)
