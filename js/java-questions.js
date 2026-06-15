// Java题库
const javaQuestions = {
    "thread": {
        name: "线程",
        questions: [
            {
                type: "fill",
                question: "Thread类位于 __________ 包下。",
                answer: ["java.lang"],
                explanation: "Thread类属于java.lang包。",
                knowledge: "线程"
            },
            {
                type: "fill",
                question: "用Object类中的 __________ 和 __________ 方法,和synchronized关键字联合使用可以实现线程的同步。",
                answer: ["wait", "notify"],
                explanation: "wait()和notify()方法用于线程间通信。",
                knowledge: "线程同步"
            },
            {
                type: "single",
                question: "Thread类位于下列哪个包中？",
                options: ["java.io", "java.lang", "java.util", "java.awt"],
                answer: 1,
                explanation: "Thread类属于java.lang包。",
                knowledge: "线程"
            },
            {
                type: "single",
                question: "线程调用sleep()方法后，该线程将进入以下哪种状态？",
                options: ["就绪状态", "运行状态", "阻塞状态", "死亡状态"],
                answer: 2,
                explanation: "sleep()方法使线程进入阻塞状态。",
                knowledge: "线程"
            },
            {
                type: "single",
                question: "在以下哪种情况下，线程进入就绪状态？",
                options: ["线程调用了sleep()方法时", "线程调用了join()方法", "线程调用了yield()方法时", "线程调用了notify()方法"],
                answer: 2,
                explanation: "yield()方法使线程回到就绪状态。",
                knowledge: "线程"
            }
        ]
    },
    "io": {
        name: "IO流",
        questions: [
            {
                type: "fill",
                question: "JDK中与输入输出相关的包和类都集中存放在java.io包中,其中最重要的4个抽象类: __________ 、 __________ 、 __________ 和 __________ 。",
                answer: ["InputStream", "OutputStream", "Reader", "Writer"],
                explanation: "Java IO的四个核心抽象类。",
                knowledge: "IO流"
            },
            {
                type: "fill",
                question: "将字节流转换为字符流的桥梁类是 __________。",
                answer: ["InputStreamReader"],
                explanation: "InputStreamReader是字节流到字符流的桥梁。",
                knowledge: "IO流"
            },
            {
                type: "fill",
                question: "Java 对象序列化需要实现 __________ 接口。",
                answer: ["Serializable"],
                explanation: "Serializable接口用于对象序列化。",
                knowledge: "IO流"
            }
        ]
    }
};
