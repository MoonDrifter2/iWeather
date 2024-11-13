<template>
    <div>
        <Suspense>
            <AsyncCityView :city="city">
                <template #fallback>
                    <p>Loading...</p>
                </template>
            </AsyncCityView>
        </Suspense>
    </div>
</template>

<script lang="ts" setup>
import AsyncCityView from '@/components/AsyncCityView.vue'

import { Suspense } from 'vue'

defineProps<{
    city: string
}>()
</script>

<style scoped></style>