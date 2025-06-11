<x-guest-layout>
    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="__('Password')" />

            <x-text-input id="password" class="block mt-1 w-full"
                type="password"
                name="password"
                required autocomplete="current-password" />

            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Remember Me -->
        <div class="block mt-4">
            <label for="remember_me" class="inline-flex items-center">
                <input id="remember_me" type="checkbox" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" name="remember">
                <span class="ms-2 text-sm text-gray-600">{{ __('Remember me') }}</span>
            </label>
        </div>


        <div class="flex items-center justify-between gap-x-2 mt-4">
            <a href="/auth/google" class="flex items-center gap-2 bg-white border hover:bg-blue-600 border-gray-300 rounded-md px-2 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-100">
                <svg class="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44.5 20H24v8.5h11.7C34.4 32.6 30 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C34.3 5.2 29.4 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.7 0 20.4-7.9 21.5-21v-4z" fill="#FFC107" />
                    <path d="M6.3 14.7l6.6 4.8C14.2 15.2 18.7 12 24 12c3.1 0 5.9 1.2 8 3.1l6-6C34.3 5.2 29.4 3 24 3 15.9 3 8.9 7.7 6.3 14.7z" fill="#FF3D00" />
                    <path d="M24 45c5.2 0 10-1.9 13.7-5.1l-6.3-5.1C29.5 36.5 26.9 37.5 24 37.5c-5.9 0-10.9-3.9-12.7-9.2l-6.5 5C8.8 41.3 15.9 45 24 45z" fill="#4CAF50" />
                    <path d="M44.5 20H24v8.5h11.7c-1.2 3.2-3.7 5.6-7 7l6.3 5.1c3.7-3.2 6.3-7.9 6.3-13.6 0-1.3-.1-2.6-.3-3.9z" fill="#1976D2" />
                </svg>
                <span>Login with Google</span>
            </a>

            @if (Route::has('password.request'))
            <a class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="{{ route('password.request') }}">
                {{ __('Forgot your password?') }}
            </a>
            @endif

            <x-primary-button class="ms-3">
                {{ __('Log in') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout>