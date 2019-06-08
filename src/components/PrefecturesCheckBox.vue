<template>
  <el-checkbox-group v-model="checkedList" @change="check">
    <el-checkbox
      v-for="prefecture in prefectures"
      :key="prefecture.prefCode"
      :label="prefecture.prefCode"
    >{{prefecture.prefName}}</el-checkbox>
  </el-checkbox-group>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class PrefecturesCheckBox extends Vue {
  @Prop({ required: true })
  prefectures!: Array<{ prefCode: number; prefName: string }>;

  checkedList: Array<number> = [];

  @Emit("check")
  check() {}
}
</script>

<style scoped lang="scss">
.el-checkbox-group {
  margin-bottom: 20px;
  .el-checkbox {
    margin-right: 10px;
    /deep/ .el-checkbox__label {
      width: 60px;
    }
  }
}
</style>
