<script>
    export let slug;
    import {url} from "@sveltech/routify";
    import {params} from '@sveltech/routify';
    import Feed from '../../components/Feed.svelte';
    import axios from 'axios';

    import {CONFIG, queries} from '../../constants';

    let rssId = new URLSearchParams(window.location.search).get('rss_id');

    let feeds = []

    axios.post(CONFIG.urlApi, {
        query: queries.feed(rssId)
    }).then(res => {
        feeds = res.data.data.feed;
    })
</script>

<div class="feed-slug">
    {#each feeds as feed}
        <Feed {...feed}/>
    {/each}
</div>
<!--<h1>Blog article: {slug}</h1>-->
<!--{#each [0, 1, 2, 3, 4] as i}-->
<!--  <p>Dummy text: {i} for {slug}.</p>-->
<!--{/each}-->
<!---->
<!--<a href={$url(`${slug}/delete`)}>Delete</a>-->