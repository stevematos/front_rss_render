<script>
    import {Col, Container, Row} from 'sveltestrap';

    export let title;
    export let summary;
    export let published;
    export let image;
    export let author;
    export let link;

    let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    let date_published = new Date(published).toLocaleDateString("es-PE", options)
</script>

<Container class="feed">
    <Row>
        <Col xs="3">
            <img src={image} alt={title} width="200" height="200">
        </Col>
        <Col xs="6">
            <div>
                <h3>{title}</h3>
                {#if author}
                    <h4>Autor : {author}</h4>
                {/if}
                <p>{@html summary}</p>
                <p>{date_published}</p>
                {#if link}
                    <a href={link} target="_blank">... ver más</a>
                {/if}
            </div>
        </Col>
    </Row>
</Container>