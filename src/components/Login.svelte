<script>
    import {user,register} from '../store/store';
    import {CONFIG, queries} from '../constants';
    import {Form, FormGroup, FormText, Input, Label, Button} from 'sveltestrap';
    import {url} from '@sveltech/routify';
    import Swal from 'sweetalert2';
    // import { redirect } from '@sveltech/routify';

    export let changeRegister;

    import axios from 'axios';

    let email = "";
    let password = "";
    let isLoading = false;
    let errors = {};

    const welcome = () => {
        Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            showConfirmButton: false,
            timer: 1000
        });
    }

    const handleSubmit = () => {
        errors = {};
        if (email.length === 0) {
            errors.email = "El campo no debe estar vacío";
        }
        if (password.length === 0) {
            errors.password = "El campo no debe estar vacío";
        }
        if (Object.keys(errors).length === 0) {
            isLoading = true;
            axios.post(CONFIG.urlApi, {
                query: queries.login(email, password)
            }).then(res => {
                if (res.data.data.login) {
                    user.update(n => res.data.data.login);
                    welcome()
                } else {
                    Swal.fire({
                        showConfirmButton: true,
                        timer: 3000,
                        icon: 'error',
                        title: 'El usuario no esta registrado'
                    })
                    isLoading = false;
                }
            }).catch(err => {
                console.log(err)
                isLoading = false;
            });
        } else {
            let message = Object.keys(errors).map(error => {
                return `${error}: ${errors[error]}`
            }).join('\n')
            console.log(message)
            Swal.fire({
                showConfirmButton: true,
                timer: 3000,
                icon: 'error',
                title: message
            })
        }
    };

    const redirectRegister = () => {
        register.update(n => true);
    }

</script>

<style>

    section {
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to right, #abb5dc, #669df1);
    }

    form {
        background: #fff;
        padding: 50px;
        width: 400px;
        height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 20px 14px 8px rgba(0, 0, 0, 0.58);
    }

    h1 {
        margin: 10px 20px 30px 20px;
        font-size: 40px;
    }

    .errors {
        list-style-type: none;
        padding: 10px;
        margin-top: 10px;
        /*margin: 0;*/
        border: 2px solid #be6283;
        color: #be6283;
        background: rgba(190, 98, 131, 0.3);
    }

    .success {
        font-size: 24px;
        text-align: center;
    }

    .link-register {
        margin-top: 15px;
    }
</style>
<section>
    <form on:submit|preventDefault={handleSubmit}>
        <h1>👤</h1>
        <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="name@example.com" id="email"
                   bind:value={email}/>
        </FormGroup>
        <label></label>
        <FormGroup>
            <Label>Contraseña</Label>
            <Input
                    type="password"
                    name="password"
                    placeholder="contraseña"
                    id="password"
                    bind:value={password}/>
        </FormGroup>

        <Button primary type="submit">
            {#if isLoading}Ingresando ...{:else}Ingresar 🔒{/if}
        </Button>
        <a class="link-register" href="#" on:click={redirectRegister}>Crear nuevo usuario</a>

        {#if Object.keys(errors).length > 0}
            <ul class="errors">
                {#each Object.keys(errors) as field}
                    <li>{field}: {errors[field]}</li>
                {/each}
            </ul>
        {/if}
</section>