# nest 生成项目扩展 grpc 

```bash
# 安装工具
npm i -g @nestjs/cli

# 创建新项目
nest new project-name
```

```bash
# 以下过程 nest-cli 都会根据目录去查找他认为的上级，往上级模块文件写入配置代码。

# 创建模块 AnimalModule 到 src/api(src/api/animal) 目录下
nest g mo animal /api

# 创建控制器 AnimalController 到 src/api(src/api/animal) 目录下
nest g co animal /api

# 创建服务 AnimalService 到 src/api(src/api/animal) 目录下
nest g s animal /api

# 创建 animal 子控制器 CatController 和子服务 CatService
nest g co cat /api/animal
nest g s cat /api/animal
```

## 登录

```bash
# 登录请求
# Linux 下字符串转义和 Windows 有区别
curl -X POST http://localhost:3001/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
```

```bat
@rem 登录请求
@rem Windows 下字符串转义和 linux 有区别
curl -X POST "http://localhost:3001/auth/login" -d "{\"username\": \"john\", \"password\": \"changeme\"}" -H "Content-Type: application/json"
```

## GRPC

示例需要手动写 interfaces 里面 message 和 controller 里 Service 的类型声明，很不方便。不如谷歌的 grpc 自动生成声明.d.ts 文件，自动生成可以减少出错，同时维护 2 个对应结构也很麻烦。
ts 的声明 interface HeroService 如果和 proto 的声明不一致（只是少了函数），还会报没有 HeroService 类，
这样就很不方便，这种类型应该通过 proto 直接生成的。
