<template>
  <el-checkbox-group v-model="value">
    <el-checkbox
      v-for="prefecture in prefectures"
      :key="prefecture.prefCode"
      :label="prefecture.prefCode"
    >{{prefecture.prefName}}</el-checkbox>
  </el-checkbox-group>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator";

@Component
export default class PrefecturesCheckBox extends Vue {
  @Prop({ required: true })
  prefectures!: Array<object>;

  @Prop({ required: true })
  value!: Array<string>;

  @Watch("value", { deep: true })
  @Emit("input")
  checked() {
    return this.value;
  }
}
</script>
