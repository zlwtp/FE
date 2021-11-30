<template>
    <transition 
        :enter-active-class="s['transition-enter-active']"
        :leave-active-class="s['transition-leave-active']"
    >
        <div :class="s.app" v-if="visible" :style="style" @click="$ctx.screen.unlock()">
            <div :class="s.content">
                <div :class="s.hour">{{date | date('HH:mm')}}</div>
                <div>
                    <span :class="s.date">{{new Date() | date('YYYY年MM月DD日')}}</span>
                    <span :class="s.week">{{new Date() | week }}</span>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    data() {
        return {
            date: '',
            timer: null,
            img: '',
            visible: false
        }
    },
    computed: {
        style() {
            if (this.img) {
                return {
                    'background-image': `url(${this.img})`
                }
            }
        }
    },
    watch: {
        visible(val) {
            if (val) {
                this.runTimer()
            } else {
                window.clearInterval(this.timer)
            }
        }
    },
    filters: {
        week() {
            let moment = Vue.$ctx.util.moment().locale('zh-cn')
            let week = moment.days()
            return ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'][week - 1]
        },
        date(val, format) {
            return Vue.$ctx.util.formatDate(val, format) || val
        }
    },
    methods: {
        show(img) {
            this.img = img
            this.visible = true
        },
        hide() {
            this.visible = false
        },
        runTimer() {
            this.date = new Date()
            this.timer = setInterval(() => {
                this.date = new Date()
            }, 5 * 1000) // 因为精确到分 允许有5s误差
        }
    }
}
</script>
<style module="s" lang="scss">
.app {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99999999;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.content {
    position: absolute;
    top: 50%;
    right: inherit;
    bottom: inherit;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    text-align: center;
}

.hour {
    font-size: 7vw;
}

.date {
    font-size: 3vw;
    margin-right: 3vw;
}

.week {
    font-size: 3vw;
}

.transition-enter-active {
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-name: screenFadeIn;
    animation-play-state: running;
    opacity: 0;
    animation-timing-function: linear;
}

.transition-leave-active {
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-name: screenFadeOut;
    animation-play-state: running;
    animation-timing-function: linear;
}

@keyframes screenFadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes screenFadeOut {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>