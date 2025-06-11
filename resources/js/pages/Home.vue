<template>
    <div>
        <!-- Loader component (displayed on initial load) -->
        <AppLoader v-if="loading" @loaded="onLoaded" />
        <div v-else>
            <!-- Hero section -->
            <section
                style="background-color: blue"
                class="relative bg-gradient-to-b from-slate-900 to-blue-900 overflow-hidden"
            >
                <div class="absolute inset-0">
                    <svg
                        class="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/4"
                        width="800"
                        height="800"
                        fill="none"
                        viewBox="0 0 800 800"
                    >
                        <circle
                            cx="400"
                            cy="400"
                            r="400"
                            fill="url(#heroglow)"
                            fill-opacity="0.1"
                        />
                        <defs>
                            <radialGradient
                                id="heroglow"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(400 400) rotate(90) scale(400)"
                            >
                                <stop stop-color="#3B82F6" />
                                <stop
                                    offset="1"
                                    stop-color="#3B82F6"
                                    stop-opacity="0"
                                />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>

                <div
                    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10"
                >
                    <div class="text-center">
                        <h1
                            class="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4"
                        >
                            <span class="block">Meet Nepal's</span>
                            <span class="block text-blue-400"
                                >Political Leaders</span
                            >
                        </h1>

                        <p class="max-w-xl mx-auto text-xl text-gray-300 mb-8">
                            Explore Nepal's political landscape through our
                            comprehensive database of prominent leaders across
                            different parties and positions.
                        </p>
                        <div
                            class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                        >
                            <button
                                @click="scrollToSearch"
                                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Explore Leaders
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5 ml-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            <button
                                @click="showAboutModal = true"
                                class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-300 bg-transparent hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                About This Project
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Navbar component -->
            <Navbar :user="user" @login="handleLogin" @logout="handleLogout" />

            <!-- Search and filter section -->
            <section
                id="search-section"
                ref="searchSection"
                class="bg-gray-100 py-12"
            >
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-10">
                        <h2
                            class="text-3xl font-extrabold text-gray-900 sm:text-4xl"
                        >
                            Find Political Leaders
                        </h2>
                        <router-link
                            to="/register"
                            class="btn btn-primary float-right"
                            style="
                                position: relative;
                                z-index: 1000;
                                background-color: green;
                                padding: 10px 14px;
                                color: white;
                                font-weight: 500;
                                border-radius: 7px;
                                margin: 10px 10px;
                            "
                            @click="handleClick"
                        >
                            Register
                        </router-link>

                        <p
                            class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4"
                        >
                            Search by name, party, position, or filter by
                            various criteria
                        </p>
                    </div>

                    <div class="flex flex-col space-y-6 mb-8">
                        <!-- Search bar component -->
                        <SearchBar
                            v-model="searchQuery"
                            @search="performSearch"
                            :placeholder="'Search for leaders by name, party, or position...'"
                        />

                        <!-- Filter dropdown component -->
                        <div
                            class="flex flex-wrap items-center justify-between gap-4"
                        >
                            <FilterDropdown
                                label="Political Party"
                                :options="partyOptions"
                                v-model="selectedParty"
                                @change="applyFilters"
                            />
                            <FilterDropdown
                                label="Position"
                                :options="positionOptions"
                                v-model="selectedPosition"
                                @change="applyFilters"
                            />
                            <FilterDropdown
                                label="Province"
                                :options="provinceOptions"
                                v-model="selectedProvince"
                                @change="applyFilters"
                            />
                            <FilterDropdown
                                label="Sort By"
                                :options="sortOptions"
                                v-model="sortBy"
                                @change="applyFilters"
                            />

                            <button
                                @click="resetFilters"
                                class="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>

                    <!-- Leader catalog component -->
                    <LeaderCatalog
                        :leaders="filteredLeaders"
                        :loading="catalogLoading"
                        @view-profile="viewLeaderProfile"
                    />

                    <!-- Pagination controls -->
                    <div
                        v-if="filteredLeaders.length > 0"
                        class="mt-12 flex justify-center"
                    >
                        <nav
                            class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                            aria-label="Pagination"
                        >
                            <button
                                @click="prevPage"
                                :disabled="currentPage === 1"
                                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                :class="{
                                    'opacity-50 cursor-not-allowed':
                                        currentPage === 1,
                                }"
                            >
                                <span class="sr-only">Previous</span>
                                <svg
                                    class="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </button>
                            <span
                                v-for="page in visiblePageNumbers"
                                :key="page"
                                @click="goToPage(page)"
                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50 cursor-pointer"
                                :class="{
                                    'bg-blue-50 text-blue-600 border-blue-500':
                                        page === currentPage,
                                    'text-gray-700': page !== currentPage,
                                }"
                            >
                                {{ page }}
                            </span>
                            <button
                                @click="nextPage"
                                :disabled="currentPage === totalPages"
                                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                :class="{
                                    'opacity-50 cursor-not-allowed':
                                        currentPage === totalPages,
                                }"
                            >
                                <span class="sr-only">Next</span>
                                <svg
                                    class="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </button>
                        </nav>
                    </div>

                    <!-- No results message -->
                    <div
                        v-if="filteredLeaders.length === 0 && !catalogLoading"
                        class="text-center py-16"
                    >
                        <svg
                            class="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
                            />
                        </svg>
                        <h3 class="mt-2 text-lg font-medium text-gray-900">
                            No results found
                        </h3>
                        <p class="mt-1 text-gray-500">
                            Try adjusting your search or filter criteria.
                        </p>
                        <div class="mt-6">
                            <button
                                @click="resetFilters"
                                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Statistics section -->
            <section class="bg-white py-16">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h2
                            class="text-3xl font-extrabold text-gray-900 sm:text-4xl"
                        >
                            Political Landscape
                        </h2>
                        <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
                            Key statistics about Nepal's political
                            representation
                        </p>
                    </div>

                    <div
                        class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        <div class="bg-gray-50 rounded-lg p-6 text-center">
                            <div class="text-4xl font-bold text-blue-600 mb-2">
                                {{ statistics.totalLeaders }}
                            </div>
                            <div class="text-gray-700 font-medium">
                                Total Leaders
                            </div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-6 text-center">
                            <div class="text-4xl font-bold text-blue-600 mb-2">
                                {{ statistics.totalParties }}
                            </div>
                            <div class="text-gray-700 font-medium">
                                Political Parties
                            </div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-6 text-center">
                            <div class="text-4xl font-bold text-blue-600 mb-2">
                                {{ statistics.femalePercentage }}%
                            </div>
                            <div class="text-gray-700 font-medium">
                                Female Representation
                            </div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-6 text-center">
                            <div class="text-4xl font-bold text-blue-600 mb-2">
                                {{ statistics.averageAge }}
                            </div>
                            <div class="text-gray-700 font-medium">
                                Average Age
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Featured leaders section -->
            <section class="bg-gray-100 py-16">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h2
                            class="text-3xl font-extrabold text-gray-900 sm:text-4xl"
                        >
                            Featured Leaders
                        </h2>
                        <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
                            Key political figures in Nepal
                        </p>
                    </div>

                    <div
                        class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        <LeaderCard
                            v-for="leader in featuredLeaders"
                            :key="leader.id"
                            :leader="leader"
                            :featured="true"
                            @view-profile="viewLeaderProfile"
                        />
                    </div>
                </div>
            </section>

            <!-- About modal -->
            <div
                v-if="showAboutModal"
                class="fixed z-50 inset-0 overflow-y-auto"
            >
                <div
                    class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                >
                    <div
                        class="fixed inset-0 transition-opacity"
                        aria-hidden="true"
                    >
                        <div
                            class="absolute inset-0 bg-gray-500 opacity-75"
                            @click="showAboutModal = false"
                        ></div>
                    </div>

                    <div
                        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    >
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div
                                    class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                                >
                                    <svg
                                        class="h-6 w-6 text-blue-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div
                                    class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                                >
                                    <h3
                                        class="text-lg leading-6 font-medium text-gray-900"
                                    >
                                        About This Project
                                    </h3>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">
                                            This platform aims to provide
                                            comprehensive information about
                                            Nepal's political leaders across
                                            different parties, positions, and
                                            regions. Our goal is to promote
                                            transparency and awareness about
                                            Nepal's political landscape.
                                        </p>
                                        <p class="text-sm text-gray-500 mt-2">
                                            The data is regularly updated to
                                            ensure accuracy and relevance. If
                                            you notice any discrepancies or have
                                            suggestions for improvement, please
                                            contact us.
                                        </p>
                                        <p class="text-sm text-gray-500 mt-2">
                                            The platform is built using Vue.js
                                            and Tailwind CSS, with data sourced
                                            from official government records and
                                            reputable news sources.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                        >
                            <button
                                @click="showAboutModal = false"
                                type="button"
                                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- App footer component -->
            <AppFooter />
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import AppLoader from "../components/AppLoader.vue";
import Navbar from "../components/Navbar.vue";
import SearchBar from "../components/SearchBar.vue";
import FilterDropdown from "../components/FilterDropdown.vue";
import LeaderCard from "../components/LeaderCard.vue";
import LeaderCatalog from "../components/LeaderCatalog.vue";
import AppFooter from "../components/AppFooter.vue";

export default {
    components: {
        AppLoader,
        Navbar,
        SearchBar,
        FilterDropdown,
        LeaderCard,
        LeaderCatalog,
        AppFooter,
    },
    setup() {
        // State variables
        const loading = ref(true);
        const catalogLoading = ref(false);
        const showAboutModal = ref(false);
        const searchQuery = ref("");
        const selectedParty = ref("");
        const selectedPosition = ref("");
        const selectedProvince = ref("");
        const sortBy = ref("name_asc");
        const currentPage = ref(1);
        const itemsPerPage = ref(12);
        const searchSection = ref(null);
        const user = ref(null);
        const getImagePath = (imageName) => {
            return `/images/leaders/${imageName}`;
        };

        // Mock data for leaders (in a real app, this would come from an API)
        const allLeaders = ref([
            {
                id: 1,
                name: "Sher Bahadur Deuba",
                position: "Former Prime Minister",
                party: "Nepali Congress",
                province: "Sudurpashchim",
                age: 77,
                gender: "Male",
                image: getImagePath("deuba.jpg"),
                bio: "Sher Bahadur Deuba is a Nepalese politician who served as Prime Minister of Nepal five times.",
            },
            {
                id: 2,
                name: "KP Sharma Oli",
                position: "Former Prime Minister",
                party: "Communist Party of Nepal (UML)",
                province: "Koshi",
                age: 71,
                gender: "Male",
                image: getImagePath("oli.jpg"),
                bio: "K. P. Sharma Oli is a Nepalese politician who served as Prime Minister of Nepal.",
            },
            {
                id: 3,
                name: "Pushpa Kamal Dahal",
                position: "Prime Minister",
                party: "Communist Party of Nepal (Maoist Centre)",
                province: "Bagmati",
                age: 68,
                gender: "Male",
                image: getImagePath("prachanda.jpg"),
                bio: "Pushpa Kamal Dahal, better known by his nom de guerre Prachanda, is a Nepalese politician and current Prime Minister of Nepal.",
            },
            // More leaders would be added here
        ]);

        // Mock data for statistics
        const statistics = ref({
            totalLeaders: 275,
            totalParties: 7,
            femalePercentage: 33,
            averageAge: 52,
        });

        // Options for filter dropdowns
        const partyOptions = [
            { value: "", label: "All Parties" },
            { value: "Nepali Congress", label: "Nepali Congress" },
            {
                value: "Communist Party of Nepal (UML)",
                label: "Communist Party of Nepal (UML)",
            },
            {
                value: "Communist Party of Nepal (Maoist Centre)",
                label: "Communist Party of Nepal (Maoist Centre)",
            },
            {
                value: "Rastriya Swatantra Party",
                label: "Rastriya Swatantra Party",
            },
            {
                value: "Rastriya Prajatantra Party",
                label: "Rastriya Prajatantra Party",
            },
            {
                value: "Janata Samajbadi Party",
                label: "Janata Samajbadi Party",
            },
        ];

        const positionOptions = [
            { value: "", label: "All Positions" },
            { value: "Prime Minister", label: "Prime Minister" },
            { value: "Former Prime Minister", label: "Former Prime Minister" },
            { value: "Minister", label: "Minister" },
            { value: "Member of Parliament", label: "Member of Parliament" },
            { value: "Party Leader", label: "Party Leader" },
        ];

        const provinceOptions = [
            { value: "", label: "All Provinces" },
            { value: "Koshi", label: "Koshi" },
            { value: "Madhesh", label: "Madhesh" },
            { value: "Bagmati", label: "Bagmati" },
            { value: "Gandaki", label: "Gandaki" },
            { value: "Lumbini", label: "Lumbini" },
            { value: "Karnali", label: "Karnali" },
            { value: "Sudurpashchim", label: "Sudurpashchim" },
        ];

        const sortOptions = [
            { value: "name_asc", label: "Name (A-Z)" },
            { value: "name_desc", label: "Name (Z-A)" },
            { value: "age_asc", label: "Age (Youngest First)" },
            { value: "age_desc", label: "Age (Oldest First)" },
        ];

        // Computed properties
        const filteredLeaders = computed(() => {
            let result = [...allLeaders.value];

            // Apply search query
            if (searchQuery.value) {
                const query = searchQuery.value.toLowerCase();
                result = result.filter(
                    (leader) =>
                        leader.name.toLowerCase().includes(query) ||
                        leader.party.toLowerCase().includes(query) ||
                        leader.position.toLowerCase().includes(query)
                );
            }

            // Apply filters
            if (selectedParty.value) {
                result = result.filter(
                    (leader) => leader.party === selectedParty.value
                );
            }

            if (selectedPosition.value) {
                result = result.filter(
                    (leader) => leader.position === selectedPosition.value
                );
            }

            if (selectedProvince.value) {
                result = result.filter(
                    (leader) => leader.province === selectedProvince.value
                );
            }

            // Apply sorting
            switch (sortBy.value) {
                case "name_asc":
                    result.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case "name_desc":
                    result.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case "age_asc":
                    result.sort((a, b) => a.age - b.age);
                    break;
                case "age_desc":
                    result.sort((a, b) => b.age - a.age);
                    break;
            }

            return result;
        });

        // Featured leaders (first 3 from the list for demonstration)
        const featuredLeaders = computed(() => {
            return allLeaders.value.slice(0, 3);
        });
        const handleClick = () => {
            console.log("register clicked");
        };

        // Pagination
        const totalPages = computed(() => {
            return Math.ceil(filteredLeaders.value.length / itemsPerPage.value);
        });

        const paginatedLeaders = computed(() => {
            const startIndex = (currentPage.value - 1) * itemsPerPage.value;
            const endIndex = startIndex + itemsPerPage.value;
            return filteredLeaders.value.slice(startIndex, endIndex);
        });

        const visiblePageNumbers = computed(() => {
            const range = [];
            const maxVisiblePages = 5;
            let startPage = Math.max(
                1,
                currentPage.value - Math.floor(maxVisiblePages / 2)
            );
            let endPage = Math.min(
                totalPages.value,
                startPage + maxVisiblePages - 1
            );

            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                range.push(i);
            }

            return range;
        });

        // Methods
        const onLoaded = () => {
            loading.value = false;
        };

        const performSearch = () => {
            catalogLoading.value = true;
            currentPage.value = 1;

            // Simulate API delay
            setTimeout(() => {
                catalogLoading.value = false;
            }, 500);
        };

        const applyFilters = () => {
            catalogLoading.value = true;
            currentPage.value = 1;

            // Simulate API delay
            setTimeout(() => {
                catalogLoading.value = false;
            }, 500);
        };

        const resetFilters = () => {
            searchQuery.value = "";
            selectedParty.value = "";
            selectedPosition.value = "";
            selectedProvince.value = "";
            sortBy.value = "name_asc";
            currentPage.value = 1;
            performSearch();
        };

        const scrollToSearch = () => {
            searchSection.value.scrollIntoView({ behavior: "smooth" });
        };

        const viewLeaderProfile = (leaderId) => {
            // In a real app, this would navigate to the leader's profile page
            console.log("View profile for leader ID:", leaderId);
            // router.push(`/leader/${leaderId}`);
        };

        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
            }
        };

        const goToPage = (page) => {
            currentPage.value = page;
        };

        const handleLogin = () => {
            // In a real app, this would handle user login
            user.value = {
                name: "Demo User",
                email: "demo@example.com",
            };
        };

        const handleLogout = () => {
            // In a real app, this would handle user logout
            user.value = null;
        };

        // Lifecycle hooks
        onMounted(() => {
            // Simulate loading data from an API
            setTimeout(() => {
                loading.value = false;
            }, 1500);
        });

        // Watch for changes to apply pagination
        watch([filteredLeaders, currentPage], () => {
            if (currentPage.value > totalPages.value && totalPages.value > 0) {
                currentPage.value = totalPages.value;
            }
        });

        return {
            // State
            loading,
            catalogLoading,
            showAboutModal,
            searchQuery,
            selectedParty,
            selectedPosition,
            selectedProvince,
            sortBy,
            currentPage,
            searchSection,
            user,
            statistics,

            // Computed properties
            filteredLeaders,
            featuredLeaders,
            totalPages,
            paginatedLeaders,
            visiblePageNumbers,

            // Options for dropdowns
            partyOptions,
            positionOptions,
            provinceOptions,
            sortOptions,

            // Methods
            onLoaded,
            performSearch,
            applyFilters,
            resetFilters,
            scrollToSearch,
            viewLeaderProfile,
            prevPage,
            nextPage,
            goToPage,
            handleLogin,
            handleLogout,
        };
    },
};
</script>

<style scoped>
/* Custom styles specific to this component */
.hero-pattern {
    background-color: #1a365d;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232d4e6c' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* Transitions for modal */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Card hover effects */
.leader-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.leader-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
