<template>
    <div class="register-card">
        <div class="card">
            <h2 class="card-title">Register</h2>
            <form @submit.prevent="register">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" v-model="name" required />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" required />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <div class="password-input">
                        <input
                            :type="passwordVisible ? 'text' : 'password'"
                            id="password"
                            v-model="password"
                            required
                        />
                        <span
                            class="password-toggle"
                            @click="togglePasswordVisibility"
                        >
                            <i
                                class="fas"
                                :class="
                                    passwordVisible ? 'fa-eye-slash' : 'fa-eye'
                                "
                            ></i>
                        </span>
                    </div>
                </div>
                <div class="form-group">
                    <label for="confirm-password">Confirm Password</label>
                    <div class="password-input">
                        <input
                            :type="confirmPasswordVisible ? 'text' : 'password'"
                            id="confirm-password"
                            v-model="confirmPassword"
                            required
                        />
                        <span
                            class="password-toggle"
                            @click="toggleConfirmPasswordVisibility"
                        >
                            <i
                                class="fas"
                                :class="
                                    confirmPasswordVisible
                                        ? 'fa-eye-slash'
                                        : 'fa-eye'
                                "
                            ></i>
                        </span>
                    </div>
                </div>
                <button type="submit" class="register-btn">Register</button>
                <button
                    type="button"
                    class="google-auth-btn"
                    @click="googleAuth"
                >
                    <i class="fab fa-google"></i> Register with Google
                </button>
                <p class="already-registered">
                    Already registered?
                    <router-link to="/login">Login</router-link>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            passwordVisible: false,
            confirmPasswordVisible: false,
        };
    },
    methods: {
        register() {
            // Your register logic here
        },
        googleAuth() {
            // Your Google Auth logic here
        },
        togglePasswordVisibility() {
            this.passwordVisible = !this.passwordVisible;
        },
        toggleConfirmPasswordVisibility() {
            this.confirmPasswordVisible = !this.confirmPasswordVisible;
        },
    },
};
</script>

<style scoped>
.register-card {
    max-width: 400px;
    margin: 40px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-title {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 10px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    height: 40px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.password-input {
    position: relative;
}

.password-toggle {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
}

.register-btn {
    width: 100%;
    height: 40px;
    background-color: #4caf50;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.google-auth-btn {
    width: 100%;
    height: 40px;
    background-color: #dd4b39;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}

.already-registered {
    text-align: center;
    margin-top: 20px;
}

.already-registered a {
    text-decoration: none;
    color: #4caf50;
}
</style>
