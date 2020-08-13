<script>
    import {user} from '../store/store';
    import {CONFIG, mutations} from '../constants';
    import {Form, FormGroup, FormText, Input, Label, Button} from 'sveltestrap';
    import {url} from '@sveltech/routify';
    import { goto } from '@sveltech/routify'
    import Swal from 'sweetalert2';

    import axios from 'axios';

    let email = "";
    let newPassword = "";
    let newPasswordRepeat = "";
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

    const handleRegister = () => {
        errors = {};
        if (email.length === 0) {
            errors.Email = "El campo no debe estar vacío";
        }
        if (newPassword.length === 0) {
            errors["Contraseña"] = "El campo no debe estar vacío";
        }
        if (newPasswordRepeat.length === 0) {
            errors["Confirmacion de contraseña"] = "El campo no debe estar vacío";
        }
        if (Object.keys(errors).length === 0)
            if (newPassword !== newPasswordRepeat) {
                errors["Contraseña"] = "La contrasena y la confirmacion de contraseña son distintas";
            }

        if (Object.keys(errors).length === 0) {
            isLoading = true;
            console.log(mutations.createUser(email, newPassword))
            axios.post(CONFIG.urlApi, {
                query: mutations.createUser(email, newPassword)
            }).then(res => {
                console.log(res.data.data.CreateUser.user.id)
                if (res.data.data.CreateUser.user.id) {
                    user.update(n => res.data.data.CreateUser.user.id);
                    welcome();
                    $goto('/')
                }
            }).catch(err => {
                if (err.response.data.errors) {
                    let message = err.response.data.errors[0].message
                    Swal.fire({
                        showConfirmButton: false,
                        timer: 1000,
                        icon: 'error',
                        title: message
                    })
                    isLoading = false;
                } else {
                    console.log(err)
                }
            });
        } else {
            let message = Object.keys(errors).map(error => {
                return `${error}: ${errors[error]}`
            }).join('\n')
            console.log(message)
            Swal.fire({
                showConfirmButton: true ,
                timer: 3000,
                icon: 'error',
                title: message
            })
        }
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
</style>
<section>
    <form on:submit|preventDefault={handleRegister}>
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
                    name="new_password"
                    placeholder="contraseña"
                    id="new_password"
                    bind:value={newPassword}/>
        </FormGroup>
        <FormGroup>
            <Label>Confirme contraseña</Label>
            <Input
                    type="password"
                    name="new_password_repeat"
                    placeholder="contraseña"
                    id="new_password_repeat"
                    bind:value={newPasswordRepeat}/>
        </FormGroup>

        <Button primary type="submit">
            {#if isLoading}Registrandose ...{:else}Registrarse <i class="fas fa-door-open"></i> {/if}
        </Button>

    </form>
</section>