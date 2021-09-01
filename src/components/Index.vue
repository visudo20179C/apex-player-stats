<template>
  <div class="bg-black w-3/4 ml-auto mr-auto pt-10 font-mono" style="color: #B12322;">
	<h1 class="ml-auto mr-auto text-xl w-2/3 mb-5 border rounded-lg border-gray-500">Stats for: {{player}}</h1>
	<div v-if="responseDataCompute != null">
		<h1 class="text-xl">Account Level: {{this.responseData.global.level}} ({{this.responseData.global.toNextLevelPercent}}% until next level)</h1>
		<h1 class="text-lg mt-4">{{this.responseData.global.rank.rankedSeason.replaceAll('_', ' ')}}</h1>
		<table class="ml-auto mr-auto table-fixed w-3/4 divide-y divide-gray-200 border border-gray-500">
			<tr class="border rounded-lg border-gray-500">
				<th>Rank</th>
				<th>Total RP</th>
				<th>Rank #</th>
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
			<h1 class="text-xl">{{player}}'s currently selected legend: </h1>
			<div class="ml-auto mr-auto mt-5 text-bold text-2xl w-64 h-10 bg-black border rounded-lg border-gray-500">
				{{this.responseData.legends.selected.LegendName}}
			</div>
			<img class="object-contain ml-auto mr-auto h-48 w-full" :src="this.responseData.legends.selected.ImgAssets.icon"/>
			<h1 class="text-xl">Equipped Trackers:</h1>
			<ul>
				<div v-for="item in this.responseData.legends.selected.data">
					<li class="w-2/3 ml-auto mr-auto border border-gray-500">{{item.name}}: {{item.value}}</li>
				</div>
			</ul>
		</div>
		<div class="pb-10"> 
			<p class="mb-2"> See {{player}}'s trackers for: </p>
			<t-select
				placeholder="Select an option"
				:options="this.legendOptions"
			>
			</t-select>
		</div>
	</div>
  </div>
</template>

<script>
export default {
  	name: 'Index',
	data() {
		return {
			player: "visudo20179C",
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
