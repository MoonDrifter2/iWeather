<template>
    <main class="container main">
        <div>
            <input v-model="searchQuery" class="search" type="text" placeholder="Search for a city or state"
                @input="getSearchResults">

            <ul class="result" v-show="searchQuery">
                <p v-if="searchError">
                    Sorry, something went wrong, please try again.
                </p>

                <p v-else-if="!searchError && qWeatherCitySearchResults && qWeatherCitySearchResults.length === 0">
                    No result match your query, try a different term.
                </p>

                <template v-else>
                    <li v-for="searchresult in qWeatherCitySearchResults" :key="searchresult.adcode"
                        @click="previewCity(searchresult)">
                        {{ searchresult.name }}
                    </li>
                </template>
            </ul>
        </div>
    </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import axios from 'axios'

const qWeatherApiKey: string = '8dbbe7b1dedf40bab69cd05d3425b806'

const router = useRouter()

const searchQuery = ref<string>('')
const qWeatherCitySearchResults = ref<Array<{ [key: string]: any }> | null>(null)
const searchError = ref<boolean>(false)

let queryTimeout: number

const getSearchResults = (): void => {
    clearTimeout(queryTimeout)
    queryTimeout = setTimeout(async () => {
        if (searchQuery.value !== '') {

            try {
                const { data: {
                    location = []
                } } = await axios.get('https://geoapi.qweather.com/v2/city/lookup', {
                    params: {
                        location: searchQuery.value,
                        key: qWeatherApiKey
                    }
                })

                qWeatherCitySearchResults.value = location
            } catch {
                searchError.value = true
            }

            return
        }

        qWeatherCitySearchResults.value = null
    }, 300)
}

const previewCity = (searchResult: { [key: string]: any }): void => {
    const { name: city, id } = searchResult

    router.push({
        name: 'city',
        params: {
            city,
            id
        },
        query: {
            preview: true
        }
    })
}
</script>

<style scoped>
.main {
    color: white;
}

.main>div {
    position: relative;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
}

.search {
    background-color: transparent;
    border-color: #32325A;
    cursor: pointer;
    width: 100%;
    padding: 0.5rem 0.25rem;
    border-width: 0;
    border-bottom-width: 1px;
}

.search:focus {
    border-color: white;
    outline: 2px solid transparent;
    box-shadow: 0 1px 0 0 #E5E7ED;
    outline-offset: 2px;
}

ul.result {
    position: absolute;
    list-style: none;
    background-color: #32325A;
    color: white;
    top: 36px;
    width: 100%;
    padding: 0.5rem 0.25rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

ul.result>li {
    padding: 0.5rem 0;
    cursor: pointer;
}
</style>