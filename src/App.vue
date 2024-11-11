<template>
	<div class="app roboto bg-color-primary">
		<WeatherNavigation />
		<RouterView />
	</div>
</template>

<script name="App" lang="ts" setup>
import WeatherNavigation from '@/components/WeatherNavigation.vue'

import { RouterView } from 'vue-router'

</script>

<style>
.roboto {
	font-family: Roboto, sans-serif;
}

.ft-color-primary {
	color: #E66EAA;
}

.ft-color-secondary {
	color: #32325A;
}

.bg-color-primary {
	background-color: #E66EAA;
}

.transition {
	transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 150ms;
}

.app {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}
</style>