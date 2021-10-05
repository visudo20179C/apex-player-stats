<template>
  <div class="bg-black w-full h-screen ml-auto mr-auto pt-10 font-mono" style="color: #B12322;">
	<div v-if="!hasSearchParams" class="ml-auto mr-auto w-1/2">
		<div class="mb-4 text-2xl">Apex Player Stats</div>
		<div class="mb-4">Please provide the platform/name of your account:</div>
		<t-select
			placeholder="Select Platform"
			v-model="selectedPlatform"
			:options="[{value: 'PC', text: 'PC/Origin'}, {value: 'X1', text: 'Xbox'}, {value: 'PS4', text: 'PSN'}]"
			style="color: #B12332; margin-bottom: 2em;"
		/>
		<t-input
			placeholder="Enter username"
			v-model="inputName"
			style="background-color: black; color: #B12332; margin-bottom: 2em;"
		/>
		<button class="w-24 bg-black hover:bg-gray-800 font-bold py-2 px-4 border-2 border-red-900 rounded shadow" @click="search()">Go</button>
	</div>
	<div v-else-if="errorMessage != null" class="ml-auto mr-auto w-1/2">
		<div class="mb-4">{{this.errorMessage}}</div>
		<div class="mb-4">Check the name and spelling and try again.</div>
		<t-select
			placeholder="Select Platform"
			v-model="selectedPlatform"
			:options="[{value: 'PC', text: 'PC/Origin'}, {value: 'X1', text: 'Xbox'}, {value: 'PS4', text: 'PSN'}]"
			style="color: #B12332; margin-bottom: 2em;"
		/>
		<t-input
			placeholder="Enter username"
			v-model="inputName"
			style="background-color: black; color: #B12332; margin-bottom: 2em;"
		/>
		<button class="w-24 bg-black hover:bg-gray-800 font-bold py-2 px-4 border-2 border-red-900 rounded shadow" @click="searchAfterError()">Go</button>
	</div>
	<div v-else>
		<div v-if="responseDataCompute != null" class="bg-black">
			<div v-if="this.responseData.realtime.isOnline == 1">
				<div class="ml-auto mr-auto mb-4 w-2/3 border rounded-lg border-gray-500 bg-green-600 text-white">
					{{inputName}} is currently Online - {{this.responseData.realtime.currentStateAsText}}
				</div>
			</div>
			<div v-else>
				<div style="background-color: #a02121;" class="ml-auto mr-auto mb-4 w-2/3 border rounded-lg border-gray-500 text-gray-300">
					{{inputName}} is currently Offline
				</div>
			</div>
			<h1 class="text-2xl mb-8 font-black">Account Level: {{this.responseData.global.level}}</h1>
			<div v-tooltip.top-center="nextLevelMessage" class="h-3 w-3/4 relative max-w-xl mr-auto ml-auto rounded-full overflow-hidden">
				<div class="w-full h-full bg-black border rounded-lg border-gray-500 absolute"></div>
				<div style="background-color: #a02121;" class="h-full absolute" :style="barStyle"></div>
			</div>
			<h1 class="text-xl mt-6 mb-4 font-black">{{rankedSplit}}</h1>
			<table class="table-fixed ml-auto mr-auto w-1/2 border border-gray-500">
				<tr> 
					<th class="border rounded-lg border-gray-500">Rank</th>
					<th class="border rounded-lg border-gray-500">Total RP</th>
					<th class="border rounded-lg border-gray-500">Rank #</th>
				</tr>
				<tr v-if="responseData.global.rank.ladderPosPlatform == -1">
					<td class="border rounded-lg border-gray-500">
						{{this.responseData.global.rank.rankName}} {{this.responseData.global.rank.rankDiv}}
						<img class="ml-auto mr-auto max-h-16 max-w-16" :src="this.responseData.global.rank.rankImg"/>
					</td>
					<td class="border rounded-lg border-gray-500">{{this.responseData.global.rank.rankScore}}</td>
					<td class="border rounded-lg border-gray-500">N/A</td>
				</tr>
				<tr v-else>
					<td class="border rounded-lg border-gray-500">{{this.responseData.global.rank.rankName}}
						<img class="ml-auto mr-auto max-h-16 max-w-16" :src="this.responseData.global.rank.rankImg"/>
					</td>
					<td class="border rounded-lg border-gray-500">{{this.responseData.global.rank.rankScore}}</td>
					<td class="border rounded-lg border-gray-500"># {{this.responseData.global.rank.ladderPosPlatform}}</td>
				</tr>
			</table>
			<div class="mt-4 mb-4 max-h-1/2 bg-black">
				<h1 class="text-xl">{{inputName}}'s currently selected legend: </h1>
				<div class="ml-auto mr-auto mt-5 text-bold text-2xl w-64 h-10 bg-black border rounded-lg border-gray-500">
					{{this.responseData.legends.selected.LegendName}}
				</div>
				<img class="object-contain ml-auto mr-auto h-48 w-full" :src="this.responseData.legends.selected.ImgAssets.icon"/>
				<p class="ml-auto mr-auto mb-4 border rounded-lg border-gray-500 w-64">
					<i>Skin: {{this.responseData.legends.selected.gameInfo.skin}}</i>
				</p>
				<h1 class="text-xl">Equipped Trackers:</h1>
				<ul>
					<div v-for="item in this.responseData.legends.selected.data">
						<li class="w-1/2 ml-auto mr-auto border border-gray-500">{{item.name}}: {{item.value}}</li>
					</div>
				</ul>
			</div>
			<div class="ml-auto mr-auto pb-5 w-1/2 bg-black"> 
				<p class="mb-2"> See {{inputName}}'s trackers for: </p>
				<t-select
					placeholder="Select Legend"
					v-model="selectedLegend"
					:options="this.legendOptions"
					@change="showLegendTrackers()"
					style="color: #B12332;"
				/>
			</div>
			<div v-if="selectedLegend && selectedLegendData" class="bg-black pb-10">
				<h1 class="text-xl">Trackers:</h1>
				<div v-if="selectedLegendData.data !== undefined">
					<ul>
						<div v-for="item in selectedLegendData.data">
							<li class="w-1/2 ml-auto mr-auto border border-gray-500">{{item.name}}: {{item.value}}</li>
						</div>
					</ul>
				</div>
				<div v-else>
					None Equipped
				</div>
			</div>
			<button class="w-48 mt-10 bg-black hover:bg-gray-800 font-bold py-2 px-4 border-2 border-red-900 rounded shadow" @click="newSearch()">Search Again</button>
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
	<div class="bg-black ml-auto mr-auto text-sm">
		<p class="pt-12">
			<i>This site was made with the help of the mozambiquehe.re API. </i>
		</p>
		<p class="mb-6">
			<i>Visit their site</i>
			<a href="https://apexlegendsapi.com/" target="_blank" class="text-gray-200">
				here
			</a>
			<i>to learn more about the project and consider donating/becoming a supporter to them on Patreon.</i>
		</p>
		<p class="bg-black pb-20">
			<i>To learn more about this project/site specifically, visit the GitHub repository for it</i>
			<a href="https://github.com/visudo20179C/apex-player-stats" target="_blank" class="text-gray-200">
				here.
			</a>
		</p>
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
			responseData: null,
			legendOptions: [],
			selectedLegend: null,
			selectedLegendData: null,
			selectedPlatform: null,
			inputName: null,
			levelMessage: null,
			errorMessage: null,
			hasSearchParams: false, 
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
			if(data.Error) {
				this.errorMessage = data.Error
			}
			else {
				this.responseData = data
				this.setupLegendOptions()
			}
		},
		setupLegendOptions() {
			for(var elem in this.responseData.legends.all) {
				this.legendOptions.push({value: elem, text: elem})
			}
		},
		showLegendTrackers() {
			this.selectedLegendData = this.responseData.legends.all[this.selectedLegend]
		},
		search() {
			var player = this.inputName
			var platform = this.selectedPlatform
			this.hasSearchParams = true
			fetch(
				"https://api.mozambiquehe.re/bridge?version=5&platform="+platform+"&player="+player+"&auth=QYMCCkwuWGEeBQFL30tT",
				{
					method: 'GET',
				}
			)
			.then(response => response.json())
			.then(data => this.processData(data))
		},
		searchAfterError() {
			this.errorMessage = null
			var player = this.inputName
			var platform = this.selectedPlatform
			this.hasSearchParams = true
			fetch(
				"https://api.mozambiquehe.re/bridge?version=5&platform="+platform+"&player="+player+"&auth=QYMCCkwuWGEeBQFL30tT",
				{
					method: 'GET',
				}
			)
			.then(response => response.json())
			.then(data => this.processData(data))
		},
		newSearch() {
			this.hasSearchParams = false
			this.responseData = null
			this.inputName = null
			this.selectedPlatform = null
			this.legendOptions = []
			this.errorMessage = null
		}
	},
}
</script>

