<template>
    <header>
        <nav class="container">
            <RouterLink :to="{ name: 'home' }">
                <div class="brand">
                    <i class="fa-sharp fa-solid fa-sun"></i>
                    <p class="text-2xl">The Local Weather</p>
                </div>
            </RouterLink>

            <div class="options">
                <i class="fa-sharp fa-solid fa-circle-info icon transition" @click="toggleModal"></i>
                <i class="fa-regular fa-plus icon transition"></i>
            </div>

            <BaseModal :modalActive="modalActive" @close="toggleModal">
                <div class="main">
                    <h1 class="about text-2xl">About:</h1>
                    <p class="mb-4">
                        The Local Weather allows you to track the current and
                        future weather of cities of your choosing.
                    </p>
                    <h2 class="text-2xl">How it works:</h2>
                    <ol class="list mb-4">
                        <li v-for="item of HowItWorks">
                            {{ item }}
                        </li>
                    </ol>

                    <h2 class="text-2xl">Removing a city</h2>
                    <p>
                        If you no longer wish to track a city, simply select
                        the city within the home page. At the bottom of the
                        page, there will be am option to delete the city.
                    </p>
                </div>
            </BaseModal>
        </nav>
    </header>
</template>

<script name="WeatherNavigation" lang="ts" setup>
import BaseModal from '@/components/BaseModal.vue'

import { RouterLink } from 'vue-router'
import { markRaw, ref } from 'vue'

const HowItWorks = markRaw<string[]>([
    'Search for your city by entering the name into the search bar.',
    'Select a city within the results, this will take you to the current weather for your selection.',
    'Track the city by clicking on the "+" icon in the top right. This will save the city to view at a later time on the home page.'
])

const modalActive = ref<boolean>(false)
const toggleModal = (): void => {
    modalActive.value = !modalActive.value
}
</script>

<style scoped>
header {
    position: sticky;
    top: 0;
    background-color: #E66EAA;

    /* 多个阴影 */
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #32325A;
    padding: 1.5rem 0;
    gap: 1rem;
}

nav a {
    text-decoration: none;
    color: inherit;
}

.brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
}

.options {
    display: flex;
    justify-content: end;
    gap: 0.75rem;
    flex: 1 1 0%;
}

.options .icon {
    font-size: 1.25rem;
    line-height: 1.75rem;
}

.options .icon:hover {
    color: #32325A;
    cursor: pointer;
}

.main {
    color: black;
}

.about {
    margin-bottom: 0.25rem;
}

.mb-4 {
    margin-bottom: 1rem;
}

.list {
    list-style-position: inside;
    list-style-type: decimal;
    padding-left: 0px;
}

@media (min-width: 640px) {
    nav {
        flex-direction: row;
    }
}
</style>