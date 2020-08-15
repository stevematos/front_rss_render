<script>
    import {url} from "@sveltech/routify";
    import {user} from "../../store/store";
    import axios from 'axios';
    import {CONFIG, queries} from '../../constants';

    async function fetchData() {
        let data = []
        await axios.post(CONFIG.urlApi, {
            query: queries.getFeedsByUser($user)
        }).then(res => {
            data = res.data.data.getFeedsByUser
        })
        return data;
    }

    let promise = fetchData()
</script>

<h1>Bienvenidos a sus feeds!</h1>
<ul>
    {#await promise}
        Cargando...
    {:then rss}
        {#each rss as rs}
            <li>
                <a href={$url(`feed/:title?rss_id=:rss_id`, {'title': rs.title,'rss_id':rs.id})}>{rs.title}</a>
            </li>
        {/each}
    {:catch error}
        Error de conexion...
    {/await}
</ul>
