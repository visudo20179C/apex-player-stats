<template>
  <div class="bg-black w-full h-screen ml-auto mr-auto pt-10 font-mono" style="color: #B12322;">
	<h1 class="ml-auto mr-auto text-xl w-2/3 mb-5 border rounded-lg border-gray-500">Stats for: {{player}}</h1>
	<div v-if="responseDataCompute != null" class="bg-black">
		<h1 class="text-xl mb-8">Account Level: {{this.responseData.global.level}}</h1>
		<div v-tooltip.top-center="nextLevelMessage" class="h-3 w-3/4 relative max-w-xl mr-auto ml-auto rounded-full overflow-hidden">
    		<div class="w-full h-full bg-black border rounded-lg border-gray-500 absolute"></div>
    		<div class="h-full bg-red-500 absolute" :style="barStyle"></div>
		</div>
		<h1 class="text-xl mt-6 mb-4 font-black">{{rankedSplit}}</h1>
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
		<div class="mt-4 mb-4 max-h-1/2 bg-black">
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
		<div class="pb-5 bg-black"> 
			<p class="mb-2"> See {{player}}'s trackers for: </p>
			<t-select
				placeholder="Select a Legend"
				v-model="selectedLegend"
				:options="this.legendOptions"
				@change="showLegendTrackers()"
			/>
		</div>
		<div v-if="selectedLegend && selectedLegendData" class="bg-black pb-10">
			<h1 class="text-xl">Trackers:</h1>
			<div v-if="selectedLegendData.data !== undefined">
				<ul>
					<div v-for="item in selectedLegendData.data">
						<li class="w-2/3 ml-auto mr-auto border border-gray-500">{{item.name}}: {{item.value}}</li>
					</div>
				</ul>
			</div>
			<div v-else>
				None Equipped
			</div>
		</div>
	</div>
	<div v-else>
		<div class="text-lg">Loading... Please Wait... </div>
		<half-circle-spinner
		  :animation-duration="1000"
		  :size="100"
		  color="#B12322"
		  class="m-auto"
		/>
	</div>	
  </div>
</template>

<script>
import { HalfCircleSpinner } from 'epic-spinners'
import { VTooltip } from 'v-tooltip'

export default {
  	name: 'Index',
	components: {HalfCircleSpinner, VTooltip},
	data() {
		return {
			player: "visudo20179C",
			responseData: null,
			legendOptions: [],
			selectedLegend: null,
			selectedLegendData: null,
			levelMessage: null,
		}
	},
	computed: {
		responseDataCompute() {
			return (this.responseData)
				? this.responseData
				: null
		},
		barStyle() {
			return {
				width: `${this.responseData.global.toNextLevelPercent}%`
			}
		},
		nextLevelMessage() {
			return (100 - this.responseData.global.toNextLevelPercent)+"% to next level"
		},
		rankedSplit() {
			var rankedSplitString = this.responseData.global.rank.rankedSeason.replaceAll('_', ' ')
			return rankedSplitString.charAt(0).toUpperCase() + rankedSplitString.slice(1)
		},
	},
	methods: {
		processData(data) {
			this.responseData = data
			this.setupLegendOptions()
		},
		setupLegendOptions() {
			for(var elem in this.responseData.legends.all) {
				this.legendOptions.push({value: elem, text: elem})
			}
		},
		showLegendTrackers() {
			this.selectedLegendData = this.responseData.legends.all[this.selectedLegend]
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
