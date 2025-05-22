<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body class="antialiased">
    <div class="min-h-screen flex items-center justify-center">
        @auth
        <div>Welcome, {{ Auth::user()->name }}! <a href="{{ route('dashboard') }}">Dashboard</a></div>
        @else
        <div>
            <a href="{{ route('login') }}" class="text-blue-500">Login</a> |
            <a href="{{ route('register') }}" class="text-blue-500">Register</a>
        </div>
        @endauth
    </div>
</body>

</html>