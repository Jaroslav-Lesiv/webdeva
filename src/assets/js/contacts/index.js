import { http } from '../helper'
import { _notification } from '../notification'
const form = document.getElementById('contact_form')

form.addEventListener('submit', event => {
    event.preventDefault()
    const [name, email, message] = [form.querySelector('#contact_name').value, form.querySelector('#contact_email').value, form.querySelector('#contact_message').value]

    const data = {
        name,
        email,
        message
    }
    form.classList.add('loading')

    http.post({ 
        data, url: `message`, 
        success: () => {
            _notification.add({ label: `Message sending`, mess: 'You messages sended seccessfull :)' })
            form.classList.remove('loading')
        }, 
        error: () => {
            _notification.add({ label: `Message sending`, mess: 'You messages not sended :(' }) 
            form.classList.remove('loading')
        }
    })


})