<script>
    import {Button, Row, Col} from 'sveltestrap';
    import {url, isActive} from "@sveltech/routify";

    const links = [
        ["./index", "Home"],
        ["./feed", "Feed"],
    ];

    import {user} from './store/store';

    const logout = () => {user.update(n => false)}
</script>

<style>
    nav {
        border-bottom: 1px solid rgba(255, 62, 0, 0.1);
        font-weight: 300;
        padding: 0 1em;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    /* clearfix */
    ul::after {
        content: "";
        display: block;
        clear: both;
    }

    li {
        display: block;
        float: left;
    }

    .selected {
        position: relative;
        display: inline-block;
    }

    .selected::after {
        position: absolute;
        content: "";
        width: calc(100% - 1em);
        height: 2px;
        background-color: rgb(255, 62, 0);
        display: block;
        bottom: -1px;
    }

    a {
        text-decoration: none;
        padding: 1em 0.5em;
        display: block;
    }

</style>

<ul>
    <Row>
        <Col xs="11">
            {#each links as [path, name]}
                <li><a href={$url(path)} class:selected={$isActive(path)}>{name}</a></li>
            {/each}
        </Col>
        <Col xs="1">
            <Button outline primary on:click|once={logout}>Salir</Button>
        </Col>
    </Row>

</ul>