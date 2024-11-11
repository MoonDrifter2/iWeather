<template>
    <Teleport to="body">
        <Transition name="modal-outer">
            <!-- 模态包装器动画 -->
            <div class="wrapper" v-show="modalActive">
                <!-- 模态窗内容动画 -->

                <Transition name="modal-inner">
                    <div class="content" v-if="modalActive">
                        <slot></slot>

                        <button class="close" @click="emits('close')">Close</button>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
// defineProps(['modalActive'])

// defineProps({ // 运行时声明
//     modalActive: {
//         type: Boolean,
//         default: false
//     }
// })

defineProps<{ // 类型声明 静态分析会自动生成等效的运行时声明
    modalActive: boolean // 推导对应运行时验证 modalActive: Boolean
}>()

// const emits: Function = defineEmits(['close'])

// const emits: Function = defineEmits<{
//     (evt: 'close'): void
// }>()

const emits: Function = defineEmits<{
    close: []
}>()
</script>

<style scoped>
.wrapper {
    position: absolute;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    padding: 0 2rem;
}

.content {
    align-self: flex-start;
    background-color: white;
    max-width: 768px;
    margin-top: 8rem;
    padding: 1rem;
}

.close {
    background-color: #E66EAA;
    color: white;
    border: unset;
    margin-top: 2rem;
    padding: 0.5rem 1.5rem;
}

.modal-outer-enter-active,
.modal-outer-leace-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
    opacity: 0;
}

.modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-inner-leave-to {
    transform: scale(0.8);
}
</style>