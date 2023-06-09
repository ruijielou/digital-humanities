<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
    reviewUrl: string;
    fileName?: string;
}>();

const loading = ref<boolean>(false);
const visible = ref<boolean>(false);

const showModal = () => {
    visible.value = true;
};
const handleOk = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
        visible.value = false;
    }, 2000);
};
defineExpose({ showModal });
</script>

<template>
    <a-modal :footer="null" v-model:visible="visible" width="100%" wrap-class-name="full-modal" title="查看文件" @ok="handleOk">
        <iframe v-if="visible" :src="props.reviewUrl" title='预览' width='100%' height='100%'></iframe>
    </a-modal>
</template>
<style lang="less">
.full-modal {
    .ant-modal {
        max-width: 100%;
        top: 0;
        padding-bottom: 0;
        margin: 0;
    }

    .ant-modal-content {
        display: flex;
        flex-direction: column;
        height: calc(100vh);
    }

    .ant-modal-body {
        flex: 1;
    }
}
</style>