<template>
    <div class="wrapper">
        <!-- Banner -->
        <div v-if="route.query.preview" class="preview">
            <p>You are currently previewing this city, click the "+"
                icon to start tracking this city.</p>
        </div>

        <!-- Weather Overview -->
        <div class="overview" v-if="lives.length && forecasts.length">
            <h1>
                {{ lives[0].city }}
            </h1>
            <p class="reporttime">
                {{
                    new Date(lives[0].reporttime).toLocaleDateString('zh-cn', {
                        weekday: 'short',
                        day: '2-digit',
                        month: 'long'
                    })
                }}
            </p>
            <p class="temperature">
                {{ lives[0].temperature }}
                <span class="absolute">&deg;</span>
            </p>


            <p class="temperature-difference">
                <span class="weather">{{ lives[0].weather }}</span>
                <span>{{ forecasts[0].casts[0].daytemp }}&deg;</span>
                <span>/</span>
                <span>{{ forecasts[0].casts[0].nighttemp }}&deg;</span>
            </p>
        </div>

        <hr class="line">

        <!-- Day Weather -->
        <div class="day-weather">
            <div>
                <h2>近4日天气状况</h2>
            </div>

        </div>
    </div>
</template>

<script name="AsyncCityView" lang="ts" setup>
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps<{
    city: string
}>()

const amapApiKey: string = '5b216a847beee5a9e51ca7c6ccc76ea1'

const getLivesData = async () => {
    try {
        const livesData = await axios.get('https://restapi.amap.com/v3/weather/weatherInfo', {
            params: {
                key: amapApiKey,
                city: props.city
            }
        })

        return livesData.data
    } catch (error) {
        throw error
    }
}

const {
    lives = []
} = await getLivesData()

const getForecastData = async () => {
    try {
        const forecastData = await axios.get('https://restapi.amap.com/v3/weather/weatherInfo', {
            params: {
                key: amapApiKey,
                city: props.city,
                extensions: 'all'
            }
        })

        return forecastData.data
    } catch (error) {
        throw error
    }
}

const {
    forecasts = []
} = await getForecastData()

</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1 0%;
}

.preview {
    box-sizing: border-box;
    color: white;
    background-color: #32325A;
    text-align: center;
    width: 100%;
    padding: 1rem;
}

.overview {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding: 3rem 0;
}

.overview>h1 {
    margin-bottom: 0.5rem;
    font-size: 2.25rem;
    line-height: 2.5rem;
}

.reporttime {
    margin-bottom: 3rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
}

.temperature {
    margin-bottom: 2rem;
    font-size: 6rem;
    line-height: 1;
}

.temperature-difference {
    display: flex;
    align-items: center;
}

.temperature-difference .weather {
    margin-right: 0.5rem;
}

.line {
    box-sizing: border-box;
    margin: 0;
    border-color: rgba(255, 255, 255, 0.7);
    width: 100%;
    border-width: 1px;
}

.day-weather {
    max-width: 768px;
    width: 100%;
    padding: 3rem 0;
}

.day-weather>div:first-child {
    color: white;
    margin: 0 2rem;
}

.day-weather>div:first-child>h2 {
    margin-bottom: 1rem;
    font-size: 0.75rem;
}
</style>