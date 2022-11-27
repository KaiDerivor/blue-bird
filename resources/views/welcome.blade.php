<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @viteReactRefresh
        @vite(['resources/css/app.scss', 'resources/js/index.tsx'])
        <title>Laravel</title>
    </head>
<body>
    {{-- <img style="height: 300px" src="{{ asset('storage/public/img-tasks/1.png') }}" alt="" title="">
    <img src="{{ url('storage/public/img-tasks/'.'1.png') }}" alt="" title="" />
    <img src="{{ url('storage/img-tasks/'.'1.png') }}" alt="" title="" /> --}}

    <div id='root'></div>

</body>
</html>
