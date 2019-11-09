// import { http } from '../helper'
// import { _notification } from '../notification'
const form = document.getElementById('contact_form')



const serializeForm = form => {
	let formData = {};
	const inputs = form.querySelectorAll("input");
	const textarea = form.querySelectorAll("textarea");

	[...inputs, ...textarea].map(node => {
		formData[node.name] = node.value;
	});
	return formData;
};

const delay = ms => new Promise(res => setTimeout(res, ms));

const submitForm = async (event, count = 0) => {
	event.preventDefault();

	const formNode = event.target;

	const form = serializeForm(formNode);

	try {
		const response = await fetch(`${SERVER_DOMAIN}/message`, {
			method: "POST",
			body: JSON.stringify(form),
			headers: {
				"Content-Type": "application/json"
			}
		});

		const data = await response.json();

		Object.keys(form).forEach(key => {
			const node = formNode.querySelector(`[name=${key}] + span.form-error`);

			node.innerHTML = data.error && data.error[key] ? data.error[key] : "";
		});

		if (!data.error) {
			modal.classList.remove("active");
			pageWrapper.classList.remove("blur");

			openInfoModal({
				title: "Cool! We are got your message!",
				subtitle: "Thank you! We will contact you as soon as possible"
			});
		}
	} catch (error) {
		if (count >= 3) {
			// openInfoModal({
			// 	title: "Oops! Wake up your connection!",
			// 	subtitle: "Your internet seems too slow to reach our server <br/> Please try againg in few minutes"
			// });
            return;
            console.log('SEND ERROR')
		}
		console.log({ error });
		await delay(500);
		submitForm(event, ++count);
	}
};

form.addEventListener('submit', submitForm)
