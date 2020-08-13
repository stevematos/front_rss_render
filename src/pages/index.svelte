<script>
    import {user} from '../store/store';
    import {Form, FormGroup, FormText, Input, Label, Button} from 'sveltestrap';
    import Swal from 'sweetalert2';
    import axios from 'axios';

    import {CONFIG, mutations} from '../constants';

    let url = ""
    let title = ""

    const handleSubscriptFeed = () => {
        axios.post(CONFIG.urlApi, {
            query: mutations.subscribeFeed(url, $user, title)
        }).then(res => {
            console.log(res)
            url = ""
            title = ""

            Swal.fire({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 2000,
                icon: 'success',
                title: 'Feed creado con exito'
            })


        }).catch(err => {
            if (err.response.data.errors) {
                let message = err.response.data.errors[0].message
                Swal.fire({
                    showConfirmButton: false,
                    timer: 1000,
                    icon: 'error',
                    title: message
                })
            } else {
                console.log(err)
            }
        })
    }

</script>
<style>
    .feed {
        width: 300px;
    }

    .feed form {
        padding: 30px;
    }
</style>
<div class="feed">
    <form on:submit|preventDefault={handleSubscriptFeed}>
        <FormGroup>
            <Label>Feed</Label>
            <Input name="url" type="text" bind:value={url}/>
        </FormGroup>
        <FormGroup>
            <Label>Titulo</Label>
            <Input name="title" type="text" bind:value={title}/>
        </FormGroup>
        <Button primary type="submit">
            Suscribirse
        </Button>
    </form>
</div>