<template>
  <div class="bg-gray-500 w-3/4 ml-auto mr-auto text-gray-200">
	<h1 class="text-2xl text-gray-200 mb-5"> Apex Legends Stats for: {{player}}</h1>
	<div v-if="responseDataCompute != null">
		<h1 class="text-2xl">Account Level: {{this.responseData.global.level}} ({{this.responseData.global.toNextLevelPercent}}% until next level)</h1>
		<h1 class="text-lg mt-4">{{this.responseData.global.rank.rankedSeason.replaceAll('_', ' ')}}</h1>
		<table class="ml-auto mr-auto table-fixed w-2/3 divide-y divide-gray-200 border-white">
			<tr class="border-2 rounded-lg border-gray-200">
				<th>Rank</th>
				<th>Total RP</th>
				<th>Rank Number (if Pred)</th>
			</tr>
			<tr v-if="responseData.global.rank.ladderPosPlatform == -1">
				<td>{{this.responseData.global.rank.rankName}} {{this.responseData.global.rank.rankDiv}}
					<img class="ml-auto mr-auto max-h-16 max-w-16" :src="this.responseData.global.rank.rankImg"/>
				</td>
				<td>{{this.responseData.global.rank.rankScore}}</td>
				<td>N/A</td>
			</tr>
			<tr v-else>
				<td>{{this.responseData.global.rank.rankName}}
					<img class="ml-auto mr-auto max-h-16 max-w-16" :src="this.responseData.global.rank.rankImg"/>
				</td>
				<td>{{this.responseData.global.rank.rankScore}}</td>
				<td># {{this.responseData.global.rank.ladderPosPlatform}}</td>
			</tr>
		</table>
		<div class="mt-4 mb-4 max-h-1/2">
			<h1 class="text-2xl">{{player}}'s currently selected legend: {{this.responseData.legends.selected.LegendName}}</h1>
			<img class="object-contain ml-auto mr-auto h-48 w-full" :src="this.responseData.legends.selected.ImgAssets.icon"/>
			<h1 class="text-2xl">Equipped Trackers:</h1>
			<ul>
				<div v-for="item in this.responseData.legends.selected.data">
					<li>{{item.name}}: {{item.value}}</li>
				</div>
			</ul>
		</div>
		<p> See {{player}}'s equipped tracker's for: </p>
		<t-select
			placeholder="Select an option"
  			:options="this.legendOptions"
			variant="demo"
		>
		</t-select>
	</div>
  </div>
</template>

<script>
export default {
  	name: 'Index',
	data() {
		return {
			player: "daltoosh",
			responseData: null,
			legendOptions: [],
		}
	},
	computed: {
		responseDataCompute() {
			return (this.responseData)
				? this.responseData
				: null
		}
	},
	methods: {
		processData(data) {
			this.responseData = data
			this.setupLegendOptions()
		},
		setupLegendOptions() {
			for(var elem in this.responseData.legends.all) {
				this.legendOptions.push(elem)
			}
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
		.then(data => this.processData(data))
	},
}
</script>

<style scoped>
</style>
