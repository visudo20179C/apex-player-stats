import {
    TInput,
    TSelect,
    TTextarea,
} from "vue-tailwind/dist/components";

const settings = {
    't-input': {
        component: TInput,
        props: {
            fixedClasses: 'block w-full ml-auto mr-auto px-3 py-2 transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
            classes: 'text-black placeholder-gray-400 bg-black border-gray-500 focus:border-red-500 ',
            variants: {
                danger: 'border-red-300 bg-red-50 placeholder-red-200 text-red-900',
                success: 'border-green-300 bg-gray-50 placeholder-gray-400 text-green-900'
            }
        }
    },
    't-textarea': {
        component: TTextarea,
        props: {
            fixedClasses: 'block w-full px-3 py-2 transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
            classes: 'text-black placeholder-gray-400 bg-white border-gray-300 focus:border-blue-500 ',
            variants: {
                danger: 'border-red-300 bg-red-50 placeholder-red-200 text-red-900',
                success: 'border-green-300 bg-gray-50 placeholder-gray-400 text-green-900'
            }
        }
    },
    't-select': {
        component: TSelect,
        props: {
            fixedClasses: 'block w-full mr-auto ml-auto pl-3 pr-10 py-2 transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
            classes: 'text-red-500 placeholder-gray-400 bg-black border-4 rounded-lg border-gray-500 focus:border-red-500 ',
            variants: {
                danger: 'border-red-300 bg-red-50 placeholder-red-200 text-red-900',
                success: 'border-green-300 bg-gray-50 placeholder-gray-400 text-green-900'
            }
        }
    },
}

export default settings

