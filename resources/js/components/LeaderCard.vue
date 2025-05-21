<template>
    <div
        class="leader-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
    >
        <!-- Leader image container with gradient overlay -->
        <div class="relative overflow-hidden">
            <img
                :src="leader.photo"
                :alt="leader.name"
                class="w-full h-64 object-cover object-center transition-transform duration-500"
                :class="{ 'scale-105': hovering }"
            />
            <div
                class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"
            ></div>

            <!-- Political party badge -->
            <div
                class="absolute top-4 right-4 bg-blue-600 bg-opacity-90 text-white text-xs font-bold px-3 py-1 rounded-full"
            >
                {{ leader.party }}
            </div>
        </div>

        <!-- Leader info -->
        <div class="p-5">
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="text-xl font-bold text-gray-800">
                        {{ leader.name }}
                    </h3>
                    <p class="text-gray-600 text-sm mt-1">
                        Age: {{ leader.age }}
                    </p>
                    <p class="text-gray-600 text-sm mt-1">
                        {{ leader.position }}
                    </p>
                    <p class="text-blue-600 text-sm font-medium mt-1">
                        {{ leader.level }}
                    </p>
                </div>
            </div>

            <!-- Interaction buttons -->
            <div
                class="flex justify-between items-center mt-4 pt-4 border-t border-gray-100"
            >
                <div class="flex space-x-4">
                    <!-- Like button -->
                    <button
                        @click="toggleLike"
                        class="flex items-center space-x-1 group"
                        :class="{ 'text-blue-600': liked }"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 transition-colors duration-200"
                            :class="
                                liked
                                    ? 'text-blue-600 fill-blue-600'
                                    : 'text-gray-400 group-hover:text-blue-500'
                            "
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                            />
                        </svg>
                        <span
                            :class="
                                liked
                                    ? 'text-blue-600'
                                    : 'text-gray-500 group-hover:text-blue-500'
                            "
                        >
                            {{ likeCount }}
                        </span>
                    </button>

                    <!-- Dislike button -->
                    <button
                        @click="toggleDislike"
                        class="flex items-center space-x-1 group"
                        :class="{ 'text-red-600': disliked }"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 transition-colors duration-200"
                            :class="
                                disliked
                                    ? 'text-red-600 fill-red-600'
                                    : 'text-gray-400 group-hover:text-red-500'
                            "
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"
                            />
                        </svg>
                        <span
                            :class="
                                disliked
                                    ? 'text-red-600'
                                    : 'text-gray-500 group-hover:text-red-500'
                            "
                        >
                            {{ dislikeCount }}
                        </span>
                    </button>
                </div>

                <!-- View profile link -->
                <router-link
                    :to="`/leader/${leader.id}`"
                    class="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center group"
                >
                    View Profile
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LeaderCard",
    props: {
        leader: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            hovering: false,
            liked: false,
            disliked: false,
            likeCount: this.leader.likes || 0,
            dislikeCount: this.leader.dislikes || 0,
        };
    },
    methods: {
        toggleLike() {
            if (this.liked) {
                this.liked = false;
                this.likeCount--;
            } else {
                this.liked = true;
                this.likeCount++;

                if (this.disliked) {
                    this.disliked = false;
                    this.dislikeCount--;
                }
            }

            // Here you would typically send an API request to update the like count in the database
            this.$emit("like", {
                leaderId: this.leader.id,
                liked: this.liked,
                likeCount: this.likeCount,
            });
        },
        toggleDislike() {
            if (this.disliked) {
                this.disliked = false;
                this.dislikeCount--;
            } else {
                this.disliked = true;
                this.dislikeCount++;

                if (this.liked) {
                    this.liked = false;
                    this.likeCount--;
                }
            }

            // Here you would typically send an API request to update the dislike count in the database
            this.$emit("dislike", {
                leaderId: this.leader.id,
                disliked: this.disliked,
                dislikeCount: this.dislikeCount,
            });
        },
    },
};
</script>
