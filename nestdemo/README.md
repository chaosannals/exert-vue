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
# Linux 下字符串转义和 Windows 有区别

# 登录请求
# 返回结果里有 jwt token： {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTY5ODI5ODMyMywiZXhwIjoxNjk4Mjk4MzgzfQ.2QpJ0P8YDdhA9pUFTTB_mgDjVzbOhmlq73f09XGqR_U"}
curl -X POST http://localhost:3001/auth/login -d '{"username": "admin", "password": "123456"}' -H "Content-Type: application/json"


# 调用需要 jwt 验证的接口时带上头
curl http://localhost:3001/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTY5ODI5ODMyMywiZXhwIjoxNjk4Mjk4MzgzfQ.2QpJ0P8YDdhA9pUFTTB_mgDjVzbOhmlq73f09XGqR_U"
```

```bat
@rem Windows 下字符串转义和 linux 有区别

@rem 登录请求
curl -X POST "http://localhost:3001/auth/login" -d "{\"username\": \"admin\", \"password\": \"123456\"}" -H "Content-Type: application/json"

@rem 调用需要 jwt 验证的接口时带上头
curl "http://localhost:3001/profile" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTY5ODI5ODMyMywiZXhwIjoxNjk4Mjk4MzgzfQ.2QpJ0P8YDdhA9pUFTTB_mgDjVzbOhmlq73f09XGqR_U"
```

注：  tauridemo 项目是前端示例。

## GRPC

示例需要手动写 interfaces 里面 message 和 controller 里 Service 的类型声明，很不方便。不如谷歌的 grpc 自动生成声明.d.ts 文件，自动生成可以减少出错，同时维护 2 个对应结构也很麻烦。
ts 的声明 interface HeroService 如果和 proto 的声明不一致（只是少了函数），还会报没有 HeroService 类，
这样就很不方便，这种类型应该通过 proto 直接生成的。

## 示例依赖服务

```bash
#  安装 Mysql 密码 123456 默认创建 demo 库
docker run -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=demo -p 3306:3306  -m 4000M --restart=always --name=mysql -d mysql:8.0.32


# 安装 Redis
docker run -p 6379:6379  -m 1000M --restart=always --name=redis-server -d redis:7.2.2-alpine
```