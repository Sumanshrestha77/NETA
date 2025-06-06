<template>
    <div id="app" class="min-h-screen bg-gray-100">
        <div class="container mx-auto px-4 py-8">
            <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">
                Laravel + Vue Application
            </h1>

            <div class="bg-white rounded-lg shadow-md p-6">
                <p class="text-gray-700 text-lg">
                    Your CSS and Vue setup is working correctly!
                </p>

                <button
                    @click="toggleMessage"
                    class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    {{ showMessage ? "Hide" : "Show" }} Message
                </button>

                <div
                    v-if="showMessage"
                    class="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
                >
                    <p>
                        🎉 Congratulations! Your Laravel + Vue + Tailwind setup
                        is working perfectly!
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    name: "App",
    setup() {
        const showMessage = ref(false);

        const toggleMessage = () => {
            showMessage.value = !showMessage.value;
        };

        return {
            showMessage,
            toggleMessage,
        };
    },
};
</script>
