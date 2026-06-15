// 离散数学题库
const dmQuestions = {
    "proposition": {
        name: "命题逻辑",
        questions: [
            {type:"single",question:"设 $p=1$ 是素数，$q$：南京在北京的北边，$r$：苹果树是落叶乔木。则下列复合命题的真值为假的是( )。",options:["$\\lnot(p \\land q \\land \\lnot r)$","$(\\lnot p \\land q) \\to (p \\leftrightarrow r)$","$(p \\leftrightarrow q) \\lor (\\lnot p \\leftrightarrow \\lnot q)$","$\\lnot p \\lor q \\to \\lnot r$"],answer:3,explanation:"将 $p,q,r$ 的真值代入各公式得其真值。",knowledge:"命题逻辑"},
            {type:"single",question:"下列中是公式 $(p \\to q) \\to q$ 的成假赋值为( )。",options:["011","000","001","111"],answer:0,explanation:"方法一：观察法——只有前件为真、后件为假时蕴涵式为假；方法二：真值表法。",knowledge:"命题逻辑"},
            {type:"single",question:"下列公式为矛盾式的是( )。",options:["$((p \\to q) \\to (\\lnot q \\to \\lnot p)) \\lor r$","$p \\land r \\land \\lnot(q \\to p)$","$(p \\to q) \\leftrightarrow (p \\to r)$","$(\\lnot p \\land q) \\to \\lnot r$"],answer:1,explanation:"方法一：观察法；方法二：真值表法。",knowledge:"命题逻辑"},
            {type:"single",question:"下列语句中，( )是命题。",options:["下午有会吗？","2是常数。","这朵花多好看呀！","请把门关上。"],answer:1,explanation:"命题是能判断真假的陈述句。",knowledge:"命题逻辑"},
            {type:"single",question:"下列句子为命题的是( )",options:["全体起立!","$x = 0$","我在说谎。","张三生于1886年的春天。"],answer:3,explanation:"命题是能判断真假的陈述句。",knowledge:"命题逻辑"},
            {type:"single",question:"下列式子为矛盾式的是( )。",options:["$P \\land \\lnot P","$P \\lor (P \\land Q)$","$P \\lor \\lnot P","$\\lnot(P \\lor Q) \\leftrightarrow \\lnot P \\land \\lnot Q$"],answer:0,explanation:"矛盾式是永假式。",knowledge:"命题逻辑"},
            {type:"single",question:"下述命题公式中，是重言式的为( )。",options:["$(p \\land q) \\to (p \\lor q)$","$(p \\leftrightarrow q) \\leftrightarrow ((p \\to q) \\land (q \\to p))$","$\\lnot(p \\to q) \\land q$","$(p \\land \\lnot p) \\leftrightarrow q$"],answer:2,explanation:"重言式是永真式。",knowledge:"命题逻辑"},
            {type:"single",question:"$\\lnot p \\lor q$ 的主析取范式中含极小项的个数为( )。",options:["2","3","5","0","8"],answer:2,explanation:"3个命题变元共有 $2^3 = 8$ 个极小项，主析取范式中不含的极小项个数等于主合取范式中极大项个数。",knowledge:"命题逻辑"},
            {type:"single",question:"全体极小项析取式为( )。",options:["可满足式","矛盾式","永真式","A，B，C 都有可能"],answer:2,explanation:"全体极小项的析取是永真式。",knowledge:"命题逻辑"},
            {type:"multi",question:"下列语句是命题的有( )。",options:["明年中秋节的晚上是晴天","$x + y > 0$","$xy > 0$ 当且仅当 $x$ 和 $y$ 都大于0","我正在说谎"],answer:[0,2],explanation:"命题是能判断真假的陈述句，不含自由变元。",knowledge:"命题逻辑"},
            {type:"multi",question:"下列各命题中真值为真的命题有( )。",options:["$2+2=4$ 当且仅当 3是奇数","$2+2=4$ 当且仅当 3不是奇数","$2+2\\neq4$ 当且仅当 3是奇数","$2+2\\neq4$ 当且仅当 3不是奇数"],answer:[0,3],explanation:"双条件命题：两个命题真值相同时为真。",knowledge:"命题逻辑"},
            {type:"multi",question:"下列符号串是合式公式的有( )",options:["$P \\Leftrightarrow Q$","$P \\Rightarrow P \\lor Q$","$(\\lnot P \\lor Q) \\land (P \\lor \\lnot Q)$","$\\lnot(P \\leftrightarrow Q)$"],answer:[2,3],explanation:"合式公式需要符合语法定义。",knowledge:"命题逻辑"},
            {type:"judge",question:"联结词集合 $\\{\\land, \\to\\}$ 是联结词完备集。",answer:false,explanation:"$\\{\\land, \\to\\}$ 不是完备集，不能表示所有命题函数。",knowledge:"命题逻辑"},
            {type:"judge",question:"命题公式 $G = P \\to (P \\land (Q \\to R))$，则 $G$ 是恒真的。",answer:false,explanation:"取 $P=1, Q=1, R=0$ 时，$G$ 为假。",knowledge:"命题逻辑"},
            {type:"judge",question:"任何命题公式都存在着与之等值的析取范式，且是唯一。",answer:false,explanation:"析取范式不唯一，主析取范式才唯一。",knowledge:"命题逻辑"},
            {type:"judge",question:"联接词集 $\\{\\lnot, \\land, \\lor, \\to\\}$ 是联接词完备集。",answer:true,explanation:"该集合是完备集。",knowledge:"命题逻辑"},
            {type:"fill",question:"解释 $(0, 0)$ 使命题公式 $A = (p \\lor (p \\to q)) \\to q$ 的真值为 ____。",answer:["0"],explanation:"代入 $p=0, q=0$ 计算。",knowledge:"命题逻辑"},
            {type:"fill",question:"若命题公式 $A$ 在各种解释下取值均为真，则称 $A$ 为 ____。",answer:["永真式","重言式"],explanation:"永真式又称重言式。",knowledge:"命题逻辑"},
            {type:"fill",question:"$P$：你努力，$Q$：你失败。\"除非你努力，否则你将失败\"的翻译为 ____；\"虽然你努力了，但还是失败了\"的翻译为 ____。",answer:["$\\lnot P \\to Q$","$P \\land Q$"],explanation:"除非A否则B = $\\lnot A \\to B$；虽然A但B = $A \\land B$。",knowledge:"命题逻辑"},
            {type:"fill",question:"若 $P, Q$ 为二命题，$P \\to Q$ 真值为 0 当且仅当 ____。",answer:["$P$ 真值为 1，$Q$ 的真值为 0"],explanation:"蕴涵式仅在前件真后件假时为假。",knowledge:"命题逻辑"},
            {type:"fill",question:"判断一个语句是否为命题，要看它是否为 ____，____。",answer:["陈述句","唯一的真值"],explanation:"命题必须是陈述句且有唯一真值。",knowledge:"命题逻辑"},
            {type:"fill",question:"公式 $\\lnot(p \\to q)$ 与 $(p \\land \\lnot q) \\lor (p \\lor q)$ 共同的成真赋值为（ ）",answer:["10"],explanation:"两个公式的真值表交集。",knowledge:"命题逻辑"}
        ]
    },
    "predicate": {
        name: "一阶逻辑",
        questions: [
            {type:"single",question:"设 $F(x)$：$x$ 是实数，$G(x)$：$x$ 是有理数。则语句\"并非每个实数都是有理数\"可以符号化为( )",options:["$\\lnot\\forall x(F(x) \\to G(x))$","$\\lnot(F(x) \\to G(x))$","$\\lnot\\forall x(F(x) \\land G(x))$","$\\lnot\\exists x(F(x) \\land G(x))$"],answer:0,explanation:"一阶逻辑中命题符号化的基本形式：全称量词与蕴涵联结词搭配。",knowledge:"一阶逻辑"},
            {type:"single",question:"命题\"存在一些人是大学生或所有的人都是要死的\"的否定是( )。",options:["所有的人都不是大学生，有些人不会死","所有的人不都是大学生，所有人都不会死","存在一些人不是大学生，有些人不会死","所有人都不是大学生，所有人都不会死"],answer:0,explanation:"$A \\lor B$ 的否定是 $\\lnot A \\land \\lnot B$。带量词的命题的否定为：\"$\\forall$ 换为 $\\exists$，$\\exists$ 换为 $\\forall$\"。",knowledge:"一阶逻辑"},
            {type:"single",question:"公式 $\\lnot\\forall x F(x) \\to \\exists x G(x)$ 的类型是( )。",options:["永真式","矛盾式","可满足式"],answer:0,explanation:"永真式。",knowledge:"一阶逻辑"},
            {type:"single",question:"公式 $\\lnot\\exists x(F(x) \\to G(x))$ 的类型是( )。",options:["非永真式的可满足式","矛盾式","永真式"],answer:1,explanation:"$\\exists x(F(x) \\to G(x))$ 永真，其否定永假。",knowledge:"一阶逻辑"},
            {type:"single",question:"公式 $\\exists x F(x) \\to \\forall x F(x)$ 的类型是( )。",options:["非永真式的可满足式","矛盾式","永真式"],answer:0,explanation:"当 $F(x)$ 满足对称性时为真，否则为假。",knowledge:"一阶逻辑"},
            {type:"single",question:"公式 $\\forall x\\forall y(F(x,y) \\to F(y,x))$ 的类型是( )。",options:["非永真式的可满足式","矛盾式","永真式"],answer:0,explanation:"当 $F(x,y)$ 满足对称性时为真，否则为假。",knowledge:"一阶逻辑"},
            {type:"single",question:"公式 $\\lnot\\exists x(F(x) \\to G(x))$ 的类型是( )。",options:["非永真式的可满足式","矛盾式","永真式"],answer:1,explanation:"$\\exists x(F(x) \\to G(x))$ 永真，其否定永假。",knowledge:"一阶逻辑"},
            {type:"single",question:"公式 $(\\forall x F(x) \\to \\forall x G(x)) \\to \\forall x(F(x) \\to G(x))$ 的类型是( )。",options:["永真式","矛盾式","非永真式的可满足式"],answer:2,explanation:"当个体域只有一个元素时是重言式，多个元素时可能为假。",knowledge:"一阶逻辑"},
            {type:"single",question:"公式 $\\exists x F(x) \\to \\exists x G(x)$ 的类型是( )。",options:["非永真式的可满足式","矛盾式","永真式"],answer:0,explanation:"可满足但非永真。",knowledge:"一阶逻辑"},
            {type:"single",question:"公式 $\\exists x F(x) \\to \\exists x(F(x) \\land G(x))$ 的类型是( )。",options:["非永真式的可满足式","矛盾式","永真式"],answer:0,explanation:"可满足但非永真。",knowledge:"一阶逻辑"},
            {type:"single",question:"公式 $(\\forall x F(x) \\to \\forall x G(x)) \\to \\forall x(F(x) \\to G(x))$ 的类型是( )。",options:["非永真式的可满足式","矛盾式","永真式"],answer:2,explanation:"当个体域只有一个元素时是重言式。",knowledge:"一阶逻辑"},
            {type:"fill",question:"若解释的论域仅包含一个元素，则 $\\exists x F(x) \\to \\forall x F(x)$ 的真值为____。",answer:["1"],explanation:"论域只有一个元素时，存在量词和全称量词等价。",knowledge:"一阶逻辑"},
            {type:"fill",question:"命题\"对于任意给定的正实数，都存在比它大的实数\"令 $F(x)$ 为实数，$L(x,y)$：$x > y$，则命题的谓词逻辑符号化为____。",answer:["$\\forall x(F(x) \\land L(x,0) \\to \\exists y(F(y) \\land L(y,x)))$"],explanation:"全称量词与存在量词的组合。",knowledge:"一阶逻辑"},
            {type:"fill",question:"谓词合式公式 $\\forall x F(x) \\to \\exists x G(x)$ 的前束范式为____。",answer:["$\\exists x(\\lnot F(x) \\lor G(x))$"],explanation:"将量词提到公式最前面。",knowledge:"一阶逻辑"},
            {type:"fill",question:"将谓词逻辑中出现的____和____的变元改换为另一变元符号，公式其余的部分不变，这种方法称为换名规则。",answer:["约束变元"],explanation:"换名规则针对约束变元。",knowledge:"一阶逻辑"},
            {type:"fill",question:"公式 $((\\forall x \\lnot G(x) \\land \\exists y F(y)) \\to \\exists y G(y)) \\to \\forall x F(x)$ 的类型为( )。",answer:["永真式"],explanation:"逻辑有效式。",knowledge:"一阶逻辑"}
        ]
    }
};
