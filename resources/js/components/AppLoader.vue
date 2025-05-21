<template>
    <div
        class="loader-container bg-slate-900 fixed inset-0 flex items-center justify-center z-50"
        :class="{ 'opacity-0 pointer-events-none': !isLoading }"
    >
        <div class="loader-content text-center">
            <div class="logo-container relative">
                <!-- Animated background circles -->
                <div
                    v-for="(circle, index) in 5"
                    :key="index"
                    class="absolute rounded-full"
                    :class="`circle-${index}`"
                ></div>

                <!-- NETA text -->
                <h1
                    class="relative z-10 font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 text-7xl md:text-8xl"
                >
                    <span ref="letterN">N</span>
                    <span ref="letterE">E</span>
                    <span ref="letterT">T</span>
                    <span ref="letterA">A</span>
                </h1>

                <p class="text-gray-300 mt-4 tracking-widest text-lg">
                    Nepali Leaders Directory
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { gsap } from "gsap";

export default {
    name: "AppLoader",
    props: {
        duration: {
            type: Number,
            default: 3500,
        },
    },
    data() {
        return {
            isLoading: true,
        };
    },
    mounted() {
        this.animateLoader();

        // Hide loader after duration
        setTimeout(() => {
            this.isLoading = false;
            this.$emit("loaded");
        }, this.duration);
    },
    methods: {
        animateLoader() {
            // Create a timeline for the animation
            const tl = gsap.timeline();

            // Animate the letters
            tl.from(
                [
                    this.$refs.letterN,
                    this.$refs.letterE,
                    this.$refs.letterT,
                    this.$refs.letterA,
                ],
                {
                    y: -100,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "bounce.out",
                }
            );

            // Animate the circles
            gsap.to(".circle-0", {
                x: "random(-20, 20)",
                y: "random(-20, 20)",
                scale: "random(0.8, 1.2)",
                duration: 2,
                repeat: -1,
                yoyo: true,
            });

            gsap.to(".circle-1, .circle-2, .circle-3, .circle-4", {
                x: "random(-30, 30)",
                y: "random(-30, 30)",
                scale: "random(0.5, 1.5)",
                duration: 3,
                repeat: -1,
                yoyo: true,
                stagger: 0.5,
            });
        },
    },
};
</script>

<style scoped>
.loader-container {
    transition: opacity 0.6s ease-out;
}

.circle-0 {
    width: 150px;
    height: 150px;
    background: radial-gradient(
        circle,
        rgba(79, 70, 229, 0.2) 0%,
        transparent 70%
    );
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.circle-1 {
    width: 80px;
    height: 80px;
    background: radial-gradient(
        circle,
        rgba(59, 130, 246, 0.2) 0%,
        transparent 70%
    );
    left: 40%;
    top: 40%;
}

.circle-2 {
    width: 100px;
    height: 100px;
    background: radial-gradient(
        circle,
        rgba(99, 102, 241, 0.15) 0%,
        transparent 70%
    );
    right: 45%;
    top: 55%;
}

.circle-3 {
    width: 60px;
    height: 60px;
    background: radial-gradient(
        circle,
        rgba(139, 92, 246, 0.15) 0%,
        transparent 70%
    );
    left: 42%;
    bottom: 35%;
}

.circle-4 {
    width: 120px;
    height: 120px;
    background: radial-gradient(
        circle,
        rgba(79, 70, 229, 0.1) 0%,
        transparent 70%
    );
    right: 38%;
    bottom: 42%;
}
</style>
