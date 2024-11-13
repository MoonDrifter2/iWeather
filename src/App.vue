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
h1,
p {
	margin: 0;
}

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

.absolute {
	position: absolute;
}

.app {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

.container {
	box-sizing: border-box;
	margin: 0 auto;
	padding: 2rem;
	width: 100%;
}

@media (min-width: 640px) {
	.container {
		max-width: 640px;
	}
}

@media (min-width: 768px) {
	.container {
		max-width: 768px;
	}
}

@media (min-width: 1024px) {
	.container {
		max-width: 1024px;
	}
}

@media (min-width: 1280px) {
	.container {
		max-width: 1280px;
	}
}

@media (min-width: 1536px) {
	.container {
		max-width: 1536px;
	}
}
</style>