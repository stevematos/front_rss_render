<!-- src/pages/_layout.svelte -->
<svelte:head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</svelte:head>

<script>
    import {user, register} from '../store/store'
    import Login from '../components/Login.svelte'
    import Nav from "../Nav.svelte";
    import Register from "../components/Register.svelte";

</script>
{#if $user}
    <Nav/>
    <slot/>
{:else if $register}
    <Register/>
{:else}
    <Login/>
{/if}