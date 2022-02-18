(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{576:function(s,a,n){"use strict";n.r(a);var r=n(17),t=Object(r.a)({},(function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h2",{attrs:{id:"你还在用分页-试试-mybatis-流式查询-真心强大"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#你还在用分页-试试-mybatis-流式查询-真心强大"}},[s._v("#")]),s._v(" 你还在用分页？试试 MyBatis 流式查询，真心强大！")]),s._v(" "),n("p",[s._v("[全栈进阶指南](javascript:void(0)😉 "),n("em",[s._v("昨天")])]),s._v(" "),n("p",[n("strong",[s._v("基本概念")])]),s._v(" "),n("p",[s._v("流式查询 指的是查询成功后不是返回一个集合而是返回一个迭代器，应用每次从迭代器取一条查询结果。流式查询的好处是能够降低内存使用。")]),s._v(" "),n("p",[s._v("如果没有流式查询，我们想要从数据库取 1000 万条记录而又没有足够的内存时，就不得不分页查询，而分页查询效率取决于表设计，如果设计的不好，就无法执行高效的分页查询。因此流式查询是一个数据库访问框架必须具备的功能。")]),s._v(" "),n("p",[s._v("流式查询的过程当中，数据库连接是保持打开状态的，因此要注意的是：执行一个流式查询后，数据库访问框架就不负责关闭数据库连接了，需要应用在取完数据后自己关闭。")]),s._v(" "),n("h1",{attrs:{id:"mybatis-流式查询接口"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#mybatis-流式查询接口"}},[s._v("#")]),s._v(" MyBatis 流式查询接口")]),s._v(" "),n("p",[s._v("MyBatis 提供了一个叫 "),n("code",[s._v("org.apache.ibatis.cursor.Cursor")]),s._v(" 的接口类用于流式查询，这个接口继承了 "),n("code",[s._v("java.io.Closeable")]),s._v(" 和 "),n("code",[s._v("java.lang.Iterable")]),s._v(" 接口，由此可知：")]),s._v(" "),n("ol",[n("li",[s._v("Cursor 是可关闭的；")]),s._v(" "),n("li",[s._v("Cursor 是可遍历的。")])]),s._v(" "),n("p",[s._v("除此之外，Cursor 还提供了三个方法：")]),s._v(" "),n("ol",[n("li",[n("code",[s._v("isOpen()")]),s._v("：用于在取数据之前判断 Cursor 对象是否是打开状态。只有当打开时 Cursor 才能取数据；")]),s._v(" "),n("li",[n("code",[s._v("isConsumed()")]),s._v("：用于判断查询结果是否全部取完。")]),s._v(" "),n("li",[n("code",[s._v("getCurrentIndex()")]),s._v("：返回已经获取了多少条数据")])]),s._v(" "),n("p",[s._v("因为 Cursor 实现了迭代器接口，因此在实际使用当中，从 Cursor 取数据非常简单：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("cursor.forEach(rowObject -> {...});\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("h1",{attrs:{id:"但构建-cursor-的过程不简单"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#但构建-cursor-的过程不简单"}},[s._v("#")]),s._v(" 但构建 Cursor 的过程不简单")]),s._v(" "),n("p",[s._v("我们举个实际例子。下面是一个 Mapper 类：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('@Mapper\npublic interface FooMapper {\n    @Select("select * from foo limit #{limit}")\n    Cursor<Foo> scan(@Param("limit") int limit);\n}\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br")])]),n("p",[s._v("方法 scan() 是一个非常简单的查询。通过指定 Mapper 方法的返回值为 Cursor 类型，MyBatis 就知道这个查询方法一个流式查询。")]),s._v(" "),n("p",[s._v("然后我们再写一个 SpringMVC Controller 方法来调用 Mapper（无关的代码已经省略）：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('@GetMapping("foo/scan/0/{limit}")\npublic void scanFoo0(@PathVariable("limit") int limit) throws Exception {\n    try (Cursor<Foo> cursor = fooMapper.scan(limit)) {  // 1\n        cursor.forEach(foo -> {});                      // 2\n    }\n}\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br")])]),n("p",[s._v("上面的代码中，fooMapper 是 @Autowired 进来的。注释 1 处调用 scan 方法，得到 Cursor 对象并保证它能最后关闭；2 处则是从 cursor 中取数据。")]),s._v(" "),n("p",[s._v("上面的代码看上去没什么问题，但是执行 scanFoo0() 时会报错：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("java.lang.IllegalStateException: A Cursor is already closed.\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("这是因为我们前面说了在取数据的过程中需要保持数据库连接，而 Mapper 方法通常在执行完后连接就关闭了，因此 Cusor 也一并关闭了。")]),s._v(" "),n("p",[s._v("所以，解决这个问题的思路不复杂，保持数据库连接打开即可。我们至少有三种方案可选。")]),s._v(" "),n("h2",{attrs:{id:"方案一-sqlsessionfactory"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#方案一-sqlsessionfactory"}},[s._v("#")]),s._v(" 方案一：SqlSessionFactory")]),s._v(" "),n("p",[s._v("我们可以用 SqlSessionFactory 来手工打开数据库连接，将 Controller 方法修改如下：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('@GetMapping("foo/scan/1/{limit}")\npublic void scanFoo1(@PathVariable("limit") int limit) throws Exception {\n    try (\n        SqlSession sqlSession = sqlSessionFactory.openSession();  // 1\n        Cursor<Foo> cursor =\n              sqlSession.getMapper(FooMapper.class).scan(limit)   // 2\n    ) {\n        cursor.forEach(foo -> { });\n    }\n}\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br")])]),n("p",[s._v("上面的代码中，1 处我们开启了一个 SqlSession （实际上也代表了一个数据库连接），并保证它最后能关闭；2 处我们使用 SqlSession 来获得 Mapper 对象。这样才能保证得到的 Cursor 对象是打开状态的。")]),s._v(" "),n("h2",{attrs:{id:"方案二-transactiontemplate"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#方案二-transactiontemplate"}},[s._v("#")]),s._v(" 方案二：TransactionTemplate")]),s._v(" "),n("p",[s._v("在 Spring 中，我们可以用 TransactionTemplate 来执行一个数据库事务，这个过程中数据库连接同样是打开的。代码如下：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('@GetMapping("foo/scan/2/{limit}")\npublic void scanFoo2(@PathVariable("limit") int limit) throws Exception {\n    TransactionTemplate transactionTemplate =\n            new TransactionTemplate(transactionManager);  // 1\n\n    transactionTemplate.execute(status -> {               // 2\n        try (Cursor<Foo> cursor = fooMapper.scan(limit)) {\n            cursor.forEach(foo -> { });\n        } catch (IOException e) {\n            e.printStackTrace();\n        }\n        return null;\n    });\n}\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br")])]),n("p",[s._v("上面的代码中，1 处我们创建了一个 TransactionTemplate 对象（此处 transactionManager 是怎么来的不用多解释，本文假设读者对 Spring 数据库事务的使用比较熟悉了），2 处执行数据库事务，而数据库事务的内容则是调用 Mapper 对象的流式查询。注意这里的 Mapper 对象无需通过 SqlSession 创建。")]),s._v(" "),n("h2",{attrs:{id:"方案三-transactional-注解"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#方案三-transactional-注解"}},[s._v("#")]),s._v(" 方案三：@Transactional 注解")]),s._v(" "),n("p",[s._v("这个本质上和方案二一样，代码如下：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('@GetMapping("foo/scan/3/{limit}")\n@Transactional\npublic void scanFoo3(@PathVariable("limit") int limit) throws Exception {\n    try (Cursor<Foo> cursor = fooMapper.scan(limit)) {\n        cursor.forEach(foo -> { });\n    }\n}\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br")])]),n("p",[s._v("它仅仅是在原来方法上面加了个 "),n("code",[s._v("@Transactional")]),s._v(" 注解。这个方案看上去最简洁，但请注意 Spring 框架当中注解使用的坑：只在外部调用时生效 。在当前类中调用这个方法，依旧会报错。")]),s._v(" "),n("p",[s._v("以上是三种实现 MyBatis 流式查询的方法。")])])}),[],!1,null,null,null);a.default=t.exports}}]);