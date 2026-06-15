// 离散数学题库
const dmQuestions = {
    "proposition": {
        name: "命题逻辑",
        questions: [
            {
                type: "single",
                question: "设 $p=1$ 是素数，$q$：南京在北京的北边，$r$：苹果树是落叶乔木。则下列复合命题的真值为假的是( )。",
                options: ["$\\lnot(p \\land q \\land \\lnot r)$", "$(\\lnot p \\land q) \\to (p \\leftrightarrow r)$", "$(p \\leftrightarrow q) \\lor (\\lnot p \\leftrightarrow \\lnot q)$", "$\\lnot p \\lor q \\to \\lnot r$"],
                answer: 3,
                explanation: "将 $p,q,r$ 的真值代入各公式得其真值。",
                knowledge: "命题逻辑"
            },
            {
                type: "single",
                question: "下列中是公式 $(p \\to q) \\to q$ 的成假赋值为( )。",
                options: ["011", "000", "001", "111"],
                answer: 0,
                explanation: "方法一：观察法——只有前件为真、后件为假时蕴涵式为假；方法二：真值表法。",
                knowledge: "命题逻辑"
            },
            {
                type: "single",
                question: "下列公式为矛盾式的是( )。",
                options: ["$((p \\to q) \\to (\\lnot q \\to \\lnot p)) \\lor r$", "$p \\land r \\land \\lnot(q \\to p)$", "$(p \\to q) \\leftrightarrow (p \\to r)$", "$(\\lnot p \\land q) \\to \\lnot r$"],
                answer: 1,
                explanation: "方法一：观察法；方法二：真值表法。",
                knowledge: "命题逻辑"
            },
            {
                type: "single",
                question: "下列语句中，( )是命题。",
                options: ["下午有会吗？", "2是常数。", "这朵花多好看呀！", "请把门关上。"],
                answer: 1,
                explanation: "命题是能判断真假的陈述句。",
                knowledge: "命题逻辑"
            },
            {
                type: "single",
                question: "下列句子为命题的是( )",
                options: ["全体起立!", "$x = 0$", "我在说谎。", "张三生于1886年的春天。"],
                answer: 3,
                explanation: "命题是能判断真假的陈述句。",
                knowledge: "命题逻辑"
            }
        ]
    },
    "predicate": {
        name: "一阶逻辑",
        questions: [
            {
                type: "single",
                question: "设 $F(x)$：$x$ 是实数，$G(x)$：$x$ 是有理数。则语句\"并非每个实数都是有理数\"可以符号化为( )",
                options: ["$\\lnot\\forall x(F(x) \\to G(x))$", "$\\lnot(F(x) \\to G(x))$", "$\\lnot\\forall x(F(x) \\land G(x))$", "$\\lnot\\exists x(F(x) \\land G(x))$"],
                answer: 0,
                explanation: "一阶逻辑中命题符号化的基本形式：全称量词与蕴涵联结词搭配。",
                knowledge: "一阶逻辑"
            },
            {
                type: "single",
                question: "命题\"存在一些人是大学生或所有的人都是要死的\"的否定是( )。",
                options: ["所有的人都不是大学生，有些人不会死", "所有的人不都是大学生，所有人都不会死", "存在一些人不是大学生，有些人不会死", "所有人都不是大学生，所有人都不会死"],
                answer: 0,
                explanation: "$A \\lor B$ 的否定是 $\\lnot A \\land \\lnot B$。带量词的命题的否定为：\"$\\forall$ 换为 $\\exists$，$\\exists$ 换为 $\\forall$\"。",
                knowledge: "一阶逻辑"
            },
            {
                type: "single",
                question: "公式 $\\lnot\\forall x F(x) \\to \\exists x G(x)$ 的类型是( )。",
                options: ["永真式", "矛盾式", "可满足式"],
                answer: 0,
                explanation: "永真式。",
                knowledge: "一阶逻辑"
            },
            {
                type: "single",
                question: "公式 $\\exists x F(x) \\to \\forall x F(x)$ 的类型是( )。",
                options: ["非永真式的可满足式", "矛盾式", "永真式"],
                answer: 0,
                explanation: "当 $F(x)$ 满足对称性时，如 $F(x,y)$：$x=y$，公式为真。当 $F(x,y)$ 不满足对称性时，如 $F(x,y)$：$x>y$，公式为假。",
                knowledge: "一阶逻辑"
            }
        ]
    }
};
