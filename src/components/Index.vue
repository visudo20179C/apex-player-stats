<template>
  <div>
	<h1> Apex Legends Stats for {{player}}</h1>
	<div v-if="responseDataCompute != null">
		<table class="ml-auto mr-auto">
			<tr>
				<th>Rank</th>
				<th>Total RP</th>
				<th>Rank Number</th>
			</tr>
			<tr v-if="responseData.global.rank.ladderPosPlatform == -1">
				<td>{{this.responseData.global.rank.rankName}} {{this.responseData.global.rank.rankDiv}}</td>
				<td>{{this.responseData.global.rank.rankScore}}</td>
				<td>N/A</td>
			</tr>
			<tr v-else>
				<td>{{this.responseData.global.rank.rankName}}</td>
				<td>{{this.responseData.global.rank.rankScore}}</td>
				<td># {{this.responseData.global.rank.ladderPosPlatform}}</td>
			</tr>
		</table>
	</div>
  </div>
</template>

<script>
export default {
  	name: 'Index',
	data() {
		return {
			player: "Andrewstown",
			responseData: null,
		}
	},
	computed: {
		responseDataCompute() {
			return (this.responseData)
				? this.responseData
				: null
		}
	},
	created() {
		fetch(
			"https://api.mozambiquehe.re/bridge?version=5&platform=PC&player="+this.player+"&auth=QYMCCkwuWGEeBQFL30tT",
			{
				method: 'GET',
			}
		)
		.then(response => response.json())
		.then(data => this.responseData = data);
	},
}
</script>

<style scoped>
</style>
