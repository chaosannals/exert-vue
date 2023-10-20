# nest 生成项目扩展 grpc 

示例需要手动写 interfaces 里面 message 和 controller 里 Service 的类型声明，很不方便。不如谷歌的 grpc 自动生成声明.d.ts 文件，自动生成可以减少出错，同时维护 2 个对应结构也很麻烦。
ts 的声明 interface HeroService 如果和 proto 的声明不一致（只是少了函数），还会报没有 HeroService 类，
这样就很不方便，这种类型应该通过 proto 直接生成的。
