<template>
  <div class="grpc-protobuf-page">
    <p>示例后端在 nestdemo 需要提前打开</p>
    <p>protobuf.js 没有 service 的能力，需要引入 grpc 实现。</p>
  </div>
</template>

<script setup>
// 老库，示例用的这个，现在推荐 @grpc/grpc-js
import grpc from 'grpc';
import hero from '../../protos/hero';
import { onBeforeMount } from 'vue';


onBeforeMount(() => {
  // 这是个 node 下的 grpc 客户端，会引入 nodejs 库，不可以在 浏览器 使用。
  const Client = grpc.makeGenericClientConstructor(
    {
      // 此处要写入服务的声明， protobuf.js 是第三方的， grpc 是谷歌的，这样2中格式要手动维护关联很不方便，此种方案不可取。
    }
  );
  const client = new Client(
    "http://127.0.0.1:3001",
    grpc.credentials.createInsecure()
  );

  const rpcImpl = function (method, requestData, callback) {
    client.makeUnaryRequest(
      method.name,
      arg => arg,
      arg => arg,
      requestData,
      callback
    )
  };

  const service = hero.HeroService.create(rpcImpl, false, false);
  service.findOne({ id: 1 }, (err, response) => {
    console.log("response", err, response);
  });
});

</script>

<style scoped lang="scss"></style>