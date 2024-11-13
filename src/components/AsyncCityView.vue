<template>
    <div class="wrapper">
        <!-- Banner -->
        <div v-if="route.query.preview" class="preview">
            <p>You are currently previewing this city, click the "+"
                icon to start tracking this city.</p>
        </div>

        <!-- Weather Overview -->
        <div class="overview" v-if="Object.keys(nowWeather).length">
            <h1>
                {{ props.city }}
            </h1>
            <p class="obsTime">
                {{
                    new Date(nowWeather.obsTime).toLocaleDateString('zh-cn', {
                        weekday: 'short',
                        day: '2-digit',
                        month: 'long'
                    })
                }}
            </p>
            <p class="temp">
                {{ nowWeather.temp }}
                <span class="absolute">&deg;</span>
            </p>


            <p class="temp-diff">
                <span class="weather">{{ nowWeather.text }}</span>
                <span>{{ daily[0].tempMax }}&deg;</span>
                <span>&nbsp;/&nbsp;</span>
                <span>{{ daily[0].tempMin }}&deg;</span>
            </p>
            <i :class="`qi-${nowWeather.icon}`" class="weather-icon"></i>
        </div>

        <hr class="line">

        <!-- Hourly Weather -->
        <div class="hourly-weather">
            <div>
                <h2>24小时天气状况</h2>

                <div class="hourly-forecast">
                    <div v-for="forecast in hourly" :key="forecast.fxTime" class="forecast">
                        <p>
                            {{
                                new Date(forecast.fxTime).toLocaleTimeString('zh-cn', {
                                    hour: 'numeric',
                                    hour12: false
                                })
                            }}
                        </p>

                        <i :class="`qi-${forecast.icon}`" class="forecast-weather-icon"></i>

                        <p class="forecast-text">
                            {{ forecast.text }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <hr class="line">

        <!-- Weekly Weather -->
        <div class="weekly-weather">
            <div>
                <h2>近7天天气状况</h2>

                <div v-for="day in daily" :key="day.fxDate" class="day">
                    <p>
                        {{
                            new Date(day.fxDate).toLocaleDateString('zh-cn', {
                                weekday: 'long'
                            })
                        }}
                    </p>

                    <i :class="`qi-${day.iconDay}`" class="day-weather-icon"></i>

                    <div class="wind-dir-day">{{ day.windDirDay }}</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script name="AsyncCityView" lang="ts" setup>
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps<{
    city: string,
    id: string
}>()


const qWeatherApiKey: string = '8dbbe7b1dedf40bab69cd05d3425b806'

const getNowWeather = async () => {
    try {
        const nowWeatherData = await axios.get('https://devapi.qweather.com/v7/weather/now', {
            params: {
                location: props.id,
                key: qWeatherApiKey
            }
        })

        return nowWeatherData.data
    } catch (error) {
        throw error
    }
}

const {
    now: nowWeather = {}
} = await getNowWeather()

const getHourlyData = async () => {
    try {
        const hourlyData = await axios.get('https://devapi.qweather.com/v7/weather/24h', {
            params: {
                location: props.id,
                key: qWeatherApiKey
            }
        })

        return hourlyData.data
    } catch (error) {
        throw error
    }
}

const {
    hourly = []
} = await getHourlyData()

const getDailyData = async () => {
    try {
        const dailyData = await axios.get('https://devapi.qweather.com/v7/weather/7d', {
            params: {
                location: props.id,
                key: qWeatherApiKey
            }
        })

        return dailyData.data
    } catch (error) {
        throw error
    }
}

const {
    daily = []
} = await getDailyData()

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
    font-size: 1.5rem;
    line-height: 2rem;
}

.obsTime {
    margin-bottom: 3rem;
    font-size: 0.75rem;
    line-height: 1rem;
}

.temp {
    margin-bottom: 2rem;
    font-size: 6rem;
    line-height: 1;
}

.temp-diff {
    display: flex;
    align-items: center;
}

.temp-diff .weather {
    margin-right: 0.5rem;
}

.line {
    box-sizing: border-box;
    margin: 0;
    border-color: rgba(255, 255, 255, 0.7);
    width: 100%;
    border-width: 1px;
}

.hourly-weather,
.weekly-weather {
    max-width: 768px;
    width: 100%;
    padding: 3rem 0;
}

.hourly-weather>div:first-child,
.weekly-weather>div:first-child {
    color: white;
    margin: 0 2rem;
}

.hourly-weather>div:first-child>h2,
.weekly-weather>div:first-child>h2 {
    margin-bottom: 1rem;
    font-size: 0.75rem;
    line-height: 1rem;
}

.hourly-forecast {
    display: flex;
    overflow-x: scroll;
    gap: 2.5rem;
}

.hourly-forecast::-webkit-scrollbar {
    display: none;
}

.forecast {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.forecast>p {
    white-space: nowrap;
    font-size: 0.75rem;
    line-height: 1rem;
}

.forecast-weather-icon,
.day-weather-icon {
    display: flex;
    align-items: center;
    width: auto;
    object-fit: cover;
    height: 50px;
    font-size: 24px;
}

.forecast-text {
    font-size: 1.25rem;
    line-height: 1.75rem;
}

.day {
    display: flex;
    align-items: center;
}

.day>p {
    flex: 1 1 0%;
}

.wind-dir-day {
    display: flex;
    justify-content: end;
    flex: 1 1 0%;
    gap: 0.5rem;
}

.weather-icon {
    font-size: 4rem;
    margin-top: 2rem;
}
</style>