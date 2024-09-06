"use strict"
//==========================================
const TELEGRAM_BOT_TOKEN = '6358572761:AAHgq1oVtyshwH7RCskxvzysWF7DaDWrnxE';
const TELEGRAM_CHAT_ID = '6812593469';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`


async function sendEmailTelegram(event) {
    event.preventDefault();

    const form = event.target;
    const formBtn = document.querySelector('.form__submit-button button')
    const formSendResult = document.querySelector('.form__send-result')
    formSendResult.textContent = '';


    const { name, phone, izoh } = Object.fromEntries(new FormData(form).entries());
    
    const text = `Isim: ${name}\nTelefon nomer: ${phone}\n Izoh: ${izoh}`;


    try {
        formBtn.textContent = 'Loading...';

        const response = await fetch(API, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,
            })
        })
        
        if (response.ok) {
            formSendResult.textContent = 'Biz sizbilan yaqin ortada boglashamiz';
            form.reset()
        } else {
            throw new Error(response.statusText);
        }

    } catch (error) {
        console.error(error);
        formSendResult.textContent = 'Анкета не отправлена! Попробуйте позже.';
        formSendResult.style.color = 'red';

    } finally {
        formBtn.textContent = 'Yuborish';
    }
}