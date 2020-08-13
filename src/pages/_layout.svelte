<!-- src/pages/_layout.svelte -->
<svelte:head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</svelte:head>

<script>
    import {user} from '../store/store'
    import Login from '../components/Login.svelte'
    import Nav from "../Nav.svelte";

    let path = location.pathname
    const publicRoutes = ['/register'];

</script>
{#if !$user && publicRoutes.indexOf(path) !== -1}
    <slot/>
{:else if $user}
    <Nav/>
    <slot/>
{:else}
    <Login/>
{/if}