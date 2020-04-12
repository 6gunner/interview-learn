<template>
	<div>
		<button @click="sendRequest(true)">withCredentials-true</button>
		<button @click="sendRequest(false)">withCredentials-false</button>
		<button></button>
	</div>
</template>

<script>
	import axios from 'axios'

	const url = 'https://static.bhfastime.com/bhop/image/JhjHOBAPBc0dLgOZq23NRH4bsstQmNPYDi-jm0baioU.png'

	export default {

		methods: {
			sendRequest (withCredentials) {
				axios(`${url}`, {
					method: 'GET',
					withCredentials
				}).then(ret => {
					console.log(ret)
				})
			}
		}
	}
</script>
